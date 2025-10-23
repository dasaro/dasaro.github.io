# Website Architecture & Standards

**Fabio Aurelio D'Asaro's Academic Website**
**Static, Data-Driven, JSON-Powered Architecture**

---

## ⚠️ META-RULE: Keep This Document Updated

**CRITICAL:** Whenever you make architectural changes, component additions, or establish new patterns, you **MUST** update this CLAUDE.md document to reflect those changes.

**This includes:**
- ✅ New component patterns (modals, tooltips, cards, etc.)
- ✅ Layout architecture changes (grid systems, hierarchy rules)
- ✅ Styling standards or conventions
- ✅ JavaScript patterns or utilities
- ✅ Data structure modifications
- ✅ File organization changes
- ✅ Naming conventions
- ✅ Accessibility patterns

**Why:** This document serves as the single source of truth for development standards. Keeping it updated ensures consistency across all future changes and prevents technical debt.

**When:** Update CLAUDE.md in the **same commit** as the architectural change.

---

## Table of Contents

1. [Architecture Principles](#architecture-principles)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Coding Standards](#coding-standards)
   - [HTML Standards](#html-standards)
   - [CSS Standards](#css-standards)
   - [JavaScript Standards](#javascript-standards)
5. [Data Architecture](#data-architecture)
6. [Component Library](#component-library)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)
9. [Testing Checklist](#testing-checklist)
10. [Critical Rules](#critical-rules)

---

## Architecture Principles

### Core Tenets

**1. Data-Driven Design**
- **No hardcoded content** in HTML files
- **All dynamic data** stored in JSON files (`data/` directory)
- **JavaScript populates DOM** from data on page load
- **Single source of truth** - update JSON, website updates automatically

**2. Progressive Enhancement**
- Core content accessible without JavaScript
- Enhanced user experience with JavaScript enabled
- Graceful degradation for older browsers
- Performance-first approach

**3. Maintainability First**
- Modular architecture with clear separation of concerns
- Consistent patterns across all pages
- Self-documenting code with comprehensive comments
- Comprehensive error handling at every level

**4. Performance Optimized**
- Minimal external dependencies (zero frameworks)
- Efficient CSS animations using GPU acceleration
- Lazy loading where appropriate
- Optimized assets and caching strategy

**5. Accessibility Standards**
- Semantic HTML5 throughout
- ARIA labels where needed
- Full keyboard navigation support
- Screen reader compatible
- WCAG 2.1 AA compliance target

---

## Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | Latest | Semantic markup, structure |
| CSS3 | Latest | Styling, animations, responsive design |
| JavaScript | ES6+ | Interactivity, data loading, DOM manipulation |
| JSON | - | Data storage and configuration |

### External Resources

- **Fonts:** Google Fonts (Inter, Fira Code)
- **Hosting:** GitHub Pages (free, automatic deployment)
- **No frameworks:** Pure vanilla JavaScript for maximum control

### Development Tools

- **AI Assistant:** Claude Code for development
- **Browser DevTools:** Chrome/Firefox DevTools for debugging
- **Version Control:** Git & GitHub
- **Testing:** Manual testing, browser console verification

---

## Project Structure

```
dasaro.github.io/
├── index.html              # Home page with hero, research interests, recent pubs
├── about.html              # About/CV page
├── publications.html       # Publications with filtering & search
├── teaching.html           # Teaching experience & supervision
├── projects.html           # Research projects (current & past)
├── service.html            # Professional service activities
├── backgrounds.html        # Mathematical curiosities behind animations
├── contact.html            # Contact information
├── dissertation-info.html  # PhD supervision topics
├── 404.html                # Custom 404 error page
│
├── css/
│   ├── main.css            # Core styles, layout, typography
│   ├── animations.css      # Background animations, transitions
│   ├── responsive.css      # Media queries, mobile styles
│   └── COMPONENTS.md       # 📘 Component library documentation
│
├── js/
│   ├── utils.js            # 🛠 Shared utility functions (NEW!)
│   ├── main.js             # Global functionality, navigation, utilities
│   ├── publications.js     # Publications filtering & export
│   └── animations/         # Background animation classes
│       ├── AnimationController.js
│       ├── AnimationBase.js
│       ├── GameOfLife.js
│       ├── FibonacciSpiral.js
│       ├── PrimeSpiral.js
│       ├── RiemannZeta.js
│       ├── MandelbrotSet.js
│       ├── ProofTree.js
│       └── PacmanGame.js
│
├── data/
│   ├── personal.json       # Personal info, contact, metrics
│   ├── publications.json   # All publications + selected subset
│   ├── teaching.json       # Teaching history, courses, lectures
│   ├── supervision.json    # Student supervision records
│   ├── projects.json       # Research projects (current & past)
│   ├── service.json        # Professional service activities
│   └── SCHEMAS.md          # 📘 JSON schema documentation (NEW!)
│
├── images/                 # Images and assets
├── BUGS_FOUND.md           # 📘 Architectural audit report (NEW!)
├── CLAUDE.md               # 📘 This file - architectural standards
└── README.md               # Public documentation
```

**Key Documentation Files (NEW):**
- `js/utils.js` - Production-ready utility functions
- `data/SCHEMAS.md` - Complete JSON schema documentation
- `css/COMPONENTS.md` - CSS component library reference
- `BUGS_FOUND.md` - Architectural audit findings

---

## Coding Standards

### HTML Standards

#### 1. Semantic Markup

**✅ Good:**
```html
<article class="publication-card">
  <header>
    <h3>Publication Title</h3>
  </header>
  <section class="publication-meta">
    <p class="publication-authors">Authors</p>
    <p class="publication-venue">Venue</p>
  </section>
</article>
```

**❌ Bad:**
```html
<div class="publication">
  <div class="title">Publication Title</div>
  <div class="meta">
    <div>Authors</div>
    <div>Venue</div>
  </div>
</div>
```

#### 2. Consistent ID Naming Convention

**Pattern:** `{section}-{element}-{type}`

```html
<!-- Containers for dynamic content -->
<div id="publications-container"></div>
<div id="research-interests-grid"></div>
<div id="current-projects-container"></div>
<div id="past-projects-container"></div>
```

**Rules:**
- Use kebab-case (lowercase with hyphens)
- Descriptive and specific
- Match JavaScript getElementById calls exactly

#### 3. Standard Section Structure

```html
<section id="section-name" class="section">
  <div class="container">
    <h2 class="section-title">Section Title</h2>

    <div id="section-name-container" class="grid grid-3">
      <!-- Dynamic content populated here by JavaScript -->
      <p class="loading-message">Loading...</p>
    </div>
  </div>
</section>
```

#### 4. Script Loading Order (CRITICAL)

**CORRECT Order:**
```html
<!-- Before </body> tag -->

<!-- 1. Core utilities (always first) -->
<script src="js/main.js?v=31"></script>

<!-- 2. Animation controller (ES6 module) -->
<script type="module" src="js/animations/AnimationController.js?v=31"></script>

<!-- 3. Page-specific scripts (ONLY on relevant pages) -->
<script type="module" src="js/publications.js?v=31"></script>

<!-- 4. Inline page scripts (always last) -->
<script>
  document.addEventListener('DOMContentLoaded', async () => {
    // Page-specific code here
  });
</script>
```

**CRITICAL RULES:**
- ✅ `publications.js` ONLY on `publications.html`
- ✅ `main.js` ALWAYS loaded first
- ✅ Inline scripts ALWAYS last
- ❌ NEVER load same script twice

#### 5. Meta Tags Standard

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Permissions-Policy" content="interest-cohort=()">
  <meta name="description" content="Page-specific description">
  <meta name="author" content="Fabio Aurelio D'Asaro">
  <title>Page Title - Fabio Aurelio D'Asaro</title>
</head>
```

---

### CSS Standards

#### 1. Use CSS Custom Properties

**✅ Good:**
```css
.card {
  color: var(--color-text-primary);
  padding: var(--space-lg);
  font-family: var(--font-body);
  border-radius: 8px;
}
```

**❌ Bad:**
```css
.card {
  color: #1a1a1a;
  padding: 1.5rem;
  font-family: 'Inter', sans-serif;
  border-radius: 8px;
}
```

#### 2. BEM-like Naming Convention

```css
/* Block */
.publication-card { }

/* Element (double underscore) */
.publication-card__title { }
.publication-card__authors { }
.publication-card__venue { }

/* Modifier (double hyphen) */
.publication-card--featured { }
.publication-card--open-access { }
```

#### 3. Mobile-First Media Queries

```css
/* Base styles for mobile (default) */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

/* Tablet and up (min-width approach) */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### 4. Standard Breakpoints

```css
/* Mobile: < 768px (base styles) */
/* Tablet: 768px - 1023px */
@media (min-width: 768px) { }

/* Desktop: 1024px - 1439px */
@media (min-width: 1024px) { }

/* Wide Desktop: >= 1440px */
@media (min-width: 1440px) { }
```

#### 5. CSS Variable System

**Colors:**
```css
:root {
  --color-white: #FFFFFF;
  --color-black: #1a1a1a;
  --color-accent-primary: #8B0000;      /* Dark red */
  --color-accent-secondary: #B22222;    /* Firebrick */
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #4a4a4a;
}
```

**Spacing:**
```css
:root {
  --space-xs: 0.25rem;    /* 4px */
  --space-sm: 0.5rem;     /* 8px */
  --space-md: 1rem;       /* 16px */
  --space-lg: 1.5rem;     /* 24px */
  --space-xl: 2rem;       /* 32px */
  --space-2xl: 3rem;      /* 48px */
}
```

**Typography:**
```css
:root {
  --font-body: 'Inter', sans-serif;
  --font-mono: 'Fira Code', monospace;

  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
}
```

---

### JavaScript Standards

#### 1. Module Pattern

**Use classes for major features:**
```javascript
class PublicationsManager {
  constructor() {
    this.allPublications = [];
    this.filters = {};
  }

  async init() {
    // Setup and initialization
  }

  async loadData() {
    // Data loading
  }
}

// Single global instance
document.addEventListener('DOMContentLoaded', () => {
  window.publicationsManager = new PublicationsManager();
  publicationsManager.init();
});
```

#### 2. Error Handling (MANDATORY)

**✅ All async functions MUST have try-catch:**
```javascript
async function loadData() {
  try {
    const response = await fetch('./data/file.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[loadData] Error:', error);
    return null;
  }
}
```

**❌ Never do this:**
```javascript
async function loadData() {
  const response = await fetch('./data/file.json');  // ❌ No error handling
  return await response.json();
}
```

#### 3. Null Checks (MANDATORY)

**✅ Always check if elements exist:**
```javascript
const container = document.getElementById('container');
if (!container) {
  console.error('[Context] Container not found: #container');
  return;
}

container.innerHTML = '...';
```

**Or use inline checks:**
```javascript
const element = document.getElementById('element');
if (element) element.style.display = 'block';
```

#### 4. Consistent Logging Format

**Standard Pattern:**
```javascript
// Format: [Module/Context] Message
console.log('[PublicationsManager] Loading data...');
console.error('[HomePage] Error loading personal data:', error);
console.log(`[Service] ✓ Loaded ${count} items`);

// Use emojis for status:
// ✓ or ✅ - Success
// ❌ - Error
// ℹ️ - Info
// ⚠️ - Warning
```

#### 5. Use Shared Utilities

**✅ Import from utils.js:**
```javascript
import { loadJSON, getElement, createElement } from './js/utils.js';

const data = await loadJSON('./data/personal.json', 'HomePage');
const container = getElement('container-id', 'HomePage');
const card = createElement('div', ['card', 'publication-card']);
```

**❌ Don't rewrite utilities:**
```javascript
// ❌ Don't do this - use utils.loadJSON() instead
const response = await fetch('./data/file.json');
const data = await response.json();
```

#### 6. Data Loading Pattern

**Standard pattern for all pages:**
```javascript
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 1. Load data
    const data = await loadJSON('./data/file.json', 'PageContext');
    if (!data) {
      console.error('[PageContext] Failed to load data');
      return;
    }

    // 2. Get container
    const container = getElement('container-id', 'PageContext');
    if (!container) return;

    // 3. Check data exists
    if (!data.items || data.items.length === 0) {
      container.innerHTML = '<p class="no-data">No items found.</p>';
      return;
    }

    // 4. Populate container
    const html = data.items.map(item => `
      <div class="card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `).join('');

    container.innerHTML = html;

    // 5. Log success
    console.log(`[PageContext] ✓ Loaded ${data.items.length} items`);

  } catch (error) {
    console.error('[PageContext] Error:', error);
  }
});
```

---

## Data Architecture

### JSON File Structure

All data files live in `data/` directory:

| File | Purpose | Used By |
|------|---------|---------|
| `personal.json` | Personal info, contact, metrics | index.html, about.html, contact.html |
| `publications.json` | All publications + selected | index.html, publications.html |
| `teaching.json` | Teaching experience, courses | teaching.html |
| `supervision.json` | Student supervision records | teaching.html |
| `projects.json` | Research projects | projects.html |
| `service.json` | Professional service | service.html |

**📘 Full schemas:** See `data/SCHEMAS.md`

### Data Loading Pattern

**Standard Approach:**
```javascript
import { loadJSON } from './js/utils.js';

// Load with context for better error messages
const data = await loadJSON('./data/personal.json', 'HomePage');

if (!data) {
  // Handle error - data failed to load
  return;
}

// Use data
console.log(data.name);
```

### Data Validation Rules

**Before committing JSON changes:**

1. **Valid JSON syntax** - No trailing commas, proper quotes
2. **Required fields present** - Check SCHEMAS.md
3. **Correct data types** - String, number, boolean, array as specified
4. **Dates in ISO format** - YYYY-MM-DD or YYYY-MM
5. **Valid URLs** - All links accessible
6. **No duplicate IDs** - Especially in publications
7. **Year ranges logical** - end >= start

**Validate syntax:**
```bash
cat data/personal.json | python3 -m json.tool > /dev/null
echo $?  # Should output 0 if valid
```

---

## Component Library

### Card Components

#### Base Card
```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

#### Publication Card
```html
<div class="publication-card">
  <h3>Publication Title</h3>
  <p class="publication-authors">Authors</p>
  <p class="publication-venue"><strong>Venue</strong> (Year)</p>
  <div class="publication-links">
    <a href="#">DOI</a>
    <a href="#">PDF</a>
  </div>
</div>
```

### Badge Components

```html
<span class="badge-current">ACTIVE</span>
<span class="badge-past">COMPLETED</span>
<span class="badge-oa">OPEN ACCESS</span>
<span class="badge-accepted">ACCEPTED</span>
```

### Grid Layouts

```html
<!-- 2-column grid -->
<div class="grid grid-2">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<!-- 3-column grid -->
<div class="grid grid-3">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

### Modal Components

Modals provide elegant popups for displaying content without leaving the current page.

#### Modal Structure
```html
<!-- Modal overlay (hidden by default) -->
<div id="modal-id" class="modal" style="display: none;">
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h3>Modal Title</h3>
      <button class="modal-close" aria-label="Close modal">&times;</button>
    </div>
    <div class="modal-body">
      <!-- Modal content goes here -->
      <pre><code id="modal-text-content">Text content to display</code></pre>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="copyToClipboard()">Copy</button>
      <button class="btn btn-primary" onclick="downloadFile()">Download</button>
    </div>
  </div>
</div>
```

#### Modal CSS Classes
```css
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  background: white;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  z-index: 1001;
}

.modal-body {
  padding: var(--space-lg);
  overflow-y: auto;
  max-height: 60vh;
}
```

#### Modal JavaScript Pattern
```javascript
// Show modal
function showModal(modalId, content) {
  const modal = document.getElementById(modalId);
  const contentEl = modal.querySelector('#modal-text-content');
  contentEl.textContent = content;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scroll
}

// Hide modal
function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'none';
  document.body.style.overflow = ''; // Restore scroll
}

// Close on overlay click
modal.querySelector('.modal-overlay').addEventListener('click', () => {
  hideModal('modal-id');
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hideModal('modal-id');
  }
});
```

#### Modal Use Cases
- **BibTeX Display:** Show formatted citation with copy/download options
- **Image Lightbox:** Full-size image preview
- **Confirmation Dialogs:** Delete confirmations, form submissions
- **Extended Information:** Show detailed content without page navigation

**📘 Full component library:** See `css/COMPONENTS.md`

---

### Chips & Badges System

Chips provide lightweight visual indicators for categorizing and labeling content. They use soft rgba backgrounds with borders for an elegant, non-intrusive appearance.

#### Basic Chip Usage

```html
<!-- Simple chip -->
<span class="chip chip-year chip-sm">2025</span>

<!-- Chip group (recommended for multiple chips) -->
<div class="chip-group">
  <span class="chip chip-year chip-sm">2024</span>
  <span class="chip chip-current chip-sm">Current</span>
  <span class="chip chip-research chip-sm">Research</span>
</div>
```

#### Available Chip Types

**Year/Timeline:**
- `.chip-year` - Red accent for years/dates

**Status:**
- `.chip-current` - Green for active/current items
- `.chip-past` - Gray for completed/past items
- `.chip-ongoing` - Blue for ongoing activities
- `.chip-completed` - Dark red for completed projects

**Publication Types:**
- `.chip-journal` - Dark red
- `.chip-conference` - Blue
- `.chip-workshop` - Orange
- `.chip-book` - Purple
- `.chip-preprint` - Gray

**Academic Levels:**
- `.chip-phd` - Dark red
- `.chip-msc` - Blue
- `.chip-bsc` - Green

**Categories:**
- `.chip-teaching` - Orange
- `.chip-research` - Dark red
- `.chip-service` - Purple
- `.chip-supervision` - Light blue

**Special:**
- `.chip-award` - Gold
- `.chip-featured` - Bold dark red
- `.chip-new` - Animated pulse green

#### Size Modifiers

- `.chip-sm` - Small chips (default for most uses)
- `.chip-lg` - Large chips (for emphasis)
- Default (no modifier) - Medium size

#### Interactive Chips

```html
<!-- Clickable chip (for filtering) -->
<span class="chip chip-clickable chip-conference chip-sm">Conference</span>
```

Adds hover effects and cursor pointer.

#### Best Practices

**DO:**
- ✅ Use `.chip-group` to organize multiple chips
- ✅ Use `.chip-sm` for most UI elements
- ✅ Combine chip types (e.g., year + status + category)
- ✅ Place chips at the top of cards for quick scanning

**DON'T:**
- ❌ Overuse chips (max 3-4 per item)
- ❌ Mix too many colors in one group
- ❌ Use chips for critical information (they're supplements)

#### Example: Publication Card

```html
<div class="publication-card">
  <div class="chip-group">
    <span class="chip chip-year chip-sm">2025</span>
    <span class="chip chip-journal chip-sm">Journal</span>
    <span class="chip chip-featured chip-sm">Open Access</span>
  </div>
  <h3>Publication Title</h3>
  <p class="publication-authors">Authors...</p>
  <p class="publication-venue"><strong>Venue Name</strong></p>
</div>
```

---

### Logical Symbols System

The Logical Symbols system provides randomized mathematical logic symbols for decorative elements. Symbols refresh on each page load for visual variety.

#### Quick Start

```html
<!-- Include the script -->
<script src="js/logical-symbols.js"></script>

<!-- Add symbol container (auto-populated on page load) -->
<h2><div class="logical-symbols"></div> Section Title</h2>
```

#### Symbol Categories

The system includes 6 categories:
- **propositional**: ∧, ∨, ¬, →, ↔, ⊤, ⊥, ⊕, ⊼, ⊽
- **predicate**: ∀, ∃, ∃!, =, ≠, ≈, ≡, ≢
- **setTheory**: ∈, ∉, ⊆, ⊂, ⊇, ⊃, ∪, ∩, ∅, ℘, ⊎
- **categoryTheory**: →, ⇒, ↦, ∘, ≅, ⊗, ⊕, ⊤, ⊥, ∇
- **proofTheory**: ⊢, ⊨, ⊬, ⊭, ├, ⊣, ⊳, ⊲, ▷, ◁
- **modalLogic**: □, ◇, ⬚, ⟡, ▫, ⬩, ◊, ⋄

#### Customization via Data Attributes

```html
<!-- Multiple symbols -->
<div class="logical-symbols" data-count="3"></div>
<!-- Output: ∀ ⊢ ∃ (randomized) -->

<!-- Specific category -->
<div class="logical-symbols" data-category="proofTheory"></div>
<!-- Output: ⊢ (random from proof theory category) -->

<!-- Custom separator -->
<div class="logical-symbols" data-count="2" data-separator=" · "></div>
<!-- Output: ∧ · → -->

<!-- Disable dimming -->
<div class="logical-symbols" data-dimmed="false"></div>
```

#### JavaScript API

```javascript
// Get the global instance
const symbols = window.logicalSymbols;

// Get a random symbol
const symbol = symbols.getRandom();

// Get multiple symbols
const threeSymbols = symbols.getMultiple(3);

// Get from specific category
const proofSymbol = symbols.getRandomFromCategory('proofTheory');

// Manually populate an element
const element = document.querySelector('.my-symbol');
symbols.populate(element, {
  count: 2,
  category: 'predicate',
  separator: ' ',
  dimmed: true
});

// Re-initialize all symbols on page
symbols.initializeAll();
```

#### Styling

Symbols are automatically dimmed to 40% opacity via the `.symbols-dimmed` class. You can override this:

```css
.logical-symbols {
  font-size: 1.5em;
  opacity: 0.6; /* Override default 0.4 */
  color: var(--color-accent-1);
}
```

#### Best Practices

**DO:**
- ✅ Use for section headers and decorative elements
- ✅ Keep dimmed (40% opacity) to avoid distraction
- ✅ Let symbols randomize on each page load
- ✅ Use specific categories for thematic consistency

**DON'T:**
- ❌ Use for conveying critical information
- ❌ Override the auto-initialization without reason
- ❌ Make symbols too prominent (they're decorative)

---

### List & Bullet Point Styling

Unified list styling system with proper spacing and consistent appearance across all card types.

#### Automatic List Styling

Lists inside cards automatically receive proper spacing and styling:

```html
<div class="card">
  <h3>Research Focus</h3>
  <ul>
    <li>Logic Programming</li>
    <li>Temporal Reasoning</li>
    <li>Explainable AI</li>
  </ul>
</div>
```

**Applies to:**
- `.card ul` and `.card li`
- `.course-card ul` and `.course-card li`
- `.timeline-card ul` and `.timeline-card li`
- `.project-card ul` and `.project-card li`
- `.topic-card ul` and `.topic-card li`

**Default styles:**
- Margin: `var(--space-md)` (1rem) top and bottom
- Padding-left: `2rem` (proper indentation from card edge)
- Line-height: `1.6` (readable spacing)
- List item margin-bottom: `var(--space-sm)` (0.5rem)

#### Custom Arrow Lists

For special lists with arrow bullets (→):

```html
<div class="card">
  <p>Selected peer review activities:</p>
  <ul class="service-list">
    <li>International Journal of Approximate Reasoning</li>
    <li>KR Conference</li>
    <li>IJCAI</li>
  </ul>
</div>
```

**Classes:**
- `.service-list` - For reviewing venues, service activities
- `.project-outputs ul` - For project deliverables

**Styles:**
- Custom `→` bullets in link color
- No default bullets (list-style: none)
- Proper left padding with positioned arrows

#### Margin & Padding Utilities

**Left Margin:**
- `.ml-xs` - 0.25rem
- `.ml-sm` - 0.5rem
- `.ml-md` - 1rem
- `.ml-lg` - 1.5rem
- `.ml-xl` - 2rem

**Left Padding:**
- `.pl-xs` - 0.25rem
- `.pl-sm` - 0.5rem
- `.pl-md` - 1rem
- `.pl-lg` - 1.5rem
- `.pl-xl` - 2rem

#### Best Practices

**DO:**
- ✅ Let automatic styling handle standard lists in cards
- ✅ Use `.service-list` for arrow-style lists
- ✅ Use margin utilities (`.ml-lg`, `.mb-md`) for fine-tuning
- ✅ Keep lists inside cards for proper spacing
- ✅ Use semantic HTML (`<ul>`, `<li>`)

**DON'T:**
- ❌ Add inline styles for list spacing
- ❌ Override padding-left without good reason (creates inconsistency)
- ❌ Nest lists too deeply (max 2 levels)
- ❌ Use excessive margin utilities (prefer defaults)

#### Common Patterns

**Supervision/Student Outcomes:**
```html
<div class="course-card">
  <h3>Student Name</h3>
  <p><strong>Outcomes:</strong></p>
  <ul class="ml-lg mb-md">
    <li>Outstanding Project Award</li>
    <li>Selected for Showcase</li>
  </ul>
</div>
```

**Research Focus:**
```html
<div class="timeline-card">
  <h3>Position Title</h3>
  <p><strong>Research Focus:</strong></p>
  <ul>
    <li>Temporal Logics</li>
    <li>Probabilistic Reasoning</li>
  </ul>
</div>
```

**Service Activities:**
```html
<div class="card">
  <p>Reviewing activities:</p>
  <ul class="service-list">
    <li>IJAR</li>
    <li>KR 2024-2025</li>
  </ul>
</div>
```

#### Supervision Section Sizing

The `.course-card` class is optimized for supervision entries:
- **Padding**: `var(--space-md)` (reduced from lg)
- **Margin-bottom**: `var(--space-md)` (compact spacing)
- **Font-size**: `var(--text-sm)` (smaller, denser text)
- **H3 size**: `var(--text-lg)` (proportional headers)

This creates a more compact, scannable supervision section while maintaining readability.

---

### Mathematical Backgrounds Page

The `backgrounds.html` page provides an engaging, educational exploration of the mathematical concepts behind each background animation.

#### Purpose

- **Educational outreach**: Make mathematics accessible and exciting
- **Interactive demonstration**: Let visitors choose which animation to view
- **Storytelling**: Share the human stories behind mathematical discoveries
- **Engagement**: Encourage curiosity about logic, mathematics, and computer science

#### Content Structure

Each animation gets a dedicated card with:

1. **Header**: Title, subtitle, and iconic symbol
2. **Description**: Accessible 2-3 sentence explanation (no jargon!)
3. **Story Behind It**: Historical context, discovery story, human element
4. **Curious Facts**: 4-5 interesting bullet points mixing math, history, and pop culture
5. **Activate Button**: Direct interaction to switch background animation

#### Writing Guidelines

**DO:**
- ✅ Write for a general audience (high school level)
- ✅ Include human stories (who discovered it, when, why)
- ✅ Mix technical facts with pop culture references
- ✅ Use analogies and metaphors
- ✅ Explain *why* it's beautiful or important
- ✅ Include surprising connections (nature, art, music, etc.)

**DON'T:**
- ❌ Use dense mathematical notation without explanation
- ❌ Assume prior knowledge of advanced concepts
- ❌ Make it dry or textbook-like
- ❌ Forget the human element (who? why? what happened?)

#### Animations Covered

1. **Conway's Game of Life**: Cellular automaton, emergence, complexity from simple rules
2. **Fibonacci Spiral**: Golden ratio, nature's patterns, art and architecture
3. **Prime Spiral (Ulam)**: Serendipitous discovery, hidden patterns, unsolved mysteries
4. **Riemann Zeta**: Million-dollar problem, connection to primes, complex analysis
5. **Mandelbrot Set**: Fractals, infinite detail, chaos and order
6. **Proof Tree**: Formal logic, automated theorem proving, Curry-Howard
7. **Pac-Man**: Gaming history, AI algorithms, cultural impact
8. **Rule 30**: Cellular automaton, deterministic chaos, randomness from order

#### Activation Mechanism

Buttons call `activateAnimation(key, button)` which:
```javascript
window.animationController.start(animationKey);
```

Available keys: `'gameOfLife'`, `'fibonacci'`, `'primes'`, `'riemann'`, `'mandelbrot'`, `'proofTree'`, `'pacman'`, `'rule30'`

#### Design Notes

- Cards highlight when their animation is active (blue border, light background)
- Buttons show checkmark (✓) when active
- Page auto-detects current animation on load
- Mobile-responsive cards with flexible header layout
- Consistent with site's terminal-meets-philosophy aesthetic

#### Maintenance

When adding new animations:
1. Add animation class to `js/animations/`
2. Register in `AnimationController.animations` Map
3. Add card to `backgrounds.html` with story and facts
4. Update this documentation

---

## Layout & Component Architecture Standards

### ✅ DO: Card Pattern

**Each item is its own card:**
```html
<!-- CORRECT: Teaching page pattern -->
<div id="guest-lectures-container">
  <div class="card">
    <h3>Talk Title 1</h3>
    <p><strong>Event Name</strong></p>
    <p>Institution</p>
  </div>
  <div class="card">
    <h3>Talk Title 2</h3>
    <p><strong>Event Name</strong></p>
    <p>Institution</p>
  </div>
</div>
```

### ❌ DON'T: Boxes-Inside-Boxes

**Avoid wrapping cards in outer cards with inline-styled inner boxes:**
```html
<!-- WRONG: Creates visual nesting confusion -->
<div class="card">
  <h2>Section Title</h2>
  <div style="background: white; padding: 20px; border: 1px solid...">
    <h3>Item 1</h3>
  </div>
  <div style="background: white; padding: 20px; border: 1px solid...">
    <h3>Item 2</h3>
  </div>
</div>
```

### Standard Patterns by Content Type

#### List of Items (Conferences, Talks, Courses)
```html
<!-- Section header outside cards -->
<div class="mt-xl">
  <h2 class="section-title">Section Name</h2>
  <div id="items-container">
    <!-- Each item is its own card -->
    <div class="card">
      <h3>Item Title</h3>
      <p>Content</p>
    </div>
  </div>
</div>
```

#### Single Content Block
```html
<!-- Use ONE card for contained content -->
<div class="card">
  <h2>Section Title</h2>
  <p>Paragraph content that belongs together.</p>
  <ul class="service-list">
    <li>List item 1</li>
    <li>List item 2</li>
  </ul>
</div>
```

#### Grid of Cards
```html
<div class="grid grid-2">
  <div class="card">
    <h3>Card 1</h3>
    <p>Content</p>
  </div>
  <div class="card">
    <h3>Card 2</h3>
    <p>Content</p>
  </div>
</div>
```

### Styling Standards

**✅ DO:**
- Use CSS classes from `main.css` (`.card`, `.mt-xl`, `.mb-md`, etc.)
- Use utility classes for spacing (`.mt-*`, `.mb-*`, `.ml-*`, `.mr-*`)
- Use semantic classes (`.service-list`, `.course-card`, `.publication-card`)
- Keep styles in CSS files, not inline

**❌ DON'T:**
- Use inline styles (`style="background: white; padding: 20px..."`)
- Create nested boxes with similar backgrounds
- Duplicate card-like styling inside `.card` elements
- Mix inline styles with CSS classes

### Hierarchy Rules

1. **Page Container**: `<div class="container">`
2. **Section Wrapper**: `<div class="mt-xl">` or `<div class="mt-xl fade-in-delay-N">`
3. **Section Header**: `<h2 class="section-title">` (outside cards)
4. **Content Cards**: `<div class="card">` for each distinct item
5. **Card Content**: Semantic HTML without additional box-like divs

**Example from teaching.html (correct):**
```html
<div class="mt-xl">
  <h2 class="section-title">Guest Lectures</h2>
  <div id="guest-lectures-container">
    <div class="card">
      <h3>Lecture Title</h3>
      <p>Details</p>
    </div>
  </div>
</div>
```

---

## Image Architecture & Standards

### Directory Structure

```
images/
├── profile/          # Profile photos (e.g., profile-fabio-dasaro.jpg)
├── research/         # Research-related images (diagrams, visualizations)
├── institutions/     # Institutional logos (universities, labs)
├── misc/            # Other images
└── favicon/         # Favicon files (all sizes)
    ├── favicon-512x512.png
    ├── favicon-192x192.png
    ├── favicon-32x32.png
    ├── favicon-16x16.png
    ├── apple-touch-icon.png
    └── site.webmanifest
```

### Image Naming Convention

**Format:** `[type]-[descriptor]-[variant].[ext]`

**Examples:**
- `profile-fabio-dasaro.jpg` - Main profile photo
- `logo-unisalento.png` - University of Salento logo
- `diagram-event-calculus-v2.svg` - Research diagram, version 2
- `favicon-512x512.png` - Favicon at 512x512 resolution

### Optimization Standards

#### File Formats
- **Photos:** Use JPEG (`.jpg`) at 85% quality
- **Logos/Graphics:** Use PNG (`.png`) for transparency, SVG (`.svg`) when possible
- **Icons:** Use SVG for scalability
- **Favicons:** Use PNG for broad compatibility

#### Size Guidelines
- **Profile photos:** Max 400px width, ~50-80KB
- **Hero images:** Max 1200px width, ~150KB
- **Thumbnails:** Max 300px width, ~30KB
- **Logos:** Max 200px height, ~20KB
- **Favicons:** Standard sizes (512, 192, 180, 32, 16)

#### Compression
- Use tools like ImageOptim, TinyPNG, or Squoosh
- Target: Reduce file size by 50-70% without visible quality loss
- Progressive JPEGs for photos > 50KB

### HTML Integration

#### Profile Photo (Hero Section)
```html
<div class="hero-content">
  <div class="hero-image-container">
    <img src="images/profile/profile-fabio-dasaro.jpg"
         alt="Fabio Aurelio D'Asaro, Postdoctoral Researcher in Logic"
         class="hero-profile-photo"
         width="200"
         height="200"
         loading="eager">
  </div>
  <div class="hero-text-container">
    <h1>Name</h1>
    <p class="hero-subtitle">Title</p>
  </div>
</div>
```

#### Lazy Loading (Content Images)
```html
<img src="images/research/diagram-example.jpg"
     alt="Detailed description of the diagram"
     loading="lazy"
     width="800"
     height="600">
```

#### Responsive Images
```html
<img src="images/profile/profile-fabio-dasaro.jpg"
     srcset="images/profile/profile-fabio-dasaro-400w.jpg 400w,
             images/profile/profile-fabio-dasaro-800w.jpg 800w"
     sizes="(max-width: 768px) 100vw, 400px"
     alt="Description"
     loading="lazy">
```

### CSS Styling

#### Profile Photo
```css
.hero-profile-photo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--color-accent-primary);
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-profile-photo:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(139, 0, 0, 0.3);
}
```

#### Institutional Logos
```css
.institution-logo {
  max-width: 150px;
  max-height: 80px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.institution-logo:hover {
  filter: grayscale(0%);
  opacity: 1;
}
```

### Accessibility

#### Alt Text Requirements
1. **Profile photos:** Include name and role
   ```html
   alt="Fabio Aurelio D'Asaro, Postdoctoral Researcher in Logic"
   ```

2. **Logos:** Include institution name
   ```html
   alt="University of Salento logo"
   ```

3. **Diagrams:** Provide detailed description OR link to text alternative
   ```html
   alt="Event Calculus diagram showing temporal reasoning flow from actions to fluents"
   ```

4. **Decorative images:** Use empty alt
   ```html
   alt=""
   ```

#### ARIA Labels
For complex images with associated descriptions:
```html
<figure role="figure" aria-labelledby="diagram-caption">
  <img src="images/research/complex-diagram.jpg" alt="">
  <figcaption id="diagram-caption">
    Detailed explanation of the diagram...
  </figcaption>
</figure>
```

### Favicon Setup

#### Required Files
- `favicon-512x512.png` - Android Chrome
- `favicon-192x192.png` - Android Chrome
- `favicon-32x32.png` - Modern browsers
- `favicon-16x16.png` - Legacy browsers
- `apple-touch-icon.png` (180x180) - iOS
- `site.webmanifest` - PWA support

#### HTML Integration
```html
<link rel="icon" type="image/png" sizes="512x512" href="images/favicon/favicon-512x512.png">
<link rel="icon" type="image/png" sizes="192x192" href="images/favicon/favicon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="images/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="images/favicon/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="images/favicon/apple-touch-icon.png">
<link rel="manifest" href="images/favicon/site.webmanifest">
```

### Design Guidelines

#### Academic & Professional Aesthetic
- **Profile photos:** Professional headshot, neutral background
- **Logos:** Use official institutional assets
- **Research images:** Clean diagrams with high contrast
- **Color scheme:** Match site colors (dark red #8B0000, white, black)

#### Consistency
- All profile photos: Circular crop, 200x200 display size
- All logos: Grayscale default, color on hover
- All diagrams: High contrast, readable at small sizes
- Consistent borders and shadows matching site design

### Performance

#### Loading Strategy
1. **Above the fold (hero):** `loading="eager"` for profile photo
2. **Below the fold:** `loading="lazy"` for all other images
3. **Preload critical images:**
   ```html
   <link rel="preload" as="image" href="images/profile/profile-fabio-dasaro.jpg">
   ```

#### Image Optimization Checklist
- [ ] All images compressed
- [ ] Proper format selected (JPEG/PNG/SVG)
- [ ] Dimensions appropriate for use case
- [ ] Alt text provided
- [ ] Width/height attributes set (prevent layout shift)
- [ ] Lazy loading configured
- [ ] Responsive sizes defined if needed

---

## Common Tasks

### 1. Add New Publication

**File:** `data/publications.json`

```json
{
  "all": [
    {
      "id": "unique-id-2025",
      "title": "Paper Title",
      "authors": ["F. A. D'Asaro", "Coauthor"],
      "year": 2025,
      "venue": "Conference Name",
      "type": "conference",
      "doi": "10.xxxx/xxxx",
      "url": "https://...",
      "pdf": "path/to.pdf",
      "bibtex": "@inproceedings{...}",
      "tags": ["tag1", "tag2"],
      "open_access": true
    }
  ]
}
```

If it's a **featured publication**, also add to `selected` array.

### 2. Add New Course

**File:** `data/teaching.json`

```json
{
  "current_courses": [
    {
      "title": "Course Name",
      "code": "COURSE-123",
      "institution": "University",
      "level": "MSc",
      "program": "Program Name",
      "year_start": 2025,
      "year_end": "present",
      "description": "Course description"
    }
  ]
}
```

### 3. Update Scholar Metrics

**File:** `data/personal.json`

```json
{
  "scholar_metrics": {
    "citations": 250,
    "h_index": 11,
    "i10_index": 11,
    "last_updated": "2025-12-01"
  }
}
```

### 4. Update Cache Version

**After ANY CSS/JS changes:**

1. Find all `?v=XX` in HTML files
2. Increment: `?v=32` → `?v=33`
3. Update **ALL** occurrences consistently

```bash
# Find all cache versions
grep -r "?v=" *.html

# Update in all files
# (Manual or with sed)
```

### 5. Test Changes Locally

```bash
# Start local server
python3 -m http.server 8080

# Open in browser
open http://localhost:8080

# Check:
# - Console for errors
# - All pages load
# - Data displays correctly
# - Responsive design works
```

### 6. Deploy to GitHub Pages

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: Add new publication"

# Push to GitHub (automatically deploys)
git push origin main

# Verify live site (wait 1-2 minutes)
open https://dasaro.github.io
```

---

## Troubleshooting

### Data Not Loading

**Symptoms:**
- "Loading..." message persists
- Console shows errors
- Empty sections

**Checklist:**
1. ✅ Check browser console for errors
2. ✅ Validate JSON syntax: `cat data/file.json | python3 -m json.tool`
3. ✅ Verify container ID matches JavaScript: `getElementById('...')`
4. ✅ Check file path is correct: `./data/file.json`
5. ✅ Look in Network tab for 404 errors
6. ✅ Add debug logging:
```javascript
console.log('[Debug] Data:', data);
console.log('[Debug] Container:', container);
```

### Styling Not Applied

**Symptoms:**
- Styles don't update
- Old styles persist
- New classes don't work

**Checklist:**
1. ✅ Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. ✅ Check cache version updated: `?v=XX`
3. ✅ Verify CSS selector specificity
4. ✅ Check for CSS syntax errors
5. ✅ Inspect element in DevTools
6. ✅ Look for conflicting styles

### Animation Not Working

**Symptoms:**
- Background animation frozen
- Animation toggle not working
- Console errors

**Checklist:**
1. ✅ Check console for JavaScript errors
2. ✅ Verify animation extends `AnimationBase`
3. ✅ Ensure `super()` called in constructor
4. ✅ Check canvas element exists: `<canvas id="bg-animation-canvas">`
5. ✅ Verify animation registered in `AnimationController`
6. ✅ Check for errors in `animate()` method

### Research Interests Not Visible

**KNOWN ISSUE:** Scroll animation timing

**Cause:** Cards created dynamically after `IntersectionObserver` initialized

**Solution:** Add `.visible` class when creating cards:
```javascript
// ✅ Correct
const html = data.map(item => `
  <div class="card scroll-animate visible">
    Content
  </div>
`).join('');
```

---

## Testing Checklist

### Before Every Deployment

**Functionality:**
- [ ] All pages load without errors
- [ ] No console errors or warnings
- [ ] All data displays correctly
- [ ] Search functionality works (publications page)
- [ ] Filter functionality works (publications page)
- [ ] All internal links work
- [ ] All external links work
- [ ] Background animations work
- [ ] Animation toggle works
- [ ] Navigation menu works on mobile

**Content:**
- [ ] No hardcoded content in HTML
- [ ] All text loads from JSON
- [ ] Scholar metrics display correctly
- [ ] Recent publications show (max 3 on home)
- [ ] All sections have content
- [ ] Loading messages don't persist

**Responsive Design:**
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768-1023px)
- [ ] Test on desktop (>= 1024px)
- [ ] Navigation menu works on all sizes
- [ ] Grids reflow correctly
- [ ] No horizontal scrolling
- [ ] Touch targets large enough (mobile)

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] All images have alt text
- [ ] ARIA labels where needed
- [ ] Color contrast sufficient
- [ ] Screen reader compatible

