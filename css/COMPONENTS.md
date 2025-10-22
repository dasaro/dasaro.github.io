# CSS Component Library

**Version:** 1.0
**Last Updated:** October 2025

This document catalogs all reusable CSS components and utility classes.

---

## Table of Contents

1. [Cards](#cards)
2. [Badges](#badges)
3. [Buttons](#buttons)
4. [Grids & Layout](#grids--layout)
5. [Typography](#typography)
6. [Animations](#animations)
7. [Utility Classes](#utility-classes)

---

## Cards

### Base Card

**Class:** `.card`

**Usage:**
```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>
```

**Styling:**
- White background with subtle transparency
- 1px border with light gray color
- 8px border radius
- Padding: `var(--space-lg)`
- Hover: Elevated shadow, stronger border

**Variants:**
- No specific variants, but cards adapt to content

---

### Publication Card

**Class:** `.publication-card`

**Usage:**
```html
<div class="publication-card">
  <h3>Publication Title</h3>
  <p class="publication-authors">Author 1, <strong>F. A. D'Asaro</strong>, Author 2</p>
  <p class="publication-venue"><strong>Venue Name</strong> (2025)</p>
  <div class="publication-links">
    <a href="#">DOI</a>
    <a href="#">PDF</a>
  </div>
</div>
```

**Sub-elements:**
- `.publication-authors` - Author list
- `.publication-venue` - Venue and year
- `.publication-links` - Links to DOI, PDF, etc.

---

### Course Card

**Class:** `.course-card`

**Usage:**
```html
<div class="course-card">
  <h3>Course Title</h3>
  <div class="course-meta">
    <strong>Institution:</strong> University Name
  </div>
  <div class="course-meta">
    <strong>Level:</strong> MSc
  </div>
  <p class="course-description">Course description...</p>
</div>
```

**Sub-elements:**
- `.course-meta` - Metadata rows
- `.course-description` - Course description text

---

### Project Card

**Class:** `.project-card`

**Usage:**
```html
<div class="project-card">
  <span class="project-status">ACTIVE</span>
  <h3>Project Name</h3>
  <div class="project-meta">
    <strong>Funding:</strong> Source
  </div>
  <p class="project-description">Description...</p>
</div>
```

**Sub-elements:**
- `.project-status` - Status badge (ACTIVE/COMPLETED)
- `.project-meta` - Metadata rows
- `.project-description` - Project description

---

## Badges

### Current/Active Badge

**Class:** `.badge-current`

**Usage:**
```html
<span class="badge-current">ACTIVE</span>
```

**Styling:**
- Dark red background (low opacity)
- Dark red text
- Small padding, rounded corners
- Monospace font

---

### Past/Completed Badge

**Class:** `.badge-past`

**Usage:**
```html
<span class="badge-past">COMPLETED</span>
```

**Styling:**
- Gray background (low opacity)
- Gray text
- Same structure as `.badge-current`

---

### Open Access Badge

**Class:** `.badge-oa`

**Usage:**
```html
<span class="badge-oa">OPEN ACCESS</span>
```

**Styling:**
- Green/teal color scheme
- Indicates open access publications

---

### Accepted Badge

**Class:** `.badge-accepted`

**Usage:**
```html
<span class="badge-accepted">ACCEPTED</span>
```

**Styling:**
- Blue color scheme
- For accepted but not yet published papers

---

## Buttons

### Base Button

**Class:** `.btn`

**Usage:**
```html
<button class="btn">Click Me</button>
<a href="#" class="btn">Link Button</a>
```

**Styling:**
- Transparent background
- 2px black border
- Padding and rounded corners
- Hover: Inverts to black background, white text

---

### Primary Button

**Class:** `.btn-primary`

**Usage:**
```html
<button class="btn btn-primary">Primary Action</button>
```

**Styling:**
- Dark red background
- White text
- Hover: Lighter red

---

### Secondary Button

**Class:** `.btn-secondary`

**Usage:**
```html
<button class="btn btn-secondary">Secondary Action</button>
```

**Styling:**
- Gray background
- Dark text
- Hover: Darker gray

---

## Grids & Layout

### Base Grid

**Class:** `.grid`

**Usage:**
```html
<div class="grid">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**Styling:**
- CSS Grid layout
- Auto-fit columns
- Responsive: Collapses to single column on mobile

---

### Two-Column Grid

**Class:** `.grid-2`

**Usage:**
```html
<div class="grid grid-2">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

**Responsive:**
- 2 columns on tablet/desktop
- 1 column on mobile

---

### Three-Column Grid

**Class:** `.grid-3`

**Usage:**
```html
<div class="grid grid-3">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

**Responsive:**
- 3 columns on desktop
- 2 columns on tablet
- 1 column on mobile

---

### Container

**Class:** `.container`

**Usage:**
```html
<div class="container">
  <h1>Page Title</h1>
  <p>Content...</p>
</div>
```

**Styling:**
- Max width: 1200px
- Centered with auto margins
- Responsive padding

---

## Typography

### Section Title

**Class:** `.section-title`

**Usage:**
```html
<h2 class="section-title">Section Title</h2>
```

**Styling:**
- Large font size
- Monospace font
- Dark color
- Bottom margin

---

### Logic Symbol

**Class:** `.logic-symbol`

**Usage:**
```html
<span class="logic-symbol">∀</span>
```

**Styling:**
- Monospace font
- Dark red color
- Used for decorative logic symbols

---

### Monospace Text

**Class:** `.monospace`

**Usage:**
```html
<span class="monospace">Code or technical text</span>
```

**Styling:**
- Fira Code monospace font
- Preserves formatting

---

## Animations

### Fade In

**Class:** `.fade-in`

**Usage:**
```html
<div class="fade-in">
  Fades in on page load
</div>
```

**Animation:**
- Opacity: 0 → 1
- Duration: 0.6s
- Timing: ease-out

---

### Fade In with Delay

**Classes:** `.fade-in-delay-1`, `.fade-in-delay-2`, etc.

**Usage:**
```html
<div class="fade-in-delay-1">Fades in after 0.2s</div>
<div class="fade-in-delay-2">Fades in after 0.4s</div>
```

**Animation:**
- Same as `.fade-in` but with incremental delays

---

### Scroll Animate

**Class:** `.scroll-animate`

**Usage:**
```html
<div class="scroll-animate">
  Animates when scrolled into view
</div>
```

**Important:** Dynamically created elements should include `.visible` class immediately:

```html
<div class="scroll-animate visible">
  Visible immediately (for dynamic content)
</div>
```

**Animation:**
- Initial: `opacity: 0`, `translateY(30px)`
- After scroll: `opacity: 1`, `translateY(0)`
- Requires JavaScript IntersectionObserver

---

## Utility Classes

### Spacing

**Margin Top:**
- `.mt-xs` - Extra small margin top
- `.mt-sm` - Small margin top
- `.mt-md` - Medium margin top
- `.mt-lg` - Large margin top
- `.mt-xl` - Extra large margin top
- `.mt-2xl` - 2X large margin top

**Margin Bottom:**
- `.mb-xs`, `.mb-sm`, `.mb-md`, `.mb-lg`, `.mb-xl`, `.mb-2xl`

**Margin Left/Right:**
- `.ml-lg`, `.mr-lg`, etc.

---

### Text Alignment

- `.text-center` - Center text
- `.text-right` - Right-align text
- `.text-left` - Left-align text (default)

---

### Text Color

- `.text-muted` - Muted gray text color
- `.text-error` - Error red text color
- `.text-success` - Success green text color

---

### Display

- `.no-data` - Styled "no data" message
- `.error-message` - Styled error message box
- `.loading-message` - Styled loading message

---

### Visibility

- `.visible` - Forces visibility (used with `.scroll-animate`)
- `.hidden` - Hides element

---

## CSS Variables Reference

### Colors

```css
--color-white: #FFFFFF;
--color-black: #1a1a1a;
--color-accent-primary: #8B0000;     /* Dark red */
--color-accent-secondary: #B22222;   /* Firebrick */
--color-text-primary: #1a1a1a;
--color-text-secondary: #4a4a4a;
--color-bg-primary: #FFFFFF;
```

### Spacing

```css
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
```

### Typography

```css
--font-body: 'Inter', sans-serif;
--font-mono: 'Fira Code', monospace;

--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
```

---

## Responsive Breakpoints

```css
/* Mobile First Approach */

/* Base styles (mobile) */
.element {
  /* Mobile styles */
}

/* Tablet and up */
@media (min-width: 768px) {
  .element {
    /* Tablet styles */
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .element {
    /* Desktop styles */
  }
}

/* Wide desktop */
@media (min-width: 1440px) {
  .element {
    /* Wide desktop styles */
  }
}
```

**Standard Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Wide: ≥ 1440px

---

## Research Dashboard Components

**Added:** Phase 1-3 (Research Dashboard Feature)
**Location:** Home page (`index.html`)
**JavaScript:** `js/ResearchDashboard.js`

### Dashboard Container

**Class:** `.research-dashboard`

**Usage:**
```html
<div class="research-dashboard">
  <!-- Dashboard cards here -->
</div>
```

**Styling:**
- CSS Grid layout
- 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- Gap: `var(--space-lg)`
- Responsive breakpoints: 768px, 1024px

---

### Dashboard Card

**Class:** `.dashboard-card`

**Usage:**
```html
<div class="dashboard-card">
  <h3 class="dashboard-card-title">Card Title</h3>
  <!-- Card content -->
</div>
```

**Styling:**
- White background with transparency (rgba(255, 255, 255, 0.85))
- 1px light border
- 8px border radius
- Padding: `var(--space-lg)`
- Hover: Elevated shadow, stronger border
- z-index: 2 (above canvas background)

**Variants:**
- `.timeline-card` - Spans 2 columns on desktop (1024px+)
- `.metrics-card` - Standard single-column card
- `.topics-card` - Standard single-column card
- `.loading` - Shows loading state with overlay

---

### Quick Stats

**Classes:** `.quick-stats`, `.stat-card`

**Usage:**
```html
<div class="quick-stats">
  <div class="stat-card">
    <div class="stat-icon">📚</div>
    <div class="stat-value">42</div>
    <div class="stat-label">Publications</div>
  </div>
</div>
```

**Styling:**
- 4-column grid (desktop)
- 2x2 grid (mobile)
- Icons: emoji, font-size `--text-3xl`
- Values: Monospace font, dark red color
- Labels: Uppercase, small, dark brown

**Animation:**
- Staggered fade-in on load
- Individual hover: lift + shadow

---

### Chart Canvas

**Class:** `.chart-canvas`

**Usage:**
```html
<canvas id="publications-timeline" class="chart-canvas"></canvas>
```

**Styling:**
- Width: 100%
- Height: 300px (mobile), 300px (tablet), 350px (desktop)
- Display: block
- Pointer cursor (clickable)
- Hover: opacity 0.9

**Interactive Features:**
- Hover: Shows tooltip with publication details
- Click: Navigates to filtered publications page

---

### Chart Tooltip

**Class:** `.chart-tooltip`

**Usage:**
```javascript
// Created dynamically by JavaScript
this.tooltip = document.createElement('div');
this.tooltip.className = 'chart-tooltip';
```

**Styling:**
- Position: fixed (follows mouse)
- Background: dark (rgba(28, 28, 28, 0.95))
- Border: red accent
- Font: Monospace (Fira Code)
- z-index: 1000
- pointer-events: none

**Content:**
- Year (strong tag, red highlight)
- Publication count
- Breakdown by type
- "Click to view" hint

---

### Metrics Grid

**Classes:** `.metrics-grid`, `.metric-item`

**Usage:**
```html
<div class="metrics-grid">
  <div class="metric-item">
    <div class="metric-icon">📊</div>
    <div class="metric-value" data-metric="citations">227</div>
    <div class="metric-label">Citations</div>
    <div class="metric-bar">
      <div class="metric-bar-fill"></div>
    </div>
  </div>
</div>
```

**Styling:**
- 1 column (mobile)
- 3 columns (tablet/desktop)
- Light red background (rgba(245, 236, 236, 0.3))
- Icons: emoji, large
- Values: Monospace, dark red
- Progress bars: 8px height, gradient fill

**Animation:**
- Progress bars animate width from 0% to target
- Sequential animation (100ms delay between bars)

---

### Progress Bar

**Classes:** `.metric-bar`, `.metric-bar-fill`

**Usage:**
```html
<div class="metric-bar">
  <div class="metric-bar-fill" style="width: 45%;"></div>
</div>
```

**Styling:**
- Container: light gray background, 8px height
- Fill: red gradient (dark → light)
- Border radius: 4px
- Transition: width 0.5s ease

**JavaScript Control:**
- Width set dynamically based on metric value
- Percentages relative to max values

---

### Topics Cloud

**Classes:** `.topics-cloud`, `.topic-tag`

**Usage:**
```html
<div class="topics-cloud">
  <a href="publications.html?tag=logic" class="topic-tag">
    logic <span style="font-size: 0.8em;">(5)</span>
  </a>
</div>
```

**Styling:**
- Flex wrap layout
- Gap: `var(--space-sm)`
- Tags: rounded pills (border-radius: 20px)
- Background: light red
- Hover: dark red background, white text
- Active state: pushes down 1px

---

### Loading States

**Class:** `.skeleton`

**Usage:**
```html
<div class="stat-card skeleton"></div>
```

**Styling:**
- Animated gradient shimmer
- Background: light red gradient
- Animation: 1.5s loop (skeleton-loading)
- Spinning loader icon (::after pseudo-element)

**Keyframes:**
```css
@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

### Error State

**Class:** `.dashboard-error`

**Usage:**
```html
<div class="dashboard-error">
  <p><strong>⚠️ Unable to load research data</strong></p>
  <p>Please refresh the page or check back later.</p>
</div>
```

**Styling:**
- Centered text
- Light red background
- Red border
- Padding: `var(--space-2xl)`

---

### Scroll Animations

**Target:** `#research-overview`

**Behavior:**
- Initial: `opacity: 0`, `translateY(30px)`
- Visible: `opacity: 1`, `translateY(0)` (when `.in-view` class added)
- Transition: 0.6s ease

**JavaScript:**
```javascript
// IntersectionObserver triggers .in-view class
const observer = new IntersectionObserver(...);
observer.observe(dashboardSection);
```

---

## Accessibility Features

### Dashboard Accessibility

1. **Keyboard Navigation:**
   - Topic tags are focusable links
   - Chart canvas is focusable

2. **Focus Indicators:**
   - 2px red outline
   - 2px offset for visibility

3. **Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  .skeleton, .stat-card, #research-overview {
    animation: none !important;
    transition: none !important;
  }
}
```

4. **Screen Reader Support:**
   - Semantic HTML structure
   - Meaningful labels
   - ARIA-compatible data attributes

---

## Dashboard Data Flow

```
1. Page Load
   ↓
2. ResearchDashboard.init()
   ↓
3. showLoadingStates() → Skeleton cards appear
   ↓
4. loadJSON() → Load personal.json + publications.json
   ↓
5. calculateStats() → Process publication data
   ↓
6. Render Components:
   - renderQuickStats() → 4 stat cards
   - renderTimeline() → Canvas chart
   - renderMetrics() → Citation metrics + progress bars
   - renderTopicsCloud() → Topic tags
   ↓
7. Setup Interactivity:
   - setupTooltip() → Create tooltip element
   - setupChartInteractivity() → Add hover/click listeners
   - setupScrollAnimations() → IntersectionObserver
   ↓
8. User Interactions:
   - Hover bar → Show tooltip
   - Click bar → Navigate to publications?year=YYYY
   - Click tag → Navigate to publications?tag=topic
```

---

## Performance Optimizations

1. **Single Tooltip Element** - Reused for all tooltips
2. **IntersectionObserver** - Efficient scroll detection
3. **CSS Animations** - GPU-accelerated (transform/opacity)
4. **Debounced Resize** - 250ms delay prevents excessive redraws
5. **Sequential Bar Animations** - 100ms stagger, not all at once

---

## Best Practices

1. **Use CSS Variables** - Always prefer variables over hardcoded values
2. **Mobile First** - Write base styles for mobile, enhance for larger screens
3. **Consistent Spacing** - Use spacing utilities instead of custom margins
4. **Semantic Classes** - Use descriptive class names that indicate purpose
5. **Avoid !important** - Only use when absolutely necessary
6. **Test Responsiveness** - Always test on mobile, tablet, and desktop

---

## Adding New Components

When creating a new component:

1. **Define purpose** - What is this component for?
2. **Create base class** - Use semantic naming (e.g., `.component-name`)
3. **Add variants** - Use BEM-like naming (e.g., `.component-name--variant`)
4. **Document** - Add to this file with usage examples
5. **Test responsiveness** - Ensure it works on all screen sizes
6. **Use variables** - Leverage existing CSS variables

---

**Questions?** Contact: fabioaurelio.dasaro@unisalento.it
