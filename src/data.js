/* data.js — content model for the Wavelength app.
   Accurate Legitimation Code Theory (Maton 2014 and the LCT programme).
   Inline citations are written as [Key] markers and resolved against REFS.
   The Maton citations and the EAP-application entries (Kirk 2017, Monbec 2020)
   have all been verified against the LCT publications database and the
   published sources. */

export const REFS = {
  'Maton 2014': 'Maton, K. (2014). Knowledge and Knowers: Towards a Realist Sociology of Education. London: Routledge.',
  'Maton 2013': 'Maton, K. (2013). Making semantic waves: A key to cumulative knowledge-building. Linguistics and Education, 24(1), 8–22.',
  'Maton, Hood & Shay 2016': 'Maton, K., Hood, S., & Shay, S. (Eds.). (2016). Knowledge-building: Educational Studies in Legitimation Code Theory. London: Routledge.',
  'Maton & Howard 2018': 'Maton, K., & Howard, S. K. (2018). Taking autonomy tours: A key to integrative knowledge-building. LCT Centre Occasional Paper 1. Sydney: LCT Centre.',
  'Maton & Doran 2017': 'Maton, K., & Doran, Y. J. (2017). Semantic density: A translation device for revealing complexity of knowledge practices in discourse, part 1 — wording. Onomázein, 46–76.',
  'Bernstein 2000': 'Bernstein, B. (2000). Pedagogy, Symbolic Control and Identity: Theory, Research, Critique (rev. ed.). Oxford: Rowman & Littlefield.',
  'Kirk 2017': 'Kirk, S. (2017). Waves of reflection: Seeing knowledge(s) in academic writing. In J. Kemp (Ed.), EAP in a Rapidly Changing Landscape: Issues, Challenges and Solutions. Proceedings of the 2015 BALEAP Conference. Reading: Garnet.',
  'Monbec 2020': 'Monbec, L. (2020). Systemic Functional Linguistics for the EGAP module: Revisiting the common core. Journal of English for Academic Purposes, 43, 100794.',
};

/* A code plane = a Cartesian plane of two strengths, four named codes.
   axisY is the vertical relation (+ at top), axisX the horizontal (+ right).
   quad keys: tl, tr, bl, br. */
export const PLANES = {
  semantics: {
    axisY: { code: 'SD', plus: 'denser', minus: 'lighter' },
    axisX: { code: 'SG', plus: 'stronger · concrete', minus: 'weaker · abstract' },
    quads: {
      tl: { code: 'SG−, SD+', name: 'rhizomatic', note: 'abstract yet richly condensed — theory-talk' },
      tr: { code: 'SG+, SD+', name: 'worldly', note: 'grounded and condensed — a loaded example' },
      bl: { code: 'SG−, SD−', name: 'rarefied', note: 'abstract and simple — a bare generalisation' },
      br: { code: 'SG+, SD−', name: 'prosaic', note: 'concrete and simple — everyday description' },
    },
  },
  specialization: {
    axisY: { code: 'ER', plus: 'stronger', minus: 'weaker' },
    axisX: { code: 'SR', plus: 'stronger', minus: 'weaker' },
    quads: {
      tl: { code: 'ER+, SR−', name: 'knowledge code', note: 'mastery of content & method; the knower effaced — e.g. a lab report' },
      tr: { code: 'ER+, SR+', name: 'élite code', note: 'specialist knowledge and the right dispositions both required' },
      bl: { code: 'ER−, SR−', name: 'relativist code', note: '“anything goes”; neither is the basis of achievement' },
      br: { code: 'ER−, SR+', name: 'knower code', note: 'a cultivated gaze, taste or voice — e.g. a reflective essay' },
    },
  },
  autonomy: {
    axisY: { code: 'PA', plus: 'target content', minus: 'other content' },
    axisX: { code: 'RA', plus: 'target purpose', minus: 'other purpose' },
    quads: {
      tl: { code: 'PA+, RA−', name: 'projected', note: 'own content sent out to serve another’s aim' },
      tr: { code: 'PA+, RA+', name: 'sovereign', note: 'own content for own purpose — staying home' },
      bl: { code: 'PA−, RA−', name: 'exotic', note: 'other content for other purpose — fully away' },
      br: { code: 'PA−, RA+', name: 'introjected', note: 'outside material brought in for the target’s purpose' },
    },
  },
};