**Performance:**
- [ ] Page loads in < 2 seconds
- [ ] Animations smooth (60fps)
- [ ] No layout shifts
- [ ] Images optimized
- [ ] Cache headers correct

**Browser Testing:**
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Validation Tools

- **HTML:** https://validator.w3.org/
- **CSS:** https://jigsaw.w3.org/css-validator/
- **JSON:** https://jsonlint.com/
- **Performance:** https://pagespeed.web.dev/

---

## Critical Rules

### NEVER ❌

1. **❌ Hardcode content in HTML**
   - All dynamic content must come from JSON
   - HTML should only have structure and placeholders

2. **❌ Use inline styles** (except dynamic JS manipulation)
   - All styling in CSS files
   - Use classes, not `style="..."`

3. **❌ Load scripts in wrong order**
   - main.js must be first
   - Page-specific scripts only on their pages
   - Inline scripts always last

4. **❌ Forget null checks**
   - Always check `if (element)` before using
   - Always check `if (data)` before accessing

5. **❌ Forget try-catch on async functions**
   - Every `async function` needs try-catch
   - Every `await` should be in try-catch

6. **❌ Use different cache versions**
   - All scripts on a page must have same `?v=XX`
   - Update all files when incrementing

7. **❌ Load publications.js globally**
   - Only on `publications.html`
   - Causes errors on other pages

