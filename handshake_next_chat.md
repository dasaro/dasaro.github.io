# 🤝 HANDSHAKE MESSAGE FOR NEXT CHAT

## 📍 Project Status: Academic Website for Fabio Aurelio D'Asaro

**Location:** `/Users/fdasaro/Desktop/dasaro.github.io`  
**Host:** GitHub Pages (`https://dasaro.github.io`)  
**Architecture:** Static site, JSON-driven, vanilla JavaScript

---

## ✅ COMPLETED SECTIONS (Fully Functional)

### 1. **Home Page (index.html)** ✅
- **Status:** WORKING with inline styles
- **Displays:** Recent publications, scholar metrics, research interests, bio
- **Fix Applied:** Nuclear option - all CSS replaced with inline styles with `!important`
- **Data Sources:** `data/personal.json`, `data/publications.json`

### 2. **Publications Page (publications.html)** ✅
- **Status:** WORKING with inline styles
- **Features:** Selected publications, full list, search/filter, BibTeX export
- **Fix Applied:** Inline styles throughout
- **Data Source:** `data/publications.json`

### 3. **Teaching Page (teaching.html)** ✅
- **Status:** WORKING with inline styles
- **Displays:** Teaching philosophy, 6 current courses, 6 past courses, 6 guest lectures, 7 supervised students
- **Fix Applied:** Complete inline style overhaul
- **Data Sources:** `data/teaching.json`, `data/supervision.json`
- **NOTE:** supervision.json has 1 real student (Zlatina Mileva) + 6 placeholders that need replacement

### 4. **About Page (about.html)** ✅
- **Status:** WORKING with JSON loading
- **Displays:** Bio, education timeline (3 degrees), professional experience
- **Data Sources:** `data/personal.json`, `data/education.json`, `data/experience.json`

### 5. **Background Animations** ✅
- **Status:** BALANCED and working
- All 7 animations functional: Game of Life, Fibonacci, Primes, Riemann, Mandelbrot, Proof Tree, Pac-Man
- **Fix Applied:** Pac-Man has NO pellets (trypophobia fix), larger characters, faster movement
- Speed and opacity balanced across all animations
- Toggle button works (press 'A' key)

---

## 🚨 CRITICAL FIX PATTERN (Use This for All Pages)

### The "Nuclear Option" - Inline Styles Solution

**Problem:** Content loads from JSON but appears transparent/invisible due to CSS overrides.

**Solution:** Replace ALL CSS classes with inline styles using `!important`:

```javascript
// ❌ WRONG (CSS classes - can be overridden)
const html = `<div class="card"><h3 class="title">${title}</h3></div>`;

// ✅ CORRECT (Inline styles - cannot be overridden)
const html = `
  <div style="background: #FFFFFF; border: 2px solid #e0e0e0; padding: 24px;">
    <h3 style="color: #000000 !important; font-size: 1.25rem;">
      ${title}
    </h3>
  </div>
`;
```

**Key Rules:**
- ALL text: `color: #000000 !important` (or other explicit color)
- ALL backgrounds: explicit (`#FFFFFF`, `#ECF0F1`, etc.)
- ALL borders, padding, margins: inline
- NO CSS classes for content styling
- Use console.log for verification: `console.log('[page.html] ✅ Section displayed!')`

**This pattern worked for:**
- index.html publications
- publications.html
- teaching.html (all 6 sections)

---

## ⚠️ IMMEDIATE TODO (Priority 1)

### Replace Placeholder Students in supervision.json

**Current State:** 1 real student + 6 placeholders (Marco Rossi, Sofia Chen, etc.)

**Action Needed:** Replace with REAL students from CV:

1. **Zlatina Mileva** (Imperial College London, MSc, 2023) ✅ KEEP
   - Outstanding Project Award, arXiv preprint

2. **Daniele Fossemò & Marco D'Aviero** (L'Aquila, UG, 2022)
   - Zenodo dataset, BEWARE-22 paper

3. **Veronica Zenatelli** (Verona, BA, 2024)
   - GitHub benchmark dataset (LLMs & Frame Problem)

4. **Sara Sangiovanni** (Naples Federico II, MSc, 2020)
   - ICSR 2020 publication

5. **Gennaro Daniele Acciaro** (Naples Federico II, MSc, 2021)
   - WOA 2021 publication

6. **Luca Raggioli** (Naples Federico II, MSc, 2023)
   - Int. J. of Social Robotics (2023)

7. **Francesco Pedrazzoli** (Verona, PhD, 2023)
   - BRIO poster, CEPE-23 paper

**File:** `/Users/fdasaro/Desktop/dasaro.github.io/data/supervision.json`

---

## 📋 REMAINING PAGES TO POPULATE

### 1. **Projects Page (projects.html)** 🔴 TODO
**Status:** Needs population and inline style fix  
**Data File:** `data/projects.json`  
**Content Needed:**
- Current projects: FAIR (PNRR, 2025-present)
- Past projects: REVO (PON, 2022-2024), BRIO (PRIN, 2022-2025), AVATEA (POR, 2018-2019)
- **Apply inline styles pattern** if content not visible

