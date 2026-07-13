---
layout: page
permalink: /repositories/
title: Repositories
description: "A selection of my open-source projects: research tools and a few playful experiments. More at github.com/dasaro"
nav: true
nav_order: 4
---

<style>
  .repos { max-width: 56rem; }
  .repos-lead { font-size: 1.02rem; line-height: 1.6; margin: .2rem 0 1.9rem; color: var(--global-text-color-light); }
  .repos-lead a { color: var(--global-theme-color); border-bottom: 1px dotted; text-decoration: none; }
  /* section header with icon, matched to the Theses and Talks pages */
  .repo-h { display: flex; align-items: center; gap: .55rem; margin: 2.1rem 0 1rem; }
  .repo-h svg { width: 1.2rem; height: 1.2rem; fill: var(--global-theme-color); flex: 0 0 auto; }
  .repo-h h2 { margin: 0; padding: 0; font-size: 1.15rem; border: 0; }
  /* card grid */
  .repo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(15.5rem, 1fr)); gap: .6rem; }
  .repo-card { display: flex; flex-direction: column; gap: .35rem; padding: .85rem 1rem; border: 1px solid var(--global-divider-color); border-radius: .7rem; text-decoration: none; color: inherit; transition: border-color .15s ease, transform .15s ease; }
  .repo-card:hover { border-color: var(--global-theme-color); transform: translateY(-2px); }
  .repo-name { display: flex; align-items: center; gap: .4rem; font-family: var(--global-code-font-family, monospace); font-weight: 600; font-size: .95rem; color: var(--global-theme-color); min-width: 0; }
  .repo-name svg { width: .95rem; height: .95rem; fill: currentColor; flex: 0 0 auto; opacity: .8; }
  .repo-name .n { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .repo-desc { font-size: .88rem; line-height: 1.45; color: var(--global-text-color); }
  .repo-lang { margin-top: auto; display: inline-flex; align-items: center; gap: .35rem; font-size: .74rem; color: var(--global-text-color-light); padding-top: .15rem; }
  .repo-lang .dot { width: .55rem; height: .55rem; border-radius: 999px; background: var(--global-theme-color); flex: 0 0 auto; }
  .repos-more { margin-top: 2rem; font-size: .9rem; color: var(--global-text-color-light); }
  .repos-more a { color: var(--global-theme-color); border-bottom: 1px dotted; text-decoration: none; }
</style>

{%- assign repos = site.data.repositories -%}

<div class="repos">

  <p class="repos-lead">A few of my open-source projects, grouped into research tools and lighter experiments. Each card links to the repository on GitHub.</p>

  {% for group in repos.repo_groups %}
  <div class="repo-h">
    {% if group.name == "Research tools" %}
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10v2h-2v5.3l4.7 8.2A2 2 0 0 1 18 20.5H6a2 2 0 0 1-1.7-3L9 9.3V4H7V2zm4 2v5.8L8.2 15h7.6L13 9.8V4h-2z"/></svg>
    {% else %}
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.4 6.9L21 11l-6.6 2.1L12 20l-2.4-6.9L3 11l6.6-2.1L12 2z"/></svg>
    {% endif %}
    <h2>{{ group.name }}</h2>
  </div>
  <div class="repo-grid">
    {% for r in group.repos %}
    <a class="repo-card" href="https://github.com/{{ r.full }}" target="_blank" rel="noopener">
      <span class="repo-name">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0a8 8 0 0 0-2.5 15.6c.4.07.55-.17.55-.38v-1.3c-2.2.48-2.67-1.06-2.67-1.06-.36-.92-.89-1.16-.89-1.16-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.76-.2-3.6-.88-3.6-3.9 0-.86.3-1.57.82-2.12-.08-.2-.36-1.01.08-2.12 0 0 .67-.21 2.2.81a7.6 7.6 0 0 1 4 0c1.53-1.02 2.2-.81 2.2-.81.44 1.11.16 1.92.08 2.12.51.55.82 1.26.82 2.12 0 3.03-1.85 3.7-3.61 3.9.28.24.54.72.54 1.46v2.16c0 .21.15.46.55.38A8 8 0 0 0 8 0z"/></svg>
        <span class="n">{{ r.name }}</span>
      </span>
      {% if r.description %}<span class="repo-desc">{{ r.description }}</span>{% endif %}
      {% if r.language %}<span class="repo-lang"><span class="dot"></span>{{ r.language }}</span>{% endif %}
    </a>
    {% endfor %}
  </div>
  {% endfor %}

  <p class="repos-more">More on <a href="https://github.com/dasaro" target="_blank" rel="noopener">github.com/dasaro</a>.</p>

</div>
