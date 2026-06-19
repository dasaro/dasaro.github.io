#!/usr/bin/env python3
"""
build_cv.py — generate a professional CV PDF from cv.yml + papers.bib
              using a swappable LaTeX theme (Jinja2 template).

Usage:
    python build_cv.py                         # defaults
    python build_cv.py --theme themes/classic.tex.j2 --out cv.pdf
    python build_cv.py --selected              # only the 'selected' publications
    python build_cv.py --accent 333333 --keep-tex

Dependencies:  pyyaml, jinja2, bibtexparser  (see requirements.txt)
Compiler:      latexmk + pdflatex  (or pass --engine xelatex)
"""
import argparse
import datetime
import os
import re
import shutil
import subprocess
import sys
import tempfile

import yaml
import jinja2
import bibtexparser

# --------------------------------------------------------------------------
# LaTeX escaping
# --------------------------------------------------------------------------
_SPECIALS = {
    "\\": r"\textbackslash{}", "&": r"\&", "%": r"\%", "$": r"\$",
    "#": r"\#", "_": r"\_", "{": r"\{", "}": r"\}",
    "~": r"\textasciitilde{}", "^": r"\textasciicircum{}",
}
# Unicode -> LaTeX, applied AFTER escaping (so introduced backslashes survive).
_UNICODE = {
    "\u2013": "--", "\u2014": "---", "\u2019": "'", "\u2018": "'",
    "\u201c": "``", "\u201d": "''", "\u2026": r"\ldots{}",
    "\u00b7": r"\textperiodcentered{}", "\u00d7": r"$\times$",
    "\u2248": r"$\approx$", "\u00a0": "~",
}

def tex_escape(value):
    if value is None:
        return ""
    s = str(value)
    s = "".join(_SPECIALS.get(ch, ch) for ch in s)   # escape specials first
    for u, r in _UNICODE.items():                     # then unicode -> LaTeX
        s = s.replace(u, r)
    return s

# --------------------------------------------------------------------------
# Author + publication formatting
# --------------------------------------------------------------------------
HIGHLIGHT_SURNAME = "D'Asaro"

def format_name(name):
    """'Surname, Given Middle' or 'Given Surname' -> 'G. M. Surname'."""
    name = name.strip()
    if "," in name:
        last, firsts = [p.strip() for p in name.split(",", 1)]
    else:
        toks = name.split()
        last, firsts = toks[-1], " ".join(toks[:-1])
    initials = " ".join(f"{p[0]}." for p in firsts.split() if p)
    disp = (f"{initials} {last}").strip()
    esc = tex_escape(disp)
    if last == HIGHLIGHT_SURNAME:
        esc = r"\textbf{" + esc + "}"
    return esc

def format_authors(field):
    names = [n for n in re.split(r"\s+and\s+", field.strip()) if n]
    parts = [format_name(n) for n in names]
    if len(parts) > 1:
        return ", ".join(parts[:-1]) + " and " + parts[-1]
    return parts[0] if parts else ""

def venue(entry):
    t = entry.get("ENTRYTYPE", "")
    if t == "article":
        v = tex_escape(entry.get("journal", ""))
        vol, num = entry.get("volume"), entry.get("number")
        if vol:
            v += f" {tex_escape(vol)}"
        if num:
            v += f"({tex_escape(num)})"
        return v
    if t in ("inproceedings", "incollection"):
        v = tex_escape(entry.get("booktitle", ""))
        if entry.get("publisher"):
            v += ", " + tex_escape(entry["publisher"])
        return v
    if t == "book":
        return tex_escape(entry.get("publisher", ""))
    if t == "unpublished":
        return ""
    return tex_escape(entry.get("howpublished", entry.get("journal", "")))

def format_entry(entry):
    authors = format_authors(entry.get("author", ""))
    # BibTeX uses {braces} to protect capitalisation; strip them before escaping.
    title = tex_escape(entry.get("title", "").replace("{", "").replace("}", "").strip())
    parts = [f"{authors}. \\textit{{{title}}}."]
    v = venue(entry)
    if v:
        parts.append(v + ".")
    if entry.get("doi"):
        doi = entry["doi"].strip()
        disp = tex_escape(doi).replace("/", "/\\allowbreak ").replace(".", ".\\allowbreak ")
        parts.append(f"\\href{{https://doi.org/{doi}}}{{doi:{disp}}}")
    if entry.get("note"):
        parts.append(f"({tex_escape(entry['note'])})")
    return " ".join(parts)

def load_publications(bib_path, selected_only):
    with open(bib_path, encoding="utf-8") as f:
        db = bibtexparser.load(f)
    entries = db.entries
    if selected_only:
        entries = [e for e in entries if str(e.get("selected", "")).lower() == "true"]
    groups = {}
    order = []
    for e in entries:
        year = e.get("year", "n.d.")
        if year not in groups:
            groups[year] = []
            order.append(year)
        groups[year].append(format_entry(e))
    years = sorted(order, key=lambda y: (y.isdigit(), y), reverse=True)
    return [{"year": y, "items": groups[y]} for y in years]

