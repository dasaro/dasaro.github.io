# Quick Start Guide: Working on `dasaro.github.io` with Codex

## Start Here

1. Read `AGENTS.md`.
2. Serve the site locally:
   ```bash
   cd /Users/fdasaro/Desktop/dasaro.github.io
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000`.
4. Keep the browser console open while testing.

Do not open pages directly with `file://` URLs. The site uses `fetch()` for JSON content, so direct file access gives misleading failures.

## Repo Shape

- Root HTML pages hold page markup and most page-specific scripts.
- Shared behavior lives in:
  - `js/navigation.js`
  - `js/main.js`
  - `js/publications.js`
  - `js/logical-symbols.js`
  - `js/animations/`
- Structured content lives in `data/*.json`.
- Reusable styling lives in:
  - `css/main.css`
  - `css/animations.css`
  - `css/responsive.css`

## Common Tasks

### Update academic content

- Edit the relevant JSON file in `data/`.
- Validate it:
  ```bash
  for f in data/*.json; do jq empty "$f"; done
  ```

Typical mappings:

- `data/personal.json`: homepage identity, footer/profile links, scholar metrics
- `data/publications.json`: homepage highlights and publications page
- `data/education.json` + `data/experience.json`: about page
- `data/teaching.json` + `data/supervision.json`: teaching page
- `data/projects.json`: projects page
- `data/service.json` + `data/affiliations.json` + `data/talks.json`: service page

### Change layout or behavior

- Edit the relevant root HTML page for page-specific markup.
- Edit `js/main.js` for shared site behavior.
- Edit `js/publications.js` only for publications filtering/export behavior.
- Edit `js/animations/` only for background canvas animations.

### Change data shapes or reusable components

- Update `data/SCHEMAS.md` when JSON structure changes.
- Update `css/COMPONENTS.md` when reusable CSS patterns change.
- Update `AGENTS.md` when workflow or architecture expectations change.

## Useful Codex Prompts

- `Read AGENTS.md and fix broken internal links or missing shared hooks.`
- `Read AGENTS.md and update the publications page to support <new filter>.`
- `Read AGENTS.md and migrate repeated footer logic into js/main.js.`
- `Read AGENTS.md and audit the data-heavy pages for stale hardcoded content.`

## Verification Checklist

- Test the changed pages in the browser.
- Check the console for fetch errors or missing asset errors.
- If shared JS changed, smoke-test:
  - `index.html`
  - `publications.html`
  - one additional data-heavy page such as `about.html` or `teaching.html`
- If shared assets use `?v=...`, bump the query string in the HTML pages that reference the changed file.

## Deployment

```bash
git add .
git commit -m "Describe the change"
git push origin main
```

GitHub Pages serves the site from the repository root on `main`.
