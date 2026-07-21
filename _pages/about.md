---
layout: about
title: About
permalink: /
subtitle: Assistant Professor, <a href='https://www.univr.it/'>University of Verona</a> · Honorary Lecturer, <a href='https://www.ucl.ac.uk/'>UCL</a> · Logic &amp; AI

profile:
  align: right
  image: prof_pic.jpg
  image_circular: true
  more_info: >
    <p>Department of Human Sciences,<br>University of Verona</p>
    <p><a href="/theses/">Supervising BA &amp; MSc theses →</a></p>
    <div class="sig-mark" role="img" aria-label="Fabio D'Asaro signature"></div>

selected_papers: true
social: true

announcements:
  enabled: true
  scrollable: false
  limit: 5

latest_posts:
  enabled: false
  scrollable: true
  limit: 3
---

<style>
  /* keep the (low-resolution) profile photo modest and rounded */
  .profile.float-right { max-width: 200px; }
  .profile.float-right img { max-width: 100%; height: auto; }
  /* set the subtitle apart from the bio (it was black & body-sized, so it blended in) */
  .post .desc { font-size: 1.05rem; color: var(--global-text-color-light); margin: .25rem 0 1.4rem; }
  .post .desc a { border-bottom: 1px dotted; }
  /* "All news" link injected after the announcements panel */
  .all-news-link { display: inline-block; margin-top: .5rem; font-size: .85rem; font-weight: 600; color: var(--global-theme-color); }
  .all-news-link:hover { text-decoration: underline; }
  /* small theme-aware signature under the profile photo: CSS-masked so it takes the theme ink colour (adapts to light/dark) */
  .sig-mark { width: 155px; height: 122px; margin: .9rem auto .1rem; opacity: .78;
    background-color: var(--global-text-color-light);
    -webkit-mask: url(/assets/img/signature.png) center / contain no-repeat;
    mask: url(/assets/img/signature.png) center / contain no-repeat; }
</style>

I am a researcher in Logic and AI: epistemic, probabilistic and temporal reasoning, argumentation, and logic programming (ASP/ILASP). My work spans bounded and non-monotonic reasoning, explainable AI, and the foundations of computation.

