# AGENTS.md

## Overview

- This repository is a static academic website for Fabio Aurelio D'Asaro.
- The stack is plain HTML, CSS, and vanilla JavaScript. There is no build step, bundler, or package manager.
- Most content is JSON-driven from the `data/` directory and rendered client-side after page load.
- The site is intended for GitHub Pages or any simple static host.

## Local Workflow

- Serve the repo over HTTP before testing:
  - `python3 -m http.server 8000`
- Open `http://localhost:8000`.
- Do not test with `file://` URLs. `fetch()`-based JSON loading and clipboard features will fail there.

## Architecture

### Page structure

- Root HTML pages:
  - `index.html`
  - `about.html`
  - `publications.html`
  - `teaching.html`
  - `projects.html`
  - `service.html`
  - `backgrounds.html`
  - `contact.html`
  - `dissertation-info.html`
  - `404.html`

- Each page owns its markup and usually a page-local inline script near the bottom.
- Navigation markup is injected by `js/navigation.js`.
- Shared footer helpers, JSON loading, and generic utilities live in `js/main.js`.

### JavaScript

- `js/main.js`
  - Global `loadJSON()` helper with in-memory request caching.
  - Smooth scrolling, scroll observers, footer/contact link population, shared scholar metrics rendering.
- `js/navigation.js`
  - Injects the shared navigation bar and handles active-page/mobile behavior.
- `js/publications.js`
  - Publications page filtering, modal BibTeX export, count updates.
- `js/logical-symbols.js`
  - Fills `.logical-symbols` placeholders with randomized logic symbols.
- `js/animations/AnimationController.js` plus classes in `js/animations/`
  - Background canvas animation system used across pages.

### Styling

- `css/main.css` contains the design system and most component styles.
- `css/animations.css` contains animation-specific styling.
- `css/responsive.css` contains responsive overrides.
- `css/COMPONENTS.md` documents reusable CSS components.

### Data

- `data/personal.json`
  - Global bio, affiliations, contact links, scholar metrics.
- `data/publications.json`
  - Used by homepage highlights and the publications page.
- `data/education.json`, `data/experience.json`
  - Used by `about.html`.
- `data/teaching.json`, `data/supervision.json`
  - Used by `teaching.html`.
- `data/projects.json`
  - Used by `projects.html`.
- `data/service.json`, `data/affiliations.json`, `data/talks.json`
  - Used by `service.html`.
- `data/dissertation_instructions.json`
  - Used by `dissertation-info.html`.
- `data/SCHEMAS.md`
  - Source of truth for JSON shapes.

## Editing Conventions

- Preserve the no-build static setup unless the user explicitly asks for tooling changes.
- Prefer updating JSON content instead of hardcoding academic content into HTML.
- Reuse shared hooks before adding new page-specific utilities.
- Contact/profile links should use `data-contact-link` when possible so `js/main.js` can normalize usernames and IDs into full URLs.
- If you change shared JS loaded via `?v=...`, bump the query string in the HTML pages that reference it.

## Documentation Rules

- If you change a JSON structure, update `data/SCHEMAS.md`.
- If you add or materially change reusable CSS components, update `css/COMPONENTS.md`.
- If you change repo workflow, architecture, or maintenance expectations, update this `AGENTS.md` in the same change.

## Verification

- Validate JSON after data edits:
  - `for f in data/*.json; do jq empty "$f"; done`
- Sanity-check internal file references when editing HTML:
  - `rg -n 'src=|href=' *.html`
- Spot-check at least the affected pages in a browser with the devtools console open.
- When shared code changes, smoke-test:
  - `index.html`
  - `publications.html`
  - one data-heavy secondary page such as `about.html` or `teaching.html`

## Known Pitfalls

- Several pages render trusted JSON with `innerHTML`; if content ever becomes user-generated or externally sourced, sanitize it first.
- Image assets under `images/profile/` and most of `images/favicon/` are manually managed. Verify the files exist before referencing new ones.
- Publications defaults to the `selected` subset until filters are changed.
