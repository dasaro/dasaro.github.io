# Publications Enhancement Report

**Date:** October 23, 2025
**Task:** Medium Priority - Publications completeness check and metadata enrichment
**Status:** Analysis complete, awaiting user input

---

## Executive Summary

### Current State

| Metric | Count | Percentage |
|--------|-------|------------|
| **Total Publications** | 39 | 100% |
| **Publications with PDF** | 5 | 13% |
| **Publications missing PDF** | 34 | 87% |
| **Publications with DOI** | 20 | 51% |
| **Publications missing DOI** | 19 | 49% |
| **Open Access without PDF** | 5 | - |

### Key Findings

🔴 **Critical Issues:**
- **34 publications (87%)** have no PDF link
- **5 open access papers** should have freely available PDFs but links are missing
- **19 publications (49%)** have no DOI

🟡 **Opportunities:**
- JAIR 2025 paper is open access but missing PDF link
- Several KR conference papers likely have open proceedings
- Some papers may have arXiv versions not linked
- Workshop papers may have author versions available

---

## Detailed Analysis

### 1. Open Access Publications Missing PDFs (HIGH PRIORITY)

These publications are marked `"open_access": true` but have `"pdf": null`:

#### ✅ Already Has PDF:
1. **pub_2021_klingo** - "Introducing k-lingo" (KR 2021)
   - ✅ Has PDF: https://proceedings.kr.org/2021/65/kr2021-0065-dasaro-et-al.pdf
   - Status: Complete

2. **pub_2025_aba** - "Weighted Assumption Based Argumentation" (CILC 2025)
   - ✅ Has PDF: https://arxiv.org/pdf/2506.18056
   - Status: Complete

3. **pub_2025_bounded** - "Non-monotonic Bounded Reasoners" (The Reasoner)
   - ✅ Has PDF: https://riviste.unimi.it/index.php/thereasoner/article/view/27548
   - Status: Complete

4. **pub_2020_kr_ilp** - "Towards an Inductive Logic Programming approach" (KR 2020)
   - ✅ Open access: true
   - ⚠️ PDF: null
   - **ACTION NEEDED:** Check https://proceedings.kr.org/2020/ for PDF

#### ⚠️ Missing PDFs:

5. **pub_2025_graphical** - "A Graphical Formalism for Reasoning about Substitution" (JAIR 2025)
   - Journal: JAIR (open access journal)
   - DOI: 10.1613/jair.1.18606
   - Open access: true
   - **ACTION NEEDED:** JAIR papers are always freely available. Check https://jair.org or DOI link for PDF

6. **pub_2022_xai_special_issue** - "Explainable AI models in finance and healthcare" (Frontiers 2022)
   - Journal: Frontiers in AI (open access)
   - DOI: 10.3389/frai.2022.970246
   - Open access: true
   - **ACTION NEEDED:** Frontiers papers always have free PDF. Check DOI link

### 2. Publications in "Selected" with Missing PDFs

Your **showcase publications** that should have links:

| ID | Title | Year | Venue | Has PDF? | Has DOI? | Priority |
|----|-------|------|-------|----------|----------|----------|
| pub_2025_graphical | Graphical Formalism | 2025 | JAIR | ❌ | ✅ | 🔴 HIGH |
| pub_2025_trustworthiness | Trustworthiness (selected) | 2025 | JLC | ❌ | ✅ | 🔴 HIGH |
| pub_2024_asp_epistemic | ASP-based EPEC | 2024 | IJAR | ❌ | ✅ | 🟡 MED |
| pub_2023_ehealth | e-Health Application | 2023 | TPLP | ❌ | ✅ | 🟡 MED |
| pub_2023_robotics | Deep RL for robotics | 2023 | IJSR | ❌ | ✅ | 🟡 MED |
| pub_2021_klingo | k-lingo | 2021 | KR | ✅ | ✅ | ✅ OK |
| pub_2020_aij | Probabilistic Reasoning | 2020 | AIJ | ❌ | ✅ | 🔴 HIGH |
| pub_2020_kr_ilp | ILP for XAI | 2020 | KR | ❌ | ✅ | 🔴 HIGH |

**Note:** pub_2025_trustworthiness has DIFFERENT data in "selected" vs "all":
- In "selected": `"pdf": null`
- In "all": `"pdf": "https://arxiv.org/pdf/2206.12934"`

**ACTION:** Sync this entry - the "all" version has the arXiv PDF!

---

## 3. Publications Missing DOI (19 total)

Publications without DOI that might have one:

### Conference Papers (May have DOI via proceedings)

