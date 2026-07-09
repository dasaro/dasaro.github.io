---
layout: post
title: "The mathematics behind the backgrounds"
date: 2026-07-05 18:00:00 +0200
description: "Five small mathematical animations run, very faintly, behind this site. Here is what each of them is, and why it is worth a second look."
tags: [mathematics, cellular-automata, primes]
categories: [notes]
related_posts: false
---
If you stay on any page here for a few seconds, you may notice something moving behind the text, very faintly. It is not a bug, and it is not there only to look clever. Every time the page loads, the site picks one of five small mathematical animations and runs it in the background at a very low opacity, so that it never gets in the way of the reading. You can change it: on a computer, press `b` to cycle through them, `1` to `5` to choose one, `0` to switch it off; on a phone, just tap the small caption at the bottom. The choice is remembered for your next visit.

I did not pick these five by accident. Each one is, in its own way, a small scandal: a rule simple enough to state in one line, and a behaviour rich enough that people have been arguing about it for decades. Here they are.

## The prime spiral

The first is the [Ulam spiral](https://en.wikipedia.org/wiki/Ulam_spiral). The story goes that Stanisław Ulam, bored during a talk in 1963, started writing the whole numbers along a square spiral and marking the primes as he went. He expected nothing in particular. Instead the primes lined up, stubbornly, along the diagonals. Those diagonals are real: they correspond to quadratic polynomials that produce primes far more often than they have any right to, the famous one being Euler's n² + n + 41. Why the primes should arrange themselves like this, nobody really knows. They are completely determined and, at the same time, full of surprises. That tension is most of number theory.

## The Riemann zeta function

The second is the [Riemann zeta function](https://en.wikipedia.org/wiki/Riemann_zeta_function) on its critical line. This is the serious one. The animation follows the value of ζ(½ + it) as t grows, and the curve keeps looping back through the origin. Every time it crosses exactly zero you are looking at a non-trivial zero of zeta, and the [Riemann Hypothesis](https://en.wikipedia.org/wiki/Riemann_hypothesis), still open after more than a century and a half, claims that all of them sit precisely on that line. It is one of the seven [Millennium Prize Problems](https://en.wikipedia.org/wiki/Millennium_Prize_Problems), so a proof is worth a million dollars, though I suspect whoever finds it will not care much about the money. The link with the primes is not a coincidence, but that is a story for another post.

## Two automata

Numbers three and four are two [elementary cellular automata](https://en.wikipedia.org/wiki/Elementary_cellular_automaton), Stephen Wolfram's [rule 30](https://en.wikipedia.org/wiki/Rule_30) and [rule 110](https://en.wikipedia.org/wiki/Rule_110). The idea could not be poorer: a line of cells, each one on or off, and a fixed little rule that reads three neighbours and decides the next row. "Thirty" and "one hundred and ten" are simply the numbers of two such rules written in binary.

Rule 30 makes chaos. From a single black cell it produces something so disordered that Wolfram used it as a source of randomness inside Mathematica; there is even [money on the table](https://www.rule30prize.org/) for proving a few basic things about it that still refuse to be proven. Rule 110 does something odder: it lives right at the border between order and chaos, and Matthew Cook showed that it is [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness). A one-dimensional row of cells, following a rule you could write on a napkin, can in principle compute whatever your laptop computes.

## The Game of Life

The fifth is [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), the most famous of the group. A cell survives with two or three living neighbours and is born with exactly three; that is the entire law. Out of it come gliders, oscillators, guns, and patterns intricate enough that people have built working computers inside the game. There is a whole [community](https://conwaylife.com/) around it, with a [wiki](https://conwaylife.com/wiki/Main_Page) full of named creatures, and John Conway himself had a complicated relationship with it, half proud and half irritated that a five-minute idea ended up overshadowing the rest of his (enormous) work. Like rule 110, Life is Turing-complete, and computation of this kind is the quiet thread running through half of these examples, and through part of what I do for a living. On what being "Turing-complete" actually licenses, and on the confusions the word invites, I wrote separately in [Unpredictable Does Not Mean Incomputable](/blog/2026/unpredictable-does-not-mean-incomputable/).

So this is what is running behind the page. None of it means anything in particular; I simply like the idea that a personal site can carry, out of the way and at low volume, a handful of objects that are genuinely worth staring at. If one of them catches you, follow a link and get lost for an afternoon. And if the movement annoys you, press `0`, or tap until the caption says off, and it will leave you in peace.
