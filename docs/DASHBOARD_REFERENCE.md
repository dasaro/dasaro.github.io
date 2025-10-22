# Research Dashboard - Quick Reference Guide

**Version:** 3.0 (Complete)
**Location:** Home page (`index.html`)
**Last Updated:** 2025-10-22

---

## Overview

The Research Dashboard is an interactive data visualization component that displays:
- Quick statistics (publications, articles, papers, years active)
- Publications timeline chart (bar chart by year)
- Citation metrics (citations, h-index, i10-index)
- Research topics cloud (top 12 most-used tags)

---

## Files Structure

```
dasaro.github.io/
├── index.html                    # Dashboard HTML structure
├── css/
│   └── main.css                  # Dashboard styles (lines 807-1243)
├── js/
│   └── ResearchDashboard.js      # Dashboard logic (635 lines)
├── data/
│   ├── personal.json             # Scholar metrics data
│   └── publications.json         # Publications data
└── docs/
    └── DASHBOARD_REFERENCE.md    # This file
```

---

## Quick Start

### 1. Data Requirements

The dashboard requires two JSON files:

**`data/personal.json`:**
```json
{
  "scholar_metrics": {
    "citations": 227,
    "h_index": 10,
    "i10_index": 10,
    "last_updated": "2025-09-16"
  }
}
```

**`data/publications.json`:**
```json
{
  "all": [
    {
      "year": 2025,
      "type": "journal|conference|workshop|book-chapter|preprint",
      "tags": ["logic", "reasoning", "argumentation"]
    }
  ]
}
```

### 2. HTML Structure

```html
<section id="research-overview" class="section">
  <div class="container">
    <h2 class="section-title">Research at a Glance</h2>

    <!-- Quick Stats -->
    <div id="quick-stats-container" class="quick-stats"></div>

    <!-- Dashboard Grid -->
    <div class="research-dashboard">
      <!-- Timeline Card -->
      <div class="dashboard-card timeline-card">
        <h3 class="dashboard-card-title">Publications Over Time</h3>
        <canvas id="publications-timeline" class="chart-canvas"></canvas>
      </div>

      <!-- Metrics Card -->
      <div class="dashboard-card metrics-card">
        <h3 class="dashboard-card-title">Citation Metrics</h3>
        <div class="metrics-grid"><!-- Metrics --></div>
      </div>

      <!-- Topics Card -->
      <div class="dashboard-card topics-card">
        <h3 class="dashboard-card-title">Research Topics</h3>
        <div id="topics-cloud" class="topics-cloud"></div>
      </div>
    </div>
  </div>
</section>
```

### 3. JavaScript Initialization

```html
<script type="module" src="js/ResearchDashboard.js?v=32"></script>
```

The dashboard auto-initializes on page load. No manual setup required.

---

## Features

### 📊 Quick Statistics Cards

**What it shows:**
- Total publications count
- Journal articles count
- Conference papers count
- Years active range (e.g., "2015–2025")

**Visual:**
- 4-column grid on desktop
- 2×2 grid on mobile
- Emoji icons
- Staggered fade-in animation
- Hover effect (lift + shadow)

### 📈 Publications Timeline Chart

**What it shows:**
- Bar chart of publications per year
- X-axis: Years
- Y-axis: Publication count
- Gradient bars (dark red → light red)

**Interactions:**
- **Hover:** Shows tooltip with year, count, and publication breakdown
- **Click:** Navigates to `publications.html?year=YYYY`
- Pointer cursor indicates clickability

**Chart Rendering:**
- Custom canvas-based (no external libraries)
- Responsive (redraws on window resize)
- Debounced resize handler (250ms)

### 📊 Citation Metrics

**What it shows:**
- Citations count with progress bar
- h-index with progress bar
- i10-index with progress bar
- Last updated date

**Progress Bars:**
- Animated fill (0.5s smooth transition)
- Sequential animation (100ms delay between bars)
- Gradient fill (dark red → light red)
- Percentages relative to max values:
  - Citations: max 500
  - h-index: max 20
  - i10-index: max 20

### 🏷️ Research Topics Cloud

**What it shows:**
- Top 12 most-used publication tags
- Publication count per tag (e.g., "logic (5)")
- Clickable tags

**Interactions:**
- **Click:** Navigates to `publications.html?tag=topic-name`
- **Hover:** Background changes to dark red, text white
- **Active:** Button pushes down 1px

---

## User Interactions

### Timeline Chart Interactions

**1. Hover to See Details:**
```
User hovers over bar
↓
Tooltip appears showing:
  • Year (e.g., "2023")
  • Count (e.g., "5 publications")
  • Breakdown (e.g., "3 conference, 2 journal")
  • "Click to view" hint
```

**2. Click to Filter:**
```
User clicks bar
↓
Navigate to: publications.html?year=2023
↓
Publications page shows only 2023 publications
```

### Topic Tags Interactions

