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

- **👋 Welcome screen** — the default landing: a guide explaining what LCT is and
  how to use the app, with a step-by-step "how to use this app" walkthrough. The
  app opens here every time (deep links and reloads still go straight to their
  view), and it's reopenable any time from the **?** in the rail.
- **🌌 Constellation home** — the five dimensions orbit a central hub. Click a
  node (or legend chip) to dock its detail; the hub opens Foundations. The
  focused dimension persists across reloads.
- **📖 Foundations** — a four-part primer: knowledge-blindness, the
  Bernstein/Bourdieu inheritance, legitimation codes, and why EAP took to LCT.
- **Five dimension reading views** — Semantics, Specialization, Autonomy,
  Density and Temporality, each written to build up gradually: it opens with the
  plain-English **gist** and a few **See it in writing** examples, then the fuller
  cited **idea**, the iconic LCT **code plane** (a hoverable 2×2 of named codes),
  an EAP-application panel, related dimensions and an annotated
  **Sources & further reading** rail. The most advanced material sits behind a
  collapsible **Going deeper** toggle. Every dimension also has an
  **In practice** worked example, an **Annotated example** (a paragraph or two
  with margin notes showing the feature at work), a **Take it to class** panel
  of low-prep teaching activities, and a **Try it yourself** exercise — a short
  text with questions whose answers reveal on click. Semantics adds an
  interactive **Unpack / Repack lab** that traces out the semantic wave.
- **🎼 The Studio** — code a real paragraph. Study two worked drafts (a
  flatlined student draft vs. a reworked "waved" version), or switch to **Your
  text** to paste your own paragraph: it's segmented into sentences you rate
  with semantic gravity / density sliders, and the wave redraws live. Your text
  and ratings persist across reloads.
- **🧭 Fieldwork** — designing EAP materials for specific disciplines. Opens
  with the EGAP/ESAP specificity debate read through LCT (Hyland's specificity
  argument vs. Monbec's knowledge-based common core), then six worked
  discipline profiles — the physical sciences, engineering, business, nursing,
  law, and history/humanities. Each profile names the specialization code the
  discipline's writing rewards (highlighted live on the code plane), sketches
  the semantic signatures of its flagship genres as wave charts (including a
  physics "Icarus" failure profile), annotates an extract, lists concrete
  materials-design moves, and flags the characteristic code clash — with an
  honesty line separating what is directly studied in the literature from the
  app's own illustrative analyses.
- **🧪 The Materials Lab** — a three-step unit-design workflow. **Profile the
  target**: four "code the brief" diagnostic questions place the assessment on
  the Specialization plane and return a design note for its code. **Plan the
  wave**: sketch the unit stage by stage (orient → unpack → practise → repack
  → transfer, fully editable) with gravity and density sliders per stage; the
  intended semantic profile redraws live as paired SG/SD lines with shape
  verdicts (flatline, no return, genuine wave, flat density). **Audit the
  draft**: an LCT checklist — one check per
  dimension and more — each linking to its dimension. The whole plan persists
  across reloads and copies out as text for a scheme of work.
- **📑 Glossary & notation key** — every organising code (SG, SD, ER, SR, PA,
  RA, MaD, MoD, TP, TO) grouped by dimension, plus a glossary of key LCT terms
  (semantic wave, code clash, autonomy tour, translation device, the Icarus
  effect, recontextualisation, …) with citations that jump to their sources.
- **📚 The Library** — an annotated, Harvard-style reading list of ~25 verified
  sources: the core Maton theory, the dimension-specific apparatus, the LCT-in-EAP
  literature (Kirk, Monbec, Brooke, Ingold & O'Sullivan) and cross-disciplinary
  applications — grouped by purpose, each with a one-line note on why it earns
  its place, and linked from every dimension's sources rail.

- **⚙️ Tweaks** — an appearance panel in the rail: choose an accent colour and
  reading font, or switch to reduced motion. Preferences apply instantly (by
  overriding the design-system CSS variables) and persist.

A persistent left rail keeps every view one click away. The layout is
responsive — multi-column views collapse to a single column and the
constellation stacks its map above the detail panel on narrow screens — and
every view is linkable via a URL hash (`#/dimension/semantics`, `#/studio`, …).

## Running locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

Built with **React 18** and **Vite**.

## A note on content

All references are verified and Harvard-formatted: the core Maton citations
(Maton 2013, 2014, 2016, 2020; Maton & Howard 2018; Maton & Doran 2017a/b) and
every EAP- and discipline-application source (Kirk 2017, 2018; Monbec 2018,
2020; Monbec et al. 2021; Brooke 2017; Ingold & O'Sullivan 2017; Blackie 2014;
Clarence 2016; Georgiou, Maton & Sharma 2014; Szenes, Tilakaratna & Maton 2015;
Tilakaratna & Szenes 2020; Hyland 2002; and the rest of the Library) have been
checked against the LCT publications database and the publishers' records,
including volumes and page ranges. A smoke test enforces that every inline
citation and Library entry resolves against the reference list. The Studio /
Unpack **example texts** (the osmosis and inflation paragraphs) remain
illustrative teaching samples, as do the Fieldwork extracts; each Fieldwork
profile states explicitly which claims are directly studied in the literature
and which are the app's own illustrative analyses. Density and Temporality are
presented honestly as emerging dimensions whose full four-code matrices are
still being elaborated in the literature.
