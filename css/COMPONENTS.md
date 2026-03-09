# CSS Component Library

**Version:** 2.0
**Last Updated:** March 2026

This site now uses a small shared visual system. New work should reuse these primitives instead of adding page-local `<style>` blocks or inline styles.

## Core Primitives

### Box

Use boxes for all surfaced content blocks.

**Base classes:**
- `.box`
- `.box--subtle`
- `.box--accent`

**Semantic wrappers that already inherit the box treatment:**
- `.card`
- `.publication-card`
- `.timeline-card`
- `.course-card`
- `.project-card`
- `.contact-card`
- `.lecture-card`
- `.location-info`
- `.metrics-widget`
- `.search-filter-container`
- `.publications-count`
- `.animation-card`
- `.topic-card`
- `.program-card`
- `.supervision-outcome`
- `.note-box`
- `.intro-text`
- `.modal-content`
- `.collapsible-header`

**Rule:**
- If a new section needs a bordered surface, start from a box variant instead of inventing a new card style.

### Chip

Use chips for compact labels, state, and metadata.

**Base classes:**
- `.chip`
- `.badge`
- `.status-badge`
- `.project-status`

**Common subtypes:**
- Status: `.chip-current`, `.chip-ongoing`, `.chip-past`, `.chip-completed`
- Publication metadata: `.chip-year`, `.chip-journal`, `.chip-conference`, `.chip-workshop`, `.chip-book`, `.chip-preprint`
- Academic context: `.chip-phd`, `.chip-msc`, `.chip-bsc`, `.chip-research`, `.chip-teaching`, `.chip-service`, `.chip-supervision`, `.chip-award`
- Legacy aliases kept for compatibility: `.badge-oa`, `.badge-accepted`, `.badge-current`

**Rule:**
- Chips should stay short. They are metadata, not mini paragraphs.

### Button

Use the shared pill buttons for all actions and outbound links.

**Base classes:**
- `.btn`
- `.btn-primary`
- `.btn-secondary`

**Compatible link/button patterns:**
- `.publication-links a`
- `.publication-links button`
- `.profile-link`
- `.copy-btn`
- `.program-link`

**Rule:**
- Do not create one-off button palettes per page.

### Decoration

Decorative symbols should stay quiet and secondary.

**Shared classes:**
- `.decoration`
- `.logic-symbol`
- `.logical-symbols`
- `.animation-symbol`
- `.symbols-dimmed`

**Rule:**
- Use decoration to support headings or context, not as the dominant visual element.

## Text Helpers

Use these instead of inline typographic styles:

- `.page-subtitle` for centered page subtitles
- `.content-lead` for wide lead paragraphs
- `.mini-link-list`, `.mini-link-item`, `.mini-link` for compact reference links

## Layout and Interaction

- Navigation styling is centralized in `main.css` and `responsive.css`.
- Modal styling is centralized in `main.css`; use the `hidden` attribute for visibility.
- Background animation pages should reuse `.animation-card`, `.intro-text`, `.animation-story`, and `.activate-btn`.
- Dissertation/student pages should reuse `.student-tabs`, `.tab-button`, `.topic-card`, `.step-list`, `.requirements-list`, `.faq-item`, and `.program-card`.

## Authoring Rules

- Prefer semantic HTML plus shared classes over page-specific CSS.
- Avoid inline `style` attributes on public pages.
- If a new pattern is needed across more than one page, add it to `main.css` and document it here.
- Before introducing a new class, check whether an existing box, chip, button, or decoration variant already covers it.