export const DIMS = [
  {
    key: 'semantics', n: '01', name: 'Semantics', hue: 'var(--d-sem)', star: true,
    question: 'How abstract is the meaning — and how much is packed inside it?',
    concepts: [
      { code: 'SG', label: 'Semantic gravity', gloss: 'how far meaning depends on its context' },
      { code: 'SD', label: 'Semantic density', gloss: 'how much meaning is condensed into a term' },
    ],
    idea: [
      'Two continua sit at the heart of the Semantics dimension. *Semantic gravity* (SG) describes how far meaning depends on its context — the more a meaning leans on a specific situation, the stronger its gravity [Maton 2013]. *Semantic density* (SD) describes how much meaning is condensed into a word, symbol or gesture: how many threads of significance one term gathers up [Maton & Doran 2017].',
      'Knowledge-building rarely sits still on these continua — it moves. A teacher takes an abstract principle (weak gravity, dense) and unpacks it into a concrete, everyday example (stronger gravity, lighter), then repacks the example back into the principle. Charted over time, those movements trace a *semantic wave* [Maton 2013].',
      'The shape of the wave matters. Prose that never leaves the abstract ceiling — or never rises from concrete detail — *flatlines*, and flatlining is associated with weaker cumulative learning. The productive profile is rhythmic: down to unpack, up to consolidate, down again [Maton 2013].',
    ],
    eap: 'For EAP, the wave is the most practical tool in the framework. Writing that “stays too simple” or “never gives an example” is usually a flat semantic profile. Teaching students to unpack a technical term and repack it into argument is teaching them to ride the wave.',
    plane: 'semantics', wave: true,
    cites: ['Maton 2013', 'Maton & Doran 2017'],
    related: ['specialization', 'autonomy'],
  },
  {
    key: 'specialization', n: '02', name: 'Specialization', hue: 'var(--d-spec)',
    question: 'What makes something legitimate — what you know, or who you are?',
    concepts: [
      { code: 'ER', label: 'Epistemic relations', gloss: 'to objects of study — the “what”' },
      { code: 'SR', label: 'Social relations', gloss: 'to knowers and actors — the “who”' },
    ],
    idea: [
      'Every practice and every claim is specialized: it is oriented *towards* something and *by* someone. *Epistemic relations* (ER) connect practices to their objects — the phenomena, methods and procedures a field is about. *Social relations* (SR) connect practices to their subjects — the authors, knowers and dispositions doing the work [Maton 2014].',
      'Strengthen or weaken each relation and four *specialization codes* appear. A *knowledge code* (ER+, SR−) legitimates mastery of content and method; a *knower code* (ER−, SR+) legitimates the cultivation of the right gaze, taste or voice. An *élite code* (ER+, SR+) demands both; a *relativist code* (ER−, SR−) demands neither [Maton 2014].',
      'Disciplines have characteristic codes, and trouble gathers at the seams. When the code a student brings clashes with the code a task rewards — a *code clash* — effort does not convert into achievement, however hard the student works [Maton 2014].',
    ],
    eap: 'Naming a discipline’s code tells you what “good writing” actually means there. A lab report rewards procedure and effaces its author (knowledge code); a reflective essay rewards a cultivated personal stance (knower code). EAP’s job is often to make a hidden code visible — and to ease the clash.',
    plane: 'specialization',
    cites: ['Maton 2014'],
    related: ['semantics', 'autonomy'],
  },
  {
    key: 'autonomy', n: '03', name: 'Autonomy', hue: 'var(--d-auto)',
    question: 'Whose content is in play, whose purposes — and do we find our way home?',
    concepts: [
      { code: 'PA', label: 'Positional autonomy', gloss: 'where the constituents come from' },
      { code: 'RA', label: 'Relational autonomy', gloss: 'whose purposes they serve' },
    ],
    idea: [
      'Autonomy asks where the parts of a practice come from, and what they are ultimately for. *Positional autonomy* (PA) concerns constituents — are they drawn from the target practice (PA+) or imported from elsewhere (PA−)? *Relational autonomy* (RA) concerns purposes — do those constituents serve the target’s own principles (RA+) or another’s (RA−)? [Maton & Howard 2018]',
      'The two relations give four codes. A *sovereign code* (PA+, RA+) stays within its own content and aims; an *exotic code* (PA−, RA−) is foreign on both counts. The revealing cases are mixed: an *introjected code* (PA−, RA+) brings outside material in to serve the target’s purpose, while a *projected code* (PA+, RA−) sends its own content out to serve another [Maton & Howard 2018].',
      'Skilled knowledge-building often takes an *autonomy tour*: it leaves the target practice, travels into an example, an anecdote or another field, and returns — integrating the detour rather than getting lost in it [Maton & Howard 2018].',
    ],
    eap: 'Source use, illustration and interdisciplinary reference are all autonomy moves. A strong paragraph tours out to an example and comes back to the claim; a weak one wanders into quotation and never returns. The tour is a teachable shape.',
    plane: 'autonomy',
    cites: ['Maton & Howard 2018'],
    related: ['semantics', 'specialization'],
  },
  {
    key: 'density', n: '04', name: 'Density', hue: 'var(--d-den)', emerging: true,
    question: 'How is complexity condensed — into things, or into values?',
    concepts: [
      { code: 'MaD', label: 'Material density', gloss: 'condensation of natural-technical meaning' },
      { code: 'MoD', label: 'Moral density', gloss: 'condensation of social-moral meaning' },
    ],
    idea: [
      'Density refines the idea of condensation by asking *what kind* of meaning is being packed in. *Material density* (MaD) gathers natural and technical meanings — the referential machinery of a field. *Moral density* (MoD) gathers social and ethical meanings — its values, stances and judgements [Maton & Doran 2017].',
      'Separating the two reveals texts that are technically dense but morally light, morally charged but technically thin, or thick with both. It is a finer-grained partner to semantic density, and its full four-code matrix is still being elaborated in the literature [Maton & Doran 2017].',
    ],
    eap: 'Useful where technicality and evaluation travel together — a discussion section that must be precise *and* take a position. Density helps separate “add more terminology” from “commit to a stance.”',
    cites: ['Maton & Doran 2017'],
    related: ['semantics'],
  },
  {
    key: 'temporality', n: '05', name: 'Temporality', hue: 'var(--d-temp)', emerging: true,
    question: 'Where in time does a practice stand, and which way does it face?',
    concepts: [
      { code: 'TP', label: 'Temporal position', gloss: 'where a practice sits in time' },
      { code: 'TO', label: 'Temporal orientation', gloss: 'past-, present- or future-facing' },
    ],
    idea: [
      'Temporality turns the lens onto time. *Temporal position* (TP) locates a practice along a timeline — where it sits relative to others. *Temporal orientation* (TO) captures which way it faces: towards the past, the present, or the future [Maton 2014].',
      'Fields narrate their own development very differently — some venerate origins, others race toward what is next — and these temporal stances shape what counts as a legitimate contribution. Temporality is the newest dimension of the framework, and its codes are actively being developed [Maton 2014].',
    ],
    eap: 'A lens for time-built genres: the literature review that historicises a field, the methods section that promises future results, the reflection that revisits a past self.',
    cites: ['Maton 2014'],
    related: ['specialization'],
  },
];

