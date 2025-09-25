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

**UI/UX Improvements Completed**:
- ✅ Removed skill chips/tags for cleaner presentation
- ✅ Merged featured publications with main list using "selected" logic
- ✅ Replaced generic icons with meaningful publication type chips
- ✅ Enhanced About section with research interests and detailed background
- ✅ Removed citation-metrics section for streamlined navigation
- ✅ Fixed selected publications default display logic
- ✅ Added informative status messages for publication filtering

**Live Website**: https://dasaro.github.io
**Admin Panel**: Available at http://localhost:8000/admin/ when running locally

## Project Status: ✅ COMPLETE & ACTIVELY MAINTAINED

The website is fully functional and deployed. All original requirements plus recent UX improvements have been implemented:
- Static site compatible with GitHub Pages
- Bilingual Italian/English support with i18n system
- Responsive design with academic styling
- Smart publications display (selected by default, filter to see all)
- Complete admin panel for content management
- LaTeX CV generation from JSON data
- 30+ publications imported from CV with meaningful type categorization