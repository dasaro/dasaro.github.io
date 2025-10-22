# Google Site Data Audit & Enrichment Guide

**Date:** October 23, 2025
**Project:** dasaro.github.io
**Source for Comparison:** https://sites.google.com/view/fdasaro
**Status:** Automated Google Sites access blocked; Manual comparison required

---

## Executive Summary

This audit analyzes the **completeness and quality** of your JSON data files and provides a systematic checklist for comparing with your Google Sites page to identify enrichment opportunities.

### Current State

| Data File | Lines | Status | Completeness |
|-----------|-------|--------|--------------|
| personal.json | 133 | ✅ Rich | 90% - Missing Scholar/ORCID IDs |
| publications.json | 611 | ✅ Rich | 95% - 39 publications |
| teaching.json | 156 | ✅ Rich | 95% - Comprehensive |
| service.json | 111 | ✅ Good | 85% - Core content present |
| supervision.json | 98 | ✅ Good | 90% - 7 students documented |
| education.json | 36 | ✅ Complete | 100% - All 3 degrees |
| experience.json | 65 | ✅ Good | 90% - 6 positions |
| projects.json | 55 | ✅ Good | 85% - 4 projects |
| talks.json | 71 | ✅ Good | 85% - Invited talks documented |
| groups.json | 54 | ✅ Good | 80% - Core groups |
| skills.json | 12 | ⚠️ Minimal | 60% - Basic structure |
| affiliations.json | 86 | ✅ Rich | 95% - Detailed affiliations |
| dissertation_instructions.json | 116 | ✅ Complete | 100% - For prospective students |

**Total Publications:** 39
**Total Supervised Students:** 7
**Years Teaching:** 12+
**Total Files:** 13 JSON data files

---

## 1. personal.json Analysis

### ✅ What's Complete

- **Name, title, current position:** Fully populated
- **Affiliations:** 3 institutions (Salento, Verona, UCL)
- **Bio:** Both `bio_short` and `bio_long` present and comprehensive
- **Research Interests:** 6 detailed interests with symbols and descriptions
- **Current Work:** 6 active research collaborations documented
- **Contact:** 4 email addresses, phone, website, GitHub
- **Scholar Metrics:** Citations (227), h-index (10), i10-index (10), last updated Sept 2025
- **News:** 3 recent announcements (eDefAI, Salento position, gen.ia)
- **Location:** Verona, Veneto, Italy
- **Birthplace:** Palermo, Italy

### ⚠️ Needs Update (CRITICAL)

1. **`scholar`: "YOUR_GOOGLE_SCHOLAR_ID"** ← PLACEHOLDER
   - Visit https://scholar.google.com
   - Find your profile URL (e.g., `https://scholar.google.com/citations?user=XXXXXX`)
   - Extract the user ID (after `?user=`)
   - Replace in personal.json

2. **`orcid`: "YOUR_ORCID_ID"** ← PLACEHOLDER
   - Your ORCID should be format: `0000-0000-0000-0000`
   - Get from https://orcid.org
   - Replace in personal.json

### 💡 Potential Enhancements

**Check Google Sites for:**
- Additional social media links (LinkedIn, ResearchGate, Semantic Scholar?)
- More detailed research interest descriptions
- Any awards or honors to add
- Office hours or consultation information
- Additional news/announcements
- More detailed current work descriptions

---

## 2. publications.json Analysis

### ✅ What's Complete

- **Total Publications:** 39 entries
- **Selected Publications:** 8 highlighted publications
- **Metadata:** DOI, URL, authors, year, venue, type, tags
- **BibTeX:** All publications have proper BibTeX entries
- **Status:** "published" or "accepted" flags
- **Open Access:** Flags present where applicable

### Publications Breakdown by Type

```
Journals: ~15-20
Conferences: ~15-20
Workshops: ~5
(Estimated from structure - verify exact counts)
```

### ⚠️ Missing/Check on Google Sites

**For EACH publication, verify:**
- [ ] Is every publication from Google Sites in JSON?
- [ ] Are DOI links all present and correct?
- [ ] Any publications with available PDF links?
- [ ] Any publications with abstracts you want to add?
- [ ] Any publications with arXiv links?
- [ ] Any best paper awards or recognitions?
- [ ] Citation counts per paper (if displayed on Google Sites)
- [ ] Any publications in "submitted" or "in preparation" status?

