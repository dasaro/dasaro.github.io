---
layout: page
permalink: /theses/
title: Theses
description: Information for students interested in a BA or MSc thesis under my supervision at the University of Verona.
nav: true
nav_order: 7
---

<style>
  .th { max-width: 56rem; }
  .th a { text-decoration: none; border-bottom: 1px dotted; }
  .th-lead { font-size: 1.02rem; line-height: 1.6; margin: .2rem 0 1.8rem; }
  .th-lead strong { color: var(--global-theme-color); }
  /* section header with icon */
  .th-h { display: flex; align-items: center; gap: .55rem; margin: 1.9rem 0 .95rem; }
  .th-h svg { width: 1.2rem; height: 1.2rem; fill: var(--global-theme-color); flex: 0 0 auto; }
  .th-h h2 { margin: 0; padding: 0; font-size: 1.15rem; border: 0; }
  /* numbered steps */
  .th-steps { display: grid; gap: .7rem; }
  .th-step { display: flex; gap: .85rem; align-items: flex-start; padding: .85rem 1rem; border: 1px solid var(--global-divider-color); border-radius: .7rem; }
  .th-step-n { flex: 0 0 auto; width: 1.75rem; height: 1.75rem; border-radius: 999px; background: var(--global-theme-color); color: #fff; font-weight: 700; font-size: .92rem; display: flex; align-items: center; justify-content: center; }
  .th-step-b { flex: 1 1 auto; min-width: 0; font-size: .93rem; line-height: 1.5; align-self: center; }
  /* callout note */
  .th-note { display: flex; gap: .7rem; padding: .9rem 1.05rem; border-radius: .7rem; border-left: 3px solid var(--global-theme-color); background: color-mix(in srgb, var(--global-theme-color) 8%, transparent); font-size: .93rem; line-height: 1.55; }
  .th-note svg { width: 1.15rem; height: 1.15rem; fill: var(--global-theme-color); flex: 0 0 auto; margin-top: .15rem; }
  .th-note strong { color: var(--global-theme-color); }
  /* topics grid */
  .th-topics { display: grid; grid-template-columns: repeat(auto-fill, minmax(15.5rem, 1fr)); gap: .55rem; }
  .th-topic { display: flex; gap: .6rem; align-items: flex-start; padding: .62rem .8rem; border: 1px solid var(--global-divider-color); border-radius: .6rem; font-size: .9rem; line-height: 1.4; transition: border-color .15s ease, transform .15s ease; }
  .th-topic:hover { border-color: var(--global-theme-color); transform: translateY(-1px); }
  .th-topic .dot { flex: 0 0 auto; width: .5rem; height: .5rem; border-radius: 999px; background: var(--global-theme-color); margin-top: .35rem; }
</style>

<div class="th">

  <p class="th-lead">I supervise <strong>BA and MSc theses</strong> at the University of Verona. This page explains how to get started and the kind of topics I offer.</p>

  <div class="th-h">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
    <h2>How to apply</h2>
  </div>
  <div class="th-steps">
    <div class="th-step"><div class="th-step-n">1</div><div class="th-step-b">Browse my <a href="{{ '/publications/' | relative_url }}">publications</a> and <a href="{{ '/' | relative_url }}">research interests</a> to see the kind of problems I work on.</div></div>
    <div class="th-step"><div class="th-step-n">2</div><div class="th-step-b">Email me at <strong><a href="mailto:fabioaurelio.dasaro@univr.it">fabioaurelio.dasaro@univr.it</a></strong> with a rough idea of what you would like to work on.</div></div>
    <div class="th-step"><div class="th-step-n">3</div><div class="th-step-b">We meet and shape a concrete topic together.</div></div>
  </div>

  <div class="th-h">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v2h-2V7zm0 4h2v6h-2v-6z"/></svg>
    <h2>Prerequisites</h2>
  </div>
  <div class="th-note">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v2h-2V7zm0 4h2v6h-2v-6z"/></svg>
    <div>My methods draw on formal logic and computer science, but <strong>a good BA thesis can be written without prior background in these areas</strong> — what matters most is curiosity and a willingness to pick up the tools along the way. MSc theses are more demanding, and the prerequisites depend on the specific topic.</div>
  </div>

  <div class="th-h">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2zM9 20a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9v1z"/></svg>
    <h2>Proposed topics</h2>
  </div>
  <div class="th-topics">
    <div class="th-topic"><span class="dot"></span><span>The logical omniscience problem and propositional attitudes</span></div>
    <div class="th-topic"><span class="dot"></span><span>Bounded rationality and depth-limited logics</span></div>
    <div class="th-topic"><span class="dot"></span><span>Historical and conceptual analysis of Alan Turing's writings</span></div>
    <div class="th-topic"><span class="dot"></span><span>Bias and fairness in machine-learning systems (e.g. ChatGPT, Stable Diffusion)</span></div>
    <div class="th-topic"><span class="dot"></span><span>Knowledge representation and commonsense reasoning with the Event Calculus</span></div>
    <div class="th-topic"><span class="dot"></span><span>Inductive Logic Programming and its applications</span></div>
    <div class="th-topic"><span class="dot"></span><span>Explainable AI for machine-learning systems</span></div>
    <div class="th-topic"><span class="dot"></span><span>Formal argumentation frameworks</span></div>
    <div class="th-topic"><span class="dot"></span><span>Temporal-reasoning problems (frame, qualification, ramification)</span></div>
    <div class="th-topic"><span class="dot"></span><span>Measures of fairness</span></div>
  </div>

  <div class="th-h">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    <h2>A note on writing</h2>
  </div>
  <div class="th-note">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    <div>For logic-oriented theses I recommend writing in <strong>LaTeX</strong> — <a href="https://www.overleaf.com/" target="_blank" rel="noopener">Overleaf</a> makes this easy and lets us work on the draft together.</div>
  </div>

</div>
