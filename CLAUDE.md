# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **completed** static personal academic website for Dr. Fabio Aurelio D'Asaro designed to:
- Run via file:// protocol (no server required) ✅
- Be deployable to GitHub Pages ✅ (Live at: https://dasaro.github.io)
- Maintain a modern yet classic academic aesthetic ✅
- Provide bilingual support (Italian/English) ✅
- Include full admin panel for content management ✅
- Support publications filtering and BibTeX export ✅
- Generate LaTeX CVs automatically ✅
- Display selected publications by default with filtering to browse all ✅

## Project Structure

```
/
├── index.html                    # Main website entry point
├── admin/                        # Private admin panel (localhost only)
│   ├── index.html               # Admin interface
│   └── assets/
│       ├── css/
│       │   └── admin.css        # Admin panel styles
│       └── js/
│           └── admin.js         # Admin functionality & LaTeX generation
├── assets/
│   ├── css/
│   │   └── main.css            # Main website styles
│   ├── js/
│   │   ├── main.js             # Main website functionality
│   │   ├── i18n.js             # Internationalization system
│   │   ├── data-manager.js     # Client-side data management
│   │   └── publications.js     # Publications filtering & BibTeX export
│   └── images/                 # Images and assets
├── data/
│   ├── CV.pdf                  # Resume document
│   ├── content.json            # Website content data (mock database)
│   └── locales/
│       ├── en.json             # English translations
│       └── it.json             # Italian translations
└── pages/                      # Additional HTML pages if needed
```

## Architecture Overview

**Static Site Design**: Pure HTML/CSS/JavaScript with no server dependencies, suitable for GitHub Pages deployment.

**Data Management**: Uses JSON files as a mock database that can be modified via the admin panel. Content is stored in `data/content.json` with translations in separate locale files.

**Publications System**:
- Shows "selected" publications by default (key papers marked with `selected: true`)
- Full publication list accessible via search/filtering
- Publications use type chips (Journal, Conference, In Press, etc.) instead of generic icons
- BibTeX export functionality for individual or bulk publications

**Content Structure**:
- About section includes bio, research interests, and detailed background
- Skills section displays without chip/tag clutter for clean presentation
- All publications imported from CV with 30+ entries
- Citation metrics section removed for streamlined navigation

**Internationalization**: Built-in i18n system supporting Italian and English with easy language switching.

**Responsive Design**: Mobile-first CSS with classic academic styling - clean typography, appropriate spacing, and professional color scheme.

**Admin Panel**: Client-side content management accessible only on localhost, allowing updates to CV information, badges, and content without direct file editing.

## Development Commands

Since this is a static site, development is straightforward:

```bash
# Open the website locally (requires HTTP server for JSON loading)
python3 -m http.server 8000
# Then visit http://localhost:8000

# Access admin panel (localhost only)
# Visit http://localhost:8000/admin/ or open admin/index.html directly

# Alternative servers
npx http-server -p 8000    # Node.js
php -S localhost:8000      # PHP
```

## Deployment to GitHub Pages

This website is deployed at: **https://dasaro.github.io**

### Push Changes to Live Site

```bash
# Stage changes
git add -A

# Commit with descriptive message
git commit -m "Update: [describe your changes]"

# Push to GitHub Pages (automatically deploys)
git push origin main

# Your changes will be live at https://dasaro.github.io within 1-10 minutes
```

### Repository Information

- **Repository**: https://github.com/dasaro/dasaro.github.io
- **Live Site**: https://dasaro.github.io
- **Deployment**: Automatic via GitHub Pages (no configuration needed)
- **Branch**: main (automatically serves from root directory)

## Key Architectural Decisions

1. **Selected Publications Logic**: By default, only publications marked with `selected: true` are displayed. When users apply filters/search, all publications become available.

2. **Publication Type Chips**: Publications display colored chips indicating type (Journal=green, Conference=blue, In Press=orange, etc.) instead of generic icons.

3. **Streamlined About Section**: Contains three parts - bio, research interests (as styled tags), and detailed background paragraph.

4. **No Citation Metrics Section**: Removed to reduce complexity and focus on core content.

5. **Clean Skills Display**: Skills show without chip/tag clutter, displaying only name, icon, and description.

6. **Bilingual Content Management**: All user-facing text uses the i18n system with fallbacks to prevent display errors.

## Content Management

The admin panel should allow editing of:
- Personal information and bio
- Education and experience entries
- Publications and research
- Skills and badges
- Contact information
- Language-specific content for both locales
- LaTeX CV template generation and export
- BibTeX export for publications

**Current Publications System**:
- Default view shows only "selected" publications (marked with `selected: true` in JSON)
- Search/filter reveals all 30+ publications imported from CV
- Type chips replace icons: Journal (green), Conference (blue), In Press (orange), Book (dark), Thesis (purple), Preprint (gray)
- BibTeX export functionality for filtered results
- Sorting: selected publications first, then by year (newest first), then alphabetically

**Publication Data Structure**:
```json
{
  "id": "unique_id",
  "title": "Paper Title",
  "authors": "Author list",
  "journal|venue": "Publication venue",
  "year": "2025",
  "type": "journal|conference|book|thesis|preprint",
  "selected": true,  // Shows by default
  "status": "accepted|in press",  // Optional
  "doi": "10.xxxx/xxxx",
  "url": "https://..."
}
```

**About Section Structure**:
- `personalInfo.bio`: Main biography paragraph
- `personalInfo.researchInterests`: Array of research areas (displayed as tags)
- `personalInfo.background`: Detailed background paragraph

All changes are saved to JSON files that the main site reads dynamically.

## Recent Major Updates (September 2025)

### **UI/UX Improvements Completed**:
- ✅ Removed skill chips/tags for cleaner presentation
- ✅ Merged featured publications with main list using "selected" logic
- ✅ Replaced generic icons with meaningful publication type chips
- ✅ Enhanced About section with research interests and detailed background
- ✅ Removed citation-metrics section for streamlined navigation
- ✅ Fixed selected publications default display logic
- ✅ Added informative status messages for publication filtering

### **🔧 CRITICAL ARCHITECTURAL FIXES (September 25, 2025)**

All identified architectural flaws have been systematically addressed with **graceful degradation** patterns:

#### **HIGH RISK FIXES (Site Breaking Issues) - COMPLETED**
- ✅ **Data Loading Failure Recovery**: Removed error throwing in DataManager, added fallback mode with user notification banner
- ✅ **Translation System Failures**: Implemented 3-layer fallback system (loaded → stored → hardcoded essential translations → key)
- ✅ **Dependency Race Conditions**: Added event-driven initialization with timeout fallbacks and graceful partial loading

#### **MEDIUM-HIGH RISK FIXES (Security) - COMPLETED**
- ✅ **Admin Panel Security**: Enhanced multi-layer localhost/development environment checks with production domain blocking

#### **MEDIUM RISK FIXES (User Experience) - COMPLETED**
- ✅ **Publication Type Handling**: Defensive null checks, enhanced type inference, added 4 new chip types (Under Review, Chapter, Report, Unknown)

#### **LOW RISK FIXES (Polish) - COMPLETED**
- ✅ **Responsive Design Breakpoints**: Standardized to Mobile (0-767px), Tablet (768-1023px), Desktop (1024px+)

**Live Website**: https://dasaro.github.io
**Admin Panel**: Available at http://localhost:8000/admin/ when running locally
**Rollback Point**: Commit `7226237` (pre-architectural fixes) available if needed

## 🏗️ ARCHITECTURAL STANDARDS & REQUIREMENTS

### **🔴 CRITICAL: These architectural standards must be maintained in all future changes:**

#### **1. Error Handling & Graceful Degradation**
- **NEVER throw errors** that break the entire application
- **ALWAYS provide fallback mechanisms** for failed data loading
- **ALWAYS show user-friendly messages** when operating in limited functionality mode
- **Example**: DataManager.loadData() now returns fallback data instead of throwing on JSON failure

#### **2. Dependency Management**
- **Use event-driven initialization** instead of hard polling timeouts
- **Implement graceful partial loading** - allow components to work independently
- **Provide fallback timeouts** for each dependency with degraded functionality
- **Example**: main.js now loads components progressively instead of failing entirely

#### **3. Translation System Resilience**
- **Multi-layer fallback**: current language → fallback translations → hardcoded essentials → key itself
- **Hardcoded essential translations** must be available for core UI elements
- **Log missing translations** for debugging without breaking display
- **Example**: i18n.js now includes hardcoded fallbacks for navigation, sections, and publications

#### **4. Security Standards**
- **Admin panel access** must check multiple environment indicators (localhost, file protocol, dev ports)
- **Block production domains** explicitly (.com, .org, .github.io, etc.)
- **Log security violations** with environment details for debugging
- **Example**: Enhanced admin security in both HTML and JS with comprehensive environment detection

#### **5. Data Validation & Type Safety**
- **Validate all input objects** before processing (null checks, type checks)
- **Provide fallback/default values** for missing or invalid data
- **Use defensive programming** - assume data may be malformed
- **Example**: Publications system now handles null/undefined types gracefully with fallback chips

#### **6. Responsive Design Consistency**
- **Use standard breakpoints**: Mobile (0-767px), Tablet (768-1023px), Desktop (1024px+)
- **Document breakpoint system** clearly in CSS comments
- **Avoid overlapping/gapped breakpoints** that cause layout issues
- **Test at boundary values** (767px, 768px, 1023px, 1024px)

### **📋 MANDATORY: Update CLAUDE.md for ALL Architectural Changes**

**When making ANY architectural change, you MUST:**

1. **Update this CLAUDE.md file** with the change details in the "Recent Major Updates" section
2. **Add new architectural standards** to the "ARCHITECTURAL STANDARDS & REQUIREMENTS" section if new patterns are introduced
3. **Update the rollback point** commit hash if significant changes are made
4. **Test graceful degradation** scenarios (missing files, failed networks, malformed data)
5. **Commit CLAUDE.md changes** alongside the architectural changes

### **🔄 Architectural Change Tracking Template**

Add new architectural changes using this format:

```markdown
#### **[RISK LEVEL] [CHANGE TYPE] - [STATUS]**
- ✅/🔧/⏳ **[Component Name]**: [Brief description of change and impact]
- **Rollback Point**: Commit `[hash]` if issues arise
- **Testing Requirements**: [What to test to verify the change works]
```

### **⚠️ IMPORTANT: Guidelines for Future Claude Code Instances**

**When working on this project, ANY future Claude Code instance MUST:**

1. **Read this CLAUDE.md file completely** before making changes
2. **Follow ALL architectural standards** listed in the "ARCHITECTURAL STANDARDS & REQUIREMENTS" section
3. **Update this CLAUDE.md file** whenever architectural changes are made
4. **Test graceful degradation scenarios** after any architectural change
5. **Provide rollback instructions** for any significant changes
6. **Use the architectural change tracking template** for documenting modifications

**Key Files to Never Break:**
- `assets/js/data-manager.js` - Contains fallback mode logic
- `assets/js/i18n.js` - Contains hardcoded essential translations
- `assets/js/main.js` - Contains graceful dependency loading
- `admin/index.html` & `admin/assets/js/admin.js` - Contains security checks

**Testing Requirements After Changes:**
- Test with missing/corrupted `data/content.json` file
- Test with missing/corrupted translation files in `data/locales/`
- Test admin panel access on both localhost and production domains
- Test publication display with malformed publication data
- Test responsive design at all major breakpoints (767px, 768px, 1023px, 1024px)

## Project Status: ✅ COMPLETE & ACTIVELY MAINTAINED

The website is fully functional and deployed with **robust architectural resilience**. All original requirements plus UX improvements and critical architectural fixes have been implemented:

**Core Features:**
- Static site compatible with GitHub Pages with graceful degradation
- Bilingual Italian/English support with multi-layer translation fallbacks
- Responsive design with standardized breakpoints and academic styling
- Smart publications display (selected by default, filter to see all) with defensive type handling
- Complete admin panel with enhanced security for content management
- LaTeX CV generation from JSON data
- 30+ publications imported from CV with meaningful type categorization and fallback chips

**Architectural Resilience:**
- Graceful degradation when data files are missing or corrupted
- Fallback mode notifications to inform users of limited functionality
- Event-driven component initialization with timeout fallbacks
- Multi-layer security for admin panel access
- Defensive programming throughout publication and data handling
- Consistent responsive design with no gap/overlap issues at breakpoints

**Maintenance Status**: The site is production-ready with comprehensive error handling and can gracefully handle various failure scenarios while maintaining core functionality.