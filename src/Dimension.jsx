/* Dimension.jsx — deep reading view for one dimension: the idea (with
   inline citations), the LCT code plane, an interactive unpack/repack lab for
   Semantics, the EAP application, related dimensions and sources. */

import React from 'react';
import { DIMS, REFS } from './data.js';
import { Code, Eyebrow, Dot, RichText, WaveChart, CodePlane } from './components.jsx';

const UNPACK = [
  { move: 'Technical statement', code: 'SG−, SD+', sg: 0.15, t: 'Osmosis is the net movement of solvent across a semipermeable membrane down a concentration gradient.' },
  { move: 'Unpack the terms', code: 'SG weakening →', sg: 0.46, t: '“Semipermeable” just means the barrier lets the small solvent molecules through but holds the larger solute back.' },
  { move: 'Everyday example', code: 'SG+, SD−', sg: 0.88, t: 'Leave a raisin in water overnight and it swells up — water has moved into it to even things out.' },
  { move: 'Name the pattern', code: 'SG ↑', sg: 0.54, t: 'The water always drifts toward the side with more dissolved “stuff,” diluting it.' },
  { move: 'Repack to the concept', code: 'SG−, SD+', sg: 0.22, t: 'That drift toward balance, across a selective barrier, is exactly what “osmosis down a gradient” names.' },
];

function UnpackLab({ hue }) {
  const [stage, setStage] = React.useState(0);
  const pts = UNPACK.map((s, i) => [i / (UNPACK.length - 1), s.sg]);
  const cur = UNPACK[stage];
  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden', background: 'var(--surface)' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface-2)' }}>
        <span style={{ width: 8, height: 8, borderRadius: 8, background: hue }} />
        <span className="san" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.02em' }}>UNPACK / REPACK · try it</span>
        <span className="san" style={{ fontSize: 12, color: 'var(--ink-3)', marginLeft: 'auto' }}>Step through one teaching move at a time</span>
      </div>
      <div style={{ padding: '20px 22px 8px' }}>
        <WaveChart pts={pts} w={560} h={170} hue={hue} active={stage} />
      </div>
      <div style={{ padding: '6px 22px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Code hue={hue}>{cur.code}</Code>
          <span className="san" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{cur.move}</span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 'auto' }}>{stage + 1} / {UNPACK.length}</span>
        </div>
        <p className="ser" style={{ margin: '0 0 16px', fontSize: 18, lineHeight: 1.5, color: 'var(--ink)', minHeight: 56 }}>{cur.t}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setStage((s) => Math.max(0, s - 1))} disabled={stage === 0} style={navBtn(stage === 0)}>← Back</button>
          <div style={{ display: 'flex', gap: 6, flex: 1, justifyContent: 'center' }}>
            {UNPACK.map((_, i) => <button key={i} onClick={() => setStage(i)} style={{ width: i === stage ? 22 : 8, height: 8, borderRadius: 8, border: 'none', cursor: 'pointer', background: i === stage ? hue : 'var(--line-strong)', transition: 'all .2s' }} />)}
          </div>
          <button onClick={() => setStage((s) => Math.min(UNPACK.length - 1, s + 1))} disabled={stage === UNPACK.length - 1} style={navBtn(stage === UNPACK.length - 1, hue)}>Next →</button>
        </div>
      </div>
    </div>
  );
}
function navBtn(disabled, hue) {
  return { fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, padding: '8px 14px', borderRadius: 9, cursor: disabled ? 'default' : 'pointer', border: '1px solid var(--line-strong)', background: hue || 'var(--surface)', color: hue ? '#fff' : 'var(--ink)', opacity: disabled ? 0.4 : 1, borderColor: hue || 'var(--line-strong)' };
}