export const FOUNDATIONS = {
  lede: 'Before the five dimensions, four ideas that make the whole framework click — and explain why EAP, of all fields, has taken LCT to heart.',
  sections: [
    { h: 'The problem: knowledge-blindness', t: 'Education research has often studied *who* learns and *how* they learn while treating *what* is learned as a black box. Maton calls this knowledge-blindness: when the structuring of knowledge itself drops out of view, we cannot explain why some practices build cumulatively and others do not [Maton 2014].' },
    { h: 'The inheritance: Bernstein & Bourdieu', t: 'LCT extends Basil Bernstein’s code theory and Pierre Bourdieu’s field theory. From Bernstein it takes the insight that knowledge has its own structures and effects; from Bourdieu, the picture of practices as moves within structured fields of position and value [Bernstein 2000; Maton 2014].' },
    { h: 'The move: legitimation codes', t: 'LCT’s wager is that practices are organised by underlying principles — *legitimation codes* — that can be made visible, compared across contexts, and deliberately changed. Each of the five dimensions offers a different lens onto those codes [Maton 2014].' },
    { h: 'Why it matters for EAP', t: 'EAP works exactly where knowledge is recontextualised for newcomers. LCT gives EAP a precise language for the tacit demands of disciplinary writing, and a principled basis for designing materials that build knowledge in waves rather than flat lines [Kirk 2017; Monbec 2020].' },
  ],
};

/* Glossary — key LCT terms with accurate definitions and citations.
   `dim` ties a term to a dimension's hue/route where one applies. */
