/* Constellation.jsx — the app's home: a living map of the five dimensions
   orbiting a central hub. Click a node to dock its detail; enter to read. */

import React from 'react';
import { DIMS } from './data.js';
import { Eyebrow, Dot, Code, WaveChart } from './components.jsx';
import { Search } from './search.jsx';

const C_CX = 450, C_CY = 330, C_R = 250;
const C_ANG = { semantics: 0, specialization: 72, autonomy: 144, density: 216, temporality: 288 };
function cPos(key) { const a = (C_ANG[key] * Math.PI) / 180; return { x: C_CX + C_R * Math.sin(a), y: C_CY - C_R * Math.cos(a), a }; }

export const WAVE_GOOD = [[0, 0.12], [0.16, 0.78], [0.34, 0.2], [0.52, 0.85], [0.7, 0.18], [0.86, 0.7], [1, 0.3]];

function useFit(boxW, boxH) {
  const ref = React.useRef(null);
  const [s, setS] = React.useState(0.6);
  React.useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) setS(Math.min(1, (r.width - 36) / boxW, (r.height - 48) / boxH));
    };
    measure(); // synchronous first measure — don't wait on the RO's initial fire
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [boxW, boxH]);
  return [ref, s];
}

function CNode({ m, focused, onClick }) {
  const { x, y } = cPos(m.key);
  const d = focused ? 130 : 98;
  const [h, setH] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: 'absolute', left: x - d / 2, top: y - d / 2, width: d, height: d, borderRadius: d,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 8,
        background: focused ? 'var(--surface)' : 'var(--surface-2)', border: `2px solid ${m.hue}`,
        boxShadow: focused ? `0 0 0 7px color-mix(in srgb, ${m.hue}, transparent 86%), 0 16px 40px rgba(40,30,15,.16)` : h ? `0 8px 22px rgba(40,30,15,.12)` : '0 3px 12px rgba(40,30,15,.06)',
        cursor: 'pointer', transition: 'all .2s', transform: !focused && h ? 'scale(1.06)' : 'scale(1)', zIndex: focused ? 6 : 4 }}>
      <span className="mono" style={{ fontSize: focused ? 12 : 10.5, fontWeight: 600, color: m.hue }}>{m.n}</span>
      <span className="ser" style={{ fontSize: focused ? 19 : 15, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.05, marginTop: 2, letterSpacing: '-0.01em' }}>{m.name}</span>
      <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
        {m.concepts.map((c) => <span key={c.code} className="mono" style={{ fontSize: focused ? 9.5 : 8.5, fontWeight: 600, color: m.hue, opacity: .7, padding: '1px 4px', borderRadius: 4, background: `color-mix(in srgb, ${m.hue}, transparent 90%)` }}>{c.code}</span>)}
      </div>
      {m.emerging && <span className="san" style={{ fontSize: 8, fontStyle: 'italic', color: 'var(--ink-3)', marginTop: 3 }}>emerging</span>}
    </div>
  );
}

