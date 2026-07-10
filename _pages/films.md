---
layout: page
permalink: /films/
title: Films
description: A few films I keep coming back to. A list in progress.
nav: true
nav_order: 9
---

Cinema is a long-standing passion of mine. Here are some of the films I love most, to begin with. Each card links to its page. I'll keep adding to the list.

<style>
  .film-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1.6rem;
  }
  .film-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 7.5rem;
    padding: 1rem 1.1rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 10px;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.15s ease, transform 0.15s ease;
  }
  .film-card:hover {
    border-color: var(--global-theme-color);
    transform: translateY(-2px);
    text-decoration: none;
  }
  .film-card .ft { font-weight: 700; color: var(--global-theme-color); line-height: 1.25; }
  .film-card .fn { font-size: 0.8rem; font-style: italic; opacity: 0.6; }
  .film-card .fmeta { margin-top: 0.6rem; font-size: 0.85rem; opacity: 0.75; }
  .film-card .fy { opacity: 0.55; }
</style>

<div class="film-grid">
  {% for f in site.data.films %}
  <a class="film-card" href="{{ f.url | default: '#' }}" target="_blank" rel="noopener noreferrer">
    <div>
      <div class="ft">{{ f.title }}</div>
      {% if f.note %}<div class="fn">{{ f.note }}</div>{% endif %}
    </div>
    <div class="fmeta">{{ f.director }} <span class="fy">· {{ f.year }}</span></div>
  </a>
  {% endfor %}
</div>
