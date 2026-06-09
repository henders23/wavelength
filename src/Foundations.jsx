/* Foundations.jsx — the conceptual on-ramp: what LCT is and why EAP needs it. */

import { FOUNDATIONS, REFS } from './data.js';
import { Eyebrow, RichText, useNarrow } from './components.jsx';

export function FoundationsView({ go }) {
  const narrow = useNarrow();
  const sk = ['Maton 2014', 'Bernstein 2000', 'Kirk 2017', 'Monbec 2020'];
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--paper)' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 14, padding: '13px 34px', background: 'color-mix(in srgb, var(--paper), transparent 8%)', borderBottom: '1px solid var(--line)', backdropFilter: 'blur(8px)' }}>
        <button onClick={() => go('map')} style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, padding: '7px 13px', borderRadius: 9, cursor: 'pointer', border: '1px solid var(--line-strong)', background: 'var(--surface)', color: 'var(--ink)' }}>← Constellation</button>
        <span className="san" style={{ fontSize: 13, color: 'var(--ink-2)' }}>Foundations</span>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: narrow ? '36px 18px 56px' : '56px 34px 70px' }}>
        <Eyebrow size={11} hue="var(--clay)">Start here</Eyebrow>
        <h1 className="ser" style={{ margin: '14px 0 18px', fontSize: narrow ? 38 : 58, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1 }}>What is Legitimation Code&nbsp;Theory?</h1>
        <p className="ser" style={{ margin: '0 0 14px', fontSize: 22, fontStyle: 'italic', lineHeight: 1.4, color: 'var(--ink-2)' }}>{FOUNDATIONS.lede}</p>
        <div style={{ height: 1, background: 'var(--line)', margin: '34px 0' }} />

        {FOUNDATIONS.sections.map((s, k) => (
          <section key={k} style={{ marginBottom: 38, display: 'grid', gridTemplateColumns: '34px 1fr', gap: 18 }}>
            <div className="ser" style={{ fontSize: 22, fontWeight: 400, color: 'var(--clay)', lineHeight: 1.2 }}>{String(k + 1).padStart(2, '0')}</div>
            <div>
              <h2 className="ser" style={{ margin: '0 0 10px', fontSize: 27, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.1 }}>{s.h}</h2>
              <RichText className="ser" style={{ margin: 0, fontSize: 18.5, lineHeight: 1.62, color: 'var(--ink)' }}>{s.t}</RichText>
            </div>
          </section>
        ))}

        <div style={{ height: 1, background: 'var(--line)', margin: '10px 0 30px' }} />
        <Eyebrow size={11} style={{ marginBottom: 14, display: 'block' }}>Sources</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          {sk.map((k) => <p key={k} id={'ref-' + k} className="ser" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-2)', paddingLeft: 14, borderLeft: '2px solid var(--clay)' }}>{REFS[k]}</p>)}
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button onClick={() => go('dimension', 'semantics')} style={{ flex: '1 1 220px', padding: '18px 22px', borderRadius: 14, border: 'none', background: 'var(--ink)', color: 'var(--paper)', cursor: 'pointer', textAlign: 'left' }}>
            <div className="san" style={{ fontSize: 11.5, opacity: .7, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 4 }}>Begin with</div>
            <div className="ser" style={{ fontSize: 22, fontWeight: 500 }}>Semantics →</div>
          </button>
          <button onClick={() => go('map')} style={{ flex: '1 1 220px', padding: '18px 22px', borderRadius: 14, border: '1px solid var(--line-strong)', background: 'var(--surface)', color: 'var(--ink)', cursor: 'pointer', textAlign: 'left' }}>
            <div className="san" style={{ fontSize: 11.5, color: 'var(--ink-3)', letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 4 }}>Or roam</div>
            <div className="ser" style={{ fontSize: 22, fontWeight: 500 }}>The constellation →</div>
          </button>
        </div>
      </div>
    </div>
  );
}