8. **❌ Commit without testing**
   - Always test locally first
   - Check console for errors
   - Verify on mobile

9. **❌ Use single quotes in JSON**
   - JSON requires double quotes `"`
   - Single quotes `'` cause syntax errors

10. **❌ Skip SCHEMAS.md when changing JSON**
    - Always check schema documentation
    - Validate required fields exist
    - Match expected data types

### ALWAYS ✅

1. **✅ Load data from JSON**
   - Use `loadJSON()` from utils.js
   - Handle null return value

2. **✅ Check if elements exist**
   - Use `getElement()` from utils.js
   - Or check `if (element)` inline

3. **✅ Handle errors gracefully**
   - try-catch on all async
   - Log errors to console
   - Show user-friendly messages

4. **✅ Use consistent naming conventions**
   - kebab-case for IDs and classes
   - camelCase for JavaScript variables
   - PascalCase for classes

5. **✅ Update cache version after changes**
   - Increment `?v=XX` after any CSS/JS edit
   - Update all HTML files consistently

6. **✅ Test locally before deploying**
   - Run local server
   - Check all pages
   - Verify console is clean

7. **✅ Add descriptive console logs**
   - `[Module] Message` format
   - Use ✓/✅/❌ emoji indicators
   - Include context and data counts

8. **✅ Document new features**
   - Update SCHEMAS.md for JSON changes
   - Update COMPONENTS.md for new CSS
   - Update this file for new patterns