I am an Assistant Professor at the [University of Verona](https://www.dsu.univr.it/?ent=persona&id=72945) and an Honorary Lecturer at [University College London](https://profiles.ucl.ac.uk/46940) (Department of Information Studies; <fabio.dasaro.14@ucl.ac.uk>). I am a member of the [EThOS](https://sites.dsu.univr.it/ethos/?lang=en), [LUCI](https://luci.unimi.it/), [SPIKE](https://wp.doc.ic.ac.uk/spike/) and [KIDS](https://blogs.ucl.ac.uk/dis-research/category/knowledge-information-and-data-science/) research groups, and previously held postdoctoral positions in Milan, Naples and [Salento](https://www.unisalento.it/scheda-utente/-/people/fabioaurelio.dasaro). I earned my [PhD](https://discovery.ucl.ac.uk/id/eprint/10067238/) from UCL.

You can browse my [publications](/publications/), my [CV](/cv/), or the courses I [teach](/teaching/).

{% if site.data.scholar %}

<p style="text-align: center; margin-top: 1.5rem; font-size: 0.95rem;">
  <a href="https://scholar.google.com/citations?user={{ site.data.socials.scholar_userid | split: '&' | first }}">Google&nbsp;Scholar</a>
  &nbsp;·&nbsp; <strong>{{ site.data.scholar.citations }}</strong> citations
  &nbsp;·&nbsp; h-index <strong>{{ site.data.scholar.h_index }}</strong>
  &nbsp;·&nbsp; i10-index <strong>{{ site.data.scholar.i10_index }}</strong>
  &nbsp;<span style="opacity: 0.55;">(updated {{ site.data.scholar.updated }})</span>
</p>

{% endif %}

## Research interests

I am currently working on:

- **Trustworthy and ethical AI** (with P. Baldi and G. Primiero)
- **Probabilistic extensions of typed natural deduction systems** (with G. Primiero)
- **Game Theory and Cognitive Science** (with C. Sinigaglia, M. Fanghella, and the CIALab)
- **Extensions and applications of the Event Calculus** (with R. Miller and L. Dickens)
- **Depth-bounded extensions of the ASP system clingo** (with P. Baldi and M. D'Agostino)
- **Applications of ILASP to explainable AI** (with A. Russo, M. Law, and A. Bikakis)

<!-- BibTeX button + copyable overlay — KEEP IDENTICAL to the block in _pages/publications.md
     so selected (home) and full (publications) lists never differ. -->
<style>
  .bibtex-trigger { cursor: pointer; }
  .bib-overlay { position: fixed; inset: 0; z-index: 2000; display: none; align-items: center; justify-content: center; background: rgba(0, 0, 0, .55); padding: 1.2rem; }
  .bib-overlay.open { display: flex; }
  .bib-card { background: var(--global-card-bg-color, #fff); color: var(--global-text-color, #1c1c1c); border: 1px solid var(--global-divider-color, #e3e3e3); border-radius: .7rem; width: 100%; max-width: 720px; max-height: 82vh; display: flex; flex-direction: column; box-shadow: 0 12px 48px rgba(0, 0, 0, .45); overflow: hidden; }
  .bib-head { display: flex; align-items: center; justify-content: space-between; gap: .6rem; padding: .6rem .9rem; border-bottom: 1px solid var(--global-divider-color, #e3e3e3); }
  .bib-head .ttl { font-weight: 700; font-size: .8rem; letter-spacing: .06em; text-transform: uppercase; color: var(--global-theme-color); }
  .bib-head .acts { display: flex; gap: .45rem; align-items: center; }
  .bib-x { background: none; border: 0; font-size: 1.25rem; line-height: 1; cursor: pointer; color: var(--global-text-color-light, #888); padding: 0 .3rem; }
  .bib-copy { background: var(--global-theme-color); color: #fff; border: 0; border-radius: .4rem; font-size: .78rem; font-weight: 600; padding: .28rem .75rem; cursor: pointer; }
  .bib-pre { margin: 0; padding: 1rem 1.1rem; overflow: auto; white-space: pre; color: var(--global-text-color, #1c1c1c); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; font-size: .8rem; line-height: 1.55; background: rgba(128, 128, 128, .08); }
</style>

<script>
  (function () {
    var BIB = {{ site.data.bibtex | jsonify }};
    if (!BIB || !Object.keys(BIB).length) return;
    function init() {
    var ov = document.createElement('div');
    ov.className = 'bib-overlay';
    ov.innerHTML = '<div class="bib-card"><div class="bib-head"><span class="ttl">BibTeX</span><span class="acts"><button class="bib-copy" type="button">Copy</button><button class="bib-x" type="button" aria-label="Close">&times;</button></span></div></div>';
    document.body.appendChild(ov);
    var pre = document.createElement('div'); // built in JS (a literal <pre> here is stripped by kramdown)
    pre.className = 'bib-pre';
    ov.querySelector('.bib-card').appendChild(pre);
    var copyBtn = ov.querySelector('.bib-copy');
    function close() { ov.classList.remove('open'); }
    function open(t) { pre.textContent = t; ov.classList.add('open'); copyBtn.textContent = 'Copy'; }
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    ov.querySelector('.bib-x').addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    copyBtn.addEventListener('click', function () {
      var t = pre.textContent;
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () { copyBtn.textContent = 'Copied!'; }, function () {
        var r = document.createRange(); r.selectNodeContents(pre); var s = getSelection(); s.removeAllRanges(); s.addRange(r);
        try { document.execCommand('copy'); copyBtn.textContent = 'Copied!'; } catch (e) {}
      });
      setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1400);
    });
    Object.keys(BIB).forEach(function (key) {
      var el = document.getElementById(key); if (!el) return;
      var links = el.querySelector('.links');
      if (!links) { links = document.createElement('div'); links.className = 'links'; el.appendChild(links); }
      var b = document.createElement('a');
      b.className = 'btn btn-sm z-depth-0 bibtex-trigger';
      b.setAttribute('role', 'button'); b.textContent = 'BibTeX';
      b.addEventListener('click', function () { open(BIB[key]); });
      links.appendChild(b);
    });
    }
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
  })();
</script>

<!-- MIRAI provenance note, attached to the TPTND paper in the *selected* list (home page only).
     Kept here rather than in papers.bib on purpose: papers.bib feeds the CV PDF and the BibTeX
     export, and this is site-only editorial context, not part of the citation record. -->
<style>
  .mirai-note { display: flex; gap: .7rem; align-items: flex-start; margin: .55rem 0 .1rem;
    padding: .6rem .75rem; border-left: 3px solid var(--global-theme-color);
    background: rgba(128, 128, 128, .07); border-radius: 0 .4rem .4rem 0; font-size: .82rem; line-height: 1.5; }
  /* the mark ships on an opaque white square, so give it a deliberate white chip in both themes */
  .mirai-note .mirai-logo { width: 34px; height: 34px; flex: 0 0 34px; border-radius: .3rem; margin-top: .1rem;
    background: #fff; padding: 3px; box-sizing: border-box; }
  .mirai-note p { margin: 0; color: var(--global-text-color); }
  .mirai-note details { margin-top: .4rem; }
  .mirai-note summary { cursor: pointer; font-weight: 600; color: var(--global-theme-color); font-size: .78rem; }
  .mirai-note details ul { margin: .45rem 0 0; padding-left: 1.1rem; }
  .mirai-note details li { margin-bottom: .3rem; color: var(--global-text-color-light); }
  .mirai-note details li .y { font-variant-numeric: tabular-nums; opacity: .7; margin-right: .3rem; }
</style>

<script>
  (function () {
    // The line of work this paper belongs to. Each entry is verified against a DOI or a stable CEUR URL.
    var LINE = [
      { y: 2021, t: 'Probabilistic Typed Natural Deduction for Trustworthy Computations', u: 'https://ceur-ws.org/Vol-3022/paper3.pdf' },
      { y: 2022, t: 'Proof-checking Bias in Labeling Methods', u: 'https://ceur-ws.org/Vol-3319/paper1.pdf' },
      { y: 2023, t: 'BRIOxAlkemy: A Bias Detecting Tool', u: 'https://ceur-ws.org/Vol-3615/paper4.pdf' },
      { y: 2025, t: 'A Philosophical Framework for Data-Driven Miscomputations', u: 'https://doi.org/10.3390/philosophies10040088' },
      { y: 2025, t: 'Defining Formal Validity Criteria for Machine Learning Models', u: 'https://doi.org/10.1007/978-3-032-03083-2_14' },
      { y: 2026, t: 'Trustworthiness preservation by copies of machine learning systems', u: 'https://doi.org/10.1016/j.ijar.2026.109638' }
    ];
    function init() {
      var entry = document.getElementById('dasaro2025checking');
      if (!entry || entry.querySelector('.mirai-note')) return;

      var items = LINE.map(function (p) {
        return '<li><span class="y">' + p.y + '</span><a href="' + p.u + '" target="_blank" rel="noopener">' +
          p.t + '</a></li>';
      }).join('');

      var box = document.createElement('div');
      box.className = 'mirai-note';
      box.innerHTML =
        '<img class="mirai-logo" src="{{ "/assets/img/logos/mirai.png" | relative_url }}" alt="MIRAI logo" ' +
          'onerror="this.remove()">' +
        '<div>' +
          '<p>I wrote this one first, though it was the last to appear in print. ' +
          'The <abbr title="Trustworthy Probabilistic Typed Natural Deduction">TPTND</abbr> work carried on in the PRIN project ' +
          '<a href="https://sites.unimi.it/brio/about/" target="_blank" rel="noopener">BRIO</a>, ' +
          'which is where <a href="https://mirai.systems/" target="_blank" rel="noopener">MIRAI</a> came from: ' +
          'a University of Milan spin-off founded by my co-authors G. Primiero and F. Genco.</p>' +
          '<details><summary>Related papers</summary><ul>' + items + '</ul></details>' +
        '</div>';

      var links = entry.querySelector('.links');
      if (links && links.parentNode) { links.parentNode.insertBefore(box, links); } else { entry.appendChild(box); }
    }
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
  })();
</script>

<!-- "All news →" link appended after the announcements panel -->
<script>
  (function () {
    function add() {
      var n = document.querySelector('.news');
      if (!n || n.querySelector('.all-news-link')) return;
      var a = document.createElement('a');
      a.href = '{{ "/news/" | relative_url }}';
      a.className = 'all-news-link';
      a.textContent = 'All news →';
      n.appendChild(a);
    }
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', add); } else { add(); }
  })();
</script>
