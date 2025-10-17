# Academic Website Development Plan for Fabio Aurelio D'Asaro

## Project Overview

Build a modern, elegant academic website for a logician/AI researcher that blends terminal aesthetics with philosophical design motifs. The site will be hosted on GitHub Pages (https://dasaro.github.io) and will be entirely client-side JavaScript driven, loading all content from JSON files.

**Design Philosophy:** "Hacker-meets-Philosopher" — Monospace fonts meet serif elegance, geometric logic symbols, clean white backgrounds with black text, subtle animations inspired by mathematical sequences.

---

## Technical Stack

- **HTML5/CSS3/Vanilla JavaScript** (no frameworks required)
- **JSON-driven content** (no server-side processing)
- **GitHub Pages** compatible (static site generation)
- **Responsive design** (mobile-first approach)
- **Zero external dependencies** for core functionality

---

## Design Specifications

### Color Palette
- **Background:** `#FFFFFF` (pure white)
- **Primary Text:** `#000000` (pure black)
- **Accent 1:** `#2C3E50` (dark blue-gray for headers)
- **Accent 2:** `#34495E` (medium gray for secondary text)
- **Accent 3:** `#ECF0F1` (light gray for subtle backgrounds)
- **Link Color:** `#2980B9` (blue)
- **Link Hover:** `#3498DB` (lighter blue)
- **Code/Terminal:** `#1E1E1E` background with `#00FF00` or `#FFFFFF` text

### Typography
```css
/* Primary (monospace) */
font-family: 'Fira Code', 'Courier New', monospace;

/* Secondary (serif for body/academic text) */
font-family: 'Crimson Text', 'Palatino', 'Georgia', serif;

/* Headers (combination) */
font-family: 'Fira Code', monospace; /* for section headers */
```

### Geometric/Logic Symbols to Use
- ∀ (for all)
- ∃ (there exists)
- → (implies)
- ⊢ (proves)
- ⊨ (models)
- λ (lambda)
- ∧ ∨ ¬ (logical operators)
- ∅ (empty set)
- ⊤ ⊥ (top/bottom)
- Use these subtly as decorative elements, bullets, or section dividers

### Animated Backgrounds (Subtle)
Create canvas-based background animations that don't distract:
1. **Fibonacci Spiral** - slowly drawing in subtle red
2. **Prime Number Spiral** (Ulam spiral) - growing dots in red gradient
3. **Conway's Game of Life** - minimal, fading cells with subtle red accent
4. **Riemann Zeta zeros visualization** - flowing critical line (low opacity ~0.25)
5. **Mandelbrot Set Zoom** - iterative boundary (moderate opacity ~0.4-0.8)
6. **Proof Tree** - logical inference tree that builds quickly (~300 frames)
7. **Pac-Man Arcade** - larger characters (size 30-35), faster movement, NO PELLETS

**Balance Requirements:**
- All animations should be roughly equal in visibility
- Avoid trypophobia triggers (no dense dot patterns)
- Speed: Proof tree should build in ~5 seconds; others can be slower
- Opacity: Most animations 0.15-0.4; Mandelbrot can be 0.4-0.8
- Make them **toggleable** and **subtle but engaging**

---

## File Structure

```
dasaro.github.io/
├── index.html
├── about.html
├── publications.html
├── teaching.html
├── projects.html
├── service.html
├── contact.html
├── css/
│   ├── main.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── publications.js
│   ├── animations.js
│   └── search.js
├── data/
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
│   ├── images/
│   └── docs/
└── README.md
```

---

## JSON Schema Definitions

### 1. `data/personal.json`
```json
{
  "name": "Fabio Aurelio D'Asaro",
  "title": "Postdoctoral Researcher in Logic",
  "affiliations": [
    "University of Salento",
    "University of Verona", 
    "University College London"
  ],
  "bio": "I am a researcher in Logic (PHIL-02/A) working at the interface of formal epistemology and AI, probabilistic and temporal reasoning, argumentation, and logic programming (ASP/ILASP)...",
  "research_interests": [
    "Uncertain, Epistemic and Temporal Logics",
    "Logic Programming (ASP/ILASP)",
    "Argumentation",
    "Explainable Artificial Intelligence",
    "Probabilistic Reasoning",
    "Event Calculus"
  ],
  "contact": {
    "emails": [
      {"type": "institutional-main", "address": "fabioaurelio.dasaro@unisalento.it"},
      {"type": "institutional", "address": "fabioaurelio.dasaro@univr.it"},
      {"type": "institutional", "address": "fabio.d'asaro.14@ucl.ac.uk"},
      {"type": "personal", "address": "fdasaro@gmail.com"}
    ],
    "phone": "+39 347 300 1762",
    "website": "https://sites.google.com/view/fdasaro",
    "github": "dasaro",
    "scholar": "YOUR_GOOGLE_SCHOLAR_ID"
  },
  "birthplace": "Palermo, Italy",
  "location": "Verona, Italy",
  "scholar_metrics": {
    "citations": 227,
    "h_index": 10,
    "i10_index": 10,
    "last_updated": "2025-09-16"
  }
}
```

### 2. `data/education.json`
```json
{
  "degrees": [
    {
      "degree": "PhD in Artificial Intelligence",
      "institution": "University College London",
      "location": "London, UK",
      "year_start": 2014,
      "year_end": 2019,
      "thesis": "Probabilistic Epistemic Reasoning About Actions",
      "supervisors": ["Rob Miller", "Antonis Bikakis", "Luke Dickens"],
      "description": "My PhD thesis explored how to model uncertainty (Probability Theory) and knowledge-producing actions in the Event Calculus framework..."
    },
    {
      "degree": "MSc in Pure Mathematics and Mathematical Logic",
      "institution": "University of Manchester",
      "location": "Manchester, UK",
      "year_start": 2013,
      "year_end": 2014,
      "grade": "Distinction (110/110 cum laude equivalent)",
      "thesis": "Analogical Reasoning in Unary Inductive Logic",
      "supervisors": ["Jeff B. Paris"]
    },
    {
      "degree": "BSc in Computer Science",
      "institution": "University of Palermo",
      "location": "Palermo, Italy",
      "year_start": 2006,
      "year_end": 2011,
      "grade": "110/110 cum laude",
      "thesis": "La Tesi di Church-Turing e il suo rapporto con alcuni nuovi modelli di calcolo",
      "supervisors": ["Settimo Termini"]
    }
  ]
}
```

### 3. `data/experience.json`
```json
{
  "positions": [
    {
      "title": "Postdoctoral Researcher",
      "institution": "University of Salento",
      "department": "Department of Human Studies",
      "location": "Lecce, Italy",
      "year_start": 2025,
      "year_end": "present",
      "current": true,
      "description": "Working on Project FAIR–Future AI Research (PE00000013) under the NRRP MUR program funded by NextGenerationEU, Spoke 6 (Symbiotic AI), PI: Paolo Baldi.",
      "research_focus": ["Logic", "Explainability", "Trust", "Ethical AI"]
    },
    // ... more positions
  ]
}
```

### 4. `data/publications.json` (Most Important)
```json
{
  "selected": [
    {
      "id": "pub_2025_graphical",
      "title": "A Graphical Formalism for Reasoning about Substitution in Resource Transforming Procedures",
      "authors": ["A. Bikakis", "F. A. D'Asaro", "A. Diallo", "L. Dickens", "T. Hunter", "R. Miller"],
      "year": 2025,
      "venue": "Journal of Artificial Intelligence Research",
      "type": "journal",
      "doi": "10.1613/jair.1.18606",
      "url": "https://doi.org/10.1613/jair.1.18606",
      "pdf": null,
      "bibtex": "@article{bikakis2025graphical,\n  title={A Graphical Formalism for Reasoning about Substitution in Resource Transforming Procedures},\n  author={Bikakis, A. and D'Asaro, F. A. and Diallo, A. and Dickens, L. and Hunter, T. and Miller, R.},\n  journal={Journal of Artificial Intelligence Research},\n  year={2025},\n  doi={10.1613/jair.1.18606}\n}",
      "tags": ["reasoning", "formalisms", "event-calculus"],
      "open_access": true
    },
    // ... more publications
  ],
  "all": [
    // Complete list with same structure
  ]
}
```

### 5. `data/teaching.json`
```json
{
  "courses": [
    {
      "title": "Logic and Philosophy of Science",
      "code": "M-FIL/02",
      "institution": "University of Verona",
      "level": "BA",
      "program": "Philosophy",
      "year_start": 2022,
      "year_end": "present",
      "hours_per_year": 60,
      "description": "Foundational course covering propositional and predicate logic, philosophy of science..."
    },
    // ... more courses
  ],
  "guest_lectures": [
    {
      "title": "Introduction to Machine Learning",
      "event": "8th Winter School in Linguistics",
      "institution": "University of Verona / Free University of Bolzano",
      "date": "2025-01",
      "hours": 1.5
    },
    // ... more guest lectures
  ]
}
```

### 6. `data/supervision.json`
```json
{
  "students": [
    {
      "name": "Zlatina Mileva",
      "institution": "Imperial College London",
      "level": "MSc",
      "year": 2023,
      "topic": "A Unifying Framework for Learning Argumentation Semantics",
      "outcomes": [
        "Outstanding Project Award",
        "Selected for Project Showcase Day"
      ],
      "publications": ["preprint available"],
      "links": {
        "showcase": "URL_HERE"
      }
    },
    // ... more students
  ]
}
```

### 7. `data/projects.json`
```json
{
  "current": [
    {
      "name": "FAIR - Future AI Research",
      "acronym": "FAIR",
      "funding": "PNRR Extended Partnership",
      "id": "PE00000013",
      "role": "Postdoctoral Researcher",
      "year_start": 2025,
      "year_end": "present",
      "institution": "University of Salento",
      "spoke": "Spoke 6 (Symbiotic AI)",
      "pi": "Paolo Baldi",
      "description": "Working on logic for ethical human–AI collaboration (eDefAI)..."
    }
  ],
  "past": [
    // ... past projects
  ]
}
```

### 8. `data/service.json`
```json
{
  "organizing": [
    {
      "role": "Co-organizer",
      "event": "3rd Logic for the AI Spring Summer School (eDefAI)",
      "location": "Lecce, Italy",
      "year": 2025,
      "website": "http://sites.google.com/view/edefai"
    },
    // ... more
  ],
  "program_committees": [
    {
      "event": "International Joint Conference on Artificial Intelligence (IJCAI)",
      "years": [2020, 2024, 2025],
      "role": "PC Member"
    },
    // ... more
  ],
  "editorial": [
    {
      "role": "Review Editor",
      "journal": "Frontiers in Artificial Intelligence",
      "section": "Machine Learning and Artificial Intelligence",
      "year_start": 2022
    },
    // ... more
  ],
  "reviewing": [
    "International Journal of Approximate Reasoning (IJAR)",
    "KR 2022-2025",
    // ... more
  ]
}
```

### 9. `data/talks.json`
```json
{
  "invited": [
    {
      "title": "Learning Argumentation Semantics",
      "event": "PACMAN 2025",
      "institution": "University of Roma Tre",
      "date": "2025-05",
      "type": "invited"
    },
    // ... more
  ]
}
```

### 10. `data/groups.json`
```json
{
  "memberships": [
    {
      "name": "EThOS – Ethics and Technologies Of the Self",
      "institution": "University of Verona",
      "url": "URL_HERE",
      "role": "Member"
    },
    // ... more groups
  ],
  "professional_societies": [
    {
      "name": "AILA",
      "full_name": "Associazione Italiana di Logica e sue Applicazioni",
      "role": "Member"
    },
    // ... more
  ]
}
```

### 11. `data/skills.json`
```json
{
  "programming": {
    "expert": ["Answer Set Programming (clingo)", "Prolog/ProbLog", "ILASP/FastLAS", "Python"],
    "proficient": ["Java", "JavaScript/TypeScript", "PHP", "SQL", "HTML/CSS"],
    "familiar": ["C", "MATLAB", "Common Lisp", "Clojure", "Anglican"]
  },
  "languages": [
    {"language": "Italian", "level": "Native"},
    {"language": "English", "level": "Full professional proficiency"}
  ],
  "other": ["Vibe Coding", "Docker", "Git/GitHub", "Data Analysis", "LaTeX"]
}
```

### 12. NEW: `data/dissertation_instructions.json`
```json
{
  "instructions": {
    "title": "Information for Prospective Students",
    "phd_topics": [
      "Uncertain and Epistemic Reasoning",
      "Temporal and Probabilistic Logics",
      "Logic Programming Applications",
      "Explainable AI",
      "Formal Argumentation"
    ],
    "supervision_approach": "I emphasize hands-on research with strong theoretical foundations, typically leading to publications and open-source contributions.",
    "current_openings": true,
    "contact_preference": "Email me with your CV and a brief research interest statement.",
    "application_info": "Please refer to the official PhD programs at University of Salento, University of Verona, or UCL."
  }
}
```

---

## Development Phases

### PHASE 1: Foundation & Core Structure
**Goal:** Set up the basic multi-page structure, navigation, and JSON loading system.

**Prompt for Claude Code:**
```
Create the foundational structure for an academic website with the following:

1. File structure as outlined in CLAUDE.md
2. Create index.html with a clean navigation bar that links to all pages:
   - Home (index.html)
   - About
   - Publications
   - Teaching
   - Projects
   - Service
   - Contact
3. Navigation should be:
   - Fixed top bar
   - Black text on white background
   - Uses Fira Code font for nav items
   - Simple underline animation on hover
   - Mobile-responsive hamburger menu
4. Create main.css with:
   - CSS reset
   - Color palette variables as defined in CLAUDE.md
   - Typography hierarchy
   - Responsive grid system
   - Navigation styles
5. Create main.js with:
   - Function to load JSON files: loadJSON(path)
   - Function to initialize navigation
   - Smooth scroll behavior
6. Each HTML page should have:
   - Same navigation structure
   - Proper semantic HTML5
   - Meta tags for SEO
   - Responsive viewport settings
7. Footer with:
   - Copyright notice
   - Last updated date
   - Links to GitHub/Scholar profiles
```

### PHASE 2: Home Page with Animated Background
**Goal:** Create an engaging landing page with subtle mathematical animations.

**Prompt for Claude Code:**
```
Build the home page (index.html) with the following:

1. Hero section with:
   - Name in large Fira Code font
   - Title/position in Crimson Text serif
   - Brief tagline about research
   - Subtle logical symbols (∀, ∃, →, λ) as decorative elements
   
2. Canvas-based background animation:
   - Create animations.js with options for:
     a) Fibonacci spiral (slowly drawing)
     b) Conway's Game of Life (minimal, fading)
     c) Prime number spiral
   - Animations should be:
     - Very subtle (opacity 0.05-0.1)
     - Toggleable with a small button
     - Preference saved in localStorage
   - Default to Game of Life
   
3. Brief "About" section that loads from data/personal.json:
   - Short bio (3-4 sentences)
   - Current position
   - Research interests as clean list
   
4. "Recent Highlights" section:
   - Pull 3 most recent publications from data/publications.json
   - Display in card format with year, title, venue
   
5. Scholar metrics widget:
   - Load from data/personal.json
   - Display citations, h-index, i10-index
   - Style as a terminal-like box with monospace font
   
6. Make everything fully responsive
7. Add smooth fade-in animations on scroll

Remember: Keep it clean, minimal, and professional. The animations should enhance, not distract.
```

### PHASE 3: Publications Page with Search & Export
**Goal:** Create the most feature-rich page with search, filtering, and BibTeX export.

**Prompt for Claude Code:**
```
Create publications.html with advanced functionality:

1. Top section - "Selected Publications":
   - Load from data/publications.json (selected array)
   - Display 5-8 key papers
   - Each publication card shows:
     * Title (bold, larger font)
     * Authors (with my name highlighted)
     * Venue and year
     * DOI/URL link
     * PDF link if available (icon)
     * "Open Access" badge if applicable
     * BibTeX export button for individual entry
   
2. Search & Filter Section:
   - Search bar (searches title, authors, venue)
   - Filter by:
     * Year (dropdown: All, 2025, 2024, 2023...)
     * Type (journal, conference, workshop, book chapter)
     * Topic tags
   - Sort by: Year (desc/asc), Citations, Title
   
3. Complete Publications List:
   - Initially shows all publications
   - Updates dynamically based on search/filter
   - Smooth animations when filtering
   - "Back to top" button appears on scroll
   
4. Export Functionality:
   - "Export All BibTeX" button
   - "Export Selected BibTeX" after user checks boxes
   - Download as .bib file
   
5. Create publications.js with:
   - renderPublications(pubs, container)
   - searchPublications(query)
   - filterByYear(year)
   - filterByType(type)
   - sortPublications(sortBy, order)
   - exportBibTeX(publications)
   - highlightSearchTerms(text, query)
   
6. Statistics sidebar (sticky on desktop):
   - Total publications
   - Journal articles
   - Conference papers
   - By year chart (simple CSS bar chart)
   
7. Style with:
   - Clean cards with subtle borders
   - Hover effects
   - Logical symbols as section dividers
   - Use serif font for publication titles
   - Monospace for BibTeX previews

Remember: Search must be fast and highlight matching terms. BibTeX export must be properly formatted.
```

### PHASE 4: About, Education, Experience Pages
**Goal:** Create clean, scannable content pages.

**Prompt for Claude Code:**
```
Create three connected content pages:

1. about.html:
   - Load from data/personal.json and data/education.json
   - Sections:
     a) Full bio (2-3 paragraphs)
     b) Research Interests (grid layout with icons)
     c) Education (timeline design)
        - Each degree card shows:
          * Degree, institution, location
          * Years
          * Thesis title
          * Supervisors
          * Grade/honors
     d) Brief "Current Work" section
   - Use timeline CSS with logical symbols as markers
   
2. experience.html:
   - Load from data/experience.json
   - Professional timeline (vertical)
   - Each position card:
     * Title, institution
     * Dates
     * Description
     * Key achievements/research focus
   - Color-code by type (postdoc, assistant prof, etc.)
   
3. teaching.html:
   - Load from data/teaching.json and data/supervision.json
   - Sections:
     a) "Teaching Philosophy" (1 paragraph)
     b) Current Courses (cards)
     c) Past Courses (collapsible list by year)
     d) Guest Lectures & Workshops
     e) Student Supervision
        - Show student outcomes
        - Link to publications/projects
        - Highlight awards
   - Add "Teaching Load" statistics box
   
4. Common features for all pages:
   - Breadcrumb navigation
   - Smooth section scrolling
   - Print-friendly styles
   - Logical symbol decorations
   
5. Make everything look cohesive with the rest of the site
```

### PHASE 5: Projects & Service Pages
**Goal:** Showcase research projects and academic service.

**Prompt for Claude Code:**
```
Create two information-dense pages:

1. projects.html:
   - Load from data/projects.json
   - Two main sections: Current & Past
   - Each project card shows:
     * Project name and acronym
     * Funding source
     * Role and institution
     * Timeline
     * Brief description
     * Links (website, publications, etc.)
   - Use different styling for current vs past
   - Add "Project Highlights" section:
     * Total funding amount (if public)
     * Number of collaborators
     * Publications from projects
   
2. service.html:
   - Load from data/service.json, data/talks.json, data/groups.json
   - Organized sections:
     a) Conference Organization
     b) Program Committees
     c) Editorial Boards
     d) Reviewing (summarized, not exhaustive)
     e) Invited Talks (timeline or list)
     f) Research Groups & Affiliations
     g) Professional Memberships
   - Each section as collapsible accordion
   - Use tabs for "Current" vs "Past" service
   - Statistics box:
     * Total conferences as PC member
     * Years of service
     * Number of invited talks
   
3. Style considerations:
   - Make it scannable (lots of white space)
   - Use icons for different types of service
   - Highlight recent/ongoing activities
   - Include dates for everything
```

### PHASE 6: Contact Page & Special Pages
**Goal:** Create contact form and special information pages.

**Prompt for Claude Code:**
```
Create the contact page and additional pages:

1. contact.html:
   - Load from data/personal.json
   - Layout:
     a) Email addresses (categorized)
        - Show with copy-to-clipboard buttons
        - Icons for each type
     b) Office information (if any)
     c) Social/academic profiles:
        - Google Scholar
        - GitHub
        - ORCID
        - ResearchGate (if any)
     d) Mailing address (if public)
   - Add a subtle map or location indicator
   - "Office Hours" section (if applicable)
   - Terminal-themed design with monospace fonts
   
2. dissertation-info.html (NEW PAGE):
   - Load from data/dissertation_instructions.json
   - Sections:
     a) "Prospective PhD Students"
     b) Research topics I supervise
     c) Supervision approach
     d) Current openings
     e) How to apply
     f) FAQs
   - Include recent supervised student outcomes
   - Add links to PhD program pages
   - Contact information
   
3. Add "For Students" to navigation linking to dissertation-info.html

4. Create a simple 404.html page:
   - Styled to match site
   - Message with logic joke
   - Link back to home
   
5. Add a simple print stylesheet (print.css):
   - Hide navigation
   - Remove animations
   - Clean black & white
```

### PHASE 7: Skills Page & Polish
**Goal:** Add remaining content and polish everything.

**Prompt for Claude Code:**
```
Final additions and refinements:

1. Create skills.html (optional, or add to about.html):
   - Load from data/skills.json
   - Sections:
     a) Programming (categorized by proficiency)
     b) Languages
     c) Tools & Technologies
   - Visual skill bars or grids
   - Link to GitHub for code examples
   
2. Add a "Blog" or "News" section to home page:
   - Recent updates/announcements
   - Hardcoded for now (can be expanded later)
   
3. Accessibility improvements:
   - Add ARIA labels
   - Keyboard navigation
   - Focus indicators
   - Alt text for images
   - Semantic HTML review
   
4. Performance optimization:
   - Lazy load images
   - Minify CSS/JS
   - Optimize JSON loading
   - Add loading states
   
5. SEO optimization:
   - Add meta descriptions
   - Open Graph tags
   - Schema.org markup for academic profile
   - Sitemap.xml
   - robots.txt
   
6. Final polish:
   - Consistent spacing
   - Typography refinement
   - Animation timing tuning
   - Cross-browser testing notes
   - Mobile responsiveness check
   
7. Create README.md with:
   - Site description
   - How to update content (edit JSON files)
   - Deployment instructions
   - Credits
```

### PHASE 8: Testing & Deployment
**Goal:** Prepare for GitHub Pages deployment.

**Prompt for Claude Code:**
```
Prepare the site for deployment:

1. Create comprehensive README.md:
   - Site overview
   - How to update content (JSON editing guide)
   - How to deploy to GitHub Pages
   - Local development setup
   - Project structure explanation
   
2. Add a .gitignore file

3. Create deployment checklist:
   - All images optimized
   - All links working
   - All JSON files validated
   - Console errors cleared
   - Mobile responsiveness confirmed
   - Accessibility checked
   
4. Add GitHub Pages configuration:
   - Create _config.yml if needed
   - Add CNAME file if using custom domain
   
5. Create a "How to Update" guide:
   - How to add new publications
   - How to update current position
   - How to add news items
   - JSON schema reference
   
6. Add analytics (optional):
   - Google Analytics or Plausible
   - Privacy-friendly setup
   
7. Final QA checklist document
```

---

## Special Features to Implement

### 1. Smart Publication Display
- **Selected publications** shown first (from `selected` array in JSON)
- Toggle button: "View Selected" / "View All"
- Export single or multiple BibTeX entries
- Search highlights matching terms
- Filter persistence (URL parameters)

### 2. Background Animation Controller
```javascript
// In animations.js
const backgroundAnimations = {
  fibonacci: FibonacciSpiral,
  gameOfLife: ConwayGameOfLife,
  primes: PrimeSpiralUlam,
  riemann: RiemannZeta,
  mandelbrot: MandelbrotZoom,
  proofTree: ProofTree,
  pacman: PacmanGame,
  none: null
};

// User can toggle with a discrete button
// Preference saved in localStorage
```

### 2b. Animation Balance Guidelines

**Critical Requirements to Avoid Trypophobia:**
- NO dense grids of dots/pellets (removed from Pac-Man)
- Use sparse, irregular patterns
- Large spacing between repeated elements
- Flowing/organic shapes preferred over rigid grids

**Visibility Balance:**
- **Subtle (opacity 0.15-0.3):** Game of Life, Riemann Zeta
- **Medium (opacity 0.3-0.5):** Fibonacci, Prime Spiral, Proof Tree
- **More visible (opacity 0.4-0.8):** Mandelbrot, Pac-Man

**Speed Balance:**
- **Fast builders (~5 seconds):** Proof Tree (300 frames to full tree)
- **Medium (~15-30 seconds):** Fibonacci, Mandelbrot zoom cycles
- **Continuous:** Game of Life, Riemann, Primes, Pac-Man

**Size Specifications:**
- **Pac-Man:** size 35, speed 2.5, mouth angle 0-0.6
- **Ghosts:** size 30, speed 1.5, wave height * 5
- **Proof Tree nodes:** radius 18, spacing adjusts with depth
- **Game of Life cells:** 12px grid, radius 4px
- **Prime/Fibonacci:** Scale to canvas size dynamically

### 3. Responsive Navigation
- Desktop: Horizontal bar
- Mobile: Hamburger menu
- Active page highlighted
- Smooth transitions

### 4. Print Styles
- Clean black & white
- No backgrounds
- Clear hierarchies
- Perfect for CV generation

---

## Content Population Priority

### Immediate (Phase 1-2):
1. Personal info, bio, current position
2. Research interests
3. Contact information

### High Priority (Phase 3-4):
1. **All publications** (this is crucial)
2. Education
3. Current work experience
4. Selected projects

### Medium Priority (Phase 5-6):
1. Teaching experience
2. Supervision
3. Professional service
4. Invited talks

### Nice to Have (Phase 7-8):
1. Skills
2. Blog/news section
3. Research groups details
4. Full reviewing list

---

## Key Implementation Notes

### JSON Loading Pattern
```javascript
async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${path}:`, error);
    return null;
  }
}

