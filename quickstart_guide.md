# Quick Start Guide: Building Your Academic Website with Claude Code

## 🚀 Getting Started

You now have everything you need to build your website! Here's how to use these materials with Claude Code.

---

## 📁 What You Have

1. **CLAUDE.md** - Complete development plan with 8 phases
2. **Pre-filled JSON data** - Your CV data ready to use
3. **Publications JSON** - Your complete publication list
4. **This guide** - Step-by-step workflow

---

## 🛠️ Setup Steps

### 1. Create Your Repository

```bash
# On your local machine or via GitHub web interface
mkdir dasaro.github.io
cd dasaro.github.io
git init
```

### 2. Start Claude Code

```bash
# In your terminal, navigate to the repository
cd dasaro.github.io

# Start Claude Code
claude-code
```

### 3. Begin with Phase 1

Copy and paste this **first prompt** into Claude Code:

```
I'm building an academic website. Please read the CLAUDE.md file which contains the complete development plan. Let's start with Phase 1: Foundation & Core Structure.

Create the foundational structure for an academic website with the following:

1. File structure:
   - Root: index.html, about.html, publications.html, teaching.html, projects.html, service.html, contact.html
   - css/ directory with main.css, animations.css, responsive.css
   - js/ directory with main.js, publications.js, animations.js, search.js
   - data/ directory (empty for now - I'll populate it)
   - assets/ directory with images/ and docs/ subdirectories

2. Create index.html with:
   - Clean navigation bar linking to all pages
   - Fixed top bar, black text on white background
   - Uses 'Fira Code' font for nav items
   - Simple underline animation on hover
   - Mobile-responsive hamburger menu

3. Create main.css with:
   - CSS reset
   - Color palette variables:
     * --color-white: #FFFFFF
     * --color-black: #000000
     * --color-accent-1: #2C3E50
     * --color-accent-2: #34495E
     * --color-accent-3: #ECF0F1
     * --color-link: #2980B9
     * --color-link-hover: #3498DB
   - Typography hierarchy (Fira Code for headers/nav, Crimson Text for body)
   - Responsive grid system
   - Navigation styles

4. Create main.js with:
   - async function loadJSON(path) to load JSON files
   - function to initialize navigation
   - smooth scroll behavior

5. Each HTML page should have:
   - Same navigation structure
   - Proper semantic HTML5
   - Meta tags for SEO
   - Responsive viewport settings

6. Footer with:
   - Copyright notice: © 2025 Fabio Aurelio D'Asaro
   - Last updated date
   - Links to GitHub and Google Scholar

Make everything clean, minimal, and professional. Use logical symbols (∀, ∃, →) as subtle decorative elements where appropriate.
```

---

## 📝 Workflow for Each Phase

### General Pattern:

1. **Tell Claude Code which phase you're on:**
   ```
   Let's move to Phase X: [Phase Name]. Please implement the requirements from the CLAUDE.md file.
   ```

2. **Provide the specific prompt** from CLAUDE.md for that phase

3. **Test the results** by opening the HTML files in your browser

4. **Iterate if needed:**
   ```
   The navigation looks good, but can you make the hover animation slightly slower?
   ```

5. **Move to the next phase** once satisfied

---

## 📊 Populating Your Data

After Phase 1 is complete, you'll need to populate the JSON files.

### Creating data/personal.json:

1. Create a file `data/personal.json`
2. Copy the content from the "Pre-filled JSON data" artifact
3. Look for the `"personal.json"` section
4. Paste it into your file
5. Update any placeholders (Google Scholar ID, ORCID, etc.)

**Quick prompt for Claude Code:**
```
Create data/personal.json using the data I'm about to paste. Here's the data: [paste the personal.json content from the artifact]
```

