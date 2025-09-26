# Unified Design System Plan

## Design Principles
1. **Academic Professionalism**: Clean, readable, scholarly aesthetic
2. **Visual Consistency**: Single design language across all sections
3. **Accessibility First**: WCAG 2.1 AA compliance built-in
4. **Performance Optimized**: Minimal CSS, efficient rendering
5. **Maintainable**: Clear component hierarchy, easy to update

## Typography System (Simplified)

### Font Stack
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
--font-heading: 'Crimson Text', 'Times New Roman', serif;
```

### Font Scale (6 sizes only)
```css
--text-xs: 0.75rem;    /* 12px - metadata */
--text-sm: 0.875rem;   /* 14px - secondary text */
--text-base: 1rem;     /* 16px - body text */
--text-lg: 1.125rem;   /* 18px - large body */
--text-xl: 1.25rem;    /* 20px - small headings */
--text-2xl: 1.5rem;    /* 24px - main headings */
```

### Line Heights (3 values only)
```css
--leading-tight: 1.4;  /* headings */
--leading-normal: 1.5; /* body text */
--leading-relaxed: 1.6; /* long-form content */
```

## Color System (Academic Palette)

### Core Colors (5 maximum)
```css
--color-primary: #2c3e50;      /* Deep blue-gray */
--color-secondary: #34495e;    /* Medium blue-gray */
--color-accent: #3498db;       /* Professional blue */
--color-success: #27ae60;      /* Academic green */
--color-warning: #f39c12;      /* Academic orange */
```

### Neutral Scale (4 values)
```css
--color-white: #ffffff;
--color-gray-100: #f8f9fa;     /* Light background */
--color-gray-500: #6c757d;     /* Medium text */
--color-gray-900: #212529;     /* Dark text */
```

### Semantic Colors
```css
--text-primary: var(--color-gray-900);
--text-secondary: var(--color-gray-500);
--bg-primary: var(--color-white);
--bg-secondary: var(--color-gray-100);
```

## Component System (Unified)

### 1. Universal Card Component
```css
.card {
  background: var(--bg-primary);
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  transform: translateY(-2px);
}
```

### 2. Unified Badge System
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  font-size: var(--text-xs);
  font-weight: 600;
  border-radius: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge--primary { background: var(--color-primary); color: white; }
.badge--secondary { background: var(--color-secondary); color: white; }
.badge--accent { background: var(--color-accent); color: white; }
.badge--success { background: var(--color-success); color: white; }
.badge--warning { background: var(--color-warning); color: white; }
```

### 3. Universal Grid System
```css
.grid {
  display: grid;
  gap: 1.5rem;
}

.grid--1 { grid-template-columns: 1fr; }
.grid--2 { grid-template-columns: repeat(2, 1fr); }
.grid--3 { grid-template-columns: repeat(3, 1fr); }
.grid--auto { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }

@media (max-width: 768px) {
  .grid--2, .grid--3, .grid--auto {
    grid-template-columns: 1fr;
  }
}
```

## Section Layouts (Standardized)

### Academic Section Template
```html
<section class="section">
  <header class="section-header">
    <h2 class="section-title">Section Name</h2>
    <p class="section-subtitle">Optional description</p>
  </header>

  <div class="grid grid--auto">
    <article class="card">
      <!-- Content -->
    </article>
  </div>
</section>
```

### Publication Type System (Simplified)
```css
.type-chip {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
}

.type-chip--journal { background: #e8f5e8; color: #2d5a2d; }
.type-chip--conference { background: #e3f2fd; color: #1565c0; }
.type-chip--book { background: #f3e5f5; color: #7b1fa2; }
.type-chip--preprint { background: #f5f5f5; color: #616161; }
```

## Spacing System (Mathematical Scale)
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
```

## Shadow System (3 levels)
```css
--shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
--shadow-md: 0 4px 12px rgba(0,0,0,0.12);
--shadow-lg: 0 10px 25px rgba(0,0,0,0.15);
```

## Implementation Strategy

### Phase 1: Core System (30 minutes)
1. Replace CSS variables with unified system
2. Create base component classes (card, badge, grid)
3. Establish typography hierarchy

### Phase 2: Component Migration (45 minutes)
1. Replace all card variants with unified `.card`
2. Replace all badge systems with unified `.badge`
3. Replace all grid systems with unified `.grid`

### Phase 3: Section Updates (30 minutes)
1. Update each section to use new components
2. Remove duplicate/conflicting styles
3. Standardize spacing and typography

### Phase 4: Cleanup & Optimization (15 minutes)
1. Remove unused CSS (estimated 1000+ lines)
2. Optimize selectors and reduce specificity
3. Test responsive behavior

## Expected Results
- **CSS Reduction**: 2,848 → ~1,400 lines (50% reduction)
- **Component Unification**: 50+ variants → 15 core components
- **Visual Consistency**: All sections follow same design patterns
- **Better Performance**: Faster CSS parsing, fewer repaints
- **Maintainability**: Clear component system, easy updates

## Accessibility Improvements
- **Color Contrast**: All combinations meet WCAG AA standards
- **Focus States**: Consistent focus styling across components
- **Typography**: Improved readability with unified line heights
- **Spacing**: Mathematical spacing scale improves visual hierarchy

## Professional Academic Aesthetic
- **Typography**: Scholarly font pairing (Inter + Crimson Text)
- **Colors**: Muted, professional academic palette
- **Spacing**: Clean, generous whitespace for readability
- **Components**: Consistent visual language throughout
- **Hover Effects**: Subtle, professional interactions