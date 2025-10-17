# Academic Website - Fabio Aurelio D'Asaro

A modern, elegant academic website built for a logician/AI researcher, blending terminal aesthetics with philosophical design motifs. The site features a "hacker-meets-philosopher" design philosophy with monospace and serif typography, geometric logic symbols, and subtle mathematical animations.

## Project Overview

This is a static website designed to be hosted on GitHub Pages. All content is dynamically loaded from JSON files, making it easy to update without touching the HTML or JavaScript code.

## Features

- **Clean, Modern Design**: Black text on white background with subtle accents
- **Responsive**: Mobile-first design that works on all devices
- **JSON-Driven Content**: All data stored in structured JSON files
- **Mathematical Animations**: Optional background animations (Conway's Game of Life, etc.)
- **Search & Filter**: Advanced publication search and filtering
- **BibTeX Export**: Export publications in BibTeX format
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Print-Friendly**: Clean print styles for CV generation

## File Structure

```
dasaro.github.io/
├── index.html              # Home page
├── about.html              # About/Education/Experience
├── publications.html       # Publications with search
├── teaching.html           # Teaching & supervision
├── projects.html           # Research projects
├── service.html            # Academic service
├── contact.html            # Contact information
├── css/
│   ├── main.css           # Core styles
│   ├── animations.css     # Animation styles
│   └── responsive.css     # Responsive design
├── js/
│   ├── main.js            # Core functionality
│   ├── publications.js    # Publication handling
│   ├── animations.js      # Background animations
│   └── search.js          # Search utilities
├── data/                  # JSON data files (to be populated)
│   ├── personal.json
│   ├── education.json
│   ├── experience.json
│   ├── publications.json
│   ├── teaching.json
│   ├── supervision.json
│   ├── projects.json
│   ├── service.json
│   ├── talks.json
│   ├── groups.json
│   └── skills.json
├── assets/
│   ├── images/            # Images and photos
│   └── docs/              # PDFs and documents
└── README.md
```

## Getting Started

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/dasaro/dasaro.github.io.git
   cd dasaro.github.io
   ```

2. Serve locally using Python's built-in server:
   ```bash
   python -m http.server 8000
   ```
   Or use any other local server (e.g., Live Server in VS Code)

3. Open in browser:
   ```
   http://localhost:8000
   ```

### Deployment to GitHub Pages

1. Push to the `main` branch of your GitHub repository
2. Go to repository Settings → Pages
3. Set source to "Deploy from a branch"
4. Select `main` branch and `/ (root)` folder
5. Save and wait for deployment

Your site will be live at: `https://dasaro.github.io`

## Updating Content

All content is stored in JSON files in the `data/` directory. Update these files to change the website content without modifying any HTML or JavaScript.

### Adding Publications

Edit `data/publications.json`:

```json
{
  "selected": [
    {
      "id": "unique_id",
      "title": "Your Paper Title",
      "authors": ["Author 1", "F. A. D'Asaro", "Author 3"],
      "year": 2025,
      "venue": "Conference/Journal Name",
      "type": "journal",
      "doi": "10.xxxx/xxxxx",
      "url": "https://...",
      "pdf": "assets/docs/paper.pdf",
      "bibtex": "@article{...}",
      "tags": ["logic", "ai"],
      "open_access": true
    }
  ],
  "all": [
    // All publications including selected ones
  ]
}
```

### Updating Personal Information

Edit `data/personal.json` to update your bio, affiliations, contact info, and research interests.

### Adding Teaching Courses

Edit `data/teaching.json` to add or update courses, guest lectures, and workshops.

### Managing Projects

Edit `data/projects.json` to add current or past research projects.

## Design System

### Colors

- Background: `#FFFFFF`
- Text: `#000000`
- Accent 1: `#2C3E50`
- Accent 2: `#34495E`
- Accent 3: `#ECF0F1`
- Links: `#2980B9`
- Code/Terminal: `#1E1E1E` with `#00FF00`

### Typography

- **Monospace** (Headers/Nav): 'Fira Code'
- **Serif** (Body): 'Crimson Text'

### Logic Symbols

Used as decorative elements throughout:
- ∀ (for all)
- ∃ (there exists)
- → (implies)
- ⊢ (proves)
- ⊨ (models)
- λ (lambda)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Phases

This project is built in phases:

- **Phase 1** ✅ - Foundation & Core Structure (COMPLETED)
- **Phase 2** - Home Page with Animated Background
- **Phase 3** - Publications Page with Search & Export
- **Phase 4** - About, Education, Experience Pages
- **Phase 5** - Projects & Service Pages
- **Phase 6** - Contact Page & Special Pages
- **Phase 7** - Skills Page & Polish
- **Phase 8** - Testing & Deployment

## Next Steps

To continue development:

1. **Populate JSON files** in the `data/` directory with your actual data
2. **Add profile photo** to `assets/images/`
3. **Add PDF files** of publications to `assets/docs/`
4. **Complete Phase 2** - Implement home page animations
5. **Complete Phase 3** - Wire up publications page with JSON data

See `CLAUDE.md` for detailed phase-by-phase implementation instructions.

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- JSON for data storage
- Canvas API for animations

## License

Copyright © 2025 Fabio Aurelio D'Asaro. All rights reserved.

## Contact

- Email: fabioaurelio.dasaro@unisalento.it
- GitHub: [@dasaro](https://github.com/dasaro)
- Website: https://dasaro.github.io

---

∀x (Logic(x) → Elegant(x))
