# PetSwap.me — site + value pipeline

Everything needed for a fresh GitHub setup: the live trade calculator
site, and the scraper that keeps its values current.

## What's in here
- `index.html`, `script.js`, `styles.css`, `data.js`, `logo.png` — the live site
- `scripts/` — the scraper + blender
- `.github/workflows/update-values.yml` — runs the scraper twice daily, auto-commits `data.js`

## Current source status (as of 2026-07-21)
- **StarPets**: real API (`market.apineural.com`), confirmed complete
  traversal, median-price aggregation, retry/backoff on rate limits.
  8 of 10 category types confirmed live: pet, egg, transport (vehicles),
  potion, stroller, toy, petwear, gift. food/sticker confirmed NOT sold
  on StarPets at all (sourced from AMVGG only).
- **AMVGG**: real static-HTML scrape, confirmed working for pets (100%
  item + image match on a live run) and eggs. Images matched via `<img
  alt="...">` text.
- **Elvebredd**: nullified, not deleted. `scrape_elvebredd.py` exists
  dormant; blend.py supports a 3rd source with zero code changes if
  re-enabled later (see comments in `blend.py`'s `WEIGHTS` dict).

## Two real bugs found and fixed during live testing
1. **AMVGG parser was splitting on the substring "ago"** — but "Dragon"
   contains "ago" (Dr-AGO-n), silently corrupting every Dragon-named pet.
   Fixed by requiring the specific "N days/hours/months ago" suffix as
   the boundary instead of the bare substring.
2. **AMVGG non-pet categories use a different, block-separated page
   layout** than pets' compact one — the parsing regex didn't tolerate
   the newlines between fields, so every non-pet category returned 0
   items on the first live run. Fixed with `re.DOTALL` + whitespace
   tolerance between every field.
3. **StarPets rate-limited the scraper on the first live run** (429,
   then connection timeouts for every category after) — pacing was too
   aggressive. Fixed with real retry/backoff (honors `Retry-After`,
   otherwise exponential 10s→160s), slower base pacing, and a page-size
   ladder (500/250/100/20) to cut total request volume.

## Site now has 3 pages
- `index.html` — Trade Calculator (main page)
- `inventory.html` — My Inventory (localStorage-based stand-in until real accounts)
- `about.html` — data sources + roadmap
- `common.js` — shared helpers used by all pages (item lookup, value math, thumbnails, inventory read/write)
- "Confirm Trade" button on the calculator clears the trade and updates the
  local inventory (removes what you gave, adds what you received) — no
  backend yet, this is groundwork for real account integration later.

## This round's fixes (2026-07-21, later)
- **StarPets speed/hang bugs (2):** (1) page-size probing was using the
  full 5-retry backoff, burning up to ~20min/category if a size got
  rejected — now uses a fast single-attempt probe. (2) the pagination
  loop had no hard exit beyond "API returns empty" — if StarPets clamps
  out-of-range pages instead of emptying, it would run forever. Added a
  hard page-count cap AND stale-data detection (stops after 3 consecutive
  pages with zero new listings) as independent safety nets. Both verified
  with simulated misbehaving-API tests.
- **AMVGG images were broken (question-mark icon) despite a "successful"
  match** — was hotlinking directly to AMVGG's CDN, which either serves
  relative URLs (broken once copied to another domain) or blocks
  cross-domain embedding outright. Fixed by downloading each image during
  the scrape and hosting locally (`images/<category>/<slug>.ext`,
  committed to the repo); skips re-downloading images that already exist
  from a previous run.
- **Remove (×) button on trade tiles was invisible** — positioned outside
  its tile's bounds (`top: -6px`), which then got clipped by the tile's
  `overflow: hidden`. Moved inside the bounds (`top: 3px`).
- **PYTHONUNBUFFERED added to the workflow** — Python's stdout is fully
  buffered when not attached to a terminal (exactly the Actions log
  case), so print() output could sit unflushed for the entire run,
  looking exactly like a hang. Now streams live.

## Setup (fresh repo)
1. Delete everything currently in the repo.
2. Upload every file in this package to the repo root — GitHub's web
   uploader doesn't accept folders (including hidden ones like
   `.github`), so `scripts/*` and `.github/workflows/update-values.yml`
   need to go in via **Add file → Create new file**, typing the full
   path (e.g. `scripts/blend.py`) so GitHub creates the folder
   automatically, then pasting the file's content in.
3. Repo **Settings → Actions → General**:
   - **Actions permissions**: Allow all actions
   - **Workflow permissions**: Read and write permissions
4. **Actions** tab → **Update PetSwap Values** → **Run workflow** to
   test immediately rather than waiting for the twice-daily schedule.
5. Check the run log, check for a new "Auto-update values" commit,
   check Cloudflare Pages picked up a new deployment, check the live site.

## Weighting & blending
StarPets ~56%, AMVGG ~44% (proportional to the original 45/35 request
with Elvebredd's 20 removed). See top-of-file comments in `blend.py` for
why this uses calibrated implied-USD conversion rather than averaging
raw numbers across incompatible unit scales.

## DevTools capture for Elvebredd (whenever you're ready to re-add it)
Open elvebredd.com → F12 → Network → Fetch/XHR → find the request
returning pet values as JSON → send the URL + a response sample. Same
process used to get StarPets' real API.
