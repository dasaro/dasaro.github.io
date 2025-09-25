# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **completed** static personal academic website designed to:
- Run via file:// protocol (no server required) ✅
- Be deployable to GitHub Pages ✅ (Live at: https://dasaro.github.io)
- Maintain a modern yet classic academic aesthetic ✅
- Provide bilingual support (Italian/English) ✅
- Include full admin panel for content management ✅
- Support publications filtering and BibTeX export ✅
- Generate LaTeX CVs automatically ✅

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

## Key Features to Implement

1. **Expandable Sidebar**: Collapsible navigation with smooth animations
2. **CV Badges**: Highlight system for achievements, skills, publications
3. **Bilingual Support**: Seamless language switching with proper URL handling
4. **Admin Interface**: Content editing forms that update JSON data files
5. **LaTeX CV Generation**: Export CV data to LaTeX format for professional typesetting
6. **Publications Filtering**: Advanced filtering by year, author, type with BibTeX export
7. **GitHub Pages Ready**: All paths relative, no server dependencies
8. **Academic Styling**: Professional typography, appropriate color scheme, clean layout

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

**Publications Features**:
- Advanced filtering by year, title, author, journal/conference
- Sort by date, citation count, alphabetical
- BibTeX export (individual entries or bulk)
- PDF link integration
- DOI validation and linking

**LaTeX CV Generation**:
- Generates professional LaTeX CV from JSON data
- Customizable templates (academic, industry, minimal)
- Automatic formatting for education, experience, publications
- Bilingual support (generates separate Italian/English versions)
- Download as .tex file for local compilation

All changes are saved to JSON files that the main site reads dynamically.

## Project Status: ✅ COMPLETE

**Phase 4 Admin Panel - COMPLETED (September 2024)**
- ✅ Admin panel HTML interface with comprehensive forms
- ✅ Professional CSS styling matching main site aesthetic
- ✅ Full JavaScript functionality for content editing
- ✅ LaTeX CV generation system integrated
- ✅ Localhost-only security protection implemented
- ✅ All testing completed successfully

**Live Website**: https://dasaro.github.io
**Admin Panel**: Available at http://localhost:8000/admin/ when running locally

The website is fully functional and deployed. All original requirements have been implemented:
- Static site compatible with GitHub Pages
- Bilingual Italian/English support with i18n system
- Responsive design with academic styling
- Publications filtering with BibTeX export
- Complete admin panel for content management
- LaTeX CV generation from JSON data
- Comprehensive CV data imported from original PDF