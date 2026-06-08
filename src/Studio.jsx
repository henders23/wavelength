/* Studio.jsx — applied tool: code a text's semantic profile. Toggle between
   two worked sample drafts, or switch to "Your text" to paste a paragraph,
   segment it into sentences, and rate each one's semantic gravity / density —
   building the profile yourself and watching the wave redraw. */

import React from 'react';
import { STUDIO } from './data.js';
import { Eyebrow, WaveChart } from './components.jsx';

/* Read-only meter for the worked samples. */
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

/* Editable slider for coding your own text. */
function Slider({ label, code, v, hue, onChange }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span className="san" style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ink-2)' }}>{label} <span className="mono" style={{ color: hue }}>{code}</span></span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{Math.round(v * 100)}</span>
      </div>
      <input type="range" min="0" max="100" value={Math.round(v * 100)} onChange={(e) => onChange(Number(e.target.value) / 100)}
        style={{ width: '100%', accentColor: hue, cursor: 'pointer', margin: 0 }} />
    </div>
  );
}

/* Split a paragraph into sentences. Keeps terminal punctuation; collapses
   whitespace. Good enough for coding practice — not a linguistics engine. */
function segment(text) {
  return (text.match(/[^.!?]+[.!?]+["”’)]*|\S[^.!?]*$/g) || [])
    .map((s) => s.trim())
    .filter(Boolean);
}

const OWN_KEY = 'wl-studio-own';

export function StudioView({ go }) {
  const [mode, setMode] = React.useState('flat'); // 'flat' | 'waved' | 'own'
  const [sel, setSel] = React.useState(0);

  // Own-text state, persisted across reloads.
  const [ownText, setOwnText] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(OWN_KEY) || 'null')?.text || ''; } catch { return ''; }
  });
  const [ownSents, setOwnSents] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(OWN_KEY) || 'null')?.sents || []; } catch { return []; }
  });
  const [editing, setEditing] = React.useState(() => ownSents.length === 0);

  React.useEffect(() => { setSel(0); }, [mode]);
  React.useEffect(() => {
    localStorage.setItem(OWN_KEY, JSON.stringify({ text: ownText, sents: ownSents }));
  }, [ownText, ownSents]);

  const plot = () => {
    const parts = segment(ownText);
    // preserve prior ratings by position where the sentence text is unchanged
    const next = parts.map((t, i) => {
      const prev = ownSents[i];
      return { t, sg: prev && prev.t === t ? prev.sg : 0.5, sd: prev && prev.t === t ? prev.sd : 0.5 };
    });
    setOwnSents(next);
    setSel(0);
    setEditing(false);
  };
  const rate = (idx, field, val) => setOwnSents((ss) => ss.map((s, i) => (i === idx ? { ...s, [field]: val } : s)));

  const isOwn = mode === 'own';
  const sample = STUDIO.drafts[mode === 'own' ? 'flat' : mode];
  const sents = isOwn ? ownSents : sample.sentences;
  const hasData = sents.length > 0;
  const pts = sents.map((s, i) => [sents.length === 1 ? 0.5 : i / (sents.length - 1), s.sg]);
  const cur = sents[Math.min(sel, Math.max(0, sents.length - 1))];
  const hue = 'var(--d-sem)';

  // Own-text verdict: low SG range ⇒ flatline; otherwise a wave.
  const sgVals = sents.map((s) => s.sg);
  const sgRange = hasData ? Math.max(...sgVals) - Math.min(...sgVals) : 0;
  const ownFlat = sgRange < 0.3;
  const verdict = isOwn
    ? (!hasData ? '' : ownFlat ? 'Semantic flatline — the profile barely moves; try unpacking to a concrete example.' : 'A semantic wave — the profile rises and falls across the paragraph.')
    : sample.verdict;
  const warn = isOwn ? ownFlat : mode === 'flat';

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--paper)' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 14, padding: '13px 34px', background: 'color-mix(in srgb, var(--paper), transparent 8%)', borderBottom: '1px solid var(--line)', backdropFilter: 'blur(8px)' }}>
        <button onClick={() => go('map')} style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, padding: '7px 13px', borderRadius: 9, cursor: 'pointer', border: '1px solid var(--line-strong)', background: 'var(--surface)', color: 'var(--ink)' }}>← Constellation</button>
        <span className="san" style={{ fontSize: 13, color: 'var(--ink-2)' }}>The Studio · code a text</span>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 34px 60px' }}>
        <Eyebrow size={11} hue="var(--clay)">Applied · Semantics</Eyebrow>
        <h1 className="ser" style={{ margin: '12px 0 10px', fontSize: 46, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>Plot a paragraph’s semantic wave</h1>
        <p className="ser" style={{ margin: '0 0 26px', fontSize: 19, fontStyle: 'italic', color: 'var(--ink-2)', maxWidth: 660, lineHeight: 1.4 }}>Study the two worked drafts, or switch to <em>Your text</em> to code a paragraph of your own — rate each sentence and watch the profile take shape.</p>

        {/* mode toggle */}
        <div style={{ display: 'inline-flex', background: 'var(--surface-2)', borderRadius: 11, padding: 4, gap: 3, marginBottom: 26, border: '1px solid var(--line)' }}>
          {[['flat', 'Student draft'], ['waved', 'Reworked draft'], ['own', 'Your text']].map(([k, l]) => (
            <button key={k} onClick={() => setMode(k)} style={{ fontFamily: 'var(--sans)', fontSize: 13.5, fontWeight: 600, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: mode === k ? 'var(--surface)' : 'transparent', color: mode === k ? 'var(--ink)' : 'var(--ink-3)', boxShadow: mode === k ? '0 1px 3px rgba(0,0,0,.08)' : 'none' }}>{l}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: 36, alignItems: 'start' }}>
          {/* text / editor */}
          <div>
            {isOwn && editing ? (
              <div>
                <Eyebrow size={10} style={{ marginBottom: 12, display: 'block' }}>Paste a paragraph to code</Eyebrow>
                <textarea value={ownText} onChange={(e) => setOwnText(e.target.value)} placeholder="Paste or type a paragraph here. It’ll be split into sentences you can rate one by one…"
                  style={{ width: '100%', minHeight: 200, padding: '16px 18px', borderRadius: 12, border: '1px solid var(--line-strong)', background: 'var(--surface)', fontFamily: 'var(--serif)', fontSize: 16.5, lineHeight: 1.5, color: 'var(--ink)', resize: 'vertical' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
                  <button onClick={plot} disabled={!ownText.trim()} style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, padding: '11px 20px', borderRadius: 10, border: 'none', cursor: ownText.trim() ? 'pointer' : 'default', background: hue, color: '#fff', opacity: ownText.trim() ? 1 : 0.4 }}>Segment & plot →</button>
                  <span className="san" style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{segment(ownText).length} sentence{segment(ownText).length === 1 ? '' : 's'} detected</span>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <Eyebrow size={10}>{isOwn ? 'Your text — click a sentence to code it' : 'The text — click a sentence'}</Eyebrow>
                  {isOwn && <button onClick={() => setEditing(true)} style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600, padding: '5px 11px', borderRadius: 8, border: '1px solid var(--line-strong)', background: 'var(--surface)', cursor: 'pointer', color: 'var(--ink-2)' }}>Edit text</button>}
                </div>
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
                <p className="san" style={{ margin: '16px 0 0', fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.5 }}>
                  {isOwn
                    ? 'Rate each sentence’s gravity and density on the right. There are no “correct” numbers — coding is a judgement you build and defend.'
                    : 'Codings here are illustrative. Switch to Your text to segment and rate a paragraph of your own.'}
                </p>
              </>
            )}
          </div>

          {/* analysis */}
          <aside style={{ position: 'sticky', top: 78, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ border: '1px solid var(--line)', borderRadius: 16, background: 'var(--surface)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px 4px' }}><Eyebrow size={9.5}>Semantic profile</Eyebrow></div>
              <div style={{ padding: '4px 18px 16px' }}>
                {hasData
                  ? <WaveChart pts={pts} w={400} h={180} hue={hue} active={sel} />
                  : <p className="san" style={{ margin: '14px 0 18px', fontSize: 13, color: 'var(--ink-3)', textAlign: 'center', lineHeight: 1.5 }}>Paste a paragraph and segment it to see its profile.</p>}
              </div>
              {hasData && verdict && (
                <div style={{ padding: '13px 18px', borderTop: '1px solid var(--line)', background: warn ? 'color-mix(in srgb, var(--clay), transparent 92%)' : 'color-mix(in srgb, var(--d-sem), transparent 92%)', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 15, lineHeight: 1, marginTop: 1 }}>{warn ? '⚠️' : '✓'}</span>
                  <span className="san" style={{ fontSize: 13, fontWeight: 600, color: warn ? 'var(--clay)' : 'var(--d-sem)', lineHeight: 1.4 }}>{verdict}</span>
                </div>
              )}
            </div>

            {hasData && cur && (
              <div style={{ border: '1px solid var(--line)', borderRadius: 16, background: 'var(--surface)', padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: hue }}>Sentence {sel + 1}</span>
                  <span className="san" style={{ fontSize: 12, color: 'var(--ink-3)' }}>{isOwn ? 'rate it' : 'coding'}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {isOwn ? (
                    <>
                      <Slider label="Semantic gravity" code="SG" v={cur.sg} hue={hue} onChange={(val) => rate(sel, 'sg', val)} />
                      <Slider label="Semantic density" code="SD" v={cur.sd} hue="var(--d-den)" onChange={(val) => rate(sel, 'sd', val)} />
                    </>
                  ) : (
                    <>
                      <Meter label="Semantic gravity" code="SG" v={cur.sg} hue={hue} />
                      <Meter label="Semantic density" code="SD" v={cur.sd} hue="var(--d-den)" />
                    </>
                  )}
                </div>
                <p className="san" style={{ margin: '14px 0 0', fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-2)' }}>
                  {cur.sg > 0.6 ? 'Concrete and context-bound — strong gravity, lighter density. This is an unpacking move.' : cur.sd > 0.7 ? 'Abstract and condensed — weak gravity, heavy density. Powerful, but it needs unpacking to land.' : 'A bridging move between the abstract and the concrete.'}
                </p>
              </div>
            )}

            <button onClick={() => go('dimension', 'semantics')} style={{ padding: '13px 16px', borderRadius: 13, border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', textAlign: 'left' }}>
              <div className="san" style={{ fontSize: 13.5, fontWeight: 700, color: hue }}>Revisit the theory →</div>
              <div className="san" style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>Semantic gravity, density &amp; the wave</div>
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
