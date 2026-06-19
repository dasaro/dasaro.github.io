#!/usr/bin/env python3
"""
cv_to_alfolio.py — regenerate al-folio data from the master cv.yml.

cv.yml (root) stays the single source of truth: it also feeds the LaTeX PDF
(cv/build_cv.py) and, via papers.bib, the publications page. This script emits:

  _data/cv.yml      — rich, flat structure consumed by the custom /cv/ page
                      (_pages/cv.md): period, url, notes, per-location map
                      coordinates, and Education logo/badge.
  _data/scholar.yml — aggregate Google Scholar metrics (also used by /about/).

    python tools/cv_to_alfolio.py
"""
import os, yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# City-centre coordinates for the small OpenStreetMap embed under each location.
CITY_COORDS = {
    "Verona, Italy": [45.4384, 10.9916],
    "London, UK": [51.5246, -0.1340],   # Bloomsbury / UCL
    "Lecce, Italy": [40.3515, 18.1750],
    "Milan, Italy": [45.4642, 9.1900],
    "Naples, Italy": [40.8518, 14.2681],
    "Palermo, Italy": [38.1157, 13.3615],
    "Manchester, UK": [53.4668, -2.2339],
}


def coords(loc):
    c = CITY_COORDS.get((loc or "").strip())
    return {"lat": c[0], "lon": c[1]} if c else None


def text(v):
    return (v or "").strip()


def main():
    cv = yaml.safe_load(open(os.path.join(ROOT, "cv.yml"), encoding="utf-8"))
    b = cv["basics"]

    experience = [{
        "role": text(e.get("role")),
        "org": text(e.get("org")),
        "location": text(e.get("location")),
        "period": text(e.get("period")),
        "url": text(e.get("url")),
        "notes": text(e.get("notes")),
        "coords": coords(e.get("location")),
    } for e in cv.get("experience", [])]

    education = [{
        "degree": text(e.get("degree")),
        "org": text(e.get("org")),
        "location": text(e.get("location")),
        "period": text(e.get("period")),
        "url": text(e.get("url")),
        "logo": text(e.get("logo")),     # /assets/img/logos/<x>.png — optional
        "badge": text(e.get("badge")),   # short monogram shown when no logo
        "notes": text(e.get("notes")),
        "coords": coords(e.get("location")),
    } for e in cv.get("education", [])]

    projects = [{
        "name": text(p.get("name")),
        "period": text(p.get("period")),
        "url": text(p.get("url")),
        "notes": text(p.get("notes")),
    } for p in cv.get("projects", [])]

    out = {"cv": {
        "name": b["name"],
        "label": text(b.get("headline")),
        "email": text(b.get("email")),
        "location": "Verona, Italy",
        "summary": text(b.get("summary")),
        "pdf": "/assets/pdf/cv.pdf",
        "website": text(b.get("website")),
        "scholar": text(b.get("scholar")),
        "github": text(b.get("github")),
        "experience": experience,
        "education": education,
        "projects": projects,
        "skills": cv.get("skills", []),         # list of {label, value}
        "languages": cv.get("languages", []),   # list of strings
        "interests": cv.get("interests", []),   # list of strings
    }}

    dst = os.path.join(ROOT, "_data", "cv.yml")
    with open(dst, "w", encoding="utf-8") as f:
        f.write("# Generated from ../cv.yml by tools/cv_to_alfolio.py — do not edit by hand.\n")
        yaml.safe_dump(out, f, allow_unicode=True, sort_keys=False, default_flow_style=False)
    print(f"[cv_to_alfolio] wrote {dst}")

    # Aggregate Google Scholar metrics -> site.data.scholar (pages read this).
    m = cv.get("metrics") or {}
    if m:
        src = str(m.get("source", ""))
        updated = src.split(",", 1)[1].strip() if "," in src else src
        scholar = {
            "citations": m.get("citations"),
            "h_index": m.get("h_index"),
            "i10_index": m.get("i10_index"),
            "updated": updated,
        }
        sdst = os.path.join(ROOT, "_data", "scholar.yml")
        with open(sdst, "w", encoding="utf-8") as f:
            f.write("# Generated from cv.yml metrics by tools/cv_to_alfolio.py — do not edit by hand.\n")
            yaml.safe_dump(scholar, f, allow_unicode=True, sort_keys=False)
        print(f"[cv_to_alfolio] wrote {sdst}")


if __name__ == "__main__":
    main()