9. **✅ Use CSS variables**
   - Never hardcode colors
   - Never hardcode spacing
   - Reference variables: `var(--name)`

10. **✅ Follow accessibility standards**
    - Semantic HTML
    - Alt text on images
    - Keyboard navigation
    - ARIA labels where needed

---

## Performance Guidelines

### Optimization Checklist

**JavaScript:**
- Minimize DOM manipulation
- Use `DocumentFragment` for multiple insertions
- Debounce search inputs (use `utils.debounce()`)
- Cache DOM queries in variables
- Use `requestAnimationFrame` for animations

**CSS:**
- Use CSS transforms for animations (GPU accelerated)
- Minimize reflows and repaints
- Use `will-change` for animated properties
- Avoid `!important` (hard to override)

**Images:**
- Compress all images
- Use appropriate formats (WebP when possible)
- Lazy load images below fold
- Provide width/height to prevent layout shift

**Loading:**
- Defer non-critical JavaScript
- Use cache headers effectively
- Minimize HTTP requests
- Load fonts efficiently

---

## Security Guidelines

### XSS Prevention

**✅ Always escape user input:**
```javascript
import { escapeHtml } from './js/utils.js';

const safe = escapeHtml(userInput);
element.innerHTML = `<p>${safe}</p>`;
```

