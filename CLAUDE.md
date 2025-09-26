# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Live Site**: https://dasaro.github.io
**Type**: Static academic website with ultra-streamlined design system
**Status**: Production-ready with complete CV data integration

## Development Commands

```bash
# Development server (required for JSON loading)
python3 -m http.server 8000
# Visit: http://localhost:8000

# Alternative servers if port conflicts
python3 -m http.server 8001
python3 -m http.server 8002

# Admin panel (localhost only, security enforced)
# Visit: http://localhost:8000/admin/

# Deploy to GitHub Pages (automatic deployment)
git add -A && git commit -m "Update: [description]" && git push origin main
# Live in 1-10 minutes at https://dasaro.github.io

# Emergency rollback
cp assets/css/main.css.backup assets/css/main.css  # Immediate CSS restore
git reset --hard c121e9b  # Nuclear option to last known good state
```

## Architecture Overview

### **Modular JavaScript Architecture**
- **Core Controller**: `assets/js/core/app.js` orchestrates everything (initialization, sticky headers, page coordination)
- **Router System**: `assets/js/core/router.js` handles navigation with comprehensive debug logging
- **Page Modules**: `assets/js/pages/[section].js` - each section is a self-contained module with render() method
- **Data Management**: `assets/js/utils/data-manager.js` loads 16 JSON files in parallel with graceful fallback
- **I18n System**: `assets/js/utils/i18n.js` - bilingual support (IT/EN) with 4-layer fallback architecture

### **Data Architecture**
```
data/
├── personal-info.json          # Bio, name, title
├── [section].json              # One file per academic section
├── config.json                 # Navigation, badges, site config
└── locales/
    ├── en.json                 # English translations
    └── it.json                 # Italian translations
```

**Loading Pattern**: All JSON files load simultaneously via `Promise.all()`, graceful degradation if individual files fail.

### **Ultra-Streamlined CSS System**
**Key Principle**: ONE universal system for everything

```css
:root {
  --font: 'Inter', sans-serif;     /* Single font for entire site */
  --primary: #2c3e50;              /* Dark blue-gray */
  --accent: #3498db;               /* Professional blue */
  --s4: 1rem; --s6: 1.5rem;       /* Mathematical spacing scale */
}

/* Universal components */
.item     /* ALL cards (publications, skills, projects, contact, etc.) */
.grid     /* ALL layouts (responsive auto-fit grid) */
.header   /* ALL card headers */
.title    /* ALL titles */
.meta     /* ALL metadata */
.badge    /* ALL badges/chips */
```

**Critical**: Never create section-specific CSS classes. Use universal components only.

## Page Module Pattern

### **Standard Module Structure**
```javascript
class SectionPage {
    constructor() {
        this.isInitialized = false;
        this.data = null;
        this.debugMode = true;  // Enables [SectionPage] console logs
    }

    render(data) {
        // Legacy pattern: receives full data object
        this.data = data;
        const sectionData = data.sectionName || [];
        // Render logic
    }

    // OR new pattern:
    loadData() {
        this.data = window.dataManager.getData('sectionName') || [];
    }
}
```

### **Registration**: Handled automatically by `app.js`, modules do NOT self-register with router.

## Data Management

### **Multi-language Content**
```json
{
  "description": {
    "en": "English text",
    "it": "Italian text"
  }
}
```

Handle in JavaScript:
```javascript
const text = typeof item.description === 'object'
    ? item.description[window.i18n?.getCurrentLanguage() || 'en'] || item.description.en
    : item.description;
```

### **DataManager Key Methods**
- `loadData()` - Loads all 16 JSON files in parallel
- `getData(section)` - Get data for specific section
- `isLoaded` - Boolean indicating if data loading completed
- **Fallback Mode**: Continues working with empty data if files fail to load

## Adding New Sections

1. **Create JSON file**: `data/new-section.json` with consistent structure
2. **Register in DataManager**: Add to `this.dataFiles` object in `data-manager.js`
3. **Create page module**: Follow existing pattern in `assets/js/pages/`
4. **Use universal CSS**: `.item`, `.grid`, `.header`, `.title` only
5. **Update navigation**: Add to `data/config.json` navigation array

**Example JSON structure**:
```json
{
  "items": [
    {
      "id": "unique_id",
      "title": "Item Title",
      "description": "Text or {en: 'English', it: 'Italian'}",
      "badges": ["category1", "category2"],
      "startDate": "2025-01-01",
      "ongoing": true
    }
  ]
}
```

## Critical Design Rules

### **Absolutely Forbidden**
- Creating section-specific CSS classes (`.publication-item`, `.skill-card`, etc.)
- Using hardcoded spacing values (`margin: 20px`) - use variables (`var(--s6)`)
- Multiple font families - Inter only
- Custom component styling - use universal classes

### **Always Required**
- Use mathematical spacing scale (`--s1` through `--s8`)
- Use universal components (`.item`, `.grid`, `.header`, `.title`, `.meta`, `.badge`)
- Debug logging: `this.log('[ModuleName] message', data)`
- Multi-language support for user-facing text

## Debugging

### **Module Debug Logging**
Each module has isolated debug logs:
- `[App]` - Application initialization
- `[Router]` - Navigation operations
- `[AboutPage]`, `[PublicationsPage]`, etc. - Section-specific logs
- `[DataManager]` - Data loading process
- `[I18nManager]` - Translation system

Enable: `window.moduleName.setDebugMode(true)`

### **Common Issues**
| Problem | Debug Approach | Solution |
|---------|----------------|----------|
| Section not visible | Check `[Router]` logs for route registration | Verify navigation in `config.json` |
| Data not loading | Check `[DataManager]` logs | Verify JSON file exists and is valid |
| Styling inconsistent | Check for custom CSS classes | Replace with universal components |
| [object Object] display | Multi-language object not handled | Add language detection code |

## Performance & Production

- **CSS Size**: 855 lines (70% reduction achieved)
- **Load Time**: <2s on 3G, <100ms JSON loading
- **No Build Step**: Direct file serving, GitHub Pages compatible
- **Caching**: Aggressive browser caching due to clean architecture

## Emergency Procedures

### **Rollback Options**
1. **CSS Only**: `cp assets/css/main.css.backup assets/css/main.css`
2. **Complete**: See `ROLLBACK_POINT.md` for full instructions
3. **Git Reset**: `git reset --hard c121e9b` (last known good commit)

### **Admin Panel Security**
- **Localhost Only**: Automatically blocks production domains
- **Multi-layer Checks**: File protocol, development ports, domain validation
- **Security Logs**: Environment detection details logged for debugging

## Key Features

### **Functionality Preserved**
- Sticky headers with smooth animations
- Publications search/filter/BibTeX export
- Responsive sidebar navigation
- Bilingual content switching (IT/EN)
- Mobile-first responsive design
- Admin panel with security boundaries

### **Data Integrity**
- Complete CV data integration (30+ publications, professional service, etc.)
- Multi-language descriptions properly handled
- No [object Object] display issues
- All academic sections populated with real data

---

**Architecture**: Ultra-streamlined unified design system
**Maintenance**: Minimal due to universal component system
**Last Updated**: September 2025