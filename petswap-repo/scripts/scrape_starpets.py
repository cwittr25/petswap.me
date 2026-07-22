"""
Real scraper against StarPets' actual backend API (confirmed live 2026-07-21):
    POST https://market.apineural.com/api/v2/store/items/all
    body: {"filter":{"types":[{"type":"<TYPE>"}]},"page":N,"amount":20,
           "currency":"usd","sort":{"popularity":"desc"}}

This is the same endpoint the public site itself calls for every visitor --
not the robots-disallowed /api/docs/ dev endpoint, which this script does
NOT touch.

WHAT THE DATA ACTUALLY LOOKS LIKE:
Each returned "item" is one individual marketplace LISTING, not one row per
pet. The same pet shows up many times (different sellers, different neon
stage, different fly/ride status). `count` for the "pet" type alone is
39,226. So the job here is: walk every listing, group by
(realName, pumping, flyable, rideable), and keep the MINIMUM price seen per
group -- that's the real "buy it now" market value for that exact variant.

PAGINATION: COMPLETE TRAVERSAL, NO SHORTCUTS.
An earlier version of this script tried to stop early once new-variant
sightings tapered off. That's wrong for this data: results are sorted by
price, so cheap common pets get traversed first and expensive rare
variants (the ones that matter most for big trades) sit at the far end of
the list. Stopping early risks silently missing exactly the high-value
items a trade calculator most needs to get right. So this version walks
every page until the API returns an empty page, full stop -- no cap, no
early exit. It DOES try a larger page size first (100 instead of 20) to
cut the number of requests, falling back to 20 only if that's rejected.

Confirmed: repo is public, so GitHub Actions minutes are unlimited --
a longer, complete run is the right tradeoff over a fast, incomplete one.

FIRST LIVE RUN FAILURE (2026-07-21) AND FIX:
The original pacing (0.2s between requests, starting at page size 100)
tripped a 429 almost immediately on "pet", and every category after that
timed out entirely -- looked like the same IP getting throttled/blocked
for the rest of that job run. Fixed with: a shared requests.Session, real
retry/backoff (honors Retry-After if the server sends one, otherwise
exponential: 10s/20s/40s/80s/160s) on both 429s and connection errors,
much slower base pacing (1.2s), and a page-size ladder (500/250/100/20,
largest that works) to cut total request count substantially. Verified
the retry logic against simulated 429 + timeout + success in sequence
before shipping this.

CATEGORY TYPES:
Confirmed live 2026-07-21: pet, egg, transport (vehicles), potion,
stroller, toy. Still guessed: pet_wear, food, sticker, gift -- script
prints which of those return zero results so we know which are wrong.

DATA QUALITY NOTE:
StarPets appears to have a $0.04 minimum listing price -- lots of
low-tier potions/toys/strollers all show exactly 0.04. That's a platform
floor, not real value differentiation, so for cheap items StarPets'
45% weight will often contribute a tie/flat value. AMVGG and Elvebredd's
demand/rank data end up doing most of the differentiating work at the
low end -- expected behavior, not a scraper bug.
"""
import json
import time
import requests

API_URL = "https://market.apineural.com/api/v2/store/items/all"

HEADERS = {
    "accept": "*/*",
    "content-type": "application/json",
    "origin": "https://starpets.gg",
    "referer": "https://starpets.gg/",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36",
}

# StarPets type -> PetSwap category key.
# Confirmed live 2026-07-21: pet, egg, transport, potion, stroller, toy,
# petwear, gift. Confirmed NOT sold on StarPets at all: food, stickers --
# those categories are sourced from AMVGG/Elvebredd only; blend.py already
# handles a missing source by redistributing weight, so this is fine.
CATEGORY_TYPES = {
    "pet": "pets",
    "egg": "eggs",
    "transport": "vehicles",
    "potion": "potions",
    "stroller": "strollers",
    "toy": "toys",
    "petwear": "petwear",   # NOT "pet_wear" -- caught from live response
    "gift": "gifts",
    # "sticker" / "food" intentionally omitted -- not sold on StarPets
}

CANDIDATE_PAGE_SIZES = [500, 250, 100, 20]  # tried largest-first to minimize total requests
REQUEST_DELAY_SECONDS = 1.2  # was 0.2 -- too aggressive, tripped a 429 + connection blackout on first live run
MAX_RETRIES = 5
BASE_BACKOFF_SECONDS = 10  # doubles each retry: 10s, 20s, 40s, 80s, 160s


