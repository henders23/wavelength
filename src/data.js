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
    simple: 'Here’s the gist: some writing floats up in big, abstract ideas, and some sits down in concrete, everyday detail. Strong explanations *move* between the two — they take an idea, bring it down to an example, then lift it back up. Charted over time, that movement makes a *semantic wave* — the most useful single idea in this whole app.',
    examples: [
      { label: 'Up in the abstract', text: '“Photosynthesis is the conversion of radiant energy into chemical energy.” True — but a newcomer has nothing to hold onto yet.' },
      { label: 'Brought down to earth', text: '“A leaf is basically a tiny solar panel: it catches sunlight and uses it to make sugar.”' },
      { label: 'Lifted back up', text: '“That sunlight-into-sugar process is what we call photosynthesis.” Now the word means something.' },
    ],
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
    deeper: [
      'Gravity and density are *independent* continua: a term can be abstract yet simple, or concrete yet dense. Reading either one over time gives a *semantic profile*, and research on cumulative learning finds the productive profile has *range* — it reaches up toward abstraction and back down to the concrete [Maton 2013].',
      'The move that does the real work is the *return*. Unpacking a concept into an example opens meaning up; it is the *repacking* — folding the example back into the principle — that consolidates it, which is why a wave that never climbs back tends not to build [Maton, Hood & Shay 2016].',
    ],
    worked: { label: 'One sentence, a whole wave', text: '“Entropy tends to increase — think of an ice cube melting into a warm drink, the order of the crystal dispersing — and that one-way loss of order is what the Second Law names.”', note: 'Three beats: a dense principle (weak gravity), unpacked into a kitchen example (strong gravity), then repacked into the law (weak gravity again). Compressed, but a complete wave, because it makes the return.' },
    plane: 'semantics', wave: true,
    cites: ['Maton 2013', 'Maton & Doran 2017'],
    related: ['specialization', 'autonomy'],
    annotated: {
      lede: 'A short passage from a student’s biology assignment, annotated for its semantic movement — watch the wave travel down to an example and back up to the concept.',
      segments: [
        { t: 'Diffusion is the net movement of particles from a region of high concentration to one of low concentration.', note: 'Weak gravity, high density — an abstract, condensed definition. The “ceiling” of the wave.' },
        { t: 'Picture a drop of ink spreading through a glass of water until the colour is even throughout.', note: 'Gravity strengthens sharply: a concrete, everyday image anchors the idea. The wave travels down.' },
        { t: 'The ink moves because random motion carries more particles out of the crowded drop than back into it.', note: 'A bridging move — still concrete, but starting to generalise the mechanism.' },
        { t: 'This spontaneous spreading down a concentration gradient is what we call diffusion.', note: 'Gravity weakens and the term is repacked: the example folds back into the concept. The wave returns to the top.' },
      ],
    },
    exercise: {
      prompt: 'Read this sentence from a first draft. It scores poorly for semantic movement — see if you can say why.',
      text: '“Osmosis constitutes the passage of solvent molecules across a selectively permeable membrane along a water-potential gradient, a process of considerable physiological significance.”',
      questions: [
        { q: 'Is the semantic gravity here strong or weak?', a: 'Weak. The sentence stays entirely in abstract, technical language — there is no concrete situation or example to ground it.' },
        { q: 'Is the semantic density high or low?', a: 'High. Terms like “selectively permeable membrane” and “water-potential gradient” each pack a great deal of meaning into very few words.' },
        { q: 'What single move would most improve it for a beginner?', a: 'Unpack it — add a concrete example (a raisin swelling in water) to bring the gravity down, before repacking into the term. As written, the profile flatlines at the abstract ceiling.' },
      ],
    },
  },
  {
    key: 'specialization', n: '02', name: 'Specialization', hue: 'var(--d-spec)',
    question: 'What makes something legitimate — what you know, or who you are?',
    simple: 'Here’s the gist: every subject rewards a blend of two things — *what you know* (facts and methods) and *who you are* (the right way of seeing, a personal voice). A chemistry exam mostly rewards knowledge; an art critique mostly rewards a cultivated eye. Working out which a task rewards tells you what “good writing” actually means there.',
    examples: [
      { label: 'Rewards what you know', text: 'A maths proof stands or falls on its logic — it doesn’t matter who wrote it.' },
      { label: 'Rewards who you are', text: 'A personal reflection rewards an honest, distinctive voice more than technical correctness.' },
      { label: 'The mismatch', text: 'A heartfelt, first-person lab report — or a cold, impersonal reflective essay — has misread which kind of “good” the task wants.' },
    ],
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
    deeper: [
      'Within knower codes, Maton distinguishes kinds of *gaze* — from a *trained gaze* acquired through explicit criteria to a *cultivated gaze* grown through long immersion. The strength of social relations is rarely advertised, which is exactly why knower-code demands feel tacit, and unfair, to newcomers [Maton 2014].',
      'Plotting a task’s code and a student’s code on the same plane turns a vague sense of “fit” into a diagnosable *code match* or *code clash* — and points to what would have to change for effort to convert into achievement [Maton, Hood & Shay 2016].',
    ],
    worked: { label: 'Two assessments, two codes', text: 'A first-year lab report is marked on method, accuracy and replicability; a fine-art studio crit rewards a distinctive personal vision.', note: 'The lab report is a knowledge code (ER+, SR−) — the author is effaced. The crit is a knower code (ER−, SR+) — the cultivated gaze is the achievement. Carry one code into the other’s task and you meet a code clash.' },
    plane: 'specialization',
    cites: ['Maton 2014'],
    related: ['semantics', 'autonomy'],
    annotated: {
      lede: 'Two extracts from the same student, written for different tasks — annotated for the specialization code each one performs.',
      segments: [
        { t: 'Lab report: “The titration was repeated three times and the mean titre recorded; anomalous results were excluded, and the standard method was followed throughout.”', note: 'A knowledge code (ER+, SR−): legitimacy rests on correct method and procedure, and the author is deliberately effaced — no “I”, no personal stance.' },
        { t: 'Reflective journal: “Watching the colour change, I felt the same quiet thrill I’d had as a child with a chemistry set, and it reminded me why I chose this subject.”', note: 'A knower code (ER−, SR+): legitimacy rests on a cultivated personal voice and disposition — the “I” and the feeling are exactly the point.' },
      ],
    },
    exercise: {
      prompt: 'Here is a line from a history essay. Use the specialization codes to analyse it.',
      text: '“While the sources are fragmentary, a careful reading suggests the rebellion was driven less by ideology than by hunger.”',
      questions: [
        { q: 'Are epistemic relations (ER) being foregrounded?', a: 'Yes — the claim is anchored in evidence (“the sources”, “a careful reading”). The object of study and method matter.' },
        { q: 'Are social relations (SR) doing visible work too?', a: 'Yes, somewhat. History rewards a cultivated interpretive “gaze” — the judicious reading of fragmentary sources — so SR is not fully effaced. Many humanities fields lean toward an élite or knower code.' },
        { q: 'What would a code clash look like for a student here?', a: 'A student trained only to report facts (a pure knowledge code) may under-perform, because the task also rewards a cultivated interpretive voice — and vice versa. Naming the code makes that hidden demand visible.' },
      ],
    },
  },
  {
    key: 'autonomy', n: '03', name: 'Autonomy', hue: 'var(--d-auto)',
    question: 'Whose content is in play, whose purposes — and do we find our way home?',
    simple: 'Here’s the gist: strong academic writing often takes a short trip — it leaves its main point to bring in an example, a quotation, or an idea from another field — and then comes *back*, using the detour to strengthen its own argument. Weaker writing wanders off and never returns. The skill is making the round trip.',
    examples: [
      { label: 'A round trip', text: 'An essay on climate policy borrows a term from economics, explains it, then uses it to sharpen its own argument — and returns home.' },
      { label: 'A one-way trip', text: 'An essay drops in a long quotation, then moves on — never showing why it mattered.' },
    ],
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
    deeper: [
      'Autonomy tours have a *shape*. A one-way trip leaves the target practice and never returns — the anecdote that swallows the paragraph. An *integrative* tour makes the detour serve the target’s own purpose and comes back, so borrowed material is *introjected* rather than left *exotic* [Maton & Howard 2018].',
      'Charting positional and relational autonomy across a text shows whether its excursions build the argument or merely wander from it — a shape that, like the semantic wave, can be taught and revised [Maton & Howard 2018].',
    ],
    worked: { label: 'Borrowing, and coming home', text: 'A politics essay pauses to explain a concept from economics, then turns that concept back onto its own argument about policy.', note: 'Positional autonomy weakens (PA−: borrowed content), but relational autonomy stays strong (RA+: the borrowing serves the essay’s own aim) — an introjected tour that returns. Contrast the essay that quotes and never comes back.' },
    plane: 'autonomy',
    cites: ['Maton & Howard 2018'],
    related: ['semantics', 'specialization'],
    annotated: {
      lede: 'A paragraph from an essay on urban planning, annotated for its autonomy tour — out to a borrowed idea, and back home again.',
      segments: [
        { t: 'Cities have long struggled to manage traffic congestion.', note: 'Home: the target content and purpose (PA+, RA+) — squarely on topic.' },
        { t: 'Economists describe a “tragedy of the commons”, where a shared resource is overused because no single user bears the full cost.', note: 'The tour leaves home: content is imported from economics (PA−). On its own, this is a detour.' },
        { t: 'A road behaves the same way: each extra car slows everyone slightly, but no driver feels that cost directly.', note: 'The borrowed idea is bent to the essay’s own purpose (RA+) — an introjected move, not an aimless one.' },
        { t: 'Congestion charging works precisely because it makes that hidden cost visible, returning the problem to the planner’s control.', note: 'The tour returns home (PA+, RA+): the detour has strengthened the argument rather than replaced it.' },
      ],
    },
    exercise: {
      prompt: 'Read this excerpt and diagnose its autonomy.',
      text: '“To understand motivation, consider Maslow’s hierarchy of needs, which arranges human needs from the physiological to the self-actualising. Maslow proposed five levels, and the theory has been widely taught since the 1940s.”',
      questions: [
        { q: 'Does the writer leave the target practice (positional autonomy)?', a: 'Yes — they import a psychological model (PA−), which is perfectly fine in itself.' },
        { q: 'Do they bring it back to serve their own argument (relational autonomy)?', a: 'No. The passage drifts into describing Maslow for its own sake (RA−, drifting toward exotic). It never returns the idea to the writer’s point about motivation.' },
        { q: 'How would you fix it?', a: 'Complete the tour: after introducing the model, apply it back to the specific case the essay is about — turning a one-way trip into a round trip.' },
      ],
    },
  },
  {
    key: 'density', n: '04', name: 'Density', hue: 'var(--d-den)', emerging: true,
    question: 'How is complexity condensed — into things, or into values?',
    simple: 'Here’s the gist: “dense” writing packs a lot of meaning into few words — but there are two kinds of packing. Some words are loaded with *technical* meaning (“entropy”); some are loaded with *values and judgement* (“unjust”). Noticing which kind is at work tells you whether a passage needs more precision or a clearer stance.',
    examples: [
      { label: 'Packed with technical meaning', text: '“Exergonic” folds a whole chemistry definition into a single word.' },
      { label: 'Packed with judgement', text: '“Exploitative” folds a whole moral verdict into a single word.' },
    ],
    concepts: [
      { code: 'MaD', label: 'Material density', gloss: 'condensation of natural-technical meaning' },
      { code: 'MoD', label: 'Moral density', gloss: 'condensation of social-moral meaning' },
    ],
    idea: [
      'Density refines the idea of condensation by asking *what kind* of meaning is being packed in. *Material density* (MaD) gathers natural and technical meanings — the referential machinery of a field. *Moral density* (MoD) gathers social and ethical meanings — its values, stances and judgements [Maton & Doran 2017].',
      'Separating the two reveals texts that are technically dense but morally light, morally charged but technically thin, or thick with both. It is a finer-grained partner to semantic density, and its full four-code matrix is still being elaborated in the literature [Maton & Doran 2017].',
    ],
    eap: 'Useful where technicality and evaluation travel together — a discussion section that must be precise *and* take a position. Density helps separate “add more terminology” from “commit to a stance.”',
    deeper: [
      'Because material and moral density vary independently, the same passage can be technically intricate yet evaluatively flat, or morally loaded yet technically thin. Naming *which* density is doing the work separates two different revisions — “add precision” from “take a position” [Maton & Doran 2017].',
      'The dimension’s fuller apparatus, including any stable code matrix, is still being elaborated in the literature, so it is best used here as a refinement of semantic density rather than a closed scheme [Maton & Doran 2017].',
    ],
    worked: { label: 'Two kinds of thick', text: '“The reaction is exergonic and therefore spontaneous” versus “The policy is unjust and, frankly, indefensible.”', note: 'The first is materially dense (MaD+) — technical meaning condensed — but morally light. The second is morally dense (MoD+) but technically light. Each needs a different kind of unpacking for a newcomer.' },
    cites: ['Maton & Doran 2017'],
    related: ['semantics'],
    annotated: {
      lede: 'A sentence from a discussion section, annotated for the two kinds of density at work.',
      segments: [
        { t: 'The intervention produced a statistically significant reduction in cortisol,', note: 'High material density (MaD+): “statistically significant” and “cortisol” each condense technical meaning.' },
        { t: 'but deploying it without consent would be ethically indefensible.', note: 'High moral density (MoD+): “ethically indefensible” condenses a strong value judgement, not a technical fact.' },
        { t: 'Any responsible rollout must therefore weigh efficacy against autonomy.', note: 'Both kinds travel together: a technical claim (“efficacy”) and a moral one (“autonomy”) balanced in a single clause.' },
      ],
    },
    exercise: {
      prompt: 'Consider this sentence and the kinds of density it carries.',
      text: '“The regime’s austerity programme was technically coherent yet morally bankrupt.”',
      questions: [
        { q: 'Which phrase carries mainly material (technical) density?', a: '“Technically coherent” — it condenses an economic/technical appraisal into two words.' },
        { q: 'Which carries mainly moral density?', a: '“Morally bankrupt” — it condenses a strong ethical judgement.' },
        { q: 'Why is separating the two useful for a writer?', a: 'Because the sentence makes two different kinds of claim. A reader might accept the technical one but contest the moral one — and a writer revising it can see whether to add evidence (for the technical claim) or justify a stance (for the moral one).' },
      ],
    },
  },
  {
    key: 'temporality', n: '05', name: 'Temporality', hue: 'var(--d-temp)', emerging: true,
    question: 'Where in time does a practice stand, and which way does it face?',
    simple: 'Here’s the gist: different kinds of academic writing sit at different points in *time* and face different directions. A literature review looks back over what’s already been done; a research proposal looks forward to what’s still to come. Noticing a text’s relationship to time helps explain what it’s trying to do.',
    examples: [
      { label: 'Facing the past', text: 'A literature review locates itself after — and because of — the work that came before it.' },
      { label: 'Facing the future', text: 'A grant proposal promises findings that haven’t happened yet.' },
    ],
    concepts: [
      { code: 'TP', label: 'Temporal position', gloss: 'where a practice sits in time' },
      { code: 'TO', label: 'Temporal orientation', gloss: 'past-, present- or future-facing' },
    ],
    idea: [
      'Temporality turns the lens onto time. *Temporal position* (TP) locates a practice along a timeline — where it sits relative to others. *Temporal orientation* (TO) captures which way it faces: towards the past, the present, or the future [Maton 2014].',
      'Fields narrate their own development very differently — some venerate origins, others race toward what is next — and these temporal stances shape what counts as a legitimate contribution. Temporality is the newest dimension of the framework, and its codes are actively being developed [Maton 2014].',
    ],
    eap: 'A lens for time-built genres: the literature review that historicises a field, the methods section that promises future results, the reflection that revisits a past self.',
    deeper: [
      'A practice’s temporal stance shapes what counts as a contribution. A field that *venerates origins* legitimates returning to foundational texts; one that *races ahead* rewards novelty and prediction. The same study can read as derivative or pioneering depending on the clock the field keeps [Maton 2014].',
      'Temporal position and orientation can be charted much as gravity and density are, but as the framework’s newest dimension the codes are still actively being developed — another reason to hold its categories lightly [Maton 2014].',
    ],
    worked: { label: 'Two genres, two clocks', text: 'A literature review historicises a debate; a grant proposal promises future findings.', note: 'The review faces the past, locating itself after prior work; the proposal faces the future, positioning itself before results yet to come. Same author, different temporal orientation.' },
    cites: ['Maton 2014'],
    related: ['specialization'],
    annotated: {
      lede: 'Three sentences from different parts of a dissertation, annotated for their temporal orientation — the writing faces a different way each time.',
      segments: [
        { t: 'Literature review: “Early studies in the 1970s treated the gut as a passive tube.”', note: 'Past-facing: the writing locates itself after, and in contrast to, earlier work.' },
        { t: 'Aims: “This study tests whether gut bacteria influence mood in healthy adults.”', note: 'Present-facing: positioned at the moment of the research itself.' },
        { t: 'Conclusion: “If confirmed, these findings could reshape how we treat anxiety within a decade.”', note: 'Future-facing: the writing reaches forward to results and implications not yet realised.' },
      ],
    },
    exercise: {
      prompt: 'Read this opening line of a research proposal.',
      text: '“Although decades of research have mapped the disease’s genetics, no treatment yet exists; this project will deliver the first targeted therapy within five years.”',
      questions: [
        { q: 'Where does the sentence face at first?', a: 'The past: “decades of research have mapped…” locates the work after an established body of knowledge.' },
        { q: 'Where does it face by the end?', a: 'The future: “will deliver… within five years” orients toward results not yet achieved — typical of the proposal genre.' },
        { q: 'What does this temporal shift accomplish?', a: 'It positions the project as the next step on a timeline — building on the past to justify a forward-looking promise. Spotting the move helps students write proposals that connect what is known to what they will do.' },
      ],
    },
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
