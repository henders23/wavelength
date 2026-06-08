/* Glossary.jsx — a reference view: the LCT notation key (every organising
   code, grouped by dimension) and a glossary of key terms with citations. */

import { DIMS, GLOSSARY, REFS } from './data.js';
import { Code, Eyebrow, Dot, RichText } from './components.jsx';

// Sources cited across the glossary definitions, in REFS order.
const GLOSSARY_SOURCES = ['Maton 2013', 'Maton 2014', 'Maton & Howard 2018', 'Maton & Doran 2017', 'Bernstein 2000', 'Monbec 2020'];

export function GlossaryView({ go }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--paper)' }}>
      {/* sticky header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 14, padding: '13px 34px', background: 'color-mix(in srgb, var(--paper), transparent 8%)', borderBottom: '1px solid var(--line)', backdropFilter: 'blur(8px)' }}>
        <button onClick={() => go('map')} style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, padding: '7px 13px', borderRadius: 9, cursor: 'pointer', border: '1px solid var(--line-strong)', background: 'var(--surface)', color: 'var(--ink)' }}>← Constellation</button>
        <span className="san" style={{ fontSize: 13, color: 'var(--ink-2)' }}>Glossary & notation key</span>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '52px 34px 70px' }}>
        <Eyebrow size={11} hue="var(--clay)">Reference</Eyebrow>
        <h1 className="ser" style={{ margin: '14px 0 16px', fontSize: 56, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1 }}>Glossary &amp; notation key</h1>
        <p className="ser" style={{ margin: '0 0 10px', fontSize: 21, fontStyle: 'italic', lineHeight: 1.4, color: 'var(--ink-2)' }}>Every code and key term in one place — a quick reference as you read across the dimensions or code a text.</p>

        <div style={{ height: 1, background: 'var(--line)', margin: '36px 0' }} />

        {/* ── Notation key ───────────────────────────────────────── */}
        <Eyebrow size={11} style={{ marginBottom: 6, display: 'block' }}>The notation</Eyebrow>
        <p className="san" style={{ margin: '0 0 22px', fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>The two organising concepts of each dimension. Click a row to open that dimension.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginBottom: 12 }}>
          {DIMS.map((m) => (
            <div key={m.key}>
              <button onClick={() => go('dimension', m.key)} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <Dot hue={m.hue} size={10} />
                <span className="mono" style={{ fontSize: 11.5, fontWeight: 600, color: m.hue }}>{m.n}</span>
                <span className="ser" style={{ fontSize: 19, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{m.name}</span>
                {m.emerging && <span className="san" style={{ fontSize: 10.5, fontStyle: 'italic', color: 'var(--ink-3)' }}>emerging</span>}
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {m.concepts.map((c) => (
                  <div key={c.code} onClick={() => go('dimension', m.key)} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '13px 15px', borderRadius: 12, border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer' }}>
                    <Code hue={m.hue}>{c.code}</Code>
                    <div>
                      <div className="san" style={{ fontSize: 13.5, fontWeight: 600 }}>{c.label}</div>
                      <div className="san" style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 1, lineHeight: 1.4 }}>{c.gloss}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: 'var(--line)', margin: '38px 0' }} />

        {/* ── Key terms ──────────────────────────────────────────── */}
        <Eyebrow size={11} style={{ marginBottom: 6, display: 'block' }}>Key terms</Eyebrow>
        <p className="san" style={{ margin: '0 0 22px', fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>The concepts that recur across the framework. Citations jump to the sources below.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {GLOSSARY.map((g) => {
            const dm = g.dim ? DIMS.find((d) => d.key === g.dim) : null;
            const hue = dm ? dm.hue : 'var(--ink-3)';
            return (
              <div key={g.term} style={{ display: 'grid', gridTemplateColumns: '4px 1fr', gap: 16, alignItems: 'stretch' }}>
                <div style={{ borderRadius: 4, background: hue, opacity: dm ? 1 : 0.4 }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                    <h3 className="ser" style={{ margin: 0, fontSize: 21, fontWeight: 500, letterSpacing: '-0.01em' }}>{g.term}</h3>
                    {dm && <button onClick={() => go('dimension', dm.key)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 20, border: '1px solid var(--line-strong)', background: 'var(--surface)', cursor: 'pointer' }}><Dot hue={dm.hue} size={6} /><span className="san" style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink-2)' }}>{dm.name}</span></button>}
                  </div>
                  <RichText className="san" style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink)' }}>{g.def}</RichText>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ height: 1, background: 'var(--line)', margin: '40px 0 30px' }} />

        {/* ── Sources ────────────────────────────────────────────── */}
        <Eyebrow size={11} style={{ marginBottom: 14, display: 'block' }}>Sources</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {GLOSSARY_SOURCES.map((k) => <p key={k} id={'ref-' + k} className="ser" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-2)', paddingLeft: 14, borderLeft: '2px solid var(--clay)' }}>{REFS[k]}</p>)}
        </div>
      </div>
    </div>
  );
}
