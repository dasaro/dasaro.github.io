# Website Architecture & Standards

**Fabio Aurelio D'Asaro's Academic Website**
**Static, Data-Driven, JSON-Powered Architecture**

---

## ⚠️ META-RULE: Keep This Document Updated

**CRITICAL:** Update this file whenever you make architectural changes, component additions, or establish new patterns. Update in the **same commit** as the change.

---

## Website Status: Production-Ready ✅

**10/10 Pages Complete** | **13 JSON Data Files** | **10 Background Animations** | **Maintenance Mode**

### Core Pages
- **index.html** - Hero, research interests, recent publications (`personal.json`, `publications.json`)
- **about.html** - Bio, education, experience, skills (`personal.json`, `education.json`, `experience.json`, `skills.json`)
- **publications.html** - Filterable pubs, search, BibTeX export (`publications.json`)
- **teaching.html** - Courses, lectures, supervision (`teaching.json`, `supervision.json`)
- **projects.html** - Research projects (`projects.json`)
- **service.html** - Professional service (`service.json`, `talks.json`, `groups.json`)
- **contact.html** - Contact info (`personal.json`)
- **dissertation-info.html** - PhD supervision (`dissertation_instructions.json`)
- **backgrounds.html** - Mathematical animations (static + AnimationController)
- **404.html** - Custom error page

### Data Files (13 total)
`personal.json`, `publications.json`, `teaching.json`, `supervision.json`, `projects.json`, `service.json`, `education.json`, `experience.json`, `skills.json`, `talks.json`, `groups.json`, `affiliations.json`, `dissertation_instructions.json`

### Animations (12 total)
Conway's Game of Life, Fibonacci Spiral, Fibonacci Boxes, Prime Spiral (Ulam), Riemann Zeta, Mandelbrot Set, Proof Tree, Situation Calculus, Pac-Man, Rule 30, Turing Machine, Turing Pattern

---

## Architecture Principles

1. **Data-Driven** - No hardcoded content; all dynamic data from JSON
2. **Progressive Enhancement** - Core content accessible without JS
3. **Maintainability First** - Modular, consistent patterns, comprehensive error handling
4. **Performance Optimized** - Zero frameworks, GPU-accelerated CSS, lazy loading
5. **Accessibility** - Semantic HTML5, ARIA labels, WCAG 2.1 AA compliance

---

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Styling, animations, responsive design
- **JavaScript ES6+** - Interactivity, data loading
- **JSON** - Data storage
- **Fonts:** Google Fonts (Inter, Fira Code)
- **Hosting:** GitHub Pages

---

## Project Structure

```
dasaro.github.io/
├── *.html (10 pages)
├── css/
│   ├── main.css, animations.css, responsive.css
│   └── COMPONENTS.md
├── js/
│   ├── navigation.js (🆕 independent nav component)
│   ├── utils.js, main.js, publications.js
│   └── animations/ (AnimationController, AnimationBase, 12 animation classes)
├── data/ (13 JSON files + SCHEMAS.md)
├── images/ (profile, research, institutions, favicon)
└── CLAUDE.md, README.md, BUGS_FOUND.md
```

---

## Coding Standards

### HTML Standards

**ID Naming:** `{section}-{element}-{type}` (kebab-case)
**Section Structure:**
```html
<section id="section-name" class="section">
  <div class="container">
    <h2 class="section-title">Section Title</h2>
    <div id="section-name-container" class="grid grid-3">
      <p class="loading-message">Loading...</p>
    </div>
  </div>
</section>
```

**Script Loading Order (CRITICAL):**
```html
<!-- Before </body> -->
<script src="js/navigation.js?v=31"></script>  <!-- 1. Navigation FIRST -->
<script src="js/main.js?v=31"></script>        <!-- 2. Main utilities -->
<script type="module" src="js/animations/AnimationController.js?v=31"></script>
<script type="module" src="js/publications.js?v=31"></script> <!-- ONLY on publications.html -->
<script>/* Inline scripts LAST */</script>
```

**Meta Tags:**
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Permissions-Policy" content="interest-cohort=()">
```

### CSS Standards

**Use CSS Variables:**
```css
.card {
  color: var(--color-text-primary);
  padding: var(--space-lg);
  font-family: var(--font-body);
}
```

**CSS Variables:**
- Colors: `--color-white`, `--color-black`, `--color-accent-primary` (#8B0000), `--color-accent-secondary` (#B22222)
- Spacing: `--space-xs` (0.25rem) to `--space-2xl` (3rem)
- Typography: `--font-body` (Inter), `--font-mono` (Fira Code), `--text-xs` to `--text-4xl`

**BEM-like Naming:**
```css
.publication-card { }              /* Block */
.publication-card__title { }       /* Element */
.publication-card--featured { }    /* Modifier */
```

**Mobile-First Media Queries:**
```css
/* Mobile: default */
.grid { grid-template-columns: 1fr; }