```
User clicks topic tag "logic"
↓
Navigate to: publications.html?tag=logic
↓
Publications page shows only logic-tagged publications
```

---

## States

### Loading State

**Before data loads:**
- Quick stats show 4 skeleton cards
- Shimmer animation (1.5s loop)
- Spinning loader icon
- Timeline card shows "Loading chart..." text

### Loaded State

**After data loads:**
- Skeletons replaced with real stat cards
- Timeline chart renders
- Metrics populate with real values
- Progress bars animate
- Topics cloud generates

### Error State

**If data loading fails:**
```
┌─────────────────────────────────┐
│  ⚠️ Unable to load research data │
│                                 │
│  Please refresh the page or     │
│  check back later.              │
└─────────────────────────────────┘
```

---

## Animations

### 1. Page Load Sequence

```
1. Skeleton loaders appear (instant)
2. Data loads (async)
3. Stat cards fade in (staggered: 0s, 0.1s, 0.2s, 0.3s)
4. Timeline chart renders
5. Progress bars animate (sequential: 100ms apart)
6. Topics cloud renders
```

### 2. Scroll Animation

```
User scrolls to dashboard section
↓
IntersectionObserver triggers
↓
.in-view class added
↓
Dashboard fades in (opacity 0 → 1)
Dashboard slides up (translateY 30px → 0)
Transition: 0.6s ease
```

### 3. Interactive Animations

- **Stat cards:** Fade in from bottom (20px translate)
- **Progress bars:** Width animates 0% → target% (0.5s)
- **Topic tags:** Hover transforms background/color
- **Chart:** Slight opacity change on hover

---

## Responsive Behavior

### Mobile (< 768px)

```
┌──────────────┐
│ Quick Stats  │  (2×2 grid)
│ [📚][📄]     │
│ [🎤][📅]     │
├──────────────┤
│ Timeline     │  (full width, height: 250px)
├──────────────┤
│ Metrics      │  (1 column)
├──────────────┤
│ Topics       │  (full width)
└──────────────┘
```

### Tablet (768px+)

```
┌──────────────┬──────────────┐
│ Quick Stats (4 columns)    │
│ [📚][📄][🎤][📅]           │
├──────────────┼──────────────┤
│ Timeline     │ Metrics      │
│ (height:300) │ (3 columns)  │
├──────────────┼──────────────┤
│ Topics       │              │
└──────────────┴──────────────┘
```

### Desktop (1024px+)

```
┌──────────────────────────┬──────────────┐
│ Quick Stats (4 columns)                 │
│ [📚][📄][🎤][📅]                        │
├──────────────────────────┼──────────────┤
│ Timeline (spans 2 cols)  │ Metrics      │
│ (height: 350px)          │ (3 columns)  │
│                          ├──────────────┤
│                          │ Topics       │
└──────────────────────────┴──────────────┘
```

---

## JavaScript API

### ResearchDashboard Class

**Constructor:**
```javascript
constructor() {
  this.personalData = null;      // From personal.json
  this.publicationsData = null;  // From publications.json
  this.stats = null;             // Calculated statistics
  this.chartBars = [];           // Bar coordinates for hit detection
  this.tooltip = null;           // Tooltip DOM element
  this.isLoading = true;         // Loading state
}
```

**Public Methods:**
```javascript
async init()                  // Initialize dashboard
async loadData()              // Load JSON files
calculateStats()              // Process publication data
renderQuickStats()            // Render 4 stat cards
renderTimeline()              // Draw canvas chart
renderMetrics()               // Update citation metrics
renderTopicsCloud()           // Generate topic tags
```

**Interactive Methods:**
```javascript
setupTooltip()                // Create tooltip element
setupChartInteractivity()     // Add event listeners
handleChartHover(e)           // Show tooltip on hover
handleChartClick(e)           // Navigate on click
hideTooltip()                 // Hide tooltip
```

**State Methods:**
```javascript
showLoadingStates()           // Display skeletons
showErrorState()              // Show error UI
setupScrollAnimations()       // IntersectionObserver
```

**Utility Methods:**
```javascript
getPublicationBreakdown(year) // Get publication types for year
animateProgressBars(metrics)  // Animate metric bars
handleResize()                // Responsive chart resize
```

---

## Customization

### Adjusting Max Values for Progress Bars

Edit `ResearchDashboard.js` line 529:

```javascript
animateProgressBars(metrics) {
  const maxCitations = 500;  // Adjust based on your field
  const maxHIndex = 20;      // Adjust based on career stage
  const maxI10Index = 20;    // Adjust based on career stage
  // ...
}
```

### Changing Number of Topic Tags

Edit `ResearchDashboard.js` line 585:

```javascript
const topTags = tags
  .map(tag => ({ tag, count: tagCounts[tag] || 0 }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 12);  // Change 12 to desired number
```

### Modifying Chart Colors

Edit `ResearchDashboard.js` lines 294-295:

