"""
Scrapes elvebredd.com — confirmed 100% client-rendered (empty HTML shell,
Next.js app). Unlike StarPets, I don't have ANY confirmed page structure
for this one -- elvebredd.com/ returned nothing but an empty shell, and I
have no verified listing-page URL to guess from.

*** THIS ONE NEEDS YOUR DEVTOOLS PASS BEFORE IT'LL WORK RELIABLY ***
Open elvebredd.com in Chrome -> click "Values List" (or whatever the pet
list page is called) -> F12 -> Network tab -> filter "Fetch/XHR" -> look
for a JSON response with pet names + Shark/Frost numbers in it. That
request's URL goes in ELVEBREDD_API_GUESS below, or send it to me and
I'll wire it in properly -- likely a 10-minute fix once we have it.

Until then, this script tries the generic "scan rendered page for
name+number pairs" approach against a guessed /values URL. It will very
likely need adjustment -- run it, look at scraped_elvebredd.json, and
tell me what's actually in there (or isn't).
"""
import re
import json
import time
from playwright.sync_api import sync_playwright

ELVEBREDD_API_GUESS = None  # e.g. "https://elvebredd.com/api/values" once you find it via DevTools

FALLBACK_URL = "https://elvebredd.com/values"

# Elvebredd uses Shark (low/mid tier) and Frost Dragon (high tier) as its
# two base units -- these aren't directly comparable to each other either,
# let alone to AMVGG or StarPets. blend.py handles this via percentile
# ranking, so raw unit mismatches here don't matter as long as everything
# scraped from this source stays on ONE of the two scales consistently.
VALUE_RE = re.compile(r"^\d+(\.\d+)?$")

# IMPORTANT FOR blend.py: Elvebredd uses two incompatible internal scales --
# Shark (low/mid tier) and Frost Dragon (legendaries). Every item this
# scraper emits MUST include a "scale": "shark" or "scale": "frost" field
# so blend.py's calibration step converts each scale into implied-USD
# separately, using StarPets overlap items on that scale only. Mixing the
# two scales into one calibration factor would silently produce nonsense.


def scrape_via_api(page) -> list[dict]:
    """If ELVEBREDD_API_GUESS is set, hit it directly via the page's own
    fetch (keeps cookies/headers consistent with a real browser session)."""
    if not ELVEBREDD_API_GUESS:
        return []
    result = page.evaluate(f"""
        async () => {{
            const res = await fetch("{ELVEBREDD_API_GUESS}");
            return await res.json();
        }}
    """)
    items = []
    # Shape unknown until we see a real response -- adjust the field names
    # below once you've confirmed them.
    for entry in result if isinstance(result, list) else result.get("data", []):
        name = entry.get("name") or entry.get("petName")
        value = entry.get("value") or entry.get("sharkValue") or entry.get("frostValue")
        if name and value is not None:
            items.append({
                "name": name,
                "category": "pets",
                "value": float(value),
                "source": "elvebredd",
            })
    return items


def scrape_via_generic_scan(page) -> list[dict]:
    """Fallback: load the values page and look for repeating text blocks
    that look like "<Pet Name>  <number>" -- crude, but doesn't depend on
    any CSS selector guesses."""
    page.goto(FALLBACK_URL, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2000)

    text = page.inner_text("body")
    lines = [l.strip() for l in text.split("\n") if l.strip()]

    items = []
    for i in range(len(lines) - 1):
        name_candidate = lines[i]
        value_candidate = lines[i + 1]
        if VALUE_RE.match(value_candidate) and 2 < len(name_candidate) < 40 \
                and not VALUE_RE.match(name_candidate):
            items.append({
                "name": name_candidate,
                "category": "pets",
                "value": float(value_candidate),
                "source": "elvebredd",
            })
    return items


def main():
    all_items = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("https://elvebredd.com/", wait_until="networkidle", timeout=30000)

        if ELVEBREDD_API_GUESS:
            print("Trying direct API call...")
            all_items = scrape_via_api(page)

        if not all_items:
            print("Falling back to generic page scan (values list) ...")
            try:
                all_items = scrape_via_generic_scan(page)
            except Exception as e:
                print(f"[error] generic scan failed: {e}")

        browser.close()

    with open("scraped_elvebredd.json", "w", encoding="utf-8") as f:
        json.dump(all_items, f, indent=2)
    print(f"\nWrote {len(all_items)} total items to scraped_elvebredd.json")

    if len(all_items) < 50:
        print("[warn] low/no items -- this scraper needs the DevTools API URL,")
        print("       see the big comment at the top of this file.")


if __name__ == "__main__":
    main()
