/* Welcome.jsx — a first-run welcome that explains what the app is and how to
   use it. Shown automatically on a first visit (and reachable any time from the
   “?” in the rail). Marks itself seen so it doesn't reappear unprompted. */

import { Eyebrow } from './components.jsx';

/* Guided pathways — three sequenced routes through the app, matched to the
   jobs practitioners actually arrive with. Each step navigates via go(). */
const PATHWAYS = [
  {
    icon: '🌱', title: 'New to LCT?', time: 'about 30 minutes',
    steps: [
      { label: 'Foundations — what the theory is, and why EAP took to it', route: ['foundations'] },
      { label: 'Semantics — the semantic wave, with the Unpack/Repack lab', route: ['dimension', 'semantics'] },
      { label: 'The Studio — watch a flatlined draft become a wave', route: ['studio'] },
      { label: 'Keep the Glossary at your elbow as you read on', route: ['glossary'] },
    ],
  },
  {
    icon: '📐', title: 'Designing a course or unit', time: 'an afternoon’s companion',
    steps: [
      { label: 'Fieldwork — the specificity debate, and your discipline’s profile', route: ['fieldwork'] },
      { label: 'The Materials Lab — profile the task, plan the wave, audit the draft', route: ['lab'] },
      { label: 'The Library — the design literature, annotated', route: ['library'] },
    ],
  },
  {
    icon: '✍️', title: 'Analysing student writing', time: 'about 45 minutes',
    steps: [
      { label: 'Specialization — what “good” secretly means in the task', route: ['dimension', 'specialization'] },
      { label: 'Autonomy — the quotations that never come home', route: ['dimension', 'autonomy'] },
      { label: 'The Studio — study a discipline sample, then code a real student paragraph', route: ['studio'] },
    ],
  },
];

const STEPS = [
  { icon: '🌌', h: 'Roam the constellation', t: 'The home screen is a map of the five “dimensions” of the theory. Tap any circle to preview it in the side panel; open it to read the full topic.' },
  { icon: '📖', h: 'New to all this? Start with Foundations', t: 'The dark circle in the centre of the map opens a gentle primer — what the theory is, where it came from, and why it matters for teaching academic writing.' },
  { icon: '🪜', h: 'Each topic builds up gradually', t: 'Every dimension opens with the plain-English gist and a few examples, then moves to the fuller theory, and tucks the most advanced material behind a “Going deeper” toggle — so you’re never thrown in the deep end.' },
  { icon: '🎼', h: 'Get hands-on in the Studio', t: 'Paste a paragraph and watch its “semantic wave” take shape as you rate each sentence — the quickest way to feel how the theory works on real writing.' },
  { icon: '🧭', h: 'Design for your disciplines', t: 'Fieldwork profiles what “good writing” rewards in the sciences, engineering, business, nursing, law and the humanities — and turns each profile into concrete materials-design moves for discipline-specific EAP.' },
  { icon: '🧪', h: 'Draft the unit in the Materials Lab', t: 'A three-step design workflow: diagnose the code your target task rewards, sketch the unit’s semantic wave stage by stage, then audit the draft against an LCT checklist — and copy the whole plan out as text.' },
  { icon: '📑', h: 'Look things up, and make it yours', t: 'The Glossary explains every code and term, the search bar finds anything fast, and the Tweaks panel (the cog in the rail) sets the accent colour, reading font and motion.' },
  { icon: '📚', h: 'Read beyond the app', t: 'The Library is an annotated reading list: every reference in the app plus the wider EAP-and-LCT literature, Harvard-referenced and grouped by purpose — with a note on why each one is worth your time.' },
];