export function DimensionView({ dim, go }) {
  const i = DIMS.findIndex((d) => d.key === dim);
  const m = DIMS[i];
  const prev = DIMS[(i - 1 + DIMS.length) % DIMS.length], next = DIMS[(i + 1) % DIMS.length];
  const scrollRef = React.useRef(null);
  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [dim]);
  const sourceKeys = Array.from(new Set([...m.cites, 'Maton 2014']));

  return (
    <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', background: 'var(--paper)' }}>
      {/* sticky header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 14, padding: '13px 34px', background: 'color-mix(in srgb, var(--paper), transparent 8%)', borderBottom: '1px solid var(--line)', backdropFilter: 'blur(8px)' }}>
        <button onClick={() => go('map')} style={ghostBtn()}>← Constellation</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Dot hue={m.hue} /><span className="san" style={{ fontSize: 13, color: 'var(--ink-2)' }}>Dimension {m.n} · {m.name}</span>
        </div>
        <div style={{ flex: 1 }} />
        <button onClick={() => go('dimension', prev.key)} title={prev.name} style={iconBtn()}>‹</button>
        <button onClick={() => go('dimension', next.key)} title={next.name} style={iconBtn()}>›</button>
      </div>

      {/* hero */}
      <header style={{ padding: '46px 34px 30px', maxWidth: 1080, margin: '0 auto', width: '100%', borderBottom: `1px solid var(--line)` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28 }}>
          <div className="ser" style={{ fontSize: 92, fontWeight: 300, lineHeight: 0.8, color: m.hue, letterSpacing: '-0.03em' }}>{m.n}</div>
          <div style={{ paddingTop: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <Eyebrow size={11} hue={m.hue}>Dimension</Eyebrow>
              {m.emerging && <span className="san" style={{ fontSize: 10.5, fontStyle: 'italic', color: 'var(--ink-3)' }}>an emerging dimension</span>}
            </div>
            <h1 className="ser" style={{ margin: '0 0 12px', fontSize: 58, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 0.98 }}>{m.name}</h1>
            <p className="ser" style={{ margin: 0, fontSize: 23, fontStyle: 'italic', lineHeight: 1.35, color: 'var(--ink-2)', maxWidth: 620 }}>{m.question}</p>
          </div>
        </div>
      </header>

      {/* body */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 296px', gap: 48, maxWidth: 1080, margin: '0 auto', padding: '34px 34px 60px', alignItems: 'start' }}>
        {/* main column */}
        <article>
          <Eyebrow size={11} hue={m.hue} style={{ marginBottom: 14, display: 'block' }}>The idea</Eyebrow>
          {m.idea.map((p, k) => <RichText key={k} className="ser" style={{ margin: '0 0 18px', fontSize: 18.5, lineHeight: 1.62, color: 'var(--ink)' }}>{p}</RichText>)}

          {/* code plane or emerging note */}
          {m.plane ? (
            <section style={{ margin: '34px 0' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                <Eyebrow size={11} hue={m.hue}>The four codes</Eyebrow>
                <span className="san" style={{ fontSize: 12, color: 'var(--ink-3)' }}>hover a quadrant</span>
              </div>
              <p className="san" style={{ margin: '0 0 14px', fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>Strengthening or weakening each relation maps practices onto a Cartesian plane — LCT’s signature analytic device.</p>
              <div style={{ border: '1px solid var(--line)', borderRadius: 16, background: 'var(--surface)' }}>
                <CodePlane planeKey={m.plane} hue={m.hue} highlight={m.plane === 'specialization' ? 'tl' : m.plane === 'autonomy' ? 'tr' : 'tl'} />
              </div>
            </section>
          ) : (
            <section style={{ margin: '30px 0', padding: '18px 20px', border: '1px dashed var(--line-strong)', borderRadius: 14, background: 'var(--surface-2)' }}>
              <Eyebrow size={10} hue={m.hue} style={{ marginBottom: 8 }}>A developing device</Eyebrow>
              <div style={{ display: 'flex', gap: 12 }}>
                {m.concepts.map((c) => (
                  <div key={c.code} style={{ flex: 1, padding: '12px 14px', background: 'var(--surface)', borderRadius: 11, border: '1px solid var(--line)' }}>
                    <Code hue={m.hue}>{c.code}</Code>
                    <div className="ser" style={{ fontSize: 16, fontWeight: 500, margin: '6px 0 2px' }}>{c.label}</div>
                    <div className="san" style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.4 }}>{c.gloss}</div>
                  </div>
                ))}
              </div>
              <p className="san" style={{ margin: '12px 0 0', fontSize: 12.5, color: 'var(--ink-3)', fontStyle: 'italic' }}>The full four-code matrix for this dimension is still being elaborated in the literature.</p>
            </section>
          )}

          {/* interactive for semantics */}
          {m.wave && (
            <section style={{ margin: '34px 0' }}>
              <Eyebrow size={11} hue={m.hue} style={{ marginBottom: 14, display: 'block' }}>See it move</Eyebrow>
              <UnpackLab hue={m.hue} />
            </section>
          )}

          {/* EAP */}
          <section style={{ margin: '34px 0 0', padding: '22px 24px', borderRadius: 16, background: `color-mix(in srgb, ${m.hue}, transparent 93%)`, borderLeft: `3px solid ${m.hue}` }}>
            <Eyebrow size={11} hue={m.hue} style={{ marginBottom: 10 }}>For the EAP classroom</Eyebrow>
            <p className="ser" style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: 'var(--ink)' }}>{m.eap}</p>
          </section>

          {/* dimension nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, marginTop: 40 }}>
            <button onClick={() => go('dimension', prev.key)} style={pnBtn()}><span className="san" style={{ fontSize: 11, color: 'var(--ink-3)' }}>← Previous</span><span className="ser" style={{ fontSize: 17 }}>{prev.name}</span></button>
            <button onClick={() => go('dimension', next.key)} style={{ ...pnBtn(), textAlign: 'right', alignItems: 'flex-end' }}><span className="san" style={{ fontSize: 11, color: 'var(--ink-3)' }}>Next →</span><span className="ser" style={{ fontSize: 17 }}>{next.name}</span></button>
          </div>
        </article>

        {/* right rail */}
        <aside style={{ position: 'sticky', top: 78, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div>
            <Eyebrow size={10} style={{ marginBottom: 11 }}>Organising concepts</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {m.concepts.map((c) => (
                <div key={c.code} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Code hue={m.hue}>{c.code}</Code>
                  <div><div className="san" style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</div><div className="san" style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 1, lineHeight: 1.4 }}>{c.gloss}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--line)' }} />

          <div>
            <Eyebrow size={10} style={{ marginBottom: 11 }}>Travels with</Eyebrow>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {m.related.map((rk) => { const r = DIMS.find((d) => d.key === rk); return <button key={rk} onClick={() => go('dimension', rk)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 11px', borderRadius: 20, border: '1px solid var(--line-strong)', background: 'var(--surface)', cursor: 'pointer' }}><Dot hue={r.hue} size={7} /><span className="san" style={{ fontSize: 12.5, fontWeight: 500 }}>{r.name}</span></button>; })}
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--line)' }} />

          <div>
            <Eyebrow size={10} style={{ marginBottom: 11 }}>Sources</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {sourceKeys.map((k) => (
                <p key={k} id={'ref-' + k} className="ser" style={{ margin: 0, fontSize: 12.5, lineHeight: 1.45, color: 'var(--ink-2)', paddingLeft: 12, borderLeft: `2px solid ${m.hue}`, borderRadius: 2 }}>{REFS[k]}</p>
              ))}
            </div>
          </div>

          <button onClick={() => go('studio')} style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '14px 16px', borderRadius: 13, border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', textAlign: 'left' }}>
            <span className="san" style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--clay)' }}>Take it to the Studio →</span>
            <span className="san" style={{ fontSize: 12, color: 'var(--ink-2)' }}>Code a real text’s semantic profile</span>
          </button>
        </aside>
      </div>
    </div>
  );
}

function ghostBtn() { return { fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, padding: '7px 13px', borderRadius: 9, cursor: 'pointer', border: '1px solid var(--line-strong)', background: 'var(--surface)', color: 'var(--ink)' }; }
function iconBtn() { return { width: 32, height: 32, borderRadius: 9, border: '1px solid var(--line-strong)', background: 'var(--surface)', cursor: 'pointer', fontSize: 18, color: 'var(--ink-2)', lineHeight: 1 }; }
function pnBtn() { return { display: 'flex', flexDirection: 'column', gap: 3, padding: '14px 18px', borderRadius: 13, border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', flex: 1, alignItems: 'flex-start' }; }
