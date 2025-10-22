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