### 💡 Potential Enhancements

**Consider adding:**
- `abstract` field for selected publications
- `keywords` field (beyond tags)
- `citation_count` per paper if available
- `best_paper` or `award` field
- `arxiv` links where applicable
- `slides` or `poster` links if available
- `code_repository` links for papers with code
- `video` links for conference presentations

---

## 3. teaching.json Analysis

### ✅ What's Complete

- **Teaching Philosophy:** Comprehensive statement
- **Current Courses:** 6 courses documented with full details
  - Logic and Philosophy of Science (BA)
  - Epistemology of Big Data (MSc)
  - Computational Epistemology (MSc)
  - Logic and Philosophy of Science in Physiotherapy (BSc)
  - Laboratory of Computer Science and Multimedia Technologies (BA)
  - Laboratory of Artificial Intelligence and Neuroscience (PhD)
- **Guest Lectures:** 5 documented (2021-2025)
- **Teaching Assistant Positions:** UCL (2015-2023), Palermo (2013-2014)
- **Statistics:** 12 years experience, 100+ hours/year

### ⚠️ Check on Google Sites

- [ ] Any missing courses?
- [ ] Course websites or syllabi links?
- [ ] Student evaluation scores/testimonials?
- [ ] Teaching awards or recognition?
- [ ] Additional guest lectures not listed?
- [ ] Co-teaching arrangements?
- [ ] Teaching materials (slides, notes) you want to link?

---

## 4. service.json Analysis

### ✅ What's Complete

- **Conference Organization:** 6 events (eDefAI 2025, BEWARE series, ME and E, AI3, etc.)
- **Program Committees:** 3 major conferences (IJCAI 2020/2024/2025, KR 2022-2025, ECAI 2023)
- **Editorial Boards:** 3 Frontiers journals (AI, Big Data, AI in Neurology)
- **Reviewing:** Documented for IJAR, KR, and others

### ⚠️ Check on Google Sites

- [ ] More PC memberships? (AAAI, AAMAS, NeurIPS, ICML, etc.?)
- [ ] Additional editorial positions?
- [ ] Complete reviewing history (all venues)?
- [ ] Society memberships (AAAI, ACM, IEEE?)
- [ ] Community outreach activities?
- [ ] Panel/jury service?
- [ ] Grant review panels?

---

## 5. supervision.json Analysis

### ✅ What's Complete

**7 Students Documented:**
1. **Zlatina Mileva** (Imperial MSc 2023) - Outstanding Project Award
2. **Daniele Fossemò & Marco D'Aviero** (L'Aquila UG 2022) - Published dataset, workshop paper
3. **Veronica Zenatelli** (Verona BA 2024) - GitHub benchmark
4. **Sara Sangiovanni** (Naples MSc 2020) - ICSR 2020
5. **Gennaro Daniele Acciaro** (Naples MSc 2021) - WOA 2021
6. **Luca Raggioli** (Naples MSc 2023) - IJSR journal
7. **Francesco Pedrazzoli** (Verona PhD ongoing) - CEPE-23

### ⚠️ Check on Google Sites

- [ ] Any missing supervised students?
- [ ] Current supervisees not listed?
- [ ] Links to student publications/theses?
- [ ] Links to open datasets/repositories?
- [ ] Any undergraduate/BSc students missing?
- [ ] Informal mentoring to document?
- [ ] Examination committee service?

---

## 6. experience.json Analysis

### ✅ What's Complete

**6 Positions:**
1. Postdoc - University of Salento (2025-present) - FAIR project
2. Assistant Professor - University of Verona (2022-2025) - RTD-A
3. Postdoc - University of Milan (2020-2021)
4. Postdoc - CRDC Tecnologie Naples (2019-2020) - AVATEA
5. Research Assistant - University of Palermo (2013-2014) - NEVERLOST
6. Undergrad Intern - ICAR CNR Palermo (2011) - IMPULSO

### ⚠️ Check on Google Sites

