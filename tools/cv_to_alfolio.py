#!/usr/bin/env python3
"""
cv_to_alfolio.py — regenerate al-folio's _data/cv.yml from the master cv.yml.

Keeps cv.yml (root) as the single source of truth: it also feeds the LaTeX PDF
(cv/build_cv.py) and, via papers.bib, the publications page.

    python tools/cv_to_alfolio.py
"""
import os, re, yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def years(period):
    """'2022 – 2025' / '2025 – present' / 'Jun – Sep 2011' -> (start, end)."""
    nums = re.findall(r"\b(19|20)\d{2}\b", period)
    nums = re.findall(r"\b((?:19|20)\d{2})\b", period)
    start = nums[0] if nums else ""
    if re.search(r"present|current|ongoing", period, re.I):
        end = "present"
    else:
        end = nums[-1] if nums else ""
    return start, end

def main():
    cv = yaml.safe_load(open(os.path.join(ROOT, "cv.yml"), encoding="utf-8"))
    b = cv["basics"]

    education = []
    for e in cv.get("education", []):
        s, en = years(e.get("period", ""))
        education.append({
            "institution": e.get("org", ""),
            "area": e.get("degree", ""),
            "studyType": e.get("degree", ""),
            "start_date": s, "end_date": en,
            "highlights": [e["notes"]] if e.get("notes") else [],
        })

    experience = []
    for e in cv.get("experience", []):
        s, en = years(e.get("period", ""))
        experience.append({
            "company": e.get("org", ""),
            "position": e.get("role", ""),
            "location": e.get("location", ""),
            "start_date": s, "end_date": en,
            "summary": e.get("notes", ""),
        })

    projects = []
    for p in cv.get("projects", []):
        s, en = years(p.get("period", ""))
        projects.append({
            "name": p.get("name", ""),
            "summary": p.get("notes", ""),
            "start_date": s, "end_date": en,
        })

    languages = []
    for l in cv.get("languages", []):
        parts = re.split(r"\s+[—-]\s+", l, maxsplit=1)
        languages.append({"name": parts[0].strip(),
                           "summary": (parts[1].strip() if len(parts) > 1 else "")})

    skills = [{"name": s["label"], "keywords": s["value"]} for s in cv.get("skills", [])]
    interests = ([{"name": "Interests", "keywords": ", ".join(cv["interests"])}]
                 if cv.get("interests") else [])

    out = {"cv": {
        "name": b["name"],
        "label": b.get("headline", ""),
        "email": b.get("email", ""),
        "location": "Verona, Italy",
        "image": "",
        "summary": b.get("summary", "").strip(),
        "social_networks": [{"network": "GitHub", "username": "dasaro"}],
        "sections": {
            "Education": education,
            "Experience": experience,
            "Projects": projects,
            "Languages": languages,
            "Skills": skills,
            "Interests": interests,
        },
    }}

    dst = os.path.join(ROOT, "_data", "cv.yml")
    with open(dst, "w", encoding="utf-8") as f:
        f.write("# Generated from ../cv.yml by tools/cv_to_alfolio.py — do not edit by hand.\n")
        yaml.safe_dump(out, f, allow_unicode=True, sort_keys=False, default_flow_style=False)
    print(f"[cv_to_alfolio] wrote {dst}")

    # Expose the aggregate Google Scholar metrics to the al-folio pages
    # (Jekyll reads _data/*.yml as site.data.*).
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
