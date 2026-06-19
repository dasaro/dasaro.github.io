#!/usr/bin/env python3
"""
gen_bibtex_data.py — emit _data/bibtex.yml: a {citation-key -> clean BibTeX text}
map consumed by the "BibTeX" button on the publications page (_pages/publications.md).

Internal al-folio fields (preview, selected, abbr, …) are stripped so the copied
entry is a clean, standard .bib record. Re-run when papers.bib changes.

    python tools/gen_bibtex_data.py
"""
import os, yaml, bibtexparser
from bibtexparser.bwriter import BibTexWriter
from bibtexparser.bibdatabase import BibDatabase

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BIB = os.path.join(ROOT, "_bibliography", "papers.bib")

# Mirror _config.yml `filtered_bibtex_keywords` (al-folio internal fields).
FILTER = {
    "abbr", "abstract", "additional_info", "altmetric", "annotation", "arxiv",
    "award", "award_name", "bibtex_show", "blog", "code", "dimensions", "eprint",
    "google_scholar_id", "hal", "html", "inspirehep_id", "pdf", "pmid", "poster",
    "preview", "selected", "slides", "supp", "video", "website",
}
ORDER = ["author", "title", "journal", "booktitle", "editor", "year", "volume",
         "number", "pages", "publisher", "address", "doi", "url", "note",
         "isbn", "issn", "month"]


def main():
    db = bibtexparser.load(open(BIB, encoding="utf-8"))
    w = BibTexWriter()
    w.indent = "  "
    w.display_order = ORDER
    w.add_trailing_comma = True

    out = {}
    for e in db.entries:
        clean = {k: v for k, v in e.items()
                 if k in ("ID", "ENTRYTYPE") or k.lower() not in FILTER}
        single = BibDatabase()
        single.entries = [clean]
        out[e["ID"]] = w.write(single).strip()

    dst = os.path.join(ROOT, "_data", "bibtex.yml")
    with open(dst, "w", encoding="utf-8") as f:
        f.write("# Generated from ../_bibliography/papers.bib by tools/gen_bibtex_data.py — do not edit.\n")
        yaml.safe_dump(out, f, allow_unicode=True, sort_keys=True, default_flow_style=False, width=10000)
    print(f"[gen_bibtex_data] wrote {dst}  ({len(out)} entries)")


if __name__ == "__main__":
    main()