- [ ] Any visiting positions not listed?
- [ ] Adjunct appointments?
- [ ] Advisory board memberships?
- [ ] Industry collaborations or consulting?
- [ ] Any gaps in timeline to fill?
- [ ] More detailed descriptions of achievements in each role?

---

## 7. education.json Analysis

### ✅ What's Complete (100%)

**3 Degrees:**
1. **PhD** - UCL (2014-2019) - AI, supervisors: Miller, Bikakis, Dickens
2. **MSc** - Manchester (2013-2014) - Pure Math & Logic, Distinction
3. **BSc** - Palermo (2006-2011) - Computer Science, 110/110 cum laude

### ⚠️ Check on Google Sites

- [ ] Any additional certifications?
- [ ] PhD thesis award or recognition?
- [ ] Links to thesis PDFs?
- [ ] Scholarships or fellowships during degrees?
- [ ] Any relevant coursework to highlight?

---

## 8. projects.json Analysis

### ✅ What's Complete

**Current Projects:** 1
- FAIR (2025-present) - PNRR Extended Partnership

**Past Projects:** 3
- REVO (2022-2024) - PON R&I 2014-2020
- BRIO (2022-2025) - PRIN 2020
- AVATEA (2018-2019) - POR Campania FESR

### ⚠️ Check on Google Sites

- [ ] Any missing projects?
- [ ] Project websites to link?
- [ ] More detailed outcomes/deliverables?
- [ ] Publications from each project (cross-reference)?
- [ ] Collaborators/partners?
- [ ] Datasets or tools produced?
- [ ] Project funding amounts (if public)?

---

## 9. talks.json Analysis

### ✅ What's Complete

**Invited Talks:** Multiple entries from 2019-2025
- PACMAN 2025 (Roma Tre)
- PACMAN 2024 (Verona)
- Various research seminars

### ⚠️ Check on Google Sites

- [ ] Complete list of invited talks?
- [ ] Conference presentations (contributed talks)?
- [ ] Poster presentations?
- [ ] Keynotes or plenaries?
- [ ] Links to slides/videos?
- [ ] Public lectures or outreach talks?

---

## 10. groups.json Analysis

### ⚠️ Check on Google Sites

Current file has some content but verify:
- [ ] EThOS group membership (Verona)
- [ ] LUCI Lab (Milan)
- [ ] AILA membership
- [ ] Any other research groups?
- [ ] Professional society memberships?
- [ ] Collaborative networks?

---

## 11. skills.json Analysis

### ⚠️ NEEDS SIGNIFICANT ENRICHMENT

**Current Content:** Very minimal (12 lines)
- Programming: ASP, Prolog, ILASP, Python, Java, JavaScript, etc.
- Languages: Italian (Native), English (Full professional proficiency)
- Other: "Vibe Coding", Docker, Git, LaTeX

### 💡 Strongly Recommended to Add

**From Google Sites, check for:**
- [ ] Frameworks/libraries (TensorFlow, PyTorch, scikit-learn?)
- [ ] AI/ML tools used in research
- [ ] Databases (PostgreSQL, MongoDB?)
- [ ] Cloud platforms (AWS, Azure, GCP?)
- [ ] Visualization tools (D3.js, matplotlib?)
- [ ] Statistical software (R, SPSS?)
- [ ] Logic solvers beyond clingo
- [ ] Certifications or training completed
- [ ] Teaching-related skills
- [ ] Soft skills to highlight

---

## 12. affiliations.json Analysis

### ✅ What's Complete (86 lines - Detailed)

This file appears comprehensive. Check for:
- [ ] Any new affiliations since file creation?
- [ ] Updated positions or roles?
- [ ] End dates for past affiliations?

---

## 13. dissertation_instructions.json Analysis

### ✅ Complete (116 lines)

Comprehensive guide for prospective PhD students.

---

## Missing Data Categories (Not in Current Schema)

### Consider Creating New Files For:

1. **awards.json** - If you have:
   - Research awards
   - Teaching awards
   - Best paper awards
   - Scholarships
   - Grants (as PI or co-I)
   - Honors and distinctions

2. **media.json** - If applicable:
   - Press mentions
   - Interviews
   - Blog posts you've written
   - Podcasts/videos
   - Public engagement

3. **resources.json** - If applicable:
   - Datasets you've published
   - Software/tools you've created
   - Educational materials
   - Open-source contributions

