# Wavelength

**Legitimation Code Theory (LCT) for EAP practitioners.**

Wavelength is a learning app that helps English for Academic Purposes tutors
deepen their knowledge of Maton's Legitimation Code Theory — and apply it to
text analysis and materials design. It is theory-heavy and citation-grounded,
but aims to be warm, accessible and practical.

The app follows **the Constellation** navigation paradigm: the five LCT
dimensions orbit a central hub, and you explore them in any order — a nod to
how LCT itself theorises knowledge as constellations.

## What's inside

- **🌌 Constellation home** — the five dimensions orbit a central hub. Click a
  node (or legend chip) to dock its detail; the hub opens Foundations. The
  focused dimension persists across reloads.
- **📖 Foundations** — a four-part primer: knowledge-blindness, the
  Bernstein/Bourdieu inheritance, legitimation codes, and why EAP took to LCT.
- **Five dimension reading views** — Semantics, Specialization, Autonomy,
  Density and Temporality. Each has the idea (with inline citations that jump to
  Sources), the iconic LCT **code plane** (a hoverable 2×2 of named codes), an
  EAP-application panel, related dimensions and a sources list. Semantics also
  has an interactive **Unpack / Repack lab** that traces out the semantic wave.
- **🎼 The Studio** — code a real paragraph. Study two worked drafts (a
  flatlined student draft vs. a reworked "waved" version), or switch to **Your
  text** to paste your own paragraph: it's segmented into sentences you rate
  with semantic gravity / density sliders, and the wave redraws live. Your text
  and ratings persist across reloads.
- **📑 Glossary & notation key** — every organising code (SG, SD, ER, SR, PA,
  RA, MaD, MoD, TP, TO) grouped by dimension, plus a glossary of key LCT terms
  (semantic wave, code clash, autonomy tour, recontextualisation, …) with
  citations that jump to their sources.

A persistent left rail keeps every view one click away.

## Running locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

Built with **React 18** and **Vite**.

## A note on content

All references are verified: the core Maton citations (Maton 2013, 2014; Maton &
Howard 2018; Maton & Doran 2017) plus the EAP-application sources (Kirk 2017,
Monbec 2020) have been checked against the LCT publications database and the
published works. The Studio / Unpack **example texts** (the osmosis and
inflation paragraphs) remain illustrative teaching samples. Density and
Temporality are presented honestly as emerging dimensions whose full four-code
matrices are still being elaborated in the literature.
