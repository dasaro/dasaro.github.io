# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal academic website designed to:
- Run via file:// protocol (no server required)
- Be deployable to GitHub Pages
- Maintain a modern yet classic academic aesthetic
- Support bilingual content (Italian/English)
- Include an expandable sidebar navigation
- Feature CV badges for highlighting achievements
- Provide a client-side admin panel for content management

## Project Structure

```
/
├── index.html                    # Main website entry point
├── admin/                        # Private admin panel (localhost only)
│   ├── index.html               # Admin interface
│   ├── admin.js                 # Admin functionality
│   └── latex-generator.js       # LaTeX CV generation
├── assets/
│   ├── css/
│   │   ├── main.css            # Main website styles
│   │   └── admin.css           # Admin panel styles
│   ├── js/
│   │   ├── main.js             # Main website functionality
│   │   ├── i18n.js             # Internationalization system
│   │   └── data-manager.js     # Client-side data management
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
# Open the website locally
open index.html

# Or serve via Python for better testing
python3 -m http.server 8000
# Then visit http://localhost:8000

# Access admin panel (localhost only)
# Visit http://localhost:8000/admin/ or open admin/index.html directly
```

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