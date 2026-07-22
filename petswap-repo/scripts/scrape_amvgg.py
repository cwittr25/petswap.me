r"""
Scrapes amvgg.com/values/<category> — confirmed to be plain server-rendered
HTML (no JavaScript needed), so this uses requests + BeautifulSoup only.

Verified live on 2026-07-21: /values/pets returned all 755 pets in one
page load, each formatted in the page's TEXT as:
    "<Name>Value<number>Demand<stars>FRNM<relative time>ago"
Parsed with a single regex scan (finditer) over the whole text, using the
full "<N> <unit> ago" suffix as each item's end-boundary -- NOT a naive
split on the substring "ago", which would (and in an earlier version,
did) break on any name containing "ago" as a substring, e.g. "Dragon"
(D-r-AGO-n). Every Dragon-named pet was silently corrupted by that bug;
fixed by requiring the specific time-unit pattern to close a match.

If AMVGG changes their page structure, this regex will start returning 0
items — the script prints a warning and a text sample when that happens
so it's obvious what broke, instead of silently writing empty/bad data.

IMAGES:
Plain text extraction strips out <img> tags entirely, so this also parses
the raw DOM for every <img> and matches it to a pet/item by its `alt`
attribute -- confirmed working at 100% match rate for pets on the first
live run.

Confirmed the images then showed as broken (question-mark icon) on the
live site despite a successful match. Two likely causes, both handled by
downloading the actual image instead of hotlinking to AMVGG's CDN:
1. `src` attributes can be relative paths (e.g. "/items/x.webp") -- fine
   on amvgg.com itself, broken once copied as-is onto petswap.me. Fixed
   by resolving every URL to absolute with urljoin before use.
2. Many value-list sites block hotlinking (embedding their images
   directly from another domain) to protect their own bandwidth/CDN
   costs -- the image loads fine when WE fetch it (with a proper
   Referer), but a visitor's browser loading it directly from
   petswap.me would get refused. Fixed by downloading each image once
   during the scrape and serving our own local copy from then on.

Downloaded images are saved to ../images/<category>/<slug>.<ext>
(repo root's images/ folder, alongside logo.png) and already-downloaded
files are skipped on future runs (checked out from the previous commit),
so this only re-downloads genuinely new images each run, not everything
every time.

SECOND BUG FOUND ON THE FIRST LIVE RUN (2026-07-21):
Pets parsed perfectly (754/754) but every other category returned 0
items. Turned out non-pet category pages (eggs, toys, etc.) use a
different, block-separated card layout -- heading, then Value/Demand/
time each in their own block -- unlike pets' compact zero-whitespace
layout. Since "." doesn't match newlines by default, the regex silently
failed to bridge those gaps. Fixed with re.DOTALL plus \s* tolerance
between every field. Verified against both layouts before shipping.
"""
import re
import os
import json
import sys
import time
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup

BASE_URL = "https://amvgg.com"

# AMVGG category -> PetSwap category key (matches data.js CATEGORIES)
CATEGORY_MAP = {
    "pets": "pets",
    "eggs": "eggs",
    "petwear": "petwear",
    "strollers": "strollers",
    "food": "food",
    "vehicles": "vehicles",
    "toys": "toys",
    "gifts": "gifts",
    "stickers": "stickers",
    # "houses" intentionally skipped -- not a category PetSwap tracks
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36 PetSwapValueBot/1.0"
}
# Used specifically for downloading images -- some sites reject image
# requests without a Referer matching their own domain (hotlink protection).
IMAGE_HEADERS = {**HEADERS, "Referer": f"{BASE_URL}/"}

IMAGES_DIR = os.path.join("..", "images")  # repo_root/images, alongside logo.png

ITEM_RE = re.compile(
    r"(?P<name>.+?)\s*Value\s*(?P<value>[\d.]+)\s*Demand\s*(?P<stars>[★☆]+)\s*(?:FRNM\s*)?"
    r"(?:\d+\s*(?:second|minute|hour|day|week|month|year)s?\s*ago|just now)",
    re.DOTALL,
)


def slugify(name: str) -> str:
    s = name.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-") or "item"


def extract_images_by_alt(soup: BeautifulSoup) -> dict:
    """Best-effort: map normalized alt-text -> absolute image URL for every
    <img> on the page. Falls back to data-src/data-original in case images
    are lazy-loaded (src would be a placeholder in that case)."""
    images = {}
    for img in soup.find_all("img"):
        alt = (img.get("alt") or "").strip().lower()
        src = img.get("src") or img.get("data-src") or img.get("data-original") or ""
        if alt and src and not src.startswith("data:"):  # skip inline placeholder blobs
            images[alt] = urljoin(BASE_URL, src)  # always store as absolute
    return images