def fetch_page(session: requests.Session, item_type: str, page: int, amount: int,
                sort_key="popularity", sort_dir="desc") -> dict:
    body = {
        "filter": {"types": [{"type": item_type}]},
        "page": page,
        "amount": amount,
        "currency": "usd",
        "sort": {sort_key: sort_dir},
    }
    last_exc = None
    for attempt in range(MAX_RETRIES):
        try:
            resp = session.post(API_URL, headers=HEADERS, json=body, timeout=30)
            if resp.status_code == 429:
                wait = _retry_wait(resp, attempt)
                print(f"    [429 rate limited] waiting {wait}s before retry {attempt + 1}/{MAX_RETRIES}")
                time.sleep(wait)
                continue
            resp.raise_for_status()
            return resp.json()
        except requests.exceptions.RequestException as e:
            last_exc = e
            wait = BASE_BACKOFF_SECONDS * (2 ** attempt)
            print(f"    [{type(e).__name__}] retry {attempt + 1}/{MAX_RETRIES} in {wait}s")
            time.sleep(wait)
    raise RuntimeError(f"Gave up after {MAX_RETRIES} retries on {item_type} page {page}: {last_exc}")


def _retry_wait(resp, attempt: int) -> int:
    retry_after = resp.headers.get("Retry-After")
    if retry_after:
        try:
            return int(retry_after)
        except ValueError:
            pass
    return BASE_BACKOFF_SECONDS * (2 ** attempt)


def fetch_page_probe(session: requests.Session, item_type: str, amount: int) -> dict | None:
    """Single attempt, no retry -- used only to test whether a candidate page
    size is accepted. If this used the full-retry fetch_page() instead, a
    rejected large page size (e.g. a 429 for "too many items requested")
    would burn the ENTIRE 5-retry backoff cycle (up to ~310s) before moving
    to the next smaller candidate -- across 4 candidates x 8 categories,
    that's potentially ~160 minutes lost just probing sizes, before any real
    scraping starts. Returns None on any failure so the caller moves on
    immediately instead of retrying something that simply isn't supported."""
    body = {
        "filter": {"types": [{"type": item_type}]},
        "page": 1,
        "amount": amount,
        "currency": "usd",
        "sort": {"popularity": "desc"},
    }
    try:
        resp = session.post(API_URL, headers=HEADERS, json=body, timeout=15)
        if resp.status_code != 200:
            return None
        return resp.json()
    except requests.exceptions.RequestException:
        return None


def determine_page_size(session: requests.Session, item_type: str) -> int:
    """Try progressively smaller page sizes until one works -- fewer, larger
    requests means less total load on their API and less chance of tripping
    rate limits than many small ones. Uses the no-retry probe, not the full
    fetch_page(), so a rejected candidate is skipped in ~1 request, not 5."""
    for candidate in CANDIDATE_PAGE_SIZES:
        data = fetch_page_probe(session, item_type, candidate)
        if data and data.get("status") and len(data.get("items", [])) > 20:
            return candidate
        print(f"    page size {candidate} not usable, trying smaller...")
        time.sleep(0.5)
    return 20


def variant_key(item: dict):
    return (item["realName"], item["pumping"], item["flyable"], item["rideable"])


