/* MaterialsLab.jsx — the applied materials-design workflow: (1) profile what
   the target task rewards (a guided "code the brief" diagnostic that lands on
   the Specialization plane), (2) plan the unit's semantic wave stage by stage,
   (3) audit the draft materials against the framework. Everything persists
   across reloads, and the finished plan can be copied out as text. */

import React from 'react';
import { LAB, REFS } from './data.js';
import { Eyebrow, RichText, WaveChart, CodePlane, splitCiteKeys, useNarrow } from './components.jsx';

const LAB_KEY = 'wl-lab';

function load() {
  try { return JSON.parse(localStorage.getItem(LAB_KEY) || 'null') || {}; } catch { return {}; }
}

function StepHeader({ n, title, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
      <span className="ser" style={{ fontSize: 30, fontWeight: 400, color: 'var(--clay)', lineHeight: 1 }}>{n}</span>
      <div>
        <h2 className="ser" style={{ margin: 0, fontSize: 26, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.15 }}>{title}</h2>
        {sub && <p className="san" style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-2)' }}>{sub}</p>}
      </div>
    </div>
  );
}

export function MaterialsLabView({ go }) {
  const narrow = useNarrow();
  const saved = React.useRef(load()).current;

  const [title, setTitle] = React.useState(saved.title || '');
  const [answers, setAnswers] = React.useState(saved.answers || LAB.profile.questions.map(() => null));
  const [stages, setStages] = React.useState(saved.stages || LAB.waveplan.defaultStages.map(({ name, sg }) => ({ name, sg })));
  const [checks, setChecks] = React.useState(saved.checks || LAB.checklist.items.map(() => false));
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem(LAB_KEY, JSON.stringify({ title, answers, stages, checks }));
  }, [title, answers, stages, checks]);

  /* ── step 1: the code verdict ─────────────────────────────── */
  const answered = answers.every((a) => a !== null);
  let quad = null, er = 0, sr = 0;
  if (answered) {
    const opts = answers.map((a, i) => LAB.profile.questions[i].options[a]);
    er = opts.reduce((s, o) => s + o.er, 0) / opts.length;
    sr = opts.reduce((s, o) => s + o.sr, 0) / opts.length;
    quad = (er >= 0.5 ? 't' : 'b') + (sr >= 0.5 ? 'r' : 'l');
  }
  const verdict = quad ? LAB.profile.verdicts[quad] : null;

  /* ── step 2: the wave verdict ─────────────────────────────── */
  const pts = stages.map((s, i) => [stages.length === 1 ? 0.5 : i / (stages.length - 1), s.sg]);
  const sgVals = stages.map((s) => s.sg);
  const range = stages.length ? Math.max(...sgVals) - Math.min(...sgVals) : 0;
  const flat = range < 0.3;
  const noReturn = !flat && stages.length > 1 && stages[stages.length - 1].sg > 0.6;
  const waveMsg = flat ? LAB.waveplan.flatline : noReturn ? LAB.waveplan.noReturn : LAB.waveplan.waving;
  const waveWarn = flat || noReturn;

  const setStage = (i, patch) => setStages((ss) => ss.map((s, k) => (k === i ? { ...s, ...patch } : s)));
  const addStage = () => setStages((ss) => [...ss, { name: `Stage ${ss.length + 1}`, sg: 0.5 }]);
  const removeStage = (i) => setStages((ss) => ss.filter((_, k) => k !== i));

  /* ── copy the plan out ────────────────────────────────────── */
  const copyPlan = () => {
    const lines = [
      `# Unit plan — ${title || 'untitled unit'}`,
      '',
      `Target code: ${verdict ? verdict.code : 'not yet profiled'}`,
      verdict ? `Design note: ${verdict.advice}` : '',
      '',
      '## Semantic wave plan',
      ...stages.map((s, i) => `${i + 1}. ${s.name} — gravity ${Math.round(s.sg * 100)}/100 ${s.sg > 0.6 ? '(concrete)' : s.sg < 0.4 ? '(abstract)' : '(bridging)'}`),
      `Shape check: ${waveMsg}`,
      '',
      '## Audit checklist',
      ...LAB.checklist.items.map((c, i) => `[${checks[i] ? 'x' : ' '}] ${c.item}`),
      '',
      '(Designed with Wavelength — Legitimation Code Theory for EAP practitioners.)',
    ].filter((l) => l !== null);
    const text = lines.join('\n');
    try {
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
      else { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
      setCopied(true); setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable — the plan is still on screen */ }
  };

  const sourceKeys = Array.from(new Set([LAB.lede, LAB.waveplan.intro].flatMap(splitCiteKeys)));

  const card = { border: '1px solid var(--line)', borderRadius: 16, background: 'var(--surface)' };

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--paper)' }}>
      {/* sticky header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 14, padding: '13px 34px', background: 'color-mix(in srgb, var(--paper), transparent 8%)', borderBottom: '1px solid var(--line)', backdropFilter: 'blur(8px)' }}>
        <button onClick={() => go('map')} style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, padding: '7px 13px', borderRadius: 9, cursor: 'pointer', border: '1px solid var(--line-strong)', background: 'var(--surface)', color: 'var(--ink)' }}>← Constellation</button>
        <span className="san" style={{ fontSize: 13, color: 'var(--ink-2)' }}>The Materials Lab · design a unit</span>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: narrow ? '34px 18px 56px' : '52px 34px 70px' }}>
        <Eyebrow size={11} hue="var(--clay)">Applied · materials design</Eyebrow>
        <h1 className="ser" style={{ margin: '14px 0 16px', fontSize: narrow ? 36 : 52, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1 }}>The Materials Lab</h1>
        <RichText className="ser" style={{ margin: '0 0 22px', fontSize: 20, fontStyle: 'italic', lineHeight: 1.45, color: 'var(--ink-2)' }}>{LAB.lede}</RichText>

        <label className="san" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6 }}>What are you designing?</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Week 4 — discussion sections, for first-year pharmacology"
          style={{ width: '100%', padding: '12px 16px', borderRadius: 11, border: '1px solid var(--line-strong)', background: 'var(--surface)', fontFamily: 'var(--serif)', fontSize: 16.5, color: 'var(--ink)' }} />

        {/* ── Step 1 · profile the target ─────────────────────── */}
        <section style={{ margin: '42px 0 0' }}>
          <StepHeader n="01" title="Profile the target" sub={LAB.profile.intro} />
          <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'minmax(0,1fr) 320px', gap: narrow ? 18 : 28, alignItems: 'start', marginTop: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {LAB.profile.questions.map((q, qi) => (
                <div key={qi} style={{ ...card, padding: '15px 17px' }}>
                  <p className="ser" style={{ margin: '0 0 10px', fontSize: 16.5, lineHeight: 1.45, color: 'var(--ink)' }}>{q.q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {q.options.map((o, oi) => {
                      const on = answers[qi] === oi;
                      return (
                        <button key={oi} onClick={() => setAnswers((as) => as.map((a, k) => (k === qi ? oi : a)))}
                          style={{ textAlign: 'left', fontFamily: 'var(--sans)', fontSize: 13.5, fontWeight: on ? 600 : 400, padding: '9px 13px', borderRadius: 9, cursor: 'pointer', border: `1px solid ${on ? 'var(--clay)' : 'var(--line)'}`, background: on ? 'color-mix(in srgb, var(--clay), transparent 92%)' : 'var(--surface-2)', color: 'var(--ink)' }}>
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <aside style={{ position: narrow ? 'static' : 'sticky', top: 78 }}>
              <div style={card}>
                <div style={{ padding: '14px 18px 4px' }}><Eyebrow size={9.5}>The task’s code</Eyebrow></div>
                {verdict ? (
                  <>
                    <CodePlane planeKey="specialization" hue="var(--clay)" highlight={quad} />
                    <div style={{ padding: '14px 18px 16px', borderTop: '1px solid var(--line)' }}>
                      <p className="san" style={{ margin: '0 0 7px', fontSize: 13, fontWeight: 700, color: 'var(--clay)' }}>{verdict.code}</p>
                      <p className="san" style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink-2)' }}>{verdict.advice}</p>
                    </div>
                  </>
                ) : (
                  <p className="san" style={{ margin: 0, padding: '10px 18px 20px', fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>Answer all four questions and the task lands on the Specialization plane, with a design note for that code.</p>
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* ── Step 2 · plan the wave ──────────────────────────── */}
        <section style={{ margin: '46px 0 0' }}>
          <StepHeader n="02" title="Plan the wave" />
          <RichText className="san" style={{ margin: '0 0 16px', fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-2)' }}>{LAB.waveplan.intro}</RichText>
          <div style={{ ...card, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px 4px' }}>
              <WaveChart pts={pts} w={760} h={190} hue="var(--clay)" />
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--line)', background: waveWarn ? 'color-mix(in srgb, var(--clay), transparent 92%)' : 'color-mix(in srgb, var(--d-sem), transparent 92%)', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 15, lineHeight: 1, marginTop: 1 }}>{waveWarn ? '⚠️' : '✓'}</span>
              <span className="san" style={{ fontSize: 13, fontWeight: 600, color: waveWarn ? 'var(--clay)' : 'var(--d-sem)', lineHeight: 1.45 }}>{waveMsg}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            {stages.map((s, i) => {
              const tip = LAB.waveplan.defaultStages.find((d) => d.name === s.name)?.tip;
              return (
                <div key={i} style={{ ...card, padding: '13px 16px', display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'minmax(0,1.3fr) 1fr auto', gap: narrow ? 10 : 18, alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <span className="mono" style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--clay)' }}>{i + 1}</span>
                      <input value={s.name} onChange={(e) => setStage(i, { name: e.target.value })} aria-label={`Stage ${i + 1} name`}
                        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, color: 'var(--ink)', padding: 0 }} />
                    </div>
                    {tip && <p className="san" style={{ margin: '5px 0 0 21px', fontSize: 12, lineHeight: 1.45, color: 'var(--ink-3)' }}>{tip}</p>}
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span className="san" style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>abstract</span>
                      <span className="san" style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>concrete</span>
                    </div>
                    <input type="range" min="0" max="100" value={Math.round(s.sg * 100)} onChange={(e) => setStage(i, { sg: Number(e.target.value) / 100 })}
                      aria-label={`Stage ${i + 1} gravity`} style={{ width: '100%', accentColor: 'var(--clay)', cursor: 'pointer', margin: 0 }} />
                  </div>
                  <button onClick={() => removeStage(i)} disabled={stages.length <= 2} aria-label={`Remove stage ${i + 1}`} title="Remove stage"
                    style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid var(--line)', background: 'var(--surface-2)', cursor: stages.length <= 2 ? 'default' : 'pointer', color: 'var(--ink-3)', fontSize: 14, lineHeight: 1, opacity: stages.length <= 2 ? 0.35 : 1 }}>×</button>
                </div>
              );
            })}
          </div>
          <button onClick={addStage} style={{ marginTop: 12, fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, padding: '9px 16px', borderRadius: 10, cursor: 'pointer', border: '1px dashed var(--line-strong)', background: 'var(--surface)', color: 'var(--ink-2)' }}>+ Add a stage</button>
        </section>

        {/* ── Step 3 · audit the draft ────────────────────────── */}
        <section style={{ margin: '46px 0 0' }}>
          <StepHeader n="03" title="Audit the draft" sub={LAB.checklist.intro} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
            {LAB.checklist.items.map((c, i) => (
              <label key={i} style={{ ...card, padding: '12px 15px', display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks[i]} onChange={() => setChecks((cs) => cs.map((v, k) => (k === i ? !v : v)))}
                  style={{ marginTop: 3, accentColor: 'var(--clay)', width: 15, height: 15, cursor: 'pointer' }} />
                <span className="san" style={{ fontSize: 14, lineHeight: 1.55, color: checks[i] ? 'var(--ink-3)' : 'var(--ink)', textDecoration: checks[i] ? 'line-through' : 'none' }}>{c.item}</span>
                {c.dim && <button onClick={(e) => { e.preventDefault(); go('dimension', c.dim); }}
                  style={{ marginLeft: 'auto', flex: '0 0 auto', fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 14, border: '1px solid var(--line)', background: 'var(--surface-2)', cursor: 'pointer', color: 'var(--ink-2)' }}>{c.dim}</button>}
              </label>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
            <button onClick={copyPlan} style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, padding: '12px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'var(--clay)', color: '#fff' }}>
              {copied ? '✓ Copied' : 'Copy the plan as text'}
            </button>
            <span className="san" style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>Profile, wave plan and checklist — ready to paste into your scheme of work.</span>
          </div>
        </section>

        <div style={{ height: 1, background: 'var(--line)', margin: '40px 0 24px' }} />
        <Eyebrow size={11} style={{ marginBottom: 12, display: 'block' }}>Sources</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 34 }}>
          {sourceKeys.map((k) => <RichText key={k} id={'ref-' + k} className="ser" style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)', paddingLeft: 14, borderLeft: '2px solid var(--clay)' }}>{REFS[k]}</RichText>)}
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button onClick={() => go('fieldwork')} style={{ flex: '1 1 220px', padding: '18px 22px', borderRadius: 14, border: 'none', background: 'var(--ink)', color: 'var(--paper)', cursor: 'pointer', textAlign: 'left' }}>
            <div className="san" style={{ fontSize: 11.5, opacity: .7, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 4 }}>Know the territory</div>
            <div className="ser" style={{ fontSize: 22, fontWeight: 500 }}>Discipline profiles →</div>
          </button>
          <button onClick={() => go('studio')} style={{ flex: '1 1 220px', padding: '18px 22px', borderRadius: 14, border: '1px solid var(--line-strong)', background: 'var(--surface)', color: 'var(--ink)', cursor: 'pointer', textAlign: 'left' }}>
            <div className="san" style={{ fontSize: 11.5, color: 'var(--ink-3)', letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 4 }}>Test a model text</div>
            <div className="ser" style={{ fontSize: 22, fontWeight: 500 }}>Code it in the Studio →</div>
          </button>
        </div>
      </div>
    </div>
  );
}