# --------------------------------------------------------------------------
# Rendering + compilation
# --------------------------------------------------------------------------
def make_env(theme_dir):
    env = jinja2.Environment(
        block_start_string="\\BLOCK{", block_end_string="}",
        variable_start_string="\\VAR{", variable_end_string="}",
        comment_start_string="\\#{", comment_end_string="}",
        line_statement_prefix="%%", line_comment_prefix="%#",
        trim_blocks=True, lstrip_blocks=True, autoescape=False,
        loader=jinja2.FileSystemLoader(theme_dir),
    )
    env.filters["tex"] = tex_escape
    return env

def compile_pdf(tex_path, out_pdf, engine):
    workdir = os.path.dirname(tex_path)
    base = os.path.splitext(os.path.basename(tex_path))[0]
    cmd = ["latexmk", f"-{ 'xelatex' if engine=='xelatex' else 'pdf'}",
           "-interaction=nonstopmode", "-halt-on-error", f"-output-directory={workdir}",
           tex_path]
    if shutil.which("latexmk") is None:
        cmd = [engine, "-interaction=nonstopmode", "-halt-on-error",
               f"-output-directory={workdir}", tex_path]
        runs = [cmd, cmd]
    else:
        runs = [cmd]
    for c in runs:
        proc = subprocess.run(c, capture_output=True, text=True)
    produced = os.path.join(workdir, base + ".pdf")
    if not os.path.exists(produced):
        log = os.path.join(workdir, base + ".log")
        tail = ""
        if os.path.exists(log):
            with open(log, encoding="utf-8", errors="replace") as f:
                tail = "".join(f.readlines()[-40:])
        sys.exit(f"[build_cv] Compilation failed.\n--- log tail ---\n{tail}")
    shutil.move(produced, out_pdf)

def main():
    here = os.path.dirname(os.path.abspath(__file__))
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", default=os.path.join(here, "..", "cv.yml"))
    ap.add_argument("--bib", default=os.path.join(here, "..", "_bibliography", "papers.bib"))
    ap.add_argument("--theme", default=os.path.join(here, "themes", "margin.tex.j2"))
    ap.add_argument("--out", default=os.path.join(here, "..", "assets", "pdf", "cv.pdf"))
    ap.add_argument("--accent", default="333333", help="hex colour (no #)")
    ap.add_argument("--engine", default="pdflatex", choices=["pdflatex", "xelatex"])
    ap.add_argument("--selected", action="store_true",
                    help="render only publications with selected=true")
    ap.add_argument("--keep-tex", action="store_true")
    args = ap.parse_args()

    with open(args.data, encoding="utf-8") as f:
        cv = yaml.safe_load(f)

    # Reproducible output: derive the PDF's embedded timestamp from the CV's
    # `metrics` date — i.e. from CONTENT, not the wall clock or file mtimes — so the
    # same inputs always yield a byte-identical PDF on any machine. This is what lets
    # the CV drift-check compare the CI rebuild against the committed PDF, and keeps
    # the monthly metrics rebuild from churning. Falls back to a fixed date.
    _m = re.search(r"\d{1,2}\s+[A-Za-z]{3,}\s+\d{4}", str((cv.get("metrics") or {}).get("source", "")))
    try:
        _epoch = int(datetime.datetime.strptime(_m.group(0), "%d %b %Y")
                     .replace(tzinfo=datetime.timezone.utc).timestamp()) if _m else 1735689600
    except ValueError:
        _epoch = 1735689600  # 2025-01-01 UTC
    os.environ["SOURCE_DATE_EPOCH"] = str(_epoch)
    os.environ["FORCE_SOURCE_DATE"] = "1"

    pubcfg = cv.get("publications", {})
    selected_only = args.selected or bool(pubcfg.get("selected"))
    publications = load_publications(args.bib, selected_only)

    env = make_env(os.path.dirname(args.theme))
    template = env.get_template(os.path.basename(args.theme))
    tex = template.render(
        basics=cv["basics"], data=cv, metrics=cv.get("metrics"),
        publications=publications, section_order=cv["section_order"],
        accent=args.accent,
    )

    tmp = tempfile.mkdtemp(prefix="cv_")
    tex_path = os.path.join(tmp, "cv.tex")
    with open(tex_path, "w", encoding="utf-8") as f:
        f.write(tex)
    if args.keep_tex:
        shutil.copy(tex_path, os.path.splitext(args.out)[0] + ".tex")

    compile_pdf(tex_path, args.out, args.engine)
    shutil.rmtree(tmp, ignore_errors=True)
    n = sum(len(g["items"]) for g in publications)
    print(f"[build_cv] OK -> {args.out}  ({n} publications, "
          f"{'selected' if selected_only else 'full'} list)")

if __name__ == "__main__":
    main()
