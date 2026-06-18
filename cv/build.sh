#!/usr/bin/env bash
#
# cv/build.sh — regenerate everything that depends on the single source of truth
# (cv.yml + _bibliography/papers.bib) in one command:
#
#   • assets/pdf/cv.pdf  via cv/build_cv.py        (LaTeX — needs pdflatex on PATH)
#   • _data/cv.yml       via tools/cv_to_alfolio.py (al-folio CV page data)
#
# Works from any directory. On first run it creates the Python venv (cv/.venv).
#
# Usage:
#   cv/build.sh                  # rebuild both (classic theme)
#   cv/build.sh --selected       # PDF with only selected={true} publications
#   cv/build.sh --accent 333333  # any build_cv.py flag passes through
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
VENV="$SCRIPT_DIR/.venv"
PY="$VENV/bin/python"

# Bootstrap the venv on first run (or if it was deleted).
if [[ ! -x "$PY" ]]; then
  echo "[build.sh] creating Python venv at cv/.venv ..."
  python3 -m venv "$VENV"
  "$VENV/bin/pip" --quiet install --upgrade pip
  "$VENV/bin/pip" --quiet install pyyaml jinja2 bibtexparser
fi

if ! command -v pdflatex >/dev/null 2>&1; then
  echo "[build.sh] WARNING: pdflatex not on PATH — the PDF step will fail." >&2
  echo "           Install BasicTeX/MacTeX, then: tlmgr --usermode install titlesec" >&2
fi

echo "[build.sh] → CV PDF       (assets/pdf/cv.pdf)"
"$PY" "$SCRIPT_DIR/build_cv.py" "$@"

echo "[build.sh] → CV page data (_data/cv.yml)"
"$PY" "$ROOT/tools/cv_to_alfolio.py"

echo "[build.sh] done — assets/pdf/cv.pdf + _data/cv.yml regenerated."
