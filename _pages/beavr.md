---
layout: page
permalink: /beavr/
title: Beavr
description: An unofficial Beamer theme for University of Verona slides, for lecturers and students.
nav: false
---

<style>
  .beavr-card { display: block; margin: 1.4rem 0 .4rem; border: 1px solid var(--global-divider-color); border-radius: .6rem; overflow: hidden; background: #fff; }
  .beavr-card img { display: block; width: 100%; height: auto; cursor: zoom-in; }
  .beavr-sw { display: inline-block; width: 1.05rem; height: 1.05rem; border-radius: .2rem; border: 1px solid var(--global-divider-color); vertical-align: -0.18rem; margin-right: .2rem; }
</style>

Beavr 🦫 is a Beamer theme for University of Verona presentations, for lecturers and students who write their slides in LaTeX. It comes with four colour palettes, a cover with the university logo, and a discreet footer with author, short title and slide number. It is not an official University of Verona product.

<div class="beavr-card">
  <img src="{{ '/assets/img/beavr/beavr-2.0-card.webp' | relative_url }}" alt="Beavr 2.0: cover and content slides in the four palettes (orange and red, gray and blue, light blue and ochre, neutral gray)" width="2000" height="1133" data-zoomable>
</div>

## Get it

The current version is 2.0. You can [open it on Overleaf](https://www.overleaf.com/read/cyktsbkvwtwq#01f106) (read only) and copy the project into your own account, or download the same files as a zip: [beavr_v2.0.zip]({{ '/assets/files/beavr_v2.0.zip' | relative_url }}). Either way you get the theme and a short example deck to start from.

## Usage

Keep the `.sty` files and the logo next to your `.tex` file, then:

```latex
\documentclass{beamer}        % add [aspectratio=169] for widescreen
\def\beavrcolor{0}            % 0 orange/red, 1 gray/blue, 2 light blue/ochre, 3 gray
\usetheme{beavr}

\title[Short title]{Full title of the talk}
\author[J. Doe]{John Doe}
\beavremail{john.doe@univr.it}
```

The short forms of the title and of the author are the ones shown in the footer. The cover is an ordinary `\titlepage` frame; give it the options `[plain,noframenumbering]` to keep it out of the slide count.

A few settings can be changed before `\usetheme{beavr}`:

- `\def\beavrlogo{}` gives a cover without the logo, and `\def\beavrlogo{myfile.png}` uses a different one;
- `\def\beavrfooterlogo{}` removes the logo from the footer;
- `\def\beavrlogowidthtitle{4.6cm}` sets the width of the logo on the cover.

## Palettes

| `\beavrcolor` | Palette | Colours |
| :-: | --- | --- |
| `0` | orange / red | <span class="beavr-sw" style="background:#F7BD78"></span><span class="beavr-sw" style="background:#990F14"></span> |
| `1` | gray / blue | <span class="beavr-sw" style="background:#E6E6E6"></span><span class="beavr-sw" style="background:#000080"></span> |
| `2` | light blue / ochre | <span class="beavr-sw" style="background:#A3DEED"></span><span class="beavr-sw" style="background:#8A4B11"></span> |
| `3` | neutral gray | <span class="beavr-sw" style="background:#E6E6E6"></span><span class="beavr-sw" style="background:#1A1A1A"></span> |

## The UniVR logo

The theme ships with the university logo, but the logo is not mine to license. Its use is governed by the university's visual identity guidelines, and some uses require prior approval from the central offices. Before using it in public (talks, posters, published slides), check the [official documentation](https://www.univr.it/it/organizzazione/sistema-bibliotecario-di-ateneo/comunicazione-visiva-univr). If in doubt, the settings above give you a deck without it.

## Licence

The Beavr theme files and the example deck are released under the [Creative Commons CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) licence. University logos and marks are excluded. The bundle also includes `truncate.sty` by Donald Arseneau, which is in the public domain. Beavr is built on LaTeX Beamer and PGF/TikZ.