**✅ Use textContent for user data:**
```javascript
element.textContent = userInput;  // ✅ Safe
```

**❌ Never use innerHTML with user input:**
```javascript
element.innerHTML = userInput;  // ❌ XSS vulnerability
```

### Data Validation

**Validate data types:**
```javascript
if (typeof item.year === 'number' && item.year > 1900) {
  // Use it
}
```

**Sanitize URLs:**
```javascript
if (item.url && item.url.startsWith('http')) {
  // Safe to use
}
```

**Validate emails:**
```javascript
import { isValidEmail } from './js/utils.js';

if (isValidEmail(email)) {
  // Process email
}
```

---

## Git Workflow

### Commit Message Format

```
Type: Brief description (max 50 chars)

- Detailed change 1
- Detailed change 2
- Detailed change 3

Refs: #issue (if applicable)
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code restructure (no behavior change)
- `style` - CSS/visual changes
- `docs` - Documentation only
- `chore` - Maintenance (dependencies, config)
- `perf` - Performance improvement

**Examples:**
```
feat: Add topic filtering to publications page

- Implement topic dropdown with groups
- Add client-side filtering logic
- Update publications.js with topic groups
- Add URL parameter persistence

fix: Research interests not displaying on home page

- Add .visible class to dynamically created cards
- Fix scroll animation timing issue
- Add logging for debugging

