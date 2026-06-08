/* Studio.jsx — applied tool: code a text's semantic profile. Toggle between
   a flatlined student draft and a reworked wave; click a sentence to read its
   gravity/density coding and see its point on the wave. */

import React from 'react';
import { STUDIO } from './data.js';
import { Eyebrow, WaveChart } from './components.jsx';

function Meter({ label, code, v, hue }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span className="san" style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ink-2)' }}>{label} <span className="mono" style={{ color: hue }}>{code}</span></span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{Math.round(v * 100)}</span>
      </div>
      <div style={{ height: 7, borderRadius: 7, background: 'var(--line)', overflow: 'hidden' }}>
        <div style={{ width: v * 100 + '%', height: '100%', background: hue, borderRadius: 7, transition: 'width .3s' }} />
      </div>
    </div>
  );
}

export function StudioView({ go }) {
  const [draftKey, setDraftKey] = React.useState('flat');
  const [sel, setSel] = React.useState(0);
  React.useEffect(() => { setSel(0); }, [draftKey]);
  const draft = STUDIO.drafts[draftKey];
  const sents = draft.sentences;
  const pts = sents.map((s, i) => [sents.length === 1 ? 0.5 : i / (sents.length - 1), s.sg]);
  const cur = sents[sel];
  const hue = 'var(--d-sem)';

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--paper)' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 14, padding: '13px 34px', background: 'color-mix(in srgb, var(--paper), transparent 8%)', borderBottom: '1px solid var(--line)', backdropFilter: 'blur(8px)' }}>
        <button onClick={() => go('map')} style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, padding: '7px 13px', borderRadius: 9, cursor: 'pointer', border: '1px solid var(--line-strong)', background: 'var(--surface)', color: 'var(--ink)' }}>← Constellation</button>
        <span className="san" style={{ fontSize: 13, color: 'var(--ink-2)' }}>The Studio · code a text</span>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 34px 60px' }}>
        <Eyebrow size={11} hue="var(--clay)">Applied · Semantics</Eyebrow>
        <h1 className="ser" style={{ margin: '12px 0 10px', fontSize: 46, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>Plot a paragraph’s semantic wave</h1>
        <p className="ser" style={{ margin: '0 0 26px', fontSize: 19, fontStyle: 'italic', color: 'var(--ink-2)', maxWidth: 660, lineHeight: 1.4 }}>{STUDIO.topic}. Toggle the two drafts and watch the profile change — then click any sentence to read its coding.</p>

        {/* draft toggle */}
        <div style={{ display: 'inline-flex', background: 'var(--surface-2)', borderRadius: 11, padding: 4, gap: 3, marginBottom: 26, border: '1px solid var(--line)' }}>
          {[['flat', 'Student draft'], ['waved', 'Reworked draft']].map(([k, l]) => (
            <button key={k} onClick={() => setDraftKey(k)} style={{ fontFamily: 'var(--sans)', fontSize: 13.5, fontWeight: 600, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: draftKey === k ? 'var(--surface)' : 'transparent', color: draftKey === k ? 'var(--ink)' : 'var(--ink-3)', boxShadow: draftKey === k ? '0 1px 3px rgba(0,0,0,.08)' : 'none' }}>{l}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: 36, alignItems: 'start' }}>
          {/* text */}
          <div>
            <Eyebrow size={10} style={{ marginBottom: 12, display: 'block' }}>The text — click a sentence</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sents.map((s, idx) => {
                const on = idx === sel;
                return (
                  <div key={idx} onClick={() => setSel(idx)}
                    style={{ position: 'relative', padding: '14px 16px 14px 46px', borderRadius: 12, cursor: 'pointer', background: on ? 'var(--surface)' : 'var(--surface-2)', border: `1px solid ${on ? hue : 'var(--line)'}`, boxShadow: on ? `0 6px 18px rgba(40,30,15,.06)` : 'none', transition: 'all .15s' }}>
                    <span className="mono" style={{ position: 'absolute', left: 16, top: 15, fontSize: 12, fontWeight: 600, color: on ? hue : 'var(--ink-3)' }}>{idx + 1}</span>
                    <span className="ser" style={{ fontSize: 16.5, lineHeight: 1.5, color: 'var(--ink)' }}>{s.t}</span>
                  </div>
                );
              })}
            </div>
            <p className="san" style={{ margin: '16px 0 0', fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.5 }}>Codings here are illustrative — in a live Studio, you’d segment and rate the text yourself, building the profile as you go.</p>
          </div>

          {/* analysis */}
          <aside style={{ position: 'sticky', top: 78, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ border: '1px solid var(--line)', borderRadius: 16, background: 'var(--surface)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px 4px' }}><Eyebrow size={9.5}>Semantic profile</Eyebrow></div>
              <div style={{ padding: '4px 18px 16px' }}><WaveChart pts={pts} w={400} h={180} hue={hue} active={sel} /></div>
              <div style={{ padding: '13px 18px', borderTop: '1px solid var(--line)', background: draftKey === 'flat' ? 'color-mix(in srgb, var(--clay), transparent 92%)' : 'color-mix(in srgb, var(--d-sem), transparent 92%)', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 15, lineHeight: 1, marginTop: 1 }}>{draftKey === 'flat' ? '⚠️' : '✓'}</span>
                <span className="san" style={{ fontSize: 13, fontWeight: 600, color: draftKey === 'flat' ? 'var(--clay)' : 'var(--d-sem)', lineHeight: 1.4 }}>{draft.verdict}</span>
              </div>
            </div>

            <div style={{ border: '1px solid var(--line)', borderRadius: 16, background: 'var(--surface)', padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: hue }}>Sentence {sel + 1}</span>
                <span className="san" style={{ fontSize: 12, color: 'var(--ink-3)' }}>coding</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Meter label="Semantic gravity" code="SG" v={cur.sg} hue={hue} />
                <Meter label="Semantic density" code="SD" v={cur.sd} hue="var(--d-den)" />
              </div>
              <p className="san" style={{ margin: '14px 0 0', fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-2)' }}>
                {cur.sg > 0.6 ? 'Concrete and context-bound — strong gravity, lighter density. This is an unpacking move.' : cur.sd > 0.7 ? 'Abstract and condensed — weak gravity, heavy density. Powerful, but it needs unpacking to land.' : 'A bridging move between the abstract and the concrete.'}
              </p>
            </div>

            <button onClick={() => go('dimension', 'semantics')} style={{ padding: '13px 16px', borderRadius: 13, border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', textAlign: 'left' }}>
              <div className="san" style={{ fontSize: 13.5, fontWeight: 700, color: hue }}>Revisit the theory →</div>
              <div className="san" style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>Semantic gravity, density & the wave</div>
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