/* Tablet: 768px+ */
@media (min-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }

/* Desktop: 1024px+ */
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }
```

### JavaScript Standards

**Module Pattern:**
```javascript
class PublicationsManager {
  constructor() { this.allPublications = []; }
  async init() { /* setup */ }
}
document.addEventListener('DOMContentLoaded', () => {
  window.publicationsManager = new PublicationsManager();
  publicationsManager.init();
});
```

**Error Handling (MANDATORY):**
```javascript
async function loadData() {
  try {
    const response = await fetch('./data/file.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('[loadData] Error:', error);
    return null;
  }
}
```

**Null Checks (MANDATORY):**
```javascript
const container = document.getElementById('container');
if (!container) {
  console.error('[Context] Container not found');
  return;
}
```

**Use Shared Utilities:**
```javascript
import { loadJSON, getElement, createElement } from './js/utils.js';
const data = await loadJSON('./data/personal.json', 'HomePage');
```

**Logging Format:**
```javascript
console.log('[Module] Message');
console.log(`[Service] ✓ Loaded ${count} items`);
// ✓/✅ Success, ❌ Error, ℹ️ Info, ⚠️ Warning
```

---

## Data Architecture

**JSON Files:** `data/` directory (see `data/SCHEMAS.md` for full schemas)

**Loading Pattern:**
```javascript
import { loadJSON } from './js/utils.js';
const data = await loadJSON('./data/personal.json', 'HomePage');
if (!data) return; // Handle error
```

**Validation Rules:**
1. Valid JSON syntax (no trailing commas)
2. Required fields present
3. Correct data types
4. Dates in ISO format (YYYY-MM-DD)
5. Valid URLs
6. No duplicate IDs
7. Logical year ranges

**Validate:** `cat data/file.json | python3 -m json.tool`

---

## Component Library

See `css/COMPONENTS.md` for full library.

**Cards:**
```html
<div class="card">
  <h3>Title</h3>
  <p>Content</p>
</div>
```

**Grids:**
```html
<div class="grid grid-2">...</div>  <!-- 2-column -->
<div class="grid grid-3">...</div>  <!-- 3-column -->
```

**Chips:**
```html
<div class="chip-group">
  <span class="chip chip-year chip-sm">2025</span>
  <span class="chip chip-current chip-sm">Current</span>
</div>
```

**Modals:**
```javascript
function showModal(id, content) {
  const modal = document.getElementById(id);
  modal.querySelector('#modal-text-content').textContent = content;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
```

### Button Standards (Unified System) 🎨

**ALL buttons use the consistent red theme.** No exceptions.

**Available Button Classes:**

```html
<!-- Base Button - Outlined Red -->
<button class="btn">Click Me</button>
<a href="#" class="btn">Link Button</a>

<!-- Primary Button - Filled Red (use for main actions) -->
<button class="btn btn-primary">Submit</button>
<a href="#" class="btn btn-primary">Learn More →</a>

<!-- Secondary Button - Outlined Light Red (use for secondary actions) -->
<button class="btn btn-secondary">Cancel</button>

<!-- Small Button - Compact variant -->
<button class="btn btn-sm">Small</button>
```

**Button Specifications:**

| Class | Background | Border | Text Color | Use Case |
|-------|------------|--------|------------|----------|
| `.btn` | Transparent | 2px solid red (#8B0000) | Red (#8B0000) | Default, neutral actions |
| `.btn-primary` | Red (#8B0000) | 2px solid red | White | Primary CTAs, important actions |
| `.btn-secondary` | Transparent | 2px solid light red (#8B4545) | Light red (#8B4545) | Secondary actions, cancel |
| `.btn-sm` | (modifier) | 1px border | (inherits) | Compact spaces, inline actions |

**Hover Effects (Consistent Across All):**
- Lifts up 2px (`translateY(-2px)`)
- Adds shadow (rgba(139, 0, 0, 0.2-0.3))
- Background fills with red for outlined buttons
- Background lightens to #CD5C5C for filled buttons

**Critical Rules:**

✅ **DO:**
- Use `.btn` or `.btn-primary` for all buttons
- Use red theme colors only (#8B0000, #8B4545, #CD5C5C)
- Include hover/active states
- Make buttons keyboard accessible
- Use Fira Code monospace font

❌ **DON'T:**
- Create custom button styles (use existing classes)
- Use blue, green, or other colors (red theme only!)
- Mix button styles inconsistently
- Skip accessibility attributes
- Override unified button styles

**Example Usage:**
```html
<!-- Publications page -->
<button class="btn btn-primary" id="export-bibtex">Export BibTeX</button>
<button class="btn btn-secondary" id="reset-filters">Reset Filters</button>

<!-- Home page CTA -->
<a href="publications.html" class="btn btn-primary">View All Publications →</a>

<!-- Backgrounds page -->
<button class="btn btn-primary activate-btn" onclick="activate()">
  Activate This Background
</button>
```

---

## Metrics Widget Standards (MANDATORY) ⚠️

**CRITICAL RULE: The metrics widget MUST use the SAME style on ALL pages.**

The Scholar Metrics widget appears on:
- `index.html` (home page)
- `publications.html` (publications page)

**Mandatory Requirements:**

✅ **DO:**
- Use the unified light theme styles from `main.css`
- Light background: `rgba(255, 255, 255, 0.95)`
- Dark red metric values: `var(--color-link)` (#8B0000)
- Subtle red border: `rgba(139, 0, 0, 0.2)`
- Consistent with card design

❌ **DON'T:**
- Override `.metrics-widget` styles in individual HTML files
- Use dark theme (`var(--color-code-bg)`)
- Use white text on dark background
- Create page-specific styles for metrics widget

**HTML Structure:**
```html
<div class="card metrics-widget">
  <h3>Scholar Metrics</h3>
  <div class="metrics-grid grid grid-3">
    <div class="metric">
      <div class="metric-value" id="citations">—</div>
      <div class="metric-label">Citations</div>
    </div>
    <div class="metric">
      <div class="metric-value" id="h-index">—</div>
      <div class="metric-label">h-index</div>
    </div>
    <div class="metric">
      <div class="metric-value" id="i10-index">—</div>
      <div class="metric-label">i10-index</div>
    </div>
  </div>
  <p class="metric-note" id="metrics-updated">Last updated: —</p>
</div>
```

**CSS Location:**
All metrics widget styles are defined in `css/main.css` starting at line ~900.

**Why This Matters:**
The metrics widget was previously inconsistent - dark on one page, light on another. This creates a jarring user experience and breaks visual consistency. The unified light theme ensures the widget blends seamlessly with the rest of the site's professional, clean aesthetic.

**Enforcement:**
If you find `.metrics-widget` styles in `<style>` tags within HTML files, **remove them immediately**. All styling must come from `main.css`.

---

## Navigation Component (🆕 v2.3 - Fully Dynamic)

**File:** `js/navigation.js`
**Class:** `NavigationManager`
**Auto-initializes:** Yes (injects navigation HTML automatically)

**Key Features:**
- **Fully dynamic** - Navigation HTML generated and injected on page load
- **Single source of truth** - All pages defined in `NavigationManager.pages` array
- **Unified across all pages** - Same navigation on every page (including current page link)
- **Auto-detects active page** - Uses filename + `data-page` attribute
- **Mobile menu handling** - Hamburger menu, close on click, close on outside click
- **Zero maintenance** - Add/edit/reorder pages in ONE place, changes propagate everywhere

**HTML Setup (Required):**
```html
<body data-page="page-name">
  <!-- Navigation (dynamically injected by navigation.js) -->
  <div id="nav-placeholder"></div>
</body>
```

**Adding a new page:**
1. Add `data-page` attribute to `<body>`
2. Add placeholder: `<div id="nav-placeholder"></div>`
3. Load navigation.js BEFORE other scripts
4. Add page to `NavigationManager.pages` in `navigation.js`:
   ```javascript
   static pages = [
     // ... existing pages ...
     { href: 'new-page.html', label: 'New Page', page: 'new-page' }
   ];
   ```

**That's it!** The navigation appears automatically on all pages.

---

## Layout Architecture

**✅ DO: Card Pattern** - Each item is its own card
```html
<div id="items-container">
  <div class="card"><h3>Item 1</h3></div>
  <div class="card"><h3>Item 2</h3></div>
</div>
```

**❌ DON'T: Boxes-Inside-Boxes** - Avoid nested cards with inline styles

**Hierarchy:**
1. Page Container: `<div class="container">`
2. Section Wrapper: `<div class="mt-xl">`
3. Section Header: `<h2 class="section-title">` (outside cards)
4. Content Cards: `<div class="card">`
5. Card Content: Semantic HTML

**Styling:**
- ✅ Use CSS classes (`.card`, `.mt-xl`, etc.)
- ✅ Use utility classes (`.mt-*`, `.mb-*`, `.ml-*`)
- ❌ No inline styles
- ❌ No nested boxes with similar backgrounds

---

## Images

**Directory:** `images/profile/`, `images/research/`, `images/institutions/`, `images/favicon/`

**Naming:** `[type]-[descriptor]-[variant].[ext]` (e.g., `profile-fabio-dasaro.jpg`)

**Formats:**
- Photos: JPEG at 85% quality
- Logos: PNG/SVG
- Favicons: PNG (512, 192, 32, 16)

**Size Limits:**
- Profile photos: 400px, ~50-80KB
- Logos: 200px, ~20KB
- Compression: 50-70% reduction

**Alt Text:**
- Profile: Name + role
- Logos: Institution name
- Diagrams: Detailed description
- Decorative: Empty alt (`alt=""`)

**Loading:**
- Above fold: `loading="eager"`
- Below fold: `loading="lazy"`

---

## Background Animations

**Pattern for new animations:**

1. **Create class:** `js/animations/YourAnimation.js`
```javascript
import { AnimationBase } from './AnimationBase.js';

export class YourAnimation extends AnimationBase {
  constructor(canvas, ctx) {
    super(canvas, ctx);  // CRITICAL: Both params
  }

  animate(currentTime) {
    // 1. Clear canvas
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 2. Draw animation
    // ...

    // 3. Request next frame
    if (this.isRunning) {
      this.animationId = requestAnimationFrame((t) => this.animate(t));
    }
  }
}
```

2. **Register:** Add to `AnimationController.js`
```javascript
import { YourAnimation } from './YourAnimation.js';
this.animations = new Map([
  ['yourKey', YourAnimation]
]);
```

3. **Add card to backgrounds.html** with story, facts, activate button

4. **Update CLAUDE.md**

**Critical Checklist:**
- ✅ Named imports/exports (`import { X }`, `export class X`)
- ✅ Constructor: `constructor(canvas, ctx)` with `super(canvas, ctx)`
- ✅ Clear canvas FIRST in `animate()`
- ✅ Request next frame LAST
- ✅ Opacity 0.4-0.6 for visibility

---

## Common Tasks

**Add Publication:** Edit `data/publications.json` (add to `all` array; if featured, add to `selected`)

**Add Course:** Edit `data/teaching.json` (`current_courses` or `past_courses`)

**Update Scholar Metrics:** Edit `data/personal.json` (`scholar_metrics`)

**Update Cache Version:** Increment `?v=XX` in ALL HTML files after CSS/JS changes

**Test Locally:**
```bash
python3 -m http.server 8080
open http://localhost:8080
```

**Deploy:**
```bash
git add .
git commit -m "feat: Description"
git push origin main
```

---

## Critical Rules

### NEVER ❌

1. Hardcode content in HTML
2. Use inline styles (except dynamic JS)
3. **Override `.metrics-widget` styles in HTML files** - MUST use unified styles from main.css
4. Load scripts in wrong order
5. Forget null checks
6. Forget try-catch on async functions
7. Use different cache versions on same page
8. Load `publications.js` globally (only on `publications.html`)
9. Commit without testing
10. Use single quotes in JSON
11. Skip SCHEMAS.md when changing JSON

### ALWAYS ✅

1. Load data from JSON (`loadJSON()`)
2. Check if elements exist (`getElement()` or `if (element)`)
3. Handle errors gracefully (try-catch)
4. Use consistent naming (kebab-case IDs, camelCase JS, PascalCase classes)
5. Update cache version after changes
6. Test locally before deploying
7. Add descriptive console logs (`[Module] Message`)
8. Document new features (SCHEMAS.md, COMPONENTS.md, CLAUDE.md)
9. Use CSS variables
10. Follow accessibility standards

---

## Troubleshooting

**Data Not Loading:**
- Check console errors
- Validate JSON: `cat data/file.json | python3 -m json.tool`
- Verify container ID matches JS
- Check file path
- Look in Network tab for 404s

**Styling Not Applied:**
- Hard refresh: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
- Check cache version updated
- Inspect element in DevTools

**Animation Not Working:**
- Check console for JS errors
- Verify animation extends `AnimationBase`
- Ensure `super()` called correctly
- Check canvas element exists

---

## Testing Checklist

**Before Deployment:**
- [ ] All pages load without errors
- [ ] No console errors
- [ ] All data displays correctly
- [ ] Search/filter works (publications)
- [ ] All links work
- [ ] Animations work
- [ ] Mobile menu works
- [ ] Test on mobile/tablet/desktop
- [ ] Keyboard navigation works
- [ ] Images have alt text

**Validation Tools:**
- HTML: https://validator.w3.org/
- CSS: https://jigsaw.w3.org/css-validator/
- JSON: https://jsonlint.com/
- Performance: https://pagespeed.web.dev/

---

## Performance & Security

**JavaScript:**
- Minimize DOM manipulation
- Cache DOM queries
- Debounce search inputs
- Use `requestAnimationFrame` for animations

**CSS:**
- Use CSS transforms (GPU accelerated)
- Minimize reflows/repaints
- Use `will-change` for animated properties

**Images:**
- Compress all images
- Lazy load below fold
- Provide width/height

**Security:**
- Escape user input: `escapeHtml()`
- Use `textContent` for user data
- Validate data types
- Sanitize URLs

---

## Git Workflow

**Commit Format:**
```
Type: Brief description (max 50 chars)

- Detailed change 1
- Detailed change 2
```

**Types:** `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `perf`

**Deployment:**
1. Make changes locally
2. Test thoroughly
3. Update cache version (if CSS/JS changed)
4. Commit with descriptive message
5. Push to GitHub
6. Verify live site (wait 1-2 min)

---

## Quick Reference

```bash
# Dev server
python3 -m http.server 8080

# Validate JSON
cat data/personal.json | python3 -m json.tool

# Deploy
git add . && git commit -m "Type: Description" && git push origin main
```

**Common Files:**
- Add publication: `data/publications.json`
- Update metrics: `data/personal.json`
- Add course: `data/teaching.json`
- Check schema: `data/SCHEMAS.md`
- Find component: `css/COMPONENTS.md`

---

**Version:** 2.5
**Status:** ✅ Production-Ready (Maintenance Mode)
**Last Updated:** 2025-10-24

**📘 Additional Documentation:**
- `data/SCHEMAS.md` - JSON schema documentation
- `css/COMPONENTS.md` - CSS component library
- `BUGS_FOUND.md` - Architectural audit
- `README.md` - Public documentation

---

## Version History

**v2.5 (2025-10-24)** - Metrics Widget Consistency (MANDATORY)
- ✅ **Enforced unified metrics widget styling across ALL pages**
- ✅ Removed dark theme overrides from publications.html
- ✅ Metrics widget now uses light theme consistently on index.html AND publications.html
- ✅ Added "Metrics Widget Standards (MANDATORY)" section to CLAUDE.md
- ✅ Added rule #3 to NEVER list: Do not override .metrics-widget styles
- ✅ Documented enforcement policy for metrics widget styling
- ✅ Updated all profile links to use data from personal.json (GitHub, Scholar, ORCID)

**v2.4 (2025-10-24)** - Unified Button System & Enhanced Navigation
- ✅ Standardized ALL buttons to consistent red theme
- ✅ Created unified button system (`.btn`, `.btn-primary`, `.btn-secondary`)
- ✅ Removed duplicate button definitions from CSS
- ✅ Added fancy navigation effects (glassmorphism, animations, scroll effects)
- ✅ Enhanced mobile menu with staggered animations
- ✅ Documented button standards in CLAUDE.md
- ✅ Fixed button inconsistencies across all pages

**v2.3 (2025-10-24)** - Fully Dynamic Navigation
- ✅ Navigation now fully dynamically generated and injected
- ✅ Single placeholder (`<div id="nav-placeholder"></div>`) in all HTML files
- ✅ Navigation HTML generated from `NavigationManager.pages` array
- ✅ All pages show ALL navigation links (unified navigation bar)
- ✅ Fixed backgrounds.html missing "Backgrounds" link
- ✅ Zero maintenance - edit navigation in ONE place, propagates to all pages
- ✅ Updated CLAUDE.md documentation

**v2.2 (2025-10-24)** - Navigation component refactoring
- ✅ Created independent `navigation.js` component (NavigationManager class)
- ✅ Centralized navigation configuration (single source of truth)
- ✅ Improved active page detection (filename + data-page attribute matching)

**v2.1 (2025-10-24)** - Post-implementation documentation update
- ✅ Removed all deprecated phase-based build instructions
- ✅ Added comprehensive "Website Implementation Status" section
- ✅ Documented all 10 completed pages with features and data sources
