"""
Shared helpers: turning messy item names from three different sites into
one canonical key so the blender can match "Bat Dragon" (StarPets) with
"Bat Dragon (Legendary)" (AMVGG) and "BatDragon" (Elvebredd) as the same item.

If you find two items that SHOULD match but don't, add an entry to
MANUAL_ALIASES below — that's the permanent fix, better than tweaking
the regex for one edge case.
"""
import re
import difflib

# Words that describe a variant, not the base item -- stripped before matching.
VARIANT_WORDS = [
    "neon", "mega neon", "mega", "fr", "nfr", "mfr", "flyride", "fly ride",
    "fly", "ride", "normal", "regular", "(fr)", "(nfr)", "(mfr)",
]

# Left permanently empty except for cases you've manually confirmed are the
# same item under different names. Format: "messy_form": "Canonical Name"
MANUAL_ALIASES = {
    # "batdragon": "Bat Dragon",
}


def normalize_name(raw: str) -> str:
    """Collapse a raw item name down to a canonical matching key."""
    if not raw:
        return ""
    s = raw.strip().lower()
    s = MANUAL_ALIASES.get(s, s)
    # strip parenthetical tags like "(Legendary)", "(FR)"
    s = re.sub(r"\([^)]*\)", "", s)
    # strip variant words as whole words
    for w in VARIANT_WORDS:
        s = re.sub(rf"\b{re.escape(w)}\b", "", s)
    # collapse punctuation/whitespace
    s = re.sub(r"[^a-z0-9\s]", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def best_fuzzy_match(key: str, candidates: list[str], cutoff: float = 0.88):
    """Return the closest candidate key if it's a near-exact match, else None.
    Used as a fallback when normalize_name() doesn't produce an identical
    string across sources (typos, slightly different spacing, etc.)."""
    if key in candidates:
        return key
    matches = difflib.get_close_matches(key, candidates, n=1, cutoff=cutoff)
    return matches[0] if matches else None