export function WelcomeView({ go }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(40px, 7vw, 84px) clamp(18px, 5vw, 34px) 72px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
          <svg width="40" height="40" viewBox="0 0 30 30"><rect width="30" height="30" rx="9" fill="var(--ink)" /><path d="M5 19c2.4 0 2.4-8 4.8-8s2.4 8 4.8 8 2.4-8 4.8-8 2.4 8 4.8 8" fill="none" stroke="var(--paper)" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <Eyebrow size={12} hue="var(--clay)">Welcome to Wavelength</Eyebrow>
        </div>

        <h1 className="ser" style={{ margin: '0 0 18px', fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.02 }}>See the hidden rules behind good academic writing.</h1>
        <p className="ser" style={{ margin: '0 0 16px', fontSize: 'clamp(18px, 2.4vw, 22px)', fontStyle: 'italic', lineHeight: 1.45, color: 'var(--ink-2)' }}>Legitimation Code Theory (LCT) is a practical toolkit for understanding why some explanations build real understanding and others fall flat — and how to teach the difference.</p>
        <p className="san" style={{ margin: '0 0 36px', fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)' }}>You don’t need any background to start. This app walks you from the simple idea up to the detailed theory, with worked examples at every step. It’s built for EAP tutors and practitioners — whether you’re brand new to LCT or deepening what you already know.</p>

        <div style={{ height: 1, background: 'var(--line)', margin: '0 0 32px' }} />
        <Eyebrow size={11} style={{ marginBottom: 6, display: 'block' }}>Choose your path</Eyebrow>
        <p className="san" style={{ margin: '0 0 18px', fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-2)' }}>Three routes through the app, depending on what brought you here. Every step is a link — follow one in order, or wander.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 40 }}>
          {PATHWAYS.map((p) => (
            <div key={p.title} style={{ padding: '16px 16px 14px', borderRadius: 14, border: '1px solid var(--line)', background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginBottom: 4 }}>
                <span style={{ fontSize: 19, lineHeight: 1 }}>{p.icon}</span>
                <h2 className="ser" style={{ margin: 0, fontSize: 19, fontWeight: 500, letterSpacing: '-0.01em' }}>{p.title}</h2>
              </div>
              <p className="san" style={{ margin: '0 0 12px 28px', fontSize: 11.5, fontStyle: 'italic', color: 'var(--ink-3)' }}>{p.time}</p>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {p.steps.map((s, i) => (
                  <li key={i}>
                    <button onClick={() => go(...s.route)}
                      style={{ display: 'flex', gap: 9, alignItems: 'baseline', width: '100%', textAlign: 'left', padding: '7px 9px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-2)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                      <span className="mono" style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--clay)', flex: '0 0 auto' }}>{i + 1}</span>
                      <span className="san" style={{ fontSize: 12.5, lineHeight: 1.45, color: 'var(--ink)', fontWeight: 500 }}>{s.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <Eyebrow size={11} style={{ marginBottom: 18, display: 'block' }}>How to use this app</Eyebrow>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
          {STEPS.map((s, k) => (
            <div key={k} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16, alignItems: 'start', padding: '16px 18px', borderRadius: 14, border: '1px solid var(--line)', background: 'var(--surface)' }}>
              <span style={{ fontSize: 24, lineHeight: 1.1 }}>{s.icon}</span>
              <div>
                <h2 className="ser" style={{ margin: '0 0 5px', fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em' }}>{s.h}</h2>
                <p className="san" style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-2)' }}>{s.t}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button onClick={() => go('map')} style={{ flex: '1 1 240px', padding: '18px 22px', borderRadius: 14, border: 'none', background: 'var(--ink)', color: 'var(--paper)', cursor: 'pointer', textAlign: 'left' }}>
            <div className="san" style={{ fontSize: 11.5, opacity: .7, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 4 }}>Jump in</div>
            <div className="ser" style={{ fontSize: 22, fontWeight: 500 }}>Explore the map →</div>
          </button>
          <button onClick={() => go('foundations')} style={{ flex: '1 1 240px', padding: '18px 22px', borderRadius: 14, border: '1px solid var(--line-strong)', background: 'var(--surface)', color: 'var(--ink)', cursor: 'pointer', textAlign: 'left' }}>
            <div className="san" style={{ fontSize: 11.5, color: 'var(--ink-3)', letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 4 }}>New to LCT?</div>
            <div className="ser" style={{ fontSize: 22, fontWeight: 500 }}>Start with the basics →</div>
          </button>
        </div>

        <p className="san" style={{ margin: '26px 0 0', fontSize: 12.5, color: 'var(--ink-3)' }}>You can reopen this guide any time from the <strong>?</strong> button in the sidebar.</p>
      </div>
    </div>
  );
}