| Year | Title | Venue | Check For DOI |
|------|-------|-------|---------------|
| 2025 | MDP Translation | TIME 2025 | Accepted, not yet published |
| 2025 | Weighted ABA | CILC 2025 | Check CEUR-WS or proceedings |
| 2017 | Foundations for PEC | LPNMR 2017 | Check Springer LNCS (likely has DOI) |

### Workshop Papers (Less likely to have DOI, but check)

| Year | Title | Venue |
|------|-------|-------|
| 2023 | BRIOxAlkemy | BEWARE-23 |
| 2023 | JAL Special Issue | JAL |
| 2023 | DSS Nudge | CEPE 2023 |
| 2022 | ILP for NN | BEWARE-22 |
| 2022 | Bias Labeling | BEWARE-22 |
| 2021 | Trust Workshop | TRUST@AAMAS |
| 2021 | WOA ProbLog | WOA 21 |
| 2020 | ICSR | ICSR 2020 |
| 2019 | WOA | WOA 19 |

### Journal/Book Papers

| Year | Title | Venue | Likely Has DOI |
|------|-------|-------|----------------|
| 2017 | Smart City | Informatik-Spektrum | Yes - German journal |
| 2013 | Archives | Archives Soft Computing | Maybe |

### Unlikely to Have DOI

- 2016 Carnap note (Unpublished)
- 2015 ICAART (Check - might have DOI)
- 2014 Book chapter (Check publisher)
- 2013 EUSFLAT, IFSA (Conference papers, may have DOI)

---

## 4. Specific Action Items

### 🔴 CRITICAL (Do First)

**Fix Inconsistency:**
1. **pub_2025_trustworthiness** - Has arXiv PDF in "all" but not in "selected"
   - Copy `"pdf": "https://arxiv.org/pdf/2206.12934"` to "selected" entry

**Add Open Access PDFs:**
2. **pub_2025_graphical** (JAIR 2025)
   - Visit: https://doi.org/10.1613/jair.1.18606
   - Find PDF link on JAIR site
   - Add to JSON

3. **pub_2022_xai_special_issue** (Frontiers 2022)
   - Visit: https://doi.org/10.3389/frai.2022.970246
   - Frontiers always has "Download PDF" button
   - Add direct PDF link

4. **pub_2020_kr_ilp** (KR 2020)
   - Check: https://proceedings.kr.org/2020/
   - Find paper number/URL
   - Add PDF link

### 🟡 MEDIUM PRIORITY

**Check for arXiv versions:**
5. **pub_2020_aij** - "Probabilistic Reasoning About Epistemic Action Narratives" (AIJ)
   - Core PhD paper - likely has arXiv version
   - Search: arXiv for "D'Asaro probabilistic epistemic action"

6. **pub_2024_asp_epistemic** (IJAR 2024)
   - Recent journal paper - may have arXiv version
   - Search arXiv

7. **pub_2023_ehealth** (TPLP 2023)
   - Check for author version or arXiv

**Conference Proceedings PDFs:**
8. **pub_2017_lpnmr** - "Foundations for PEC"
   - LPNMR proceedings published by Springer
   - Likely DOI exists: Check Springer LNCS series
   - May have author version available

### 🟢 LOW PRIORITY

**Workshop/Other Papers:**
- Most workshop papers (BEWARE series, WOA, etc.) - check author versions
- Older papers (2013-2015) - lower priority unless featured
- Book chapter (2014) - unlikely to have free PDF

---

## 5. How to Add PDFs and DOIs

### For Open Access Journal Papers:

**JAIR Example:**
```json
"pdf": "https://jair.org/index.php/jair/article/view/XXXXX/XXXXX"
```

**Frontiers Example:**
```json
"pdf": "https://www.frontiersin.org/articles/10.3389/frai.2022.970246/pdf"
```

### For arXiv Papers:

```json
"pdf": "https://arxiv.org/pdf/YYMM.NNNNN",
"arxiv": "YYMM.NNNNN"
```

### For Conference Proceedings:

**KR Proceedings:**
```json
"pdf": "https://proceedings.kr.org/YYYY/NN/krYYYY-00NN-author-et-al.pdf"
```

**Springer LNCS:**
```json
"doi": "10.1007/978-X-XXX-XXXXX-X_NN",
"url": "https://doi.org/10.1007/978-X-XXX-XXXXX-X_NN"
```

---

## 6. Quick Fixes You Can Do Now

### Fix #1: Sync trustworthiness paper

**File:** data/publications.json
**Line:** ~19-32 (in "selected" array)

