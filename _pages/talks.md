---
layout: page
permalink: /talks/
title: Talks
description: "Invited talks and seminars, and contributed conference and symposium presentations."
nav: true
nav_order: 6
---

<style>
  .talks { max-width: 56rem; }
  .talks a { text-decoration: none; border-bottom: 1px dotted; }
  .talks-lead { font-size: 1.02rem; line-height: 1.6; margin: .2rem 0 1.9rem; color: var(--global-text-color-light); }
  .talks-lead a { color: var(--global-theme-color); }
  /* section header with icon, matched to the Theses page */
  .talks-h { display: flex; align-items: center; gap: .55rem; margin: 2.1rem 0 1rem; }
  .talks-h svg { width: 1.2rem; height: 1.2rem; fill: var(--global-theme-color); flex: 0 0 auto; }
  .talks-h h2 { margin: 0; padding: 0; font-size: 1.15rem; border: 0; }
  /* one talk per row: period on the left, title to its right */
  .talk { display: flex; gap: 1rem; padding: .85rem 0; align-items: baseline; }
  .talk + .talk { border-top: 1px solid var(--global-divider-color); }
  .talk-when { flex: 0 0 5.6rem; font-size: .78rem; font-weight: 600; color: var(--global-theme-color); white-space: nowrap; }
  .talk-what { flex: 1 1 auto; min-width: 0; font-size: .95rem; line-height: 1.5; }
  @media (max-width: 576px) {
    .talk { flex-direction: column; gap: .2rem; padding: .75rem 0; }
    .talk-when { flex-basis: auto; }
  }
</style>

{%- assign cv = site.data.cv.cv -%}

<div class="talks">

  <p class="talks-lead">A record of my invited talks and seminars, and of contributed presentations at conferences and symposia. For the full academic record, see my <a href="{{ '/cv/' | relative_url }}">CV</a>.</p>

  {% if cv.invited_talks.size > 0 %}
  <div class="talks-h">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15a4 4 0 0 0 4-4V6a4 4 0 0 0-8 0v5a4 4 0 0 0 4 4zm7-4a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V21H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.08A7 7 0 0 0 19 11z"/></svg>
    <h2>Invited Talks</h2>
  </div>
  {% for t in cv.invited_talks %}
  <div class="talk"><span class="talk-when">{{ t.period }}</span><span class="talk-what">{{ t.title }}</span></div>
  {% endfor %}
  {% endif %}

  {% if cv.presentations.size > 0 %}
  <div class="talks-h">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm4 9h2v3H7v-3zm4-4h2v7h-2V9zm4 2h2v5h-2v-5z"/></svg>
    <h2>Presentations</h2>
  </div>
  {% for t in cv.presentations %}
  <div class="talk"><span class="talk-when">{{ t.period }}</span><span class="talk-what">{{ t.title }}</span></div>
  {% endfor %}
  {% endif %}

</div>