export const GLOSSARY = [
  { term: 'Legitimation code', dim: null, def: 'The underlying organising principle of a practice — what is taken as the basis of achievement or status. LCT makes these codes visible so they can be compared and changed [Maton 2014].' },
  { term: 'Semantic gravity (SG)', dim: 'semantics', def: 'How far meaning depends on its context. Stronger gravity (SG+) means meaning is bound to a specific situation; weaker gravity (SG−) means it is more abstract and generalised [Maton 2013].' },
  { term: 'Semantic density (SD)', dim: 'semantics', def: 'How much meaning is condensed into a word, symbol or gesture. Denser (SD+) terms gather many threads of significance; lighter (SD−) terms carry less [Maton & Doran 2017].' },
  { term: 'Semantic wave', dim: 'semantics', def: 'The profile traced when knowledge-building moves up and down the semantic continua over time — unpacking abstraction into example, then repacking it. Associated with cumulative learning [Maton 2013].' },
  { term: 'Flatlining', dim: 'semantics', def: 'A semantic profile that stays at the abstract ceiling or the concrete floor without moving — associated with weaker cumulative knowledge-building [Maton 2013].' },
  { term: 'Unpacking / repacking', dim: 'semantics', def: 'Teaching moves that weaken semantic gravity (unpack a term into concrete example) and then strengthen it again (repack the example into the concept) — the engine of a semantic wave [Maton 2013].' },
  { term: 'Epistemic relations (ER)', dim: 'specialization', def: 'The relation of a practice to its objects of study — the phenomena, methods and procedures a field is about — the "what" [Maton 2014].' },
  { term: 'Social relations (SR)', dim: 'specialization', def: 'The relation of a practice to its subjects — the authors, knowers and dispositions doing the work — the "who" [Maton 2014].' },
  { term: 'Specialization codes', dim: 'specialization', def: 'The four codes from strengthening/weakening ER and SR: knowledge (ER+, SR−), knower (ER−, SR+), élite (ER+, SR+) and relativist (ER−, SR−) [Maton 2014].' },
  { term: 'Code clash / code match', dim: 'specialization', def: 'A clash occurs when the code a student brings differs from the code a task rewards, so effort does not convert into achievement; a match is when they align [Maton 2014].' },
  { term: 'Gaze', dim: 'specialization', def: 'A cultivated way of seeing, hearing or feeling that knower codes legitimate — acquired dispositions rather than explicit procedures [Maton 2014].' },
  { term: 'Positional autonomy (PA)', dim: 'autonomy', def: 'Where the constituents of a practice come from — drawn from the target practice (PA+) or imported from elsewhere (PA−) [Maton & Howard 2018].' },
  { term: 'Relational autonomy (RA)', dim: 'autonomy', def: 'Whose purposes the constituents serve — the target practice’s own principles (RA+) or another’s (RA−) [Maton & Howard 2018].' },
  { term: 'Autonomy tour', dim: 'autonomy', def: 'A move that leaves the target practice for an example, anecdote or other field and then returns, integrating the detour rather than getting lost in it [Maton & Howard 2018].' },
  { term: 'Material / moral density', dim: 'density', def: 'A finer cut of condensation: material density (MaD) packs natural-technical meaning; moral density (MoD) packs social-moral meaning — values, stances and judgements [Maton & Doran 2017].' },
  { term: 'Temporal position / orientation', dim: 'temporality', def: 'Temporal position (TP) locates a practice in time relative to others; temporal orientation (TO) captures whether it faces the past, present or future [Maton 2014].' },
  { term: 'Knowledge-blindness', dim: null, def: 'Treating what is learned as a black box while studying only who learns and how — the problem LCT sets out to overcome [Maton 2014].' },
  { term: 'Cumulative knowledge-building', dim: null, def: 'Learning in which new knowledge builds on and integrates prior knowledge over time, rather than segmenting into disconnected facts [Maton 2013].' },
  { term: 'Recontextualisation', dim: null, def: 'The relocation of knowledge from its site of production into pedagogic settings, where it is reshaped for newcomers — the work EAP does [Bernstein 2000; Monbec 2020].' },
];

/* Studio sample: one idea, two codings. sg = gravity strength 0..1
   (1 = concrete/strong gravity, 0 = abstract ceiling). */
export const STUDIO = {
  topic: 'Explaining “inflation” to a first-year reader',
  drafts: {
    flat: {
      label: 'Student draft', verdict: 'Semantic flatline — stranded at the abstract ceiling',
      sentences: [
        { sg: 0.16, sd: 0.85, t: 'Inflation denotes a sustained increase in the general price level, eroding the real purchasing power of a currency.' },
        { sg: 0.13, sd: 0.82, t: 'It is conventionally attributed to the interaction of aggregate demand and aggregate supply within a monetary economy.' },
        { sg: 0.15, sd: 0.8, t: 'Persistent inflationary pressure may precipitate adverse macroeconomic outcomes and necessitate monetary intervention.' },
      ],
    },
    waved: {
      label: 'Reworked draft', verdict: 'A semantic wave — unpacks to an example, repacks to the concept',
      sentences: [
        { sg: 0.22, sd: 0.7, t: 'Inflation is a sustained rise in the general level of prices.' },
        { sg: 0.86, sd: 0.3, t: 'Put concretely: the £1 coin that bought a loaf last year buys only most of one today.' },
        { sg: 0.55, sd: 0.45, t: 'That gap — what your money no longer stretches to — is purchasing power being eroded.' },
        { sg: 0.26, sd: 0.72, t: 'Scaled across every household and firm, those small erosions are what economists track as the inflation rate.' },
      ],
    },
  },
};
