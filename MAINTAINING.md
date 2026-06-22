# Maintaining this site (no Claude needed)

**The loop:** edit a source file → `./cv/build.sh` → `git commit` → `git push`.
GitHub Actions rebuilds and publishes everything (site **and** CV PDF) in ~2 minutes.

If the pre-commit hook is enabled (it is — `git config core.hooksPath .githooks`),
you can even skip `./cv/build.sh`: committing a source file rebuilds for you.

---

## Where each thing lives (edit *these*)

| Edit this file | Changes |
| --- | --- |
| **`cv.yml`** (repo root) | the CV PDF **and** the `/cv/` page **and** the Scholar-metrics line — i.e. `basics`, `experience`, `education`, `teaching`, `projects`, `skills`, `languages`, `metrics` |
| **`_bibliography/papers.bib`** | publications — shown on `/publications/`, in the CV PDF, in the **BibTeX** buttons, and as thumbnails |
| `_data/projects.yml` | the `/projects/` cards |
| `_data/films.yml` | the `/films/` grid |
| `_data/repositories.yml` | the `/repositories/` page (your GitHub repos) |
| `_pages/<name>.md` | that page's prose (about, teaching, theses, …) |
| `_config.yml` | site-wide bits (footer text, nav, etc.) |

`cv.yml` and `papers.bib` are the **single sources of truth**: everything in the CV is
*derived* from them — never edit the generated files (`_data/cv.yml`, `_data/scholar.yml`,
`_data/bibtex.yml`, `assets/pdf/cv.pdf`, `assets/img/publication_preview/cover-*.svg`) by hand.

---

## Editing comfortably (VS Code)

Open the folder in **VS Code** and accept the prompt to install the recommended
**YAML (Red Hat)** extension (configured in `.vscode/`). JSON schemas in `.vscode/schemas/`
are wired to `cv.yml`, `_data/projects.yml` and `_data/films.yml`, so as you type you get:

- field **autocomplete** and hover descriptions,
- **red underlines** on the classic YAML mistakes — wrong indentation, a number where a
  string belongs, a misspelled/unknown field,
- consistent 2-space indentation.

It's about as close to a "visual" editor as YAML gets, with nothing to run.
(The generated `_data/cv.yml` is intentionally left unchecked — only the hand-edited
`cv.yml` carries the schema, via the `# yaml-language-server:` comment on its first line.)

---

## The one command

After editing `cv.yml` and/or `papers.bib`, regenerate the derived files:

```bash
./cv/build.sh
```

It rebuilds, from those two files: the **CV PDF**, the **CV-page data** (`_data/cv.yml`),
the **metrics** (`_data/scholar.yml`), the **publication thumbnails**, and the **BibTeX data**
(`_data/bibtex.yml`). It is deterministic (same input → byte-identical output) and idempotent
(safe to re-run). Then:

```bash
git add -A
git commit -m "describe the change"
git push
```

Editing only a `_data/*.yml` page (projects/films/repositories) or a `_pages/*.md`?
No build step needed — just `commit` + `push`.

> ⚠️ Edit `cv.yml`/`papers.bib` **locally**, not via the GitHub web editor: the PDF and data
> won't regenerate online, the published PDF would go stale, and the `cv-check` CI job would
> turn red. The hook/`build.sh` exist precisely so the artifacts can never drift.

---

## What's automated for you

- **Pre-commit hook** (`.githooks/pre-commit`) — committing `cv.yml`/`papers.bib`/a generator
  runs `./cv/build.sh` and stages the regenerated files automatically.
- **`cv-check.yml`** — CI fails a push if the committed CV artifacts don't match the sources
  (a safety net against a stale PDF).
- **`update-metrics.yml`** — a monthly cron refreshes citations / h-index / i10 from Google
  Scholar and redeploys. Needs the `SCRAPERAPI_KEY` repository secret; it's a clean no-op when
  the numbers haven't moved. You can also run it on demand from the **Actions** tab → *Run workflow*.

---

## Recipes

- **Add a paper** — paste the BibTeX into `_bibliography/papers.bib`. Add `preview = {myfile.png}`
  (file in `assets/img/publication_preview/`) for a real thumbnail; otherwise a neutral cover-card
  is generated. Then `./cv/build.sh` → commit → push.
- **New job / changed date / new course** — edit the relevant block in `cv.yml`
  (`experience:` / `teaching:` …) → `./cv/build.sh` → commit → push.
- **Add a project / film / repo** — add an entry to the matching `_data/*.yml` → commit → push.
- **Reword a page** — edit `_pages/<page>.md` → commit → push.
- **A university badge** — drop a logo in `assets/img/logos/` and point the entry's `logo:`
  field (in `cv.yml`) at it.

---

## Prerequisites for `./cv/build.sh`

- **`pdflatex`** on your PATH (BasicTeX/MacTeX). First-time LaTeX packages, once:
  `tlmgr --usermode install titlesec lmodern enumitem`.
- The script auto-creates its Python venv (`cv/.venv`) on first run — nothing else to install.
