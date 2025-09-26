# CLAUDE.md - Development Guide

Guidance for Claude Code when working with this comprehensive academic website.

## Project Overview

**Live Site**: https://dasaro.github.io
**Type**: Static academic website with 15 sections, bilingual support, and admin panel
**Architecture**: Modern modular JavaScript with JSON data architecture

## Quick Start

```bash
# Development server
python3 -m http.server 8000
# Visit: http://localhost:8000

# Admin panel (localhost only)
# Visit: http://localhost:8000/admin/

# Deploy to GitHub Pages
git add -A && git commit -m "Update: [description]" && git push origin main
```

## Architecture Overview

### **File Structure**
```
/
├── index.html              # Main website
├── admin/                  # Admin panel (localhost only)
├── assets/
│   ├── css/main.css        # All styles including enhanced UI
│   └── js/
│       ├── core/           # App controller & router
│       ├── pages/          # Individual section modules
│       ├── components/     # Reusable UI components
│       └── utils/          # Data manager, i18n, utilities
├── data/                   # All content as separate JSON files
└── CLAUDE.md              # This file
```

### **Data Architecture**
- **Modular JSON**: Each section has its own JSON file (personal-info.json, education.json, etc.)
- **Parallel Loading**: All files load simultaneously for performance
- **Graceful Fallback**: System works even with missing/corrupted files

### **Page Module System**
- **Legacy Pattern**: `render(data)` - receives full data object (about, education, experience, etc.)
- **New Pattern**: `loadData()` + `render()` - loads own data from DataManager (new academic sections)
- **Hybrid Support**: System automatically detects and handles both patterns

## Adding New Sections

### 1. Create Data File
```bash
# Create data/your-section.json
{
  "sectionData": [
    {
      "id": "item1",
      "title": "Item Title",
      "badges": ["featured", "recent"]
    }
  ]
}
```

### 2. Update Data Manager
```javascript
// In assets/js/utils/data-manager.js
this.dataFiles = {
    // ... existing files
    yourSection: 'data/your-section.json'
};

// In getEmptySection()
yourSection: [],
```

### 3. Create Page Module
```javascript
// assets/js/pages/your-section.js
class YourSectionPage {
    constructor() {
        this.debugMode = true;
        this.data = null;
    }

    loadData() {
        if (window.dataManager?.isLoaded) {
            this.data = window.dataManager.getData('yourSection') || [];
        }
    }

    render() {
        // Create enhanced section header
        const sectionHeader = this.createSectionHeader();
        container.appendChild(sectionHeader);

        // Use academic card system
        this.data.forEach(item => {
            const card = this.createEnhancedCard(item);
            container.appendChild(card);
        });
    }

    createSectionHeader() {
        const header = document.createElement('div');
        header.className = 'section-header-enhanced';

        const icon = document.createElement('div');
        icon.className = 'academic-icon academic-icon-primary';
        icon.innerHTML = '<i class="fas fa-your-icon"></i>';

        const title = document.createElement('h2');
        title.textContent = 'Your Section';

        header.appendChild(icon);
        header.appendChild(title);
        return header;
    }

    createEnhancedCard(item) {
        const card = document.createElement('div');
        card.className = 'academic-card animate-fade-in';

        // Card structure using CSS classes:
        // - academic-card-header, academic-card-title, academic-card-meta
        // - academic-card-body, academic-card-footer
        // - badge-enhanced, focus-areas, focus-tag

        return card;
    }
}

window.yourSectionPage = new YourSectionPage();
```

### 4. Add to HTML
```html
<!-- In index.html -->
<section id="your-section" class="content-section">
    <div class="section-content">
        <!-- Content rendered by page module -->
    </div>
</section>

<script src="assets/js/pages/your-section.js"></script>
```

### 5. Register in App
```javascript
// In assets/js/core/app.js, populatePages() method
this.pages.set('your-section', window.yourSectionPage);
```

### 6. Add to Navigation
```json
// In data/config.json
{
  "navigation": {
    "sections": [
      {
        "key": "your-section",
        "icon": "fas fa-your-icon",
        "order": 16
      }
    ]
  }
}
```

### 7. Add Translations
```json
// In data/locales/en.json and it.json
{
  "navigation": {
    "your-section": "Your Section"
  },
  "sections": {
    "yourSection": {
      "title": "Your Section",
      "subtitle": "Description"
    }
  }
}
```

## Enhanced UI System

### **CSS Classes Available**
```css
/* Cards */
.academic-card                  /* Main card container */
.academic-card-header           /* Card header with title/meta */
.academic-card-title            /* Card title */
.academic-card-meta             /* Badges and metadata */
.academic-card-body             /* Main content */
.academic-card-footer           /* Footer with additional info */

/* Badges */
.badge-enhanced                 /* Enhanced badge base */
.badge-primary, .badge-success  /* Colored badge variants */
.badge-warning, .badge-info     /* More color options */

/* Icons */
.academic-icon                  /* Circular icon container */
.academic-icon-primary          /* Primary themed icon */
.academic-icon-success          /* Success themed icon */

/* Section Headers */
.section-header-enhanced        /* Section header with icon */

/* Layouts */
.activity-grid                  /* Responsive grid for cards */
.stats-grid                     /* Grid for statistics */
.focus-areas                    /* Container for tags */
.focus-tag                      /* Interactive tag elements */

/* Animations */
.animate-fade-in               /* Fade in animation */
```

### **Badge System**
```javascript
// Enhanced badges with icons
const badge = document.createElement('span');
badge.className = 'badge-enhanced badge-primary';
badge.innerHTML = `<i class="fas fa-star"></i> Featured`;
```

## Critical Architecture Rules

### **Error Handling**
- ✅ **Never throw errors** that break the application
- ✅ **Always provide fallback data** for missing JSON files
- ✅ **Use graceful degradation** - show partial content if some data fails

### **Data Loading Patterns**
- ✅ **Legacy modules**: Pass full data object to `render(data)`
- ✅ **New modules**: Use `loadData()` then `render()` pattern
- ✅ **System detects** pattern automatically in `populatePages()`

### **Translation System**
- ✅ **4-layer fallback**: loaded → stored → hardcoded → key itself
- ✅ **Hardcoded essentials** available for core UI elements
- ✅ **Validate keys** - reject null/empty values

### **Security**
- ✅ **Admin panel** blocks production domains (.com, .org, .github.io)
- ✅ **Localhost only** with multi-layer environment checks

## Development Workflow

### **Making Changes**
1. **Read this guide** completely before starting
2. **Follow architectural patterns** - don't break existing systems
3. **Test graceful degradation** (missing files, failed networks)
4. **Update translations** for any new UI elements
5. **Test on localhost** before pushing
6. **Update this CLAUDE.md** if architecture changes

### **Testing Checklist**
- [ ] All sections load correctly
- [ ] Navigation works smoothly
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Admin panel accessible on localhost only
- [ ] Graceful handling of missing data files
- [ ] Translation system works in both languages

### **Deployment**
```bash
git add -A
git commit -m "Brief description"
git push origin main
# Site updates automatically at https://dasaro.github.io
```

## Status: ✅ PRODUCTION READY

Comprehensive 15-section academic website with modern UI, robust error handling, and hybrid data architecture. All critical issues resolved with proper fallback mechanisms.

**Enhanced Features (Sept 2025)**:
- Modern card-based UI with animations and hover effects
- Enhanced badge system with semantic colors and icons
- Consistent section headers with academic icons
- Interactive focus areas and statistics displays
- Responsive design maintaining academic professionalism
- Backward compatibility with existing code patterns