refactor: Extract utilities to utils.js module

- Create shared utility functions
- Migrate loadJSON() to utils.js
- Migrate formatters to utils.js
- Update all pages to import utils
```

### Deployment Process

1. **Make changes locally**
2. **Test thoroughly** (use checklist above)
3. **Update cache version** if CSS/JS changed
4. **Commit with descriptive message**
5. **Push to GitHub:** `git push origin main`
6. **Verify deployment** (wait 1-2 minutes)
7. **Test live site**
8. **Check console** on live site

---

## Maintenance Schedule

### Monthly Tasks
- [ ] Update scholar metrics (`personal.json`)
- [ ] Check for broken links (all pages)
- [ ] Review and update news section
- [ ] Check for security updates (dependencies)

### Quarterly Tasks
- [ ] Update CV information
- [ ] Review and update publications
- [ ] Check all data files for accuracy
- [ ] Performance audit (PageSpeed)
- [ ] Accessibility audit

### Annually Tasks
- [ ] Major content review
- [ ] Design refresh (if needed)
- [ ] Archive old news items
- [ ] Full security audit
- [ ] Update copyright year

---

## Resources

### Documentation
- **MDN Web Docs:** https://developer.mozilla.org/
- **HTML Validator:** https://validator.w3.org/
- **CSS Validator:** https://jigsaw.w3.org/css-validator/
- **JSON Validator:** https://jsonlint.com/

### Internal Documentation
- **JSON Schemas:** `data/SCHEMAS.md`
- **Component Library:** `css/COMPONENTS.md`
- **Audit Report:** `BUGS_FOUND.md`
- **Public README:** `README.md`

### Tools
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **WAVE Accessibility:** https://wave.webaim.org/
- **Can I Use:** https://caniuse.com/

### Contact
- **Email:** fabioaurelio.dasaro@unisalento.it
- **GitHub:** https://github.com/dasaro
- **Website:** https://dasaro.github.io

---

## Quick Reference

```bash
# Start local development server
python3 -m http.server 8080
open http://localhost:8080