### 2. **Service Page (service.html)** 🔴 TODO
**Status:** Needs population and inline style fix  
**Data Files:** `data/service.json`, `data/talks.json`, `data/groups.json`  
**Content Needed:**
- Conference organization (eDefAI 2025)
- Program committees (IJCAI 2020/2024/2025, KR 2022-2025, ECAI 2023)
- Editorial boards (Frontiers in AI)
- Invited talks (PACMAN 2025, etc.)
- Research groups (EThOS, LUCI, SPIKE, KIDS)
- Professional memberships (AILA, SILFS, AIxIA, GULP)
- **Apply inline styles pattern** if content not visible

### 3. **Contact Page (contact.html)** 🟡 CHECK
**Status:** Likely simple, may not need fixes  
**Data File:** `data/personal.json`  
**Content:** Email addresses, phone, office info, social profiles

### 4. **Dissertation Info Page (dissertation-info.html)** 🟢 EXISTS
**Status:** Page exists, check if needs population  
**Purpose:** Info for prospective PhD students

---

## 📁 FILE STRUCTURE

```
dasaro.github.io/
├── index.html              ✅ DONE
├── about.html              ✅ DONE
├── publications.html       ✅ DONE
├── teaching.html           ✅ DONE
├── projects.html           🔴 TODO
├── service.html            🔴 TODO
├── contact.html            🟡 CHECK
├── dissertation-info.html  🟢 EXISTS
├── 404.html                ✅ EXISTS
├── css/
│   ├── main.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── animations.js
│   ├── publications.js
│   └── search.js
└── data/
    ├── personal.json       ✅ POPULATED
    ├── education.json      ✅ POPULATED
    ├── experience.json     ✅ POPULATED
    ├── publications.json   ✅ POPULATED
    ├── teaching.json       ✅ POPULATED
    ├── supervision.json    ⚠️ HAS PLACEHOLDERS
    ├── projects.json       🔴 EMPTY/INCOMPLETE
    ├── service.json        🔴 EMPTY/INCOMPLETE
    ├── talks.json          🔴 EMPTY/INCOMPLETE
    ├── groups.json         🔴 EMPTY/INCOMPLETE
    └── skills.json         ✅ POPULATED
```

---

## 🔑 KEY TECHNICAL DETAILS

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
```

### Author Name Highlighting
User's name appears in publications and needs highlighting:
```javascript
function highlightAuthor(authorString) {
  return authorString.replace(
    /F\.\s*A\.\s*D['']Asaro/g,
    '<strong style="color: #000000 !important; font-weight: 700;">F. A. D\'Asaro</strong>'
  );
}
```

### Console Logging Pattern
Always add comprehensive logging:
```javascript
console.log('[page.html] Data loaded:', data);
console.log('[page.html] Container found:', !!container);
console.log('[page.html] HTML generated, length:', html.length);
console.log('[page.html] ✅ Section displayed!');
```

---

## 🎨 DESIGN SYSTEM

### Colors
- Background: `#FFFFFF`
- Primary text: `#000000`
- Secondary text: `#34495E`
- Meta text: `#2C3E50`
- Links: `#2980B9`
- Code bg: `#1E1E1E`
- Code text: `#00FF00`
- Open Access badge: `#27ae60`

### Typography
- Headers: `'Fira Code', monospace`
- Body: `'Crimson Text', Georgia, serif`
- Code: `'Fira Code', monospace`

### Logic Symbols
Use for decoration: ∀ ∃ → ⊢ ⊨ λ ∧ ∨ ¬ ∅ ⊤ ⊥

---

## 📚 REFERENCE DOCUMENTS

**CV Location:** User has provided PDF CV with complete information  
**CLAUDE.md:** Contains full development plan (phases 1-8)  
**Previous Chat:** Contains proven inline styles solution for visibility bug

---

## 🚀 RECOMMENDED NEXT STEPS

1. **IMMEDIATE:** Replace supervision.json placeholder students with real ones (5 min)
2. **CHECK:** Verify projects.html, service.html, contact.html display correctly
3. **POPULATE:** Fill missing data files (projects.json, service.json, talks.json, groups.json)
4. **APPLY FIX:** Use inline styles pattern if content not visible
5. **FINAL POLISH:** Test all pages, fix any remaining issues
6. **DEPLOY:** Push to GitHub Pages

---

## 💡 TIPS FOR SUCCESS

1. **Always check console logs first** - look for `[page.html]` messages
2. **If content not visible** → Apply inline styles pattern (nuclear option)
3. **Refer to CV** - All content comes from user's CV (attached in previous chats)
4. **Test in browser** - Hard refresh (Cmd+Shift+R) after changes
5. **Follow proven patterns** - We've established working solutions for everything

---

## 🎯 CURRENT OBJECTIVE

**Complete the remaining pages** (projects, service, contact) using the proven inline styles pattern so the entire website is functional and ready for deployment.

**User Goal:** Professional academic website showcasing research, teaching, and service - clean, elegant, fully functional.

---

**Ready to continue!** All the architecture, patterns, and solutions are proven. Just need to apply them to the remaining pages. 🚀✨