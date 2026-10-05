---
layout: page
permalink: /research/
title: Research
description: Publications, talks, projects and code.
nav: true
nav_order: 1
dropdown: true
children:
  - title: Publications
    permalink: /publications/
  - title: Talks
    permalink: /talks/
  - title: Projects
    permalink: /projects/
  - title: Repositories
    permalink: /repositories/
sitemap: false
---

{% comment %} This page exists to hold the "Research" menu in the navbar (see `children` above).
The list below is generated from the same `children`, so the two cannot drift. {% endcomment %}
{% for c in page.children %}
- [{{ c.title }}]({{ c.permalink | relative_url }})
{%- endfor %}
