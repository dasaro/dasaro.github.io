---
layout: page
title: CV
permalink: /cv/
nav: true
nav_order: 5
description: Experience, education, projects and skills — generated from a single source of truth. Download the full PDF.
---

{%- assign cv = site.data.cv.cv -%}
{%- assign m = site.data.scholar -%}

<style>
  /* this page brings its own header (.cv-head), so hide the layout's title block */
  .post-header { display: none; }
  .cv { max-width: 56rem; }
  .cv a { text-decoration: none; }
  /* ---- header ---- */
  .cv-head { display: flex; flex-wrap: wrap; gap: 1rem 1.5rem; align-items: flex-start; justify-content: space-between; }
  .cv-head .who { margin: 0; font-size: 1.5rem; font-weight: 700; line-height: 1.15; }
  .cv-head .role { color: var(--global-theme-color); font-weight: 600; margin-top: .15rem; }
  .cv-contact { margin-top: .55rem; display: flex; flex-wrap: wrap; gap: .35rem .9rem; font-size: .85rem; }
  .cv-contact a { color: var(--global-text-color-light); border-bottom: 1px dotted transparent; }
  .cv-contact a:hover { color: var(--global-theme-color); border-bottom-color: var(--global-theme-color); }
  .cv-side { text-align: right; margin-left: auto; }
  .cv-pdf { display: inline-flex; align-items: center; gap: .4rem; background: var(--global-theme-color); color: #fff !important; padding: .5rem .95rem; border-radius: .55rem; font-weight: 600; font-size: .88rem; white-space: nowrap; }
  .cv-pdf:hover { filter: brightness(1.12); }
  .cv-metrics { margin-top: .65rem; display: flex; gap: .4rem; justify-content: flex-end; flex-wrap: wrap; }
  .cv-metric { min-width: 3.5rem; border: 1px solid var(--global-divider-color); border-radius: .5rem; padding: .3rem .5rem; line-height: 1.1; }
  .cv-metric b { display: block; color: var(--global-theme-color); font-size: 1.05rem; }
  .cv-metric span { font-size: .68rem; text-transform: uppercase; letter-spacing: .04em; color: var(--global-text-color-light); }
  .cv-summary { color: var(--global-text-color-light); border-left: 3px solid var(--global-theme-color); padding-left: .9rem; margin: 1.3rem 0 0; }
  /* ---- sections ---- */
  .cv-sec { margin-top: 2rem; }
  .cv-sec > h2 { font-size: .78rem; text-transform: uppercase; letter-spacing: .14em; font-weight: 700; color: var(--global-theme-color); border-bottom: 2px solid var(--global-divider-color); padding-bottom: .35rem; margin: 0 0 1.05rem; }
  /* ---- timeline entry ---- */
  .cv-entry { display: flex; gap: .85rem; padding-bottom: 1.15rem; }
  .cv-entry + .cv-entry { border-top: 1px solid var(--global-divider-color); padding-top: 1.05rem; }
  .cv-badge { flex: 0 0 auto; width: 2.9rem; height: 2.9rem; border-radius: .65rem; background: var(--global-theme-color); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: .72rem; text-align: center; padding: 2px; }
  .cv-badge:has(img) { background: #fff; border: 1px solid var(--global-divider-color); padding: 4px; }
  .cv-badge img { max-width: 100%; max-height: 100%; object-fit: contain; }
  .cv-body { flex: 1 1 auto; min-width: 0; }
  .cv-r1 { display: flex; justify-content: space-between; align-items: baseline; gap: .6rem; flex-wrap: wrap; }
  .cv-ttl { font-weight: 700; }
  .cv-period { flex: 0 0 auto; font-size: .74rem; font-weight: 600; color: var(--global-theme-color); background: color-mix(in srgb, var(--global-theme-color) 13%, transparent); padding: .12rem .55rem; border-radius: 999px; white-space: nowrap; }
  .cv-org { font-size: .92rem; color: var(--global-text-color-light); margin-top: .1rem; }
  .cv-org a { color: var(--global-text-color-light); border-bottom: 1px dotted; }
  .cv-org a:hover { color: var(--global-theme-color); }
  .cv-notes { font-size: .87rem; color: var(--global-text-color-light); margin-top: .35rem; }
  /* ---- location chip + map ---- */
  details.cv-loc { display: inline-block; }
  details.cv-loc > summary { display: inline-flex; align-items: center; gap: .3rem; cursor: pointer; list-style: none; font-size: .8rem; color: var(--global-text-color-light); border: 1px solid var(--global-divider-color); border-radius: 999px; padding: .04rem .55rem; }
  details.cv-loc > summary::-webkit-details-marker { display: none; }
  details.cv-loc > summary::before { content: ""; width: .66rem; height: .66rem; flex: 0 0 auto; background-color: var(--global-theme-color); -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z'/%3E%3C/svg%3E") no-repeat center / contain; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z'/%3E%3C/svg%3E") no-repeat center / contain; }
  details.cv-loc > summary:hover, details.cv-loc[open] > summary { color: var(--global-theme-color); border-color: var(--global-theme-color); }
  .cv-map { margin-top: .55rem; border-radius: .6rem; overflow: hidden; border: 1px solid var(--global-divider-color); max-width: 30rem; }
  .cv-map iframe { display: block; width: 100%; height: 11rem; border: 0; }
  .cv-map .cv-maplink { display: block; font-size: .72rem; text-align: right; padding: .25rem .5rem; color: var(--global-text-color-light); background: var(--global-card-bg-color); }
  /* ---- tag rows (projects / skills / languages / interests) ---- */
  .cv-tags { display: flex; flex-wrap: wrap; gap: .45rem; }
  .cv-tag { font-size: .82rem; border: 1px solid var(--global-divider-color); border-radius: .5rem; padding: .28rem .6rem; color: var(--global-text-color-light); }
  .cv-skill { margin-bottom: .5rem; font-size: .9rem; }
  .cv-skill b { color: var(--global-theme-color); }
</style>

<div class="cv">

  <div class="cv-head">
    <div>
      <h1 class="who">{{ cv.name }}</h1>
      <div class="role">{{ cv.label }}</div>
      <div class="cv-contact">
        {% if cv.email %}<a href="mailto:{{ cv.email }}">{{ cv.email }}</a>{% endif %}
        {% if cv.scholar %}<a href="{{ cv.scholar }}" target="_blank" rel="noopener">Google Scholar</a>{% endif %}
        {% if cv.github %}<a href="{{ cv.github }}" target="_blank" rel="noopener">GitHub</a>{% endif %}
        {% if cv.website %}<a href="{{ cv.website }}" target="_blank" rel="noopener">Website</a>{% endif %}
      </div>
    </div>
    <div class="cv-side">
      <a class="cv-pdf" href="{{ cv.pdf | relative_url }}" target="_blank" rel="noopener">Download PDF</a>
      {% if m %}
      <div class="cv-metrics" title="Google Scholar{% if m.updated %} — {{ m.updated }}{% endif %}">
        <div class="cv-metric"><b>{{ m.citations }}</b><span>Citations</span></div>
        <div class="cv-metric"><b>{{ m.h_index }}</b><span>h-index</span></div>
        <div class="cv-metric"><b>{{ m.i10_index }}</b><span>i10</span></div>
      </div>
      {% endif %}
    </div>
  </div>

  {% if cv.summary %}<p class="cv-summary">{{ cv.summary }}</p>{% endif %}

  {%- comment -%} ===================== EXPERIENCE ===================== {%- endcomment -%}
  {% if cv.experience.size > 0 %}
  <section class="cv-sec">
    <h2>Experience</h2>
    {% for e in cv.experience %}
    <div class="cv-entry">
      <div class="cv-body">
        <div class="cv-r1">
          <span class="cv-ttl">{{ e.role }}</span>
          {% if e.period %}<span class="cv-period">{{ e.period }}</span>{% endif %}
        </div>
        <div class="cv-org">
          {% if e.url %}<a href="{{ e.url }}" target="_blank" rel="noopener">{{ e.org }}</a>{% else %}{{ e.org }}{% endif %}
          {% if e.location %}
          <details class="cv-loc">
            <summary>{{ e.location }}</summary>
            {% if e.coords %}
            <div class="cv-map">
              <iframe loading="lazy" title="Map of {{ e.location }}" src="https://www.openstreetmap.org/export/embed.html?bbox={{ e.coords.lon | minus: 0.06 }}%2C{{ e.coords.lat | minus: 0.04 }}%2C{{ e.coords.lon | plus: 0.06 }}%2C{{ e.coords.lat | plus: 0.04 }}&amp;layer=mapnik&amp;marker={{ e.coords.lat }}%2C{{ e.coords.lon }}"></iframe>
              <a class="cv-maplink" href="https://www.openstreetmap.org/?mlat={{ e.coords.lat }}&amp;mlon={{ e.coords.lon }}#map=12/{{ e.coords.lat }}/{{ e.coords.lon }}" target="_blank" rel="noopener">View larger map ↗</a>
            </div>
            {% endif %}
          </details>
          {% endif %}
        </div>
        {% if e.notes %}<div class="cv-notes">{{ e.notes }}</div>{% endif %}
      </div>
    </div>
    {% endfor %}
  </section>
  {% endif %}

  {%- comment -%} ===================== EDUCATION ===================== {%- endcomment -%}
  {% if cv.education.size > 0 %}
  <section class="cv-sec">
    <h2>Education</h2>
    {% for e in cv.education %}
    <div class="cv-entry">
      <div class="cv-badge">{% if e.logo != "" %}<img src="{{ e.logo | relative_url }}" alt="{{ e.org }}">{% elsif e.badge != "" %}{{ e.badge }}{% else %}{{ e.org | slice: 0, 3 }}{% endif %}</div>
      <div class="cv-body">
        <div class="cv-r1">
          <span class="cv-ttl">{{ e.degree }}</span>
          {% if e.period %}<span class="cv-period">{{ e.period }}</span>{% endif %}
        </div>
        <div class="cv-org">
          {% if e.url %}<a href="{{ e.url }}" target="_blank" rel="noopener">{{ e.org }}</a>{% else %}{{ e.org }}{% endif %}
          {% if e.location %}
          <details class="cv-loc">
            <summary>{{ e.location }}</summary>
            {% if e.coords %}
            <div class="cv-map">
              <iframe loading="lazy" title="Map of {{ e.location }}" src="https://www.openstreetmap.org/export/embed.html?bbox={{ e.coords.lon | minus: 0.06 }}%2C{{ e.coords.lat | minus: 0.04 }}%2C{{ e.coords.lon | plus: 0.06 }}%2C{{ e.coords.lat | plus: 0.04 }}&amp;layer=mapnik&amp;marker={{ e.coords.lat }}%2C{{ e.coords.lon }}"></iframe>
              <a class="cv-maplink" href="https://www.openstreetmap.org/?mlat={{ e.coords.lat }}&amp;mlon={{ e.coords.lon }}#map=12/{{ e.coords.lat }}/{{ e.coords.lon }}" target="_blank" rel="noopener">View larger map ↗</a>
            </div>
            {% endif %}
          </details>
          {% endif %}
        </div>
        {% if e.notes %}<div class="cv-notes">{{ e.notes }}</div>{% endif %}
      </div>
    </div>
    {% endfor %}
  </section>
  {% endif %}

  {%- comment -%} ===================== PROJECTS ===================== {%- endcomment -%}
  {% if cv.projects.size > 0 %}
  <section class="cv-sec">
    <h2>Selected Projects</h2>
    {% for p in cv.projects %}
    <div class="cv-entry">
      <div class="cv-body">
        <div class="cv-r1">
          <span class="cv-ttl">{% if p.url %}<a href="{{ p.url }}" target="_blank" rel="noopener" style="color:inherit;border-bottom:1px dotted">{{ p.name }}</a>{% else %}{{ p.name }}{% endif %}</span>
          {% if p.period %}<span class="cv-period">{{ p.period }}</span>{% endif %}
        </div>
        {% if p.notes %}<div class="cv-notes">{{ p.notes }}</div>{% endif %}
      </div>
    </div>
    {% endfor %}
    <p style="margin-top:.4rem"><a href="{{ '/projects/' | relative_url }}">All projects →</a></p>
  </section>
  {% endif %}

  {%- comment -%} ===================== SKILLS / LANGUAGES / INTERESTS ===================== {%- endcomment -%}
  {% if cv.skills.size > 0 %}
  <section class="cv-sec">
    <h2>Skills</h2>
    {% for s in cv.skills %}<div class="cv-skill"><b>{{ s.label }}:</b> {{ s.value }}</div>{% endfor %}
  </section>
  {% endif %}

  {% if cv.languages.size > 0 %}
  <section class="cv-sec">
    <h2>Languages</h2>
    <div class="cv-tags">{% for l in cv.languages %}<span class="cv-tag">{{ l }}</span>{% endfor %}</div>
  </section>
  {% endif %}

  {% if cv.interests.size > 0 %}
  <section class="cv-sec">
    <h2>Interests</h2>
    <div class="cv-tags">{% for i in cv.interests %}<span class="cv-tag">{{ i }}</span>{% endfor %}</div>
  </section>
  {% endif %}

</div>