// Usage
const pubs = await loadJSON('./data/publications.json');
```

### BibTeX Export
```javascript
function exportBibTeX(publications) {
  const bibtexEntries = publications.map(pub => pub.bibtex).join('\n\n');
  const blob = new Blob([bibtexEntries], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dasaro_publications.bib';
  a.click();
  URL.revokeObjectURL(url);
}
```

### Search Implementation
```javascript
function searchPublications(query, publications) {
  const lowerQuery = query.toLowerCase();
  return publications.filter(pub => {
    return pub.title.toLowerCase().includes(lowerQuery) ||
           pub.authors.some(a => a.toLowerCase().includes(lowerQuery)) ||
           pub.venue.toLowerCase().includes(lowerQuery) ||
           pub.tags.some(t => t.toLowerCase().includes(lowerQuery));
  });
}
```

---

## Design System Quick Reference

### Spacing Scale
```css
--space-xs: 0.25rem;  /* 4px */
--space-sm: 0.5rem;   /* 8px */
--space-md: 1rem;     /* 16px */
--space-lg: 1.5rem;   /* 24px */
--space-xl: 2rem;     /* 32px */
--space-2xl: 3rem;    /* 48px */
```

### Font Sizes
```css
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;   /* 24px */
--text-3xl: 2rem;     /* 32px */
--text-4xl: 2.5rem;   /* 40px */
```

### Component Patterns

#### Card
```css
.card {
  background: var(--color-white);
  border: 1px solid var(--color-gray-light);
  border-radius: 4px;
  padding: var(--space-lg);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

#### Button
```css
.btn {
  font-family: 'Fira Code', monospace;
  font-size: var(--text-sm);
  padding: var(--space-sm) var(--space-md);
  border: 2px solid var(--color-black);
  background: transparent;
  color: var(--color-black);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:hover {
  background: var(--color-black);
  color: var(--color-white);
}
```

---

## Success Criteria

### Before declaring each phase complete, verify:

✅ **Functionality**
- All JSON files load correctly
- No console errors
- All links work
- Search/filter functions work smoothly
- Export features work correctly

✅ **Design**
- Consistent typography
- Proper spacing
- Responsive on mobile/tablet/desktop
- Animations are subtle and performant
- Logical symbols used tastefully

✅ **Content**
- All data from CV included
- Information accurate and up-to-date
- BibTeX entries properly formatted
- Contact information correct

✅ **Performance**
- Fast page loads
- Smooth animations
- Efficient JSON loading
- No layout shifts

✅ **Accessibility**
- Keyboard navigable
- Screen reader friendly
- Sufficient color contrast
- Semantic HTML

---

## Final Notes

This is an **ambitious but achievable** project. The phased approach allows you to build incrementally and test as you go. The JSON-driven architecture makes it easy to update content without touching code.

Start with Phase 1-2 to get the foundation right, then move systematically through the other phases. Don't hesitate to iterate on design details—the terminal + philosophy aesthetic should feel natural, not forced.

The site will serve as both a professional showcase and a working example of clean, accessible web development—fitting for a logician who values clarity and precision.

---

**Ready to start building?** Begin with Phase 1! 🚀⚡📐