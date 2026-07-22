"""
Combines scraped_starpets.json (currently ~56%) and scraped_amvgg.json
(currently ~44%) into the ITEMS array in data.js.

ELVEBREDD IS NULLIFIED, NOT DELETED:
scrape_elvebredd.py still exists and blend.py's calibration logic still
supports a third source with zero code changes -- just uncomment the
"elvebredd" line in WEIGHTS below and re-add the scrape_elvebredd.py step
in the GitHub Actions workflow to bring it back. Nothing else needs to
change; the weight-redistribution logic already handles a variable number
of sources.

HOW THE UNIT-MISMATCH PROBLEM IS SOLVED:
StarPets gives real dollars. AMVGG gives its own "Frost scale" decimal.
You can't average $4.50 with 0.885 directly.

Fix: CALIBRATE AMVGG into "implied USD" using items that exist in BOTH
AMVGG and StarPets. For every such overlapping item, compute
ratio = starpets_price / amvgg_value. The MEDIAN ratio across all overlaps
becomes AMVGG's conversion factor. Every AMVGG item then gets multiplied
by that factor to produce an implied-dollar value, directly comparable to
StarPets' real prices. This happens separately per "scale" tag in case a
future source (like Elvebredd) needs more than one internal scale --
AMVGG itself only uses one, so this is a no-op distinction for it today.

FALLBACK when overlap is too thin (<MIN_CALIBRATION_SAMPLES matches):
falls back to percentile-rank-within-category, rescaled onto StarPets'
value range for that category. Less literal than calibration, but doesn't
require enough overlapping data to be reliable, and won't crash or
silently no-op on a sparse first run.

WEIGHT REDISTRIBUTION:
If an item is missing from a source, that source's weight is dropped and
the remaining weight is used at 100% -- so an AMVGG-only item (e.g. Food,
which StarPets doesn't sell) just uses AMVGG's implied-USD value directly.

This script only replaces the `const ITEMS = [...]` block inside your
existing data.js -- CATEGORIES, DEMAND_MULTIPLIERS, and
VARIANT_MULTIPLIERS are left exactly as you've tuned them.
"""
import json
import re
import sys
from collections import defaultdict
from datetime import date

sys.path.insert(0, ".")
from lib_normalize import normalize_name

WEIGHTS = {
    "starpets": 0.45,
    "amvgg": 0.35,
    # "elvebredd": 0.20,  # nullified -- uncomment to re-enable once scrape_elvebredd.py is wired up again
}
DATA_JS_PATH = "data.js"
MIN_CALIBRATION_SAMPLES = 5  # below this, calibration ratio isn't trustworthy -- fall back to rank


def load_source(filename: str, source_key: str) -> list[dict]:
    try:
        with open(filename, encoding="utf-8") as f:
            items = json.load(f)
        print(f"Loaded {len(items)} items from {filename}")
        return items
    except FileNotFoundError:
        print(f"[warn] {filename} not found -- treating {source_key} as empty for this run")
        return []