```javascript
const gradient = ctx.createLinearGradient(x, y, x, height - padding);
gradient.addColorStop(0, '#8B0000');  // Dark red
gradient.addColorStop(1, '#CD5C5C');  // Light red
```

### Adjusting Scroll Animation Threshold

Edit `ResearchDashboard.js` lines 477-479:

```javascript
const observer = new IntersectionObserver((entries) => {
  // ...
}, {
  threshold: 0.1,               // Change threshold (0-1)
  rootMargin: '0px 0px -50px 0px'  // Adjust trigger point
});
```

---

## Performance

### Optimizations

1. **Single Tooltip Element** - Created once, reused for all hovers
2. **Debounced Resize** - Chart redraws limited to once per 250ms
3. **IntersectionObserver** - Efficient scroll detection (no scroll events)
4. **CSS Animations** - GPU-accelerated (transform/opacity)
5. **Sequential Progress Bars** - 100ms stagger prevents layout thrashing
6. **Lazy Bar Animations** - 300ms delay after data load

### Load Time

- **First Paint:** ~100ms (skeleton loaders appear)
- **Data Load:** ~200-500ms (depends on network)
- **Chart Render:** ~50ms (canvas drawing)
- **Total Interactive:** ~400-650ms

---

## Accessibility

### Keyboard Navigation

- Topic tags: Focusable with Tab key
- Chart canvas: Focusable (outline appears)

### Focus Indicators

```css
.topic-tag:focus, .chart-canvas:focus {
  outline: 2px solid var(--color-link);  /* Red outline */
  outline-offset: 2px;
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled */
  .skeleton, .stat-card, #research-overview {
    animation: none !important;
    transition: none !important;
  }
}
```

### Screen Reader Support

- Semantic HTML structure (`<section>`, `<h3>`, etc.)
- Meaningful labels (stat-label, metric-label)
- ARIA-compatible data attributes

---

## Troubleshooting

### Dashboard Not Appearing

**Check:**
1. Console for JavaScript errors
2. JSON files load correctly (Network tab)
3. `#research-overview` element exists in HTML
4. ResearchDashboard.js loaded as module

### Tooltip Not Showing

**Check:**
1. `chartBars` array populated (check console log)
2. Mouse coordinates correctly calculated
3. Tooltip element created (inspect DOM)
4. z-index not blocked by other elements

### Chart Not Rendering

**Check:**
1. Canvas element exists: `<canvas id="publications-timeline">`
2. Canvas context obtained (2d)
3. Publications data has `year` field
4. `calculateStats()` ran successfully

### Progress Bars Not Animating

**Check:**
1. Scholar metrics exist in personal.json
2. Metric elements have correct data attributes
3. CSS transition property not overridden
4. JavaScript sets width style correctly

### Loading States Stuck

**Check:**
1. JSON files exist and are valid
2. Fetch requests succeed (Network tab)
3. No CORS errors
4. `.loading` class removed after render

---

## Browser Support

### Tested Browsers

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

### Required Features

- ES6 Modules (`import`/`export`)
- Async/await
- Canvas API
- IntersectionObserver
- CSS Grid
- CSS Custom Properties (variables)

### Fallbacks

- **No JavaScript:** Skeleton loaders remain visible
- **No IntersectionObserver:** Dashboard appears immediately (no fade-in)
- **Reduced Motion:** All animations disabled automatically

---

## Maintenance

### Updating Scholar Metrics

1. Edit `data/personal.json`
2. Update `scholar_metrics` object:
   ```json
   {
     "citations": 250,
     "h_index": 12,
     "i10_index": 12,
     "last_updated": "2025-12-01"
   }
   ```
3. Save and deploy
4. Dashboard updates automatically on next page load

### Adding Publications

1. Edit `data/publications.json`
2. Add new publication to `all` array
3. Ensure `year`, `type`, and `tags` fields present
4. Save and deploy
5. Dashboard recalculates stats automatically

### Changing Dashboard Position

Move the `<section id="research-overview">` block in `index.html` to desired location. Styles and JavaScript will continue to work.

---

## Future Enhancements

### Planned Features

- [ ] Export chart as PNG image
- [ ] Multiple chart types (line, pie)
- [ ] Zoom functionality for timeline
- [ ] Citations over time trend chart
- [ ] Co-author network visualization

### Optional Improvements

- [ ] Downloadable data (CSV export)
- [ ] Share metrics feature
- [ ] Compare with field averages
- [ ] Service worker (offline support)
- [ ] Progressive Web App (PWA)

---

## Support

**Documentation:**
- COMPONENTS.md - Component reference
- CLAUDE.md - Architectural standards
- SCHEMAS.md - Data schema definitions

**Contact:**
- Email: fabioaurelio.dasaro@unisalento.it
- GitHub: https://github.com/dasaro/dasaro.github.io

---

**Last Updated:** 2025-10-22
**Version:** 3.0 (Complete)
