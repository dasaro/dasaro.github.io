#!/usr/bin/env python3
"""
update_scholar_metrics.py — refresh the aggregate Google Scholar metrics
(total citations, h-index, i10-index) in cv.yml, the CV's single source of truth.

It reads the Scholar user id from _data/socials.yml (`scholar_userid`) and rewrites
ONLY the `metrics:` block of cv.yml in place, preserving every other line, comment
and formatting choice in the file.

    python bin/update_scholar_metrics.py           # fetch and update cv.yml
    python bin/update_scholar_metrics.py --check    # fetch and print, do not write

Dependency: `scholarly` (+ pyyaml).  NOTE: Google Scholar throttles automated
access. This is reliable from a normal (residential) IP but is frequently blocked
from CI / datacenter IPs — see .github/workflows/update-metrics.yml for how the
scheduled run handles that. On a fetch failure the script logs and exits 0, so a
monthly CI run that gets blocked does not spam failure notifications.
"""
import argparse
import datetime
import os
import re
import sys

import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOCIALS = os.path.join(ROOT, "_data", "socials.yml")
CV = os.path.join(ROOT, "cv.yml")


def scholar_id() -> str:
    with open(SOCIALS, encoding="utf-8") as f:
        raw = (yaml.safe_load(f) or {}).get("scholar_userid", "")
    # socials may store e.g. "qb2YFi4AAAAJ&hl=it" — keep only the bare id.
    sid = str(raw).split("&", 1)[0].strip()
    if not sid:
        sys.exit(f"[metrics] no 'scholar_userid' in {SOCIALS}")
    return sid


def fetch_metrics(sid: str) -> dict:
    from scholarly import scholarly  # imported lazily so --help works without it

    # Optional: route through ScraperAPI when SCRAPERAPI_KEY is set. Scholar blocks
    # most datacenter IPs, so this is what makes the scheduled CI run viable.
    key = os.environ.get("SCRAPERAPI_KEY")
    if key:
        from scholarly import ProxyGenerator

        pg = ProxyGenerator()
        if pg.ScraperAPI(key):
            scholarly.use_proxy(pg)
            print("[metrics] using ScraperAPI proxy")

    author = scholarly.search_author_id(sid)
    author = scholarly.fill(author, sections=["indices", "counts"])
    return {
        "citations": int(author.get("citedby", 0) or 0),
        "h_index": int(author.get("hindex", 0) or 0),
        "i10_index": int(author.get("i10index", 0) or 0),
    }


def update_cv(metrics: dict, date_str: str) -> bool:
    """Rewrite the values inside the `metrics:` block only. Returns True if changed."""
    with open(CV, encoding="utf-8") as f:
        text = f.read()
    m = re.search(r"(?ms)^metrics:\n(?:[ \t].*\n?)*", text)
    if not m:
        sys.exit("[metrics] no 'metrics:' block found in cv.yml")
    block = m.group(0)
    new_block = block
    edits = {
        "source": f'  source: "Google Scholar, {date_str}"',
        "citations": f"  citations: {metrics['citations']}",
        "h_index": f"  h_index: {metrics['h_index']}",
        "i10_index": f"  i10_index: {metrics['i10_index']}",
    }
    for key, line in edits.items():
        new_block = re.sub(rf"(?m)^  {key}:.*$", line.replace("\\", "\\\\"), new_block, count=1)
    if new_block == block:
        return False
    with open(CV, "w", encoding="utf-8") as f:
        f.write(text[: m.start()] + new_block + text[m.end():])
    return True


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--check", action="store_true", help="fetch and print only; do not write cv.yml")
    args = ap.parse_args()

    sid = scholar_id()
    print(f"[metrics] fetching Google Scholar metrics for id={sid} ...")
    try:
        m = fetch_metrics(sid)
    except Exception as e:  # Scholar block / network / parse error
        print(f"[metrics] could not fetch from Google Scholar: {e}")
        print("[metrics] Scholar throttles bots; retry, run from a residential IP, "
              "or set a proxy. Leaving cv.yml unchanged.")
        return 0  # exit 0 so scheduled CI does not spam failures
    print(f"[metrics] citations={m['citations']}  h_index={m['h_index']}  i10_index={m['i10_index']}")
    if args.check:
        return 0
    today = datetime.date.today()
    date_str = f"{today.day} {today.strftime('%b %Y')}"
    changed = update_cv(m, date_str)
    print(f"[metrics] cv.yml {'updated' if changed else 'already up to date'} ({date_str}).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