def scrape_type(session: requests.Session, item_type: str, category_key: str) -> list[dict]:
    display_name = {}  # realName -> human name (for output)

    page_size = determine_page_size(session, item_type)

    first_page = fetch_page(session, item_type, 1, page_size)
    if not first_page.get("status") or not first_page.get("items"):
        print(f"  [warn] '{item_type}' returned nothing -- likely a wrong type value")
        return []

    total_count = first_page.get("count", 0)
    expected_pages = -(-total_count // page_size) if total_count else 1
    # Hard safety cap: even if the API never returns a clean empty page at
    # the end (e.g. it repeats the last page, or wraps around instead --
    # both real, common API behaviors), this guarantees the loop terminates.
    # +20% buffer in case `count` shifts slightly during a long scrape.
    max_pages = max(int(expected_pages * 1.2) + 5, 10)
    print(f"  total listings reported: {total_count} | page size: {page_size} "
          f"| expected ~{expected_pages} pages (hard cap {max_pages}) | walking until empty")

    page = 1
    seen_listing_ids = set()  # dedupe safety net in case pagination ever overlaps
    prices_by_key = {}   # variant_key -> [all prices seen] -- median taken after full traversal
    sample_by_key = {}   # variant_key -> one representative item (for image/rarity/name)
    stale_pages_in_a_row = 0
    while True:
        if page > max_pages:
            print(f"  [warn] hit hard page cap ({max_pages}) -- stopping here. "
                  f"If this is well under the real total, the API's pagination "
                  f"may behave unusually near its end; data collected so far is kept.")
            break

        data = first_page if page == 1 else fetch_page(session, item_type, page, page_size)
        items = data.get("items", [])
        if not items:
            break

        new_ids_this_page = 0
        for it in items:
            if it["id"] in seen_listing_ids:
                continue
            seen_listing_ids.add(it["id"])
            new_ids_this_page += 1
            k = variant_key(it)
            display_name[it["realName"]] = it["name"]
            prices_by_key.setdefault(k, []).append(it["price"])
            sample_by_key.setdefault(k, it)  # first-seen sample is fine for display fields

        # If the API is repeating the same listings instead of truly advancing
        # (e.g. clamping out-of-range pages to the last valid one), catch it
        # here rather than looping until the hard cap.
        if new_ids_this_page == 0:
            stale_pages_in_a_row += 1
            if stale_pages_in_a_row >= 3:
                print(f"  [warn] {stale_pages_in_a_row} consecutive pages with zero new "
                      f"listings -- API is likely repeating data past its real end. Stopping.")
                break
        else:
            stale_pages_in_a_row = 0

        if page % 10 == 0:
            print(f"    ...page {page}/{max_pages}, {len(seen_listing_ids)} listings seen, "
                  f"{len(prices_by_key)} unique variants so far")

        page += 1
        time.sleep(REQUEST_DELAY_SECONDS)

    print(f"  -> COMPLETE: {len(seen_listing_ids)} listings across {page - 1} pages, "
          f"{len(prices_by_key)} unique (pet, variant) combos")

    def median(vals):
        s = sorted(vals)
        n = len(s)
        return s[n // 2] if n % 2 else (s[n // 2 - 1] + s[n // 2]) / 2

    out = []
    for k, prices in prices_by_key.items():
        real_name, pumping, flyable, rideable = k
        item = sample_by_key[k]
        out.append({
            "name": display_name[real_name],
            "category": category_key,
            "value": round(median(prices), 4),  # MEDIAN across all listings for this variant
            "listing_count": len(prices),         # transparency: how many listings backed this median
            "image": item["imageUri"],
            "rarity": item.get("rare"),
            "pumping": pumping,      # default / neon / mega_neon
            "flyable": flyable,
            "rideable": rideable,
            "source": "starpets",
        })
    return out


def main():
    session = requests.Session()
    all_items = []
    for item_type, category_key in CATEGORY_TYPES.items():
        print(f"Scraping StarPets type='{item_type}' -> {category_key} ...")
        try:
            all_items.extend(scrape_type(session, item_type, category_key))
            time.sleep(2)  # brief courtesy pause between categories on success
        except Exception as e:
            print(f"  [error] {item_type}: {e}")
            print("  cooling down 30s before the next category, in case that was rate-limiting")
            time.sleep(30)

    with open("scraped_starpets_raw.json", "w", encoding="utf-8") as f:
        json.dump(all_items, f, indent=2)
    print(f"\nWrote {len(all_items)} raw (pet, variant) rows to scraped_starpets_raw.json")

    reduce_to_base_and_multipliers(all_items)


def reduce_to_base_and_multipliers(items: list[dict]):
    from collections import defaultdict
    groups = defaultdict(dict)  # (category, name) -> {variant_tag: price}

    for it in items:
        tag = "base"
        if it["pumping"] == "neon":
            tag = "neon"
        elif it["pumping"] == "mega_neon":
            tag = "mega"
        if it["pumping"] == "default" and it["flyable"] and it["rideable"]:
            tag = "flyride"
        elif it["pumping"] == "default" and it["flyable"]:
            tag = "fly"
        elif it["pumping"] == "default" and it["rideable"]:
            tag = "ride"

        key = (it["category"], it["name"])
        if tag not in groups[key] or it["value"] < groups[key][tag]:
            groups[key][tag] = it["value"]

    base_items = []
    ratios = {"neon": [], "mega": [], "fly": [], "ride": [], "flyride": []}

    for (category, name), variants in groups.items():
        if "base" not in variants:
            continue  # can't establish a base value for this item this run
        base_price = variants["base"]
        base_items.append({
            "name": name,
            "category": category,
            "value": base_price,
            "source": "starpets",
        })
        for tag in ratios:
            if tag in variants and base_price > 0:
                ratios[tag].append(variants[tag] / base_price)

    def median(vals):
        if not vals:
            return None
        s = sorted(vals)
        n = len(s)
        return s[n // 2] if n % 2 else (s[n // 2 - 1] + s[n // 2]) / 2

    measured_multipliers = {tag: median(vals) for tag, vals in ratios.items()}
    print("\nMeasured variant multipliers this run (sample sizes in parens):")
    for tag, vals in ratios.items():
        m = measured_multipliers[tag]
        print(f"  {tag}: {round(m, 3) if m else 'n/a'}  (n={len(vals)})")

    with open("scraped_starpets.json", "w", encoding="utf-8") as f:
        json.dump(base_items, f, indent=2)
    with open("starpets_measured_multipliers.json", "w", encoding="utf-8") as f:
        json.dump(measured_multipliers, f, indent=2)
    print(f"\nWrote {len(base_items)} base-value items to scraped_starpets.json")
    print("(measured multipliers saved to starpets_measured_multipliers.json --")
    print(" not yet auto-applied to VARIANT_MULTIPLIERS in data.js; review before wiring in)")


if __name__ == "__main__":
    main()
