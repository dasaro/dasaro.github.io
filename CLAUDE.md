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

### Color Palette (UPDATED 2025)
**Primary Academic Colors:**
- **Background:** `#FFFFFF` (pure white)
- **Primary Text:** `#000000` (pure black)
- **Accent Dark Red:** `#8B0000` (primary accent for headers, highlights, active states)
- **Accent Indian Red:** `#CD5C5C` (secondary accent for hovers)
- **Accent Tan:** `#CD853F` (tertiary accent for completed/past items)
- **Text Secondary:** `#2C3E50` (dark gray for body text)
- **Text Tertiary:** `#34495E` (medium gray for metadata)
- **Background Subtle:** `#ECF0F1` (light gray for subtle backgrounds)
- **Link Color:** `#2980B9` (blue - preserved for standard links)
- **Link Hover:** `#3498DB` (lighter blue)

**Card & Border System:**
- **Standard Card Background:** `rgba(255, 255, 255, 0.95)` (white with slight transparency)
- **Standard Card Border:** `rgba(139, 0, 0, 0.2)` (subtle dark red border)
- **Standard Card Shadow:** `0 2px 8px rgba(0, 0, 0, 0.08)` (soft shadow for depth)
- **Code/Terminal (RARE USE):** `#1E1E1E` background with `#FFFFFF` text (ONLY for actual code blocks)

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

## Unified Design System (2025 Update)

### Design Philosophy: "Hacker-meets-Philosopher"

The website achieves a balance between **terminal aesthetics** (monospace fonts, geometric symbols) and **academic elegance** (serif fonts, clean white backgrounds). This is implemented through a strict card system and limited use of terminal styling.

### Card System

**Two Card Types Only:**

1. **Standard Academic Card** (90%+ of use cases)
   ```css
   background: rgba(255, 255, 255, 0.95);
   color: #000000;
   padding: 20px-24px;
   border: 1px solid rgba(139, 0, 0, 0.2); /* Subtle red border */
   border-radius: 8px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
   font-family: 'Crimson Text', serif; /* Body text */
   ```
   **When to use:** Contact info, service records, projects, research groups, invited talks, editorial boards, program committees

2. **Terminal/Code Card** (<10% of use cases)
   ```css
   background: #1E1E1E;
   color: #FFFFFF;
   font-family: 'Courier New', monospace;
   ```
   **When to use:** ONLY for actual code blocks, terminal commands, or BibTeX previews

### Typography Hierarchy

**Within Cards:**
- **Headings:** `'Fira Code', monospace` in `#8B0000` (Dark Red)
- **Body Text:** `'Crimson Text', serif` in `#2C3E50` (Dark Gray)
- **Labels/Strong:** `#8B0000` (Dark Red) for emphasis
- **Metadata:** `#2C3E50` with slightly smaller size

### Badge/Status System

**Color-coded for meaning:**

1. **Active/Current Projects:** `#8B0000` (Dark Red) background with white text
   ```html
   <span style="background: #8B0000; color: #FFFFFF;">ACTIVE</span>
   ```

2. **Completed/Past Projects:** `#CD853F` (Tan) background with white text
   ```html
   <span style="background: #CD853F; color: #FFFFFF;">COMPLETED</span>
   ```

3. **Open Access Publications:** `#8B4513` (Saddle Brown) background
   ```html
   <span class="badge-oa">OPEN ACCESS</span>
   ```

### Button/Link System

**Within Cards:**
- **Primary Action Button:**
  ```css
  background: #8B0000;
  color: #FFFFFF;
  font-family: 'Fira Code', monospace;
  padding: 6px-12px;
  border-radius: 4px;
  ```
  Hover: `background: #CD5C5C` (Indian Red)

- **Secondary/Text Links:**
  ```css
  color: #2C3E50;
  text-decoration: underline;
  ```
  Hover: `color: #8B0000`

### Usage Rules

**DO:**
- Use standard white cards for 90%+ of content (contact, service, projects, etc.)
- Use `'Crimson Text'` serif for body text within cards (academic elegance)
- Use `'Fira Code'` monospace for headers, labels, and buttons
- Use dark red (`#8B0000`) as primary accent color
- Use subtle red borders for cards (`rgba(139, 0, 0, 0.2)`)
- Use logic symbols (→, ∀, ∃, ⊢) as subtle bullets and decorations

