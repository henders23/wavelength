/* Welcome.jsx — a first-run welcome that explains what the app is and how to
   use it. Shown automatically on a first visit (and reachable any time from the
   “?” in the rail). Marks itself seen so it doesn't reappear unprompted. */

import React from 'react';
import { Eyebrow } from './components.jsx';

const STEPS = [
  { icon: '🌌', h: 'Roam the constellation', t: 'The home screen is a map of the five “dimensions” of the theory. Tap any circle to preview it in the side panel; open it to read the full topic.' },
  { icon: '📖', h: 'New to all this? Start with Foundations', t: 'The dark circle in the centre of the map opens a gentle primer — what the theory is, where it came from, and why it matters for teaching academic writing.' },
  { icon: '🪜', h: 'Each topic builds up gradually', t: 'Every dimension opens with the plain-English gist and a few examples, then moves to the fuller theory, and tucks the most advanced material behind a “Going deeper” toggle — so you’re never thrown in the deep end.' },
  { icon: '🎼', h: 'Get hands-on in the Studio', t: 'Paste a paragraph and watch its “semantic wave” take shape as you rate each sentence — the quickest way to feel how the theory works on real writing.' },
  { icon: '📑', h: 'Look things up, and make it yours', t: 'The Glossary explains every code and term, the search bar finds anything fast, and the Tweaks panel (the cog in the rail) sets the accent colour, reading font and motion.' },
];

export function WelcomeView({ go }) {
  // Remember that the welcome has been seen, so it won't auto-open again.
  React.useEffect(() => { try { localStorage.setItem('wl-welcomed', '1'); } catch {} }, []);

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