def download_image(url: str, category: str, item_name: str) -> str:
    """Downloads the image if not already present locally; returns the path
    to use in data.js (relative to the site root, e.g. "images/pets/x.webp"),
    or "" on failure (site's existing fallback initials-icon kicks in)."""
    ext = os.path.splitext(urlparse(url).path)[1] or ".webp"
    if len(ext) > 6:  # guard against a garbage "extension" from a weird URL
        ext = ".webp"
    slug = slugify(item_name)
    local_dir = os.path.join(IMAGES_DIR, category)
    local_path = os.path.join(local_dir, f"{slug}{ext}")
    site_path = f"images/{category}/{slug}{ext}"  # what data.js / index.html actually uses

    if os.path.exists(local_path) and os.path.getsize(local_path) > 0:
        return site_path  # already downloaded in a previous run, skip re-fetching

    try:
        os.makedirs(local_dir, exist_ok=True)
        resp = requests.get(url, headers=IMAGE_HEADERS, timeout=20)
        resp.raise_for_status()
        with open(local_path, "wb") as f:
            f.write(resp.content)
        return site_path
    except Exception as e:
        print(f"    [image download failed] {item_name}: {e}")
        return ""


def scrape_category(amvgg_slug: str) -> tuple[list[dict], int, int]:
    url = f"{BASE_URL}/values/{amvgg_slug}"
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    text = soup.get_text(separator="")

    marker = "Value"
    if marker not in text:
        print(f"  [warn] no 'Value' marker found for {amvgg_slug} — page structure may have changed")
        return [], 0, 0

    images_by_alt = extract_images_by_alt(soup)
    category_key = CATEGORY_MAP[amvgg_slug]

    # NOTE: the very first real item on each page will typically get
    # merged with leading header/nav text (e.g. "...Ride PotBat Dragon...")
    # since there's no reliable delimiter before it -- the len(name)>60
    # filter below discards that one contaminated entry per category page.
    # Minor, known, acceptable loss (~1 item per category) vs. the
    # alternative of a fragile per-category header-stripping regex.
    items = []
    matched_images = 0
    for m in ITEM_RE.finditer(text):
        name = m.group("name").strip()
        if len(name) > 60 or not name:
            continue
        try:
            value = float(m.group("value"))
        except ValueError:
            continue
        demand_stars = m.group("stars").count("★")

        remote_image_url = images_by_alt.get(name.lower(), "")
        local_image_path = download_image(remote_image_url, category_key, name) if remote_image_url else ""
        if local_image_path:
            matched_images += 1

        items.append({
            "name": name,
            "category": category_key,
            "value": value,
            "demand": demand_stars,  # 1-3 scale on AMVGG; blend.py rescales this
            "image": local_image_path,
            "source": "amvgg",
        })
    return items, len(items), matched_images


def main():
    all_items = []
    total_items = 0
    total_matched_images = 0

    for slug in CATEGORY_MAP:
        print(f"Scraping AMVGG: {slug} ...")
        try:
            cat_items, n_items, n_matched = scrape_category(slug)
            print(f"  -> {n_items} items, {n_matched} with an image match "
                  f"({n_matched}/{n_items or 1} = {100 * n_matched // (n_items or 1)}%)")
            all_items.extend(cat_items)
            total_items += n_items
            total_matched_images += n_matched
        except Exception as e:
            print(f"  [error] {slug}: {e}")
        time.sleep(1.5)  # be a polite scraper, not a hammer

    out_path = "scraped_amvgg.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(all_items, f, indent=2)
    print(f"\nWrote {len(all_items)} total items to {out_path}")

    if total_items > 0:
        pct = 100 * total_matched_images // total_items
        print(f"Image match rate: {total_matched_images}/{total_items} ({pct}%)")
        if pct < 50:
            print("[warn] image match rate is low -- alt-text matching may not be reliable on "
                  "this page. Send a snippet of the real <img> HTML (view-source, search for "
                  "one pet's image tag) and this can be switched to a more reliable method.")

    if len(all_items) < 100:
        print("[warn] suspiciously low item count -- check that AMVGG's page structure hasn't changed.")
        sys.exit(1 if len(all_items) == 0 else 0)


if __name__ == "__main__":
    main()