### Same process for other JSON files:
- `data/education.json`
- `data/experience.json`
- `data/publications.json` (use the publications artifact)
- `data/teaching.json` (you'll need to add this manually or ask Claude to extract from your CV)
- `data/projects.json`
- `data/service.json`
- etc.

---

## 🎯 Phase Priorities

### Must Complete (Core functionality):
- ✅ Phase 1: Foundation (navigation, structure)
- ✅ Phase 2: Home page with animations
- ✅ Phase 3: Publications with search/filter
- ✅ Phase 4: About, Education, Experience

### Important (Full functionality):
- ⭐ Phase 5: Projects & Service
- ⭐ Phase 6: Contact & Dissertation info

### Polish (Final touches):
- 💎 Phase 7: Skills & optimization
- 💎 Phase 8: Testing & deployment

---

## 🎨 Customization Tips

### Want to change the color scheme?
```
The color palette looks good, but I'd prefer a slightly warmer tone for the accent colors. Can you suggest alternatives and update the CSS?
```

### Want to adjust animations?
```
The fibonacci animation is too prominent. Can you reduce the opacity to 0.03 and slow down the drawing speed by 50%?
```

### Want to modify the layout?
```
Can you change the publications page to use a 2-column layout on desktop instead of single column?
```

---

## 🐛 Troubleshooting

### JSON not loading?
```
I'm getting an error when trying to load data/personal.json. Can you check the file path and the loadJSON function?
```

### Navigation not working on mobile?
```
The hamburger menu isn't opening on mobile. Can you debug the mobile navigation JavaScript?
```

### Styling issues?
```
The navigation bar overlaps the content on scroll. Can you add proper padding to the body?
```

---

## 📤 Deployment to GitHub Pages

Once everything is working:

### 1. Create GitHub repository:
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Academic website"

# Create repo on GitHub named 'dasaro.github.io'
# Then connect and push:
git remote add origin https://github.com/dasaro/dasaro.github.io.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages:
- Go to repository settings
- Navigate to "Pages"
- Source: Deploy from branch "main"
- Folder: / (root)
- Save

### 3. Wait a few minutes:
Your site will be live at: `https://dasaro.github.io`

---

## 🔄 Updating Content

### Adding a new publication:

1. Open `data/publications.json`
2. Add the new entry to the `"all"` array
3. If it's a key publication, add it to `"selected"` too
4. Git commit and push:
```bash
git add data/publications.json
git commit -m "Add new publication: [title]"
git push
```

### Updating current position:

1. Open `data/personal.json` and `data/experience.json`
2. Update the relevant fields
3. Commit and push

---

## 💡 Pro Tips

### 1. **Test locally first**
Open `index.html` directly in your browser to test before pushing to GitHub.

### 2. **Use browser DevTools**
- Right-click → Inspect to debug styling issues
- Console tab to check for JavaScript errors
- Network tab to verify JSON files are loading

### 3. **Iterate in small steps**
Don't try to build everything at once. Complete one phase, test it, then move to the next.

### 4. **Keep CLAUDE.md open**
Reference it frequently to understand the design philosophy and technical decisions.

### 5. **Commit often**
```bash
git add .
git commit -m "Complete Phase 2: Home page with animations"
git push
```

---

## 📋 Checklist for Completion

### Phase 1: Foundation ✓
- [ ] All HTML pages created
- [ ] Navigation working on desktop and mobile
- [ ] CSS variables defined
- [ ] loadJSON function working
- [ ] Footer on all pages

### Phase 2: Home Page ✓
- [ ] Hero section with name and title
- [ ] Background animation (toggleable)
- [ ] About section loading from JSON
- [ ] Recent publications section
- [ ] Scholar metrics widget

### Phase 3: Publications ✓
- [ ] Selected publications displayed
- [ ] Search functionality working
- [ ] Filter by year/type/tags working
- [ ] BibTeX export (individual and bulk)
- [ ] Smooth animations on filter

### Phase 4: Content Pages ✓
- [ ] About page with full bio
- [ ] Education timeline
- [ ] Experience timeline
- [ ] Teaching page with courses
- [ ] Supervision section

### Phase 5: Projects & Service ✓
- [ ] Projects page (current and past)
- [ ] Service page with all sections
- [ ] Invited talks section
- [ ] Research groups section

### Phase 6: Contact ✓
- [ ] Contact page with all emails
- [ ] Social/academic profile links
- [ ] Dissertation info page created
- [ ] Navigation updated

### Phase 7: Polish ✓
- [ ] Skills page (if separate)
- [ ] Accessibility improvements
- [ ] Performance optimizations
- [ ] SEO meta tags

### Phase 8: Deployment ✓
- [ ] README.md created
- [ ] GitHub repository set up
- [ ] GitHub Pages enabled
- [ ] Site live and tested
- [ ] All links working

---

## 🎓 Remember

This website is a **living document** of your academic career. The JSON-driven architecture makes it easy to keep updated. Commit to updating it:

- After each new publication
- When you change positions
- After giving invited talks
- When supervising new students
- When winning awards or grants

---

## 🆘 Need Help?

If you get stuck at any phase:

1. **Re-read the relevant section** in CLAUDE.md
2. **Ask Claude Code specifically**: 
   ```
   I'm stuck on Phase 3. The search function isn't filtering the publications correctly. Can you help debug?
   ```
3. **Check the browser console** for errors
4. **Simplify**: If something is too complex, ask Claude to break it into smaller steps

---

## 🎉 Ready to Begin!

You have everything you need. Start with the Phase 1 prompt above, and work through each phase systematically. 

**Your academic website will be:**
- ✨ Professional and elegant
- ⚡ Fast and responsive  
- 🔍 Searchable and accessible
- 📊 Data-driven and easy to update
- 🎨 Uniquely "you" (terminal meets philosophy)

Good luck! 🚀📐⚡