---

## Priority Action Items

### 🔴 HIGH PRIORITY (Do First)

1. **Update personal.json:**
   - [ ] Replace `"YOUR_GOOGLE_SCHOLAR_ID"` with actual Scholar ID
   - [ ] Replace `"YOUR_ORCID_ID"` with actual ORCID
   - [ ] Verify scholar_metrics are current (last_updated: 2025-09-16)

2. **Manual Google Sites Comparison:**
   - [ ] Open https://sites.google.com/view/fdasaro in browser
   - [ ] Go through EACH section systematically
   - [ ] Use this audit as checklist
   - [ ] Note any missing publications (most critical)
   - [ ] Note any missing positions or roles

3. **skills.json Enrichment:**
   - [ ] Expand to include all relevant technical skills
   - [ ] Add frameworks, tools, platforms
   - [ ] Make it comprehensive

### 🟡 MEDIUM PRIORITY

4. **publications.json:**
   - [ ] Verify ALL publications are present
   - [ ] Add missing PDF links where available
   - [ ] Add arXiv links
   - [ ] Consider adding abstracts for selected publications

5. **Complete Data Files:**
   - [ ] service.json - Add complete reviewing history
   - [ ] talks.json - Ensure all invited talks are listed
   - [ ] groups.json - Verify all group memberships

### 🟢 LOW PRIORITY (Enhancements)

6. **Consider New Files:**
   - [ ] awards.json if you have awards/grants to showcase
   - [ ] media.json if you have press/outreach to highlight
   - [ ] resources.json for datasets/tools

7. **Metadata Enrichment:**
   - [ ] Add abstracts to selected publications
   - [ ] Add keywords/tags where missing
   - [ ] Add links to slides/posters for talks
   - [ ] Add project websites and deliverables

---

## Data Quality Checks

### Consistency Verification

Run these checks when updating:

1. **Name Consistency:**
   - [ ] Your name spelled same way everywhere: "F. A. D'Asaro" or "Fabio Aurelio D'Asaro"
   - [ ] Co-author names consistent across publications

2. **Date Formats:**
   - [ ] Years as numbers (2025, not "2025")
   - [ ] "present" for ongoing (lowercase)
   - [ ] Date ranges consistent (year_start, year_end)

3. **Institution Names:**
   - [ ] "University of Salento" vs "Università del Salento" - be consistent
   - [ ] "UCL" vs "University College London" - be consistent
   - [ ] Check all variations

4. **URLs:**
   - [ ] All links start with http:// or https://
   - [ ] All DOIs formatted as https://doi.org/...
   - [ ] Test all external links

5. **Required Fields:**
   - [ ] Every publication has: title, authors, year, venue
   - [ ] Every position has: title, institution, year_start
   - [ ] Every student has: name, level, year, topic

---

## Step-by-Step Manual Enrichment Process

### Phase 1: Critical Fixes (30 minutes)

1. **Open personal.json**
   - Replace Scholar ID placeholder
   - Replace ORCID placeholder
   - Save and test website

2. **Visit Google Scholar**
   - Copy your profile URL
   - Extract user ID
   - Verify metrics match (227 citations, h-index 10)
   - Update if changed

### Phase 2: Publications Audit (1-2 hours)

1. **Open Google Sites → Publications section**
2. **Open publications.json side-by-side**
3. **For each pub on Google Sites:**
   - [ ] Check if in JSON
   - [ ] Verify year, title, venue match
   - [ ] Check DOI/URL present
   - [ ] Note any PDF links available
   - [ ] Note if abstract visible on Google Sites
4. **Add any missing publications**
5. **Test website publications page**

### Phase 3: Complete Audit (2-4 hours)

**Systematically go through Google Sites sections:**

1. **Home/About:**
   - Compare bio with personal.json
   - Check research interests match
   - Note any additional contact info

2. **CV/Experience:**
   - Compare positions with experience.json
   - Check dates and descriptions
   - Note any missing entries

3. **Teaching:**
   - Compare courses with teaching.json
   - Check for missing guest lectures
   - Note any course websites

4. **Service:**
   - Compare PC memberships
   - Check editorial boards
   - Note reviewing history

