---
layout: page
title: Elsewhere
permalink: /elsewhere/
nav: true
nav_order: 9
description: Profiles, mentions and places that feature my work around the web.
---

<style>
  .atw { max-width: 56rem; }
  .atw a { text-decoration: none; }
  .atw-sec { margin-top: 1.8rem; }
  .atw-sec > h2 { font-size: .78rem; text-transform: uppercase; letter-spacing: .14em; font-weight: 700; color: var(--global-theme-color); border-bottom: 2px solid var(--global-divider-color); padding-bottom: .35rem; margin: 0 0 1.05rem; }
  /* profiles + proceedings: pill links */
  .atw-profiles { display: flex; flex-wrap: wrap; gap: .5rem; }
  .atw-profile { display: inline-flex; align-items: center; gap: .35rem; font-size: .85rem; color: var(--global-text-color-light); border: 1px solid var(--global-divider-color); border-radius: 999px; padding: .3rem .75rem; transition: border-color .15s ease, color .15s ease; }
  .atw-profile:hover { color: var(--global-theme-color); border-color: var(--global-theme-color); }
  .atw-profile .arr { opacity: .5; font-size: .8em; }
  /* featured: cards */
  .atw-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
  a.atw-card { display: block; padding: 1.1rem 1.2rem; border: 1px solid var(--global-divider-color); border-radius: 10px; color: inherit; transition: border-color .15s ease, transform .15s ease; }
  a.atw-card:hover { border-color: var(--global-theme-color); transform: translateY(-2px); }
  .atw-card .t { font-weight: 700; color: var(--global-theme-color); }
  .atw-card .t .arr { font-weight: 400; opacity: .6; font-size: .85em; }
  .atw-card .s { font-size: .8rem; opacity: .6; margin-top: .15rem; }
  .atw-card .n { font-size: .88rem; opacity: .85; margin-top: .55rem; }
</style>

{% assign d = site.data.elsewhere %}

<div class="atw">

  {% if d.profiles.size > 0 %}
  <section class="atw-sec">
    <h2>Profiles</h2>
    <div class="atw-profiles">
      {% for p in d.profiles %}<a class="atw-profile" href="{{ p.url }}" target="_blank" rel="noopener">{{ p.title }} <span class="arr">↗</span></a>{% endfor %}
    </div>
  </section>
  {% endif %}

  {% if d.featured.size > 0 %}
  <section class="atw-sec">
    <h2>Featured around the web</h2>
    <div class="atw-grid">
      {% for f in d.featured %}
      <a class="atw-card" href="{{ f.url }}" target="_blank" rel="noopener">
        <div class="t">{{ f.title }} <span class="arr">↗</span></div>
        {% if f.source %}<div class="s">{{ f.source }}</div>{% endif %}
        {% if f.note %}<div class="n">{{ f.note }}</div>{% endif %}
      </a>
      {% endfor %}
    </div>
  </section>
  {% endif %}

  {% if d.proceedings.size > 0 %}
  <section class="atw-sec">
    <h2>Co-edited proceedings</h2>
    <div class="atw-profiles">
      {% for p in d.proceedings %}<a class="atw-profile" href="{{ p.url }}" target="_blank" rel="noopener">{{ p.title }} <span class="arr">↗</span></a>{% endfor %}
    </div>
  </section>
  {% endif %}

</div>