export function ConstellationView({ go }) {
  const [focusKey, setFocusKey] = React.useState(() => localStorage.getItem('wl-focus') || 'semantics');
  const focus = DIMS.find((d) => d.key === focusKey) || DIMS[0];
  const [boxRef, scale] = useFit(900, 680);
  React.useEffect(() => { localStorage.setItem('wl-focus', focusKey); }, [focusKey]);

  return (
    <div style={{ flex: 1, display: 'flex', minWidth: 0, background: 'var(--paper)' }}>
      {/* canvas */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minWidth: 0 }}>
        {/* top strip */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 58, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16, zIndex: 10 }}>
          <div>
            <span className="ser" style={{ fontSize: 17, fontWeight: 600 }}>Wavelength</span>
            <span className="san" style={{ fontSize: 12, color: 'var(--ink-3)', marginLeft: 10 }}>Legitimation Code Theory for EAP</span>
          </div>
          <div style={{ flex: 1 }} />
          <Search go={go} />
        </div>

        {/* fitted map — ref measures the space left between the top bar and legend */}
        <div ref={boxRef} style={{ position: 'absolute', top: 60, bottom: 64, left: 8, right: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 900, height: 680, position: 'relative', transform: `scale(${scale})`, transformOrigin: 'center' }}>
            <svg viewBox="0 0 900 680" width="900" height="680" style={{ position: 'absolute', inset: 0 }}>
              {[140, 195, 250].map((r) => <circle key={r} cx={C_CX} cy={C_CY} r={r} fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 7" opacity="0.7" />)}
              {DIMS.map((m) => { const p = cPos(m.key); const f = m.key === focusKey; return <line key={m.key} x1={C_CX} y1={C_CY} x2={p.x} y2={p.y} stroke={f ? m.hue : 'var(--line-strong)'} strokeWidth={f ? 2 : 1.2} opacity={f ? 0.6 : 0.45} />; })}
            </svg>
            {/* hub → foundations */}
            <div onClick={() => go('foundations')} title="Start with the Foundations"
              style={{ position: 'absolute', left: C_CX - 64, top: C_CY - 64, width: 128, height: 128, borderRadius: 128, background: 'var(--ink)', color: 'var(--paper)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 14, boxShadow: '0 18px 44px rgba(40,30,15,.24)', cursor: 'pointer', zIndex: 5 }}>
              <svg width="22" height="22" viewBox="0 0 30 30" style={{ marginBottom: 5 }}><path d="M3 19c2.4 0 2.4-9 4.8-9s2.4 9 4.8 9 2.4-9 4.8-9 2.4 9 4.8 9 2.4-9 4.8-9 2.4 9 4.8 9" fill="none" stroke="var(--paper)" strokeWidth="1.6" strokeLinecap="round" /></svg>
              <span className="ser" style={{ fontSize: 14.5, fontWeight: 500, lineHeight: 1.08 }}>Legitimation<br />Code Theory</span>
              <span className="san" style={{ fontSize: 8.5, opacity: .65, letterSpacing: '.1em', marginTop: 5, textTransform: 'uppercase' }}>Foundations →</span>
            </div>
            {DIMS.map((m) => <CNode key={m.key} m={m} focused={m.key === focusKey} onClick={() => setFocusKey(m.key)} />)}
          </div>
        </div>

        {/* legend */}
        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '8px 14px', background: 'color-mix(in srgb, var(--surface), transparent 10%)', padding: '9px 15px', borderRadius: 20, border: '1px solid var(--line)', backdropFilter: 'blur(3px)' }}>
          <Eyebrow size={9.5}>Tap a node</Eyebrow>
          {DIMS.map((m) => <div key={m.key} onClick={() => setFocusKey(m.key)} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}><Dot hue={m.hue} /><span className="san" style={{ fontSize: 11.5, color: focusKey === m.key ? 'var(--ink)' : 'var(--ink-2)', fontWeight: focusKey === m.key ? 600 : 400 }}>{m.name}</span></div>)}
        </div>
      </div>

      {/* docked panel */}
      <aside key={focusKey} style={{ width: 384, flex: '0 0 auto', background: 'var(--surface)', borderLeft: '1px solid var(--line)', padding: '30px 28px', display: 'flex', flexDirection: 'column', overflowY: 'auto', animation: 'wlFade .25s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
          <Dot hue={focus.hue} size={11} />
          <Eyebrow size={11} hue={focus.hue}>Dimension {focus.n}{focus.emerging ? ' · emerging' : ''}</Eyebrow>
        </div>
        <h2 className="ser" style={{ margin: '0 0 8px', fontSize: 40, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>{focus.name}</h2>
        <p className="ser" style={{ margin: '0 0 22px', fontSize: 17, fontStyle: 'italic', lineHeight: 1.4, color: 'var(--ink-2)' }}>{focus.question}</p>

        <Eyebrow size={10} style={{ marginBottom: 11 }}>Organising concepts</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 22 }}>
          {focus.concepts.map((c) => (
            <div key={c.code} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
              <Code hue={focus.hue}>{c.code}</Code>
              <div>
                <div className="san" style={{ fontSize: 13.5, fontWeight: 600 }}>{c.label}</div>
                <div className="san" style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 1 }}>{c.gloss}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--surface-2)', borderRadius: 12, padding: '13px 15px', marginBottom: 20 }}>
          <Eyebrow size={9.5} style={{ marginBottom: 7 }}>{focus.wave ? 'The semantic wave' : 'In academic writing'}</Eyebrow>
          {focus.wave
            ? <WaveChart pts={WAVE_GOOD} w={300} h={108} hue={focus.hue} labels={false} />
            : <p className="san" style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-2)' }}>{focus.eap}</p>}
        </div>

        <div style={{ marginTop: 'auto' }}>
          <Eyebrow size={9.5} style={{ marginBottom: 8 }}>Grounded in</Eyebrow>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {focus.cites.map((c) => <span key={c} className="san" style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink-2)', padding: '4px 9px', borderRadius: 20, border: '1px solid var(--line-strong)' }}>{c}</span>)}
          </div>
          <button onClick={() => go('dimension', focus.key)} style={{ width: '100%', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, padding: '12px', borderRadius: 10, border: 'none', background: focus.hue, color: '#fff', cursor: 'pointer' }}>Enter {focus.name} →</button>
        </div>
      </aside>
    </div>
  );
}
