---
layout: page
title: Projects
permalink: /projects/
description: Research projects I have taken part in. Cards link to the official project page where one exists.
nav: true
nav_order: 3
---

<style>
  .proj-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
    margin-top: 1.6rem;
  }
  .proj-card {
    display: block;
    padding: 1.1rem 1.2rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 10px;
    color: inherit;
    text-decoration: none;
    transition: border-color 0.15s ease, transform 0.15s ease;
  }
  a.proj-card:hover {
    border-color: var(--global-theme-color);
    transform: translateY(-2px);
    text-decoration: none;
  }
  .proj-card .pn { font-weight: 700; color: var(--global-theme-color); }
  .proj-card .pn .arr { font-weight: 400; opacity: 0.6; font-size: 0.85em; }
  .proj-card .pf { font-size: 0.82rem; opacity: 0.6; margin-top: 0.15rem; }
  .proj-card .pd { font-size: 0.9rem; opacity: 0.85; margin-top: 0.55rem; }
</style>

<div class="proj-grid">
  {% for p in site.data.projects %}
  {% if p.url %}<a class="proj-card" href="{{ p.url }}" target="_blank" rel="noopener noreferrer">{% else %}<div class="proj-card">{% endif %}
    <div class="pn">{{ p.name }}{% if p.url %} <span class="arr">↗</span>{% endif %}</div>
    <div class="pf">{{ p.funder }} · {{ p.period }}</div>
    <div class="pd">{{ p.description }}</div>
  {% if p.url %}</a>{% else %}</div>{% endif %}
  {% endfor %}
</div>