def median(vals):
    if not vals:
        return None
    s = sorted(vals)
    n = len(s)
    return s[n // 2] if n % 2 else (s[n // 2 - 1] + s[n // 2]) / 2


def build_starpets_lookup(starpets_items):
    lookup = {}
    for it in starpets_items:
        key = (it["category"], normalize_name(it["name"]))
        lookup[key] = it["value"]
    return lookup


def calibrate_source(source_items, source_key, starpets_lookup):
    """Returns (implied_usd_by_item_index, calibration_report).
    Groups by the item's 'scale' tag (defaults to 'default' if the source
    doesn't distinguish scales, e.g. AMVGG). Falls back to percentile-rank
    rescaling for any scale group with too few StarPets overlaps."""
    by_scale = defaultdict(list)
    for idx, it in enumerate(source_items):
        scale = it.get("scale", "default")
        by_scale[scale].append(idx)

    implied_usd = [None] * len(source_items)
    report = []

    for scale, idxs in by_scale.items():
        ratios = []
        for idx in idxs:
            it = source_items[idx]
            key = (it["category"], normalize_name(it["name"]))
            if key in starpets_lookup and it["value"] > 0:
                ratios.append(starpets_lookup[key] / it["value"])

        if len(ratios) >= MIN_CALIBRATION_SAMPLES:
            factor = median(ratios)
            for idx in idxs:
                implied_usd[idx] = source_items[idx]["value"] * factor
            report.append(f"{source_key}/{scale}: CALIBRATED, factor={factor:.4g} (n={len(ratios)} overlaps)")
        else:
            # fallback: percentile rank within (category, scale), rescaled onto
            # this category's StarPets range (or a fixed default if StarPets
            # has nothing in this category at all)
            by_category = defaultdict(list)
            for idx in idxs:
                by_category[source_items[idx]["category"]].append(idx)

            for category, cat_idxs in by_category.items():
                cat_idxs_sorted = sorted(cat_idxs, key=lambda i: source_items[i]["value"])
                n = len(cat_idxs_sorted)
                cat_starpets_vals = [v for (c, _n), v in starpets_lookup.items() if c == category]
                tmin = min(cat_starpets_vals) if cat_starpets_vals else 0.003
                tmax = max(cat_starpets_vals) if cat_starpets_vals else 1000.0
                for rank, idx in enumerate(cat_idxs_sorted):
                    pct = rank / (n - 1) if n > 1 else 0.5
                    implied_usd[idx] = tmin + pct * (tmax - tmin)
            report.append(f"{source_key}/{scale}: rank-fallback only {len(ratios)} overlaps "
                           f"(<{MIN_CALIBRATION_SAMPLES} needed) -- not enough data to calibrate yet")

    return implied_usd, report


def main():
    starpets = load_source("scraped_starpets.json", "starpets")
    amvgg = load_source("scraped_amvgg.json", "amvgg")

    starpets_lookup = build_starpets_lookup(starpets)

    amvgg_usd, amvgg_report = calibrate_source(amvgg, "amvgg", starpets_lookup)
    print("\nCalibration report:")
    for line in amvgg_report:
        print(f"  {line}")

    # build a single lookup per source: (category, norm_name) -> implied USD value
    # (last-write-wins on duplicate names within a source; fine for this use)
    sources_raw = {"starpets": starpets, "amvgg": amvgg}
    sources_usd = {"starpets": [it["value"] for it in starpets], "amvgg": amvgg_usd}

    implied = {src: {} for src in WEIGHTS}
    display_info = {src: {} for src in WEIGHTS}

    for src in WEIGHTS:
        for it, usd in zip(sources_raw[src], sources_usd[src]):
            key = (it["category"], normalize_name(it["name"]))
            implied[src][key] = usd
            display_info[src][key] = it

    all_keys = set()
    for src in WEIGHTS:
        all_keys.update(implied[src].keys())

    blended_items = []
    match_counts = {n: 0 for n in range(1, len(WEIGHTS) + 1)}

    for key in all_keys:
        category, norm_name = key
        available = {
            src: implied[src][key]
            for src in WEIGHTS
            if key in implied[src]
        }
        match_counts[len(available)] += 1

        weight_sum = sum(WEIGHTS[s] for s in available)
        blended_value = round(
            sum(WEIGHTS[s] * v for s, v in available.items()) / weight_sum, 4
        )

        # AMVGG checked first for image/display fields per your request to
        # pull pet/item images from AMVGG; falls back to StarPets' CDN images
        # (StarPets also has real images) if AMVGG's weren't found for this item.
        display_name = image = demand = None
        for src in ("amvgg", "starpets"):
            if src not in WEIGHTS:
                continue
            raw = display_info[src].get(key)
            if raw:
                display_name = display_name or raw.get("name")
                image = image or raw.get("image")
                if demand is None and raw.get("demand") is not None:
                    demand = raw["demand"]

        if not display_name:
            continue

        item_id = re.sub(r"[^a-z0-9]+", "-", norm_name).strip("-") or "unknown"
        blended_items.append({
            "id": f"{category}-{item_id}",
            "name": display_name,
            "category": category,
            "value": blended_value,
            "demand": demand if demand is not None else 3,
            "image": image or "",
        })

    n_sources = len(WEIGHTS)
    print(f"\nMatch summary: " + ", ".join(
        f"{match_counts[n]} in {n}/{n_sources} sources" for n in range(n_sources, 0, -1)
    ))
    print(f"Total blended items: {len(blended_items)}")

    write_data_js(blended_items)


def write_data_js(items: list[dict]):
    try:
        with open(DATA_JS_PATH, encoding="utf-8") as f:
            current = f.read()
    except FileNotFoundError:
        print(f"[error] {DATA_JS_PATH} not found -- can't preserve existing "
              f"CATEGORIES/multipliers. Aborting so nothing gets clobbered.")
        sys.exit(1)

    items_js = json.dumps(items, indent=2)
    items_block = f"const ITEMS = {items_js};"

    new_content = re.sub(
        r"const ITEMS = \[.*?\];",
        lambda _m: items_block,
        current,
        flags=re.DOTALL,
    )

    if new_content == current:
        print("[error] could not find 'const ITEMS = [...]' block in data.js -- "
              "no changes written, check the file wasn't restructured.")
        sys.exit(1)

    new_content = re.sub(
        r"taken on \d{4}-\d{2}-\d{2}",
        f"taken on {date.today().isoformat()}",
        new_content,
    )

    with open(DATA_JS_PATH, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Wrote {len(items)} items into {DATA_JS_PATH}")


if __name__ == "__main__":
    main()
