#!/usr/bin/env python3
"""
gen_pub_covers.py — give every publication a thumbnail.

For each entry in _bibliography/papers.bib that has no `preview`, this:
  * uses a real journal cover when one is available (see REAL_COVERS), else
  * generates a clean, on-brand "cover card" SVG (venue + year + type)
and inserts a `preview = {...}` field into that entry (formatting preserved).

Re-running only touches entries that still lack a preview, so it is safe to
run again whenever new references are added.  Idempotent + deterministic.

    python tools/gen_pub_covers.py
"""
import os, re, html
import bibtexparser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BIB = os.path.join(ROOT, "_bibliography", "papers.bib")
PREV = os.path.join(ROOT, "assets", "img", "publication_preview")
TEAL = "#b509ac"  # al-folio default theme colour (kept the var name for brevity)

# Entry key -> already-downloaded real cover file (publisher CDN).
REAL_COVERS = {
    "raggioli2023deep": "cover-ijsr.png",                 # Int. J. of Social Robotics (Springer)
    "dasaro2017computational": "cover-informatik-spektrum.png",  # Informatik-Spektrum (Springer)
    "fanghella2026rational": "fanghella2026rational.png", # Cognition (cover provided by the author)
    "fanghella2026early": "fanghella2026early.png",       # Quarterly J. of Experimental Psychology
    "badino2024educare": "badino2024educare.png",         # Educare all'IA (Sanoma)
}

TYPE_LABEL = {
    "article": "Journal article", "inproceedings": "Conference paper",
    "incollection": "Book chapter", "inbook": "Book chapter", "book": "Book",
    "phdthesis": "PhD thesis", "mastersthesis": "Thesis",
    "unpublished": "Preprint", "misc": "Preprint", "techreport": "Report",
}


def slug(s):
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", s.lower())).strip("-")[:40]


def venue_of(e):
    """Return (display_venue, slug_seed) for an entry, or ('', key) for preprints."""
    v = e.get("journal") or e.get("booktitle") or e.get("publisher") or ""
    v = re.sub(r"\s+", " ", v).strip()
    v = re.sub(r"^Proceedings of (the )?", "", v)      # 'Proceedings of KR 2021' -> 'KR 2021'
    v = re.sub(r"^\d+(st|nd|rd|th)\s+", "", v)
    return v, (slug(v) if v else "")


def wrap(text, maxchars):
    words, lines, cur = text.split(), [], ""
    for w in words:
        if len(cur) + len(w) + 1 <= maxchars or not cur:
            cur = (cur + " " + w).strip()
        else:
            lines.append(cur); cur = w
    if cur:
        lines.append(cur)
    return lines[:5]


def card_svg(label, venue, year):
    """A minimalist portrait 'cover' (300x424, ~A-series ratio)."""
    venue = venue or "Working paper"
    lines = wrap(venue, 15)
    # vertically centre the venue block around y=210
    n = len(lines)
    y0 = 210 - (n - 1) * 17
    body = "".join(
        f'<text x="150" y="{y0 + i*34:.0f}" text-anchor="middle" '
        f'font-family="Georgia, \'Times New Roman\', serif" font-size="25" '
        f'fill="#16323b">{html.escape(ln)}</text>'
        for i, ln in enumerate(lines)
    )
    yr = f'<text x="150" y="360" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="34" fill="{TEAL}">{html.escape(year)}</text>' if year else ""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 424" role="img" aria-label="{html.escape(venue)}">
  <rect x="1.5" y="1.5" width="297" height="421" rx="6" fill="#ffffff" stroke="{TEAL}" stroke-width="1.5"/>
  <rect x="1.5" y="1.5" width="297" height="64" rx="6" fill="{TEAL}"/>
  <rect x="1.5" y="40" width="297" height="25" fill="{TEAL}"/>
  <text x="150" y="41" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="15" letter-spacing="1.5" fill="#ffffff">{html.escape(label.upper())}</text>
  {body}
  {yr}
  <circle cx="150" cy="392" r="13" fill="#8cb9c4"/>
  <text x="150" y="393" text-anchor="middle" font-family="Georgia, serif" font-size="17" fill="#161616" dominant-baseline="central">&#966;</text>
</svg>
'''


def main():
    db = bibtexparser.load(open(BIB, encoding="utf-8"))
    raw = open(BIB, encoding="utf-8").read()
    os.makedirs(PREV, exist_ok=True)

    added, cards = 0, set()
    for e in db.entries:
        if e.get("preview", "").strip():
            continue
        key = e["ID"]
        if key in REAL_COVERS:
            cover = REAL_COVERS[key]
        else:
            venue, seed = venue_of(e)
            label = TYPE_LABEL.get(e.get("ENTRYTYPE", ""), "Paper")
            seed = seed or slug(key)
            cover = f"cover-{seed}.svg"
            path = os.path.join(PREV, cover)
            with open(path, "w", encoding="utf-8") as f:
                f.write(card_svg(label, venue, e.get("year", "").strip()))
            cards.add(cover)
        # insert `preview = {cover},` right after the `@type{key,` opening line
        pat = re.compile(r"(@\w+\{" + re.escape(key) + r",[ \t]*\n)")
        new, k = pat.subn(r"\1  preview   = {" + cover + r"},\n", raw, count=1)
        if k:
            raw = new
            added += 1
        else:
            print(f"  ! could not locate entry {key} in raw bib")

    open(BIB, "w", encoding="utf-8").write(raw)
    print(f"[gen_pub_covers] previews added: {added}  | cover-cards generated: {len(cards)}")


if __name__ == "__main__":
    main()