# Validate JSON syntax
cat data/personal.json | python3 -m json.tool

# Check Git status
git status
git diff

# Deploy changes
git add .
git commit -m "Type: Description"
git push origin main

# View live site
open https://dasaro.github.io
```

### Common File Locations

| Task | File Location |
|------|---------------|
| Add publication | `data/publications.json` |
| Update metrics | `data/personal.json` |
| Add course | `data/teaching.json` |
| Add project | `data/projects.json` |
| Update contact | `data/personal.json` |
| Check schema | `data/SCHEMAS.md` |
| Find component | `css/COMPONENTS.md` |
| Use utility | `js/utils.js` |

---

**Last Updated:** October 2025
**Version:** 2.0
**Architecture Status:** ✅ Production-Ready
**Audit Status:** ✅ Passed (see BUGS_FOUND.md)

---

## Version History

- **v2.0 (October 2025)** - Complete architectural documentation
  - Replaced "build steps" with "maintain standards"
  - Added utils.js utility library
  - Created SCHEMAS.md and COMPONENTS.md
  - Performed comprehensive audit
  - Established coding standards

- **v1.0 (Initial)** - Original build documentation
  - Step-by-step build guide
  - Phase-based development plan

---

**🎯 This is the definitive reference for maintaining and extending the website.**