**Change:**
```json
"pdf": null,
```

**To:**
```json
"pdf": "https://arxiv.org/pdf/2206.12934",
```

### Fix #2: Add missing open_access flag

In "all" array, `pub_2025_trustworthiness` (line ~191-204) has PDF but check if it should be:
```json
"open_access": true,
```

---

## 7. Research Tools for Finding PDFs

### For DOI Resolution:
- https://doi.org/[DOI] - Official DOI resolver
- https://unpaywall.org - Finds legal free PDFs for DOIs

### For arXiv:
- https://arxiv.org/search/ - Search by author + title
- https://arxiv.org/a/dasaro_f_1.html - Your arXiv author page (if it exists)

### For Conference Proceedings:
- **KR:** https://proceedings.kr.org
- **LPNMR:** Springer LNCS series
- **LORI:** Springer LNCS series
- **ICAART:** SCITEPRESS digital library

### For Open Access Journals:
- **JAIR:** https://jair.org
- **Frontiers:** https://frontiersin.org
- **TPLP:** Cambridge Core (may have author versions)

---

## 8. Completion Checklist

Use this to track your progress:

### Critical Open Access (Must Have PDFs):
- [ ] pub_2025_graphical (JAIR) - Get PDF from DOI link
- [ ] pub_2022_xai_special_issue (Frontiers) - Get PDF from DOI link
- [ ] pub_2020_kr_ilp (KR 2020) - Check proceedings

### Selected Publications (High Visibility):
- [ ] pub_2025_trustworthiness - Copy arXiv PDF from "all" to "selected"
- [ ] pub_2020_aij (AIJ) - Check for arXiv version
- [ ] pub_2024_asp_epistemic (IJAR) - Check for arXiv
- [ ] pub_2023_ehealth (TPLP) - Check for author version
- [ ] pub_2023_robotics (IJSR) - Check for author version

### Missing DOIs (If Available):
- [ ] pub_2017_lpnmr - Check Springer LNCS
- [ ] pub_2017_informatik - Check journal website
- [ ] pub_2020_icsr - Check proceedings
- [ ] pub_2015_icaart - Check SCITEPRESS

### Workshop Papers (Lower Priority):
- [ ] BEWARE series (2022-2023) - Author versions
- [ ] WOA papers (2019, 2021) - Author versions
- [ ] CEPE 2023 - Check proceedings

---

## 9. What I Can Help With

**Provide me with any of the following and I'll update the JSON:**

1. **PDF URLs** - Just say: "pub_2025_graphical PDF is https://..."
2. **DOI numbers** - Say: "pub_2017_lpnmr DOI is 10.xxxx/xxxxx"
3. **arXiv IDs** - Say: "pub_2020_aij arXiv is 2001.12345"
4. **Multiple at once** - List them and I'll batch update

**Or tell me:**
- "Check Google Sites for PDF links" - I'll guide you through copying them
- "Update the trustworthiness paper" - I'll fix the inconsistency immediately
- "Skip workshop papers" - I'll focus only on journals/conferences

---

## 10. Estimated Impact

### If we add PDFs to open access papers (3-5 papers):
- ✅ Users can read your work directly from your site
- ✅ Increases engagement and citations
- ✅ Professional presentation

### If we add arXiv links to selected papers (5-8 papers):
- ✅ Makes flagship research freely accessible
- ✅ Aligns with open science practices
- ✅ Broader reach

### If we add missing DOIs (10-15 papers):
- ✅ Proper scholarly attribution
- ✅ Better metadata for indexing
- ✅ Professional completeness

---

## Next Steps

**Option A: Quick Wins (15 minutes)**
1. Fix trustworthiness PDF inconsistency
2. Add JAIR and Frontiers PDFs (just visit the DOI links)
3. Commit and deploy

**Option B: Comprehensive (2-3 hours)**
1. Check Google Sites for any PDFs you've already listed there
2. Search arXiv for your key papers
3. Check conference proceedings websites
4. Systematically go through the checklist above

**Option C: Guided Approach**
1. Tell me which papers are most important to you
2. I'll create a focused list for just those
3. We do those first, skip the rest

---

**What would you like to do?**

Tell me:
- "Fix the critical issues first" - I'll update the 3-5 high-priority items
- "Here are some PDF links: ..." - Provide and I'll add them
- "Check Google Sites" - I'll guide you through extracting PDF links from there
- "Just fix the inconsistency" - I'll do the trustworthiness sync only

**Current file:** `publications.json` (611 lines, 39 publications)
**Status:** Ready for enhancements