**DON'T:**
- Use green (#00ff00) - removed entirely
- Use black terminal backgrounds (#0a0a0a, #1a1a1a) except for actual code
- Use terminal styling for regular content cards
- Mix serif and monospace within the same text block
- Over-use terminal aesthetic (keep it to <20% of page)

### Example Implementations

**Service Page - Program Committee Card:**
```html
<div style="background: rgba(255, 255, 255, 0.95); color: #000000; padding: 16px; border-radius: 8px; border: 1px solid rgba(139, 0, 0, 0.2); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); font-family: 'Crimson Text', serif;">
  <h4 style="color: #8B0000; font-family: 'Fira Code', monospace;">IJCAI</h4>
  <div style="color: #2C3E50;"><strong style="color: #8B0000;">Years:</strong> 2020, 2024, 2025</div>
  <div style="color: #2C3E50;"><strong style="color: #8B0000;">Role:</strong> PC Member</div>
</div>
```

**Projects Page - Active Project Card:**
```html
<div style="background: rgba(255, 255, 255, 0.95); padding: 24px; border: 1px solid rgba(139, 0, 0, 0.2); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);">
  <div style="background: #8B0000; color: #FFFFFF; padding: 4px 12px; border-radius: 3px; font-family: 'Fira Code', monospace;">ACTIVE</div>
  <h3 style="color: #8B0000; font-family: 'Fira Code', monospace;">FAIR - Future AI Research</h3>
  <p style="color: #2C3E50; font-family: 'Crimson Text', serif;">Working on logic for ethical human–AI collaboration...</p>
</div>
```

---

## CSS Architecture Guidelines (2025)

### ⚠️ ABSOLUTE RULE: NEVER USE INLINE STYLES

**This is a strict architectural requirement. All styling MUST be in CSS files.**

### NO Inline Styles Policy

**CRITICAL RULE:** This project maintains a strict separation of content (HTML) and presentation (CSS).

❌ **NEVER DO THIS:**
```html
<!-- WRONG - inline styles -->
<div style="color: red; margin-bottom: 20px;">
<p style="font-size: 1.2rem; font-weight: bold;">
<span style="background: rgba(255,255,255,0.95);">
```

✅ **ALWAYS DO THIS:**
```html
<!-- CORRECT - CSS classes -->
<div class="text-accent mb-lg">
<p class="text-xl text-bold">
<span class="card">
```

**NEVER:**
- Use `style=""` attributes in HTML files
- Add `<style>` blocks to HTML files (except for truly exceptional cases, documented with comments)
- Use inline styling in JavaScript-generated HTML
- Hardcode colors like `#FF0000` or `rgb(255,0,0)` - always use CSS variables

**ALWAYS:**
- Define all styling in `/css/main.css` or other CSS files
- Use semantic CSS class names
- Reference classes via `class=""` attributes
- Use CSS variables for all colors, spacing, and sizes

### CSS File Organization

The `css/main.css` file follows this structure:

```css
/* 1. Imports (Google Fonts) */
@import url('...');

/* 2. CSS Reset */
*, *::before, *::after { ... }

/* 3. CSS Variables */
:root {
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-link: #8B0000;
  /* ... all design tokens */
}

/* 4. Typography */
body, h1, h2, h3, p, a, code { ... }

/* 5. Layout & Grid System */
.container, .grid, .grid-2, .grid-3, .grid-4 { ... }

/* 6. Navigation */
.nav-wrapper, nav, .nav-brand, .nav-menu, .nav-link { ... }

/* 7. Main Content */
main, section, .section-title { ... }

/* 8. Cards */
.card, .card:hover { ... }

/* 9. Component-Specific Styles */
/* Publication Cards */
.publication-card, .publication-title, .publication-authors { ... }

/* Timeline Cards */
.timeline-card, .timeline-marker, .timeline-content { ... }

/* Contact Components */
.contact-card, .contact-item, .contact-link { ... }

/* Service Components */
.service-card, .service-year, .service-role { ... }

/* Project Components */
.project-card, .project-status, .project-meta { ... }

/* 10. Buttons */
.btn, .btn-primary, .btn:hover { ... }

/* 11. Badges */
.badge, .badge-oa, .badge-current, .badge-accepted { ... }

/* 12. Footer */
footer, .footer-content, .footer-links { ... }

/* 13. Animations */
#bg-animation-canvas, .animation-toggle { ... }

/* 14. Utility Classes */
.text-center, .mt-sm, .mb-md, .hidden { ... }

/* 15. Responsive (Media Queries) */
@media (max-width: 768px) { ... }
```

### CSS Class Naming Conventions

**Use kebab-case for all class names:**
```css
.publication-card      /* CORRECT */
.publicationCard       /* WRONG */
.publication_card      /* WRONG */
```

**Component-based naming (BEM-inspired):**
```css
/* Component */
.project-card { ... }

/* Component modifiers */
.project-card.current { ... }
.project-card.past { ... }

/* Component children */
.project-meta { ... }
.project-description { ... }
.project-outputs { ... }
```

**Utility class prefixes:**
```css
/* Spacing */
.mt-sm, .mb-md, .p-lg     /* margin-top, margin-bottom, padding */

/* Typography */
.text-center, .text-bold, .text-xs

/* Display */
.flex, .inline-block, .hidden
```

### Semantic CSS Classes

**Defined in main.css (lines 1086-1345):**

**Utility Classes:**
- Spacing: `.mb-xs`, `.mt-xs`, `.p-sm`, `.p-md`, `.p-lg`, `.p-xl`
- Typography: `.text-accent`, `.text-secondary`, `.text-bold`, `.text-xs`, `.text-sm`, `.text-lg`, `.text-xl`, `.font-mono`, `.font-serif`
- Display: `.flex`, `.inline-block`, `.flex-gap-sm`, `.flex-gap-md`, `.align-center`

**Component Classes:**
- Contact: `.contact-card`, `.contact-grid`, `.contact-section-title`, `.contact-item`, `.contact-icon`, `.contact-link`, `.copy-btn`, `.profile-links`, `.profile-link`, `.location-info`
- Service: `.service-card`, `.service-year`, `.service-role`, `.service-list`
- Projects: `.project-card`, `.project-status`, `.project-meta`, `.project-description`, `.project-outputs`, `.project-link`

### Maintaining the Architecture

**When adding new features:**

1. **Add CSS classes to main.css** in the appropriate section
2. **Use the classes in HTML** via `class=""` attributes
3. **Never use inline styles** as a shortcut

**When updating styles:**

1. **Find the existing class** in main.css
2. **Edit the CSS rule** directly
3. **Never add `style=""` overrides** in HTML

**When generating HTML via JavaScript:**

```javascript
// CORRECT - Uses CSS classes
const html = `
  <div class="project-card current">
    <span class="project-status">ACTIVE</span>
    <h3>${project.name}</h3>
    <div class="project-meta">
      <strong>Role:</strong> ${project.role}
    </div>
  </div>
`;

// WRONG - Uses inline styles
const html = `
  <div style="background: white; padding: 24px;">
    <span style="background: #8B0000; color: white;">ACTIVE</span>
    <h3 style="color: #8B0000;">${project.name}</h3>
  </div>
`;
```

### Cache Busting

When making CSS changes:

1. **Edit css/main.css** (or other CSS files)
2. **Increment the version number** in all HTML files:
   ```html
   <!-- Old -->
   <link rel="stylesheet" href="css/main.css?v=8">

   <!-- New -->
   <link rel="stylesheet" href="css/main.css?v=9">
   ```
3. **Update JavaScript includes** as well:
   ```html
   <script src="js/main.js?v=9"></script>
   <script src="js/animations.js?v=9"></script>
   ```

**Current version: v=9** (as of 2025-10-18)

### Benefits of This Architecture

1. **Maintainability:** All styles in one place, easy to find and update
2. **Consistency:** Reusable classes ensure visual consistency
3. **Performance:** Browser can cache CSS files effectively
4. **Separation of Concerns:** HTML for structure, CSS for presentation
5. **Collaboration:** Other developers can understand and modify styling easily
6. **DRY Principle:** Don't Repeat Yourself - define once, use everywhere

### Why This Rule Exists

1. **Maintainability**: One place to update styles (CSS files)
2. **Consistency**: Reusable classes ensure uniform appearance
3. **Performance**: Browsers cache CSS efficiently
4. **Separation of Concerns**: Structure (HTML) separated from presentation (CSS)
5. **Debugging**: Easier to find and fix styling issues
6. **Collaboration**: Clear, documented styling system

### Common Patterns

**Creating a new page:**

1. Copy an existing HTML file structure
2. Use existing CSS classes for layout and components
3. If you need new styling, add classes to main.css first
4. Apply classes in your HTML

**Adding dynamic content (JavaScript):**

1. Define CSS classes in main.css for the component
2. Generate HTML with class references in JavaScript
3. Never embed style values in JavaScript strings

**Debugging styling issues:**

1. Use browser DevTools to inspect element
2. Check which CSS classes are applied
3. Edit the CSS rule in main.css
4. Refresh with cache cleared (Cmd/Ctrl + Shift + R)

### Common Mistakes to Avoid

❌ **Mixing inline and class styles:**
```html
<div class="card" style="margin-top: 20px;">  <!-- NO! -->
```
✅ Instead: `<div class="card mt-lg">`

❌ **Hardcoded colors:**
```css
.my-class { color: #8B0000; }  <!-- NO! -->
```
✅ Instead: `color: var(--color-accent-primary);`

❌ **Hardcoded spacing:**
```css
.my-class { margin-bottom: 24px; }  <!-- NO! -->
```
✅ Instead: `margin-bottom: var(--space-lg);`

❌ **!important to override inline styles:**
```css
.my-class { color: red !important; }  <!-- NO! -->
```
✅ Instead: Remove inline styles, use CSS classes

### Quick Reference: When You Need Styling

**Need to style something?**
1. ✅ Check utility classes first (`.mb-md`, `.text-accent`, etc.)
2. ✅ Check component classes second (`.card`, `.project-card`, etc.)
3. ✅ Add to main.css third (if neither exists)
4. ❌ NEVER add inline styles

**Common patterns:**
- **Spacing:** Use `.mb-md`, `.mt-lg`, `.p-xl`
- **Colors:** Use `.text-accent`, `var(--color-accent-primary)`
- **Cards:** Use `.card`, `.project-card`, `.contact-card`
- **Typography:** Use `.text-xl`, `.text-bold`, `.font-mono`

**When in doubt:** Add to CSS file, not HTML!

### Enforcement

**Before committing code:**
- [ ] Search for `style="` in all HTML files → Should be ZERO results
- [ ] Search for `<style>` blocks → Should be minimal, well-documented
- [ ] Check JavaScript files for inline styling → Should use classes only
- [ ] Verify all colors use CSS variables
- [ ] Verify all spacing uses utility classes or variables

**This CSS architecture is MANDATORY. All future updates must follow these guidelines.**

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
---

## Animation Architecture (2025 Refactor)

### Modular Structure

As of 2025-10-18, the animation system has been refactored into a clean modular architecture. Each animation is now a self-contained module in `js/animations/`:

**File Organization:**
```
js/animations/
├── AnimationBase.js       # Base class with common functionality
├── AnimationController.js # Main controller/router
├── GameOfLife.js          # Conway's Game of Life
├── FibonacciSpiral.js     # Fibonacci spiral
├── PrimeSpiral.js         # Prime number spiral (Ulam)
├── RiemannZeta.js         # Riemann zeta function
├── MandelbrotSet.js       # Mandelbrot set zoom
├── ProofTree.js           # Logic proof tree
├── PacMan.js              # Pac-Man game
└── Rule30.js              # Rule 30 cellular automaton
```

### Architecture Benefits

1. **Maintainability**: Easy to find and edit specific animations
2. **Modularity**: Each animation completely independent
3. **Scalability**: Easy to add/remove animations
4. **Configuration**: Each animation has own settings
5. **Testing**: Can test animations individually
6. **Performance**: Only load what's needed
7. **Clean Code**: Much more organized and readable

### Base Class (AnimationBase.js)

All animations extend from `AnimationBase` which provides:

```javascript
export class AnimationBase {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.animationId = null;
        this.timeoutId = null;
        this.isRunning = false;
        
        // Default config (overridable)
        this.config = {
            opacity: 0.15,
            speed: 1.0,
            fadeAmount: 0.02
        };
    }
    
    start()    // Start animation
    stop()     // Stop and cleanup
    animate()  // To be implemented by subclasses
    static getMetadata() // Returns name, key, description
}
```

### Adding a New Animation

**Step 1:** Create `js/animations/NewAnimation.js`:

```javascript
import { AnimationBase } from './AnimationBase.js';

export class NewAnimation extends AnimationBase {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        
        // Animation-specific config
        this.config = {
            opacity: 0.3,
            speed: 1.0,
            fadeAmount: 0.02,
            // ... custom parameters
        };
        
        // Initialize state variables
        this.myState = 0;
    }
    
    static getMetadata() {
        return {
            name: 'New Animation',
            key: 'newAnimation',
            description: 'Description here'
        };
    }
    
    animate() {
        if (!this.isRunning) return;
        
        // Animation implementation
        // ...
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}
```

**Step 2:** Register in `AnimationController.js`:

```javascript
import { NewAnimation } from './NewAnimation.js';

// In constructor:
this.animations = new Map([
    // ... existing animations ...
    ['newAnimation', NewAnimation]
]);
```

**Step 3:** Test and commit!

### Animation Configuration

Each animation defines its own config object with parameters like:

- `opacity`: Visibility level (0.1-0.6)
- `speed`: Animation speed multiplier
- `fadeAmount`: Canvas fade per frame
- Animation-specific parameters (e.g., `cellSize`, `maxIterations`, `seriesTerms`)

**Example from RiemannZeta.js:**
```javascript
this.config = {
    opacity: 0.6,
    speed: 0.12,
    fadeAmount: 0.04,
    lineWidth: 2.5,
    dotRadius: 7,
    seriesTerms: 500
};
```

### Animation Controller

The `AnimationController` manages all animations:

- **Registration**: All animations registered in a Map
- **Random Start**: Picks random animation on page load
- **Toggle Button**: Cycles through animations
- **Keyboard Shortcut**: Press 'A' to toggle
- **Canvas Management**: Handles resize, visibility
- **Cleanup**: Proper stop/start between animations

### Metadata System

Each animation provides metadata via static method:

```javascript
static getMetadata() {
    return {
        name: 'Riemann Zeta',        // Display name
        key: 'riemann',              // Internal key
        description: 'Polar plot...' // Tooltip description
    };
}
```

### State Management

Each animation manages its own state:

- **Constructor**: Initialize all state variables as `this.property`
- **animate()**: Update state, draw frame, request next frame
- **stop()**: Inherited from AnimationBase, cleans up automatically

**Example:**
```javascript
constructor(canvas, ctx) {
    super(canvas, ctx);
    this.t = 14.134725;  // State variable
    this.path = [];      // State variable
}

animate() {
    if (!this.isRunning) return;  // Guard check
    
    // Update state
    this.t += this.config.speed;
    
    // Draw frame
    // ...
    
    // Request next frame
    this.animationId = requestAnimationFrame(() => this.animate());
}
```

### Best Practices

1. **Always guard animate()**: `if (!this.isRunning) return;`
2. **Use arrow functions for RAF**: `requestAnimationFrame(() => this.animate())`
3. **Store timeouts**: `this.timeoutId = setTimeout(...)`
4. **Parameterize config**: Don't hard-code values
5. **Clean metadata**: Descriptive names and descriptions
6. **Test individually**: Each animation should work standalone

### Migration from Monolithic (Pre-2025)

The old `js/animations.js` (2000+ lines) has been split into:

- 1 base class (AnimationBase.js)
- 1 controller (AnimationController.js)
- 8 animation modules (one per animation)

**Old structure:**
```javascript
class BackgroundAnimations {
    gameOfLife() { /* 100 lines */ }
    fibonacciSpiral() { /* 100 lines */ }
    // ... 6 more methods
}
```

**New structure:**
```javascript
// Each animation is a separate file/class
export class GameOfLife extends AnimationBase {
    // Self-contained implementation
}
```

### Cache Busting

When making changes to animations:

1. Edit the animation file (e.g., `RiemannZeta.js`)
2. Update version in HTML files:
   ```html
   <script type="module" src="js/animations/AnimationController.js?v=19"></script>
   ```
3. Increment version number (`v=18` → `v=19`)
4. Commit changes

**Current version: v=18** (as of 2025-10-18)

### HTML Integration

All HTML files use ES6 modules:

```html
<script type="module" src="js/animations/AnimationController.js?v=18"></script>
```

**Note:** Must use `type="module"` for ES6 imports to work.

### Troubleshooting

**Animation not starting:**
- Check browser console for import errors
- Verify all animation files exist in `js/animations/`
- Check that AnimationController imports match file names

**Animation not stopping cleanly:**
- Verify `if (!this.isRunning) return;` guard at start of `animate()`
- Check that timeouts use `this.timeoutId`
- Ensure base class `stop()` is called

**Animation looks different:**
- Check `config` object for opacity, speed, etc.
- Verify canvas fade amount (`fadeAmount`)
- Compare with old implementation if needed

---
