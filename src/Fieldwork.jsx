/* Fieldwork.jsx — designing EAP materials for specific disciplines: the
   specificity debate framed through LCT, then worked discipline profiles.
   Each profile reuses the Specialization code plane (highlighting the
   discipline's code) and the WaveChart (sketching its genres' semantic
   signatures). */

import React from 'react';
import { FIELDWORK, REFS } from './data.js';
import { Eyebrow, Dot, RichText, WaveChart, CodePlane, splitCiteKeys, useNarrow } from './components.jsx';

export function FieldworkView({ go }) {
  const narrow = useNarrow();
  const [sel, setSel] = React.useState(FIELDWORK.disciplines[0].key);
  const d = FIELDWORK.disciplines.find((x) => x.key === sel);

  // every source cited on the page as currently shown (intro + selected profile)
  const sourceKeys = Array.from(new Set([
    ...FIELDWORK.intro.flatMap((s) => splitCiteKeys(s.t)),
    ...[...d.signature, d.grounding, d.clash,
      ...d.genres.map((g) => g.note),
      ...d.design.map((c) => c.how),
      ...d.annotated.segments.map((s) => s.note)].flatMap(splitCiteKeys),
  ]));

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--paper)' }}>
      {/* sticky header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 14, padding: '13px 34px', background: 'color-mix(in srgb, var(--paper), transparent 8%)', borderBottom: '1px solid var(--line)', backdropFilter: 'blur(8px)' }}>
        <button onClick={() => go('map')} style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, padding: '7px 13px', borderRadius: 9, cursor: 'pointer', border: '1px solid var(--line-strong)', background: 'var(--surface)', color: 'var(--ink)' }}>← Constellation</button>
        <span className="san" style={{ fontSize: 13, color: 'var(--ink-2)' }}>Fieldwork · designing for the disciplines</span>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: narrow ? '34px 18px 56px' : '52px 34px 70px' }}>
        <Eyebrow size={11} hue="var(--clay)">Fieldwork</Eyebrow>
        <h1 className="ser" style={{ margin: '14px 0 16px', fontSize: narrow ? 38 : 56, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1 }}>Designing for the disciplines</h1>
        <p className="ser" style={{ margin: 0, fontSize: 21, fontStyle: 'italic', lineHeight: 1.4, color: 'var(--ink-2)' }}>{FIELDWORK.lede}</p>

        <div style={{ height: 1, background: 'var(--line)', margin: '34px 0' }} />

        {/* the specificity debate, through LCT */}
        {FIELDWORK.intro.map((s, k) => (
          <section key={k} style={{ marginBottom: 32, display: 'grid', gridTemplateColumns: '34px 1fr', gap: 18 }}>
            <div className="ser" style={{ fontSize: 22, fontWeight: 400, color: 'var(--clay)', lineHeight: 1.2 }}>{String(k + 1).padStart(2, '0')}</div>
            <div>
              <h2 className="ser" style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.1 }}>{s.h}</h2>
              <RichText className="ser" style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: 'var(--ink)' }}>{s.t}</RichText>
            </div>
          </section>
        ))}

        <div style={{ height: 1, background: 'var(--line)', margin: '10px 0 30px' }} />

        {/* discipline selector */}
        <Eyebrow size={11} style={{ marginBottom: 6, display: 'block' }}>The profiles</Eyebrow>
        <p className="san" style={{ margin: '0 0 16px', fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>Pick a discipline. Each profile names the code its writing rewards, sketches its flagship genres’ semantic signatures, annotates an extract, and draws out the materials-design moves.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 30 }}>
          {FIELDWORK.disciplines.map((x) => {
            const on = x.key === sel;
            return (
              <button key={x.key} onClick={() => setSel(x.key)}
                style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 22, cursor: 'pointer', border: `1px solid ${on ? x.hue : 'var(--line-strong)'}`, background: on ? `color-mix(in srgb, ${x.hue}, transparent 90%)` : 'var(--surface)', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: on ? 'var(--ink)' : 'var(--ink-2)' }}>
                <Dot hue={x.hue} size={8} />{x.name}
              </button>
            );
          })}
        </div>

        {/* selected profile */}
        <article key={d.key}>
          <header style={{ marginBottom: 22 }}>
            <h2 className="ser" style={{ margin: '0 0 8px', fontSize: narrow ? 30 : 38, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05 }}>{d.name}</h2>
            <p className="ser" style={{ margin: 0, fontSize: 18, fontStyle: 'italic', color: 'var(--ink-2)', lineHeight: 1.4 }}>{d.tagline}</p>
          </header>

          {/* code signature + plane */}
          <section style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'minmax(0,1fr) 340px', gap: narrow ? 20 : 30, alignItems: 'start', marginBottom: 34 }}>
            <div>
              <Eyebrow size={11} hue={d.hue} style={{ marginBottom: 12, display: 'block' }}>Code signature · {d.codeName}</Eyebrow>
              {d.signature.map((p, k) => <RichText key={k} className="ser" style={{ margin: '0 0 16px', fontSize: 17.5, lineHeight: 1.6, color: 'var(--ink)' }}>{p}</RichText>)}
              <RichText className="san" style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink-3)', fontStyle: 'italic', padding: '10px 12px', borderRadius: 10, background: 'var(--surface-2)', border: '1px dashed var(--line-strong)' }}>{d.grounding}</RichText>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: 16, background: 'var(--surface)' }}>
              <CodePlane planeKey="specialization" hue={d.hue} highlight={d.codeQuad} />
            </div>
          </section>

          {/* genre signatures */}
          <section style={{ marginBottom: 34 }}>
            <Eyebrow size={11} hue={d.hue} style={{ marginBottom: 14, display: 'block' }}>Genre signatures</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : '1fr 1fr', gap: 14 }}>
              {d.genres.map((g) => (
                <figure key={g.name} style={{ margin: 0, border: '1px solid var(--line)', borderRadius: 16, background: 'var(--surface)', overflow: 'hidden' }}>
                  <div style={{ padding: '14px 18px 0' }}>
                    <span className="san" style={{ fontSize: 13, fontWeight: 700, color: d.hue }}>{g.name}</span>
                  </div>
                  <div style={{ padding: '2px 14px 0' }}>
                    <WaveChart pts={g.pts} w={380} h={150} hue={d.hue} />
                  </div>
                  <figcaption className="san" style={{ padding: '10px 18px 16px', fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink-2)' }}>
                    <RichText style={{ margin: 0 }}>{g.note}</RichText>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* annotated extract */}
          <section style={{ marginBottom: 34 }}>
            <Eyebrow size={11} hue={d.hue} style={{ marginBottom: 10, display: 'block' }}>Annotated extract</Eyebrow>
            <p className="san" style={{ margin: '0 0 16px', fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>{d.annotated.lede}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {d.annotated.segments.map((seg, k) => (
                <div key={k} style={{ padding: '14px 18px', borderRadius: 12, borderLeft: `3px solid ${d.hue}`, background: 'var(--surface)', border: '1px solid var(--line)' }}>
                  <p className="ser" style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: 'var(--ink)' }}>{seg.t}</p>
                  <div className="san" style={{ display: 'flex', gap: 8, marginTop: 9, fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)' }}>
                    <span style={{ color: d.hue, flex: '0 0 auto', fontWeight: 700 }}>↳</span>
                    <RichText style={{ margin: 0 }}>{seg.note}</RichText>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* materials-design moves */}
          <section style={{ marginBottom: 30 }}>
            <Eyebrow size={11} hue={d.hue} style={{ marginBottom: 6, display: 'block' }}>Designing the materials</Eyebrow>
            <p className="san" style={{ margin: '0 0 14px', fontSize: 12.5, color: 'var(--ink-3)' }}>What this profile means when you sit down to write the unit.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {d.design.map((c, k) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : '190px 1fr', gap: narrow ? 6 : 16, alignItems: 'start', padding: '14px 16px', borderRadius: 12, border: '1px solid var(--line)', background: 'var(--surface)' }}>
                  <span className="san" style={{ fontSize: 12.5, fontWeight: 700, color: d.hue, paddingTop: 2 }}>{c.name}</span>
                  <RichText className="san" style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--ink)' }}>{c.how}</RichText>
                </div>
              ))}
            </div>
          </section>

          {/* the clash */}
          <section style={{ marginBottom: 36, padding: '20px 24px', borderRadius: 16, background: `color-mix(in srgb, ${d.hue}, transparent 93%)`, borderLeft: `3px solid ${d.hue}` }}>
            <Eyebrow size={11} hue={d.hue} style={{ marginBottom: 10 }}>Watch for the clash</Eyebrow>
            <RichText className="ser" style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: 'var(--ink)' }}>{d.clash}</RichText>
          </section>
        </article>

        <div style={{ height: 1, background: 'var(--line)', margin: '6px 0 26px' }} />

        {/* sources for everything currently on the page */}
        <Eyebrow size={11} style={{ marginBottom: 14, display: 'block' }}>Sources</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          {sourceKeys.map((k) => <RichText key={k} id={'ref-' + k} className="ser" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-2)', paddingLeft: 14, borderLeft: '2px solid var(--clay)' }}>{REFS[k]}</RichText>)}
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button onClick={() => go('studio')} style={{ flex: '1 1 220px', padding: '18px 22px', borderRadius: 14, border: 'none', background: 'var(--ink)', color: 'var(--paper)', cursor: 'pointer', textAlign: 'left' }}>
            <div className="san" style={{ fontSize: 11.5, opacity: .7, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 4 }}>Put it to work</div>
            <div className="ser" style={{ fontSize: 22, fontWeight: 500 }}>Code a text in the Studio →</div>
          </button>
          <button onClick={() => go('library')} style={{ flex: '1 1 220px', padding: '18px 22px', borderRadius: 14, border: '1px solid var(--line-strong)', background: 'var(--surface)', color: 'var(--ink)', cursor: 'pointer', textAlign: 'left' }}>
            <div className="san" style={{ fontSize: 11.5, color: 'var(--ink-3)', letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 4 }}>Read further</div>
            <div className="ser" style={{ fontSize: 22, fontWeight: 500 }}>Browse the Library →</div>
          </button>
        </div>
      </div>
    </div>
  );
}