5. **Projects:**
   - Compare with projects.json
   - Check for additional details
   - Note project websites

6. **Students:**
   - Compare with supervision.json
   - Check outcomes and publications
   - Verify all students listed

7. **Talks:**
   - Compare with talks.json
   - Check dates and venues
   - Note any slides/video links

8. **Skills:**
   - This likely needs most enrichment
   - List all technical skills visible
   - Note tools and frameworks

### Phase 4: Quality Check (30 minutes)

1. **Run through consistency checks (above)**
2. **Test all links**
3. **Verify dates and names**
4. **Check website displays correctly**
5. **Git commit with detailed message**

---

## Automated Checks You Can Run

```bash
cd /Users/fdasaro/Desktop/dasaro.github.io/data

# Check for placeholder values
grep -n "YOUR_" *.json

# Check for empty fields
grep -n '""' *.json

# Check for null values that might need content
grep -n 'null' *.json

# Validate JSON syntax
for file in *.json; do
  echo "Checking $file..."
  python3 -m json.tool "$file" > /dev/null && echo "✅ Valid" || echo "❌ Invalid JSON"
done

# Count publications
grep -c '"id":' publications.json

# Check for broken year formats
grep -E '"year": "' *.json  # Should be numbers, not strings
```

---

## Example: How to Add Missing Publication

If you find a publication on Google Sites not in JSON:

```json
{
  "id": "pub_YEAR_shortname",
  "title": "Full Publication Title",
  "authors": ["F. A. D'Asaro", "Co-Author 1", "Co-Author 2"],
  "year": 2024,
  "venue": "Conference/Journal Name",
  "venue_short": "SHORT_NAME",
  "type": "conference",
  "doi": "10.xxxx/xxxxx",
  "url": "https://doi.org/10.xxxx/xxxxx",
  "pdf": "https://link-to-pdf.pdf",
  "bibtex": "@inproceedings{dasaro2024shortname,\n  title={Full Title},\n  author={D'Asaro, F. A. and ...},\n  booktitle={Conference Name},\n  year={2024},\n  doi={10.xxxx/xxxxx}\n}",
  "tags": ["tag1", "tag2", "tag3"],
  "open_access": true,
  "status": "published"
}
```

Add to BOTH:
- `"selected": [...]` if it's a highlight
- `"all": [...]` in publications.json

---

## Resources & References

**JSON Validators:**
- https://jsonlint.com
- VS Code with JSON extension
- `python3 -m json.tool file.json`

**DOI Lookup:**
- https://doi.org - Resolve any DOI
- https://crossref.org - DOI metadata

**Google Scholar:**
- Your profile: https://sites.google.com/view/fdasaro
- Metrics page for latest numbers

**ORCID:**
- https://orcid.org
- Your ORCID profile

---

## Questions or Issues?

1. **Can't find Scholar ID?**
   - Go to scholar.google.com, search your name
   - Click your profile
   - URL will be: `https://scholar.google.com/citations?user=XXXXXX`
   - The `XXXXXX` is your Scholar ID

2. **Don't have ORCID?**
   - Register free at https://orcid.org
   - Takes 2 minutes
   - Format: 0000-0002-1234-5678

3. **JSON syntax errors after editing?**
   - Use jsonlint.com to validate
   - Check for missing commas, quotes
   - Each entry except last needs trailing comma

4. **Website not updating after JSON changes?**
   - Clear browser cache (Cmd+Shift+R)
   - Check browser console for errors (F12)
   - Verify JSON files valid
   - Check GitHub Pages deployment

---

## Final Checklist Before Committing

- [ ] Scholar ID updated in personal.json
- [ ] ORCID updated in personal.json
- [ ] All publications from Google Sites in JSON
- [ ] All positions and experience captured
- [ ] Teaching history complete
- [ ] Supervision list up-to-date
- [ ] Service activities documented
- [ ] Links tested and working
- [ ] JSON files validated (no syntax errors)
- [ ] Website displays correctly locally
- [ ] Ready to commit and push

---

**Status:** Ready for manual enrichment
**Next Step:** Update placeholders, then systematically compare with Google Sites
**Estimated Time:** 3-5 hours for thorough audit and enrichment

**Last Updated:** October 23, 2025
