/* components.jsx — shared atoms, the semantic-wave chart, the LCT code
   plane, an inline-citation rich-text renderer, and the persistent nav rail. */

import React from 'react';
import { REFS, PLANES, DIMS } from './data.js';

export function Code({ children, hue }) {
  return <span className="code" style={hue ? { borderColor: hue, color: hue } : null}>{children}</span>;
}
export function Eyebrow({ children, hue, size = 11, style }) {
  return <span className="eyebrow" style={{ fontSize: size, color: hue || 'var(--ink-3)', ...style }}>{children}</span>;
}
export function Dot({ hue, size = 9 }) {
  return <span style={{ display: 'inline-block', width: size, height: size, borderRadius: size, background: hue, flex: '0 0 auto' }} />;
}

/* Inline citation marker — superscripted author-year; click scrolls to the
   matching entry in a Sources list if one is on the page. */
export function Cite({ k }) {
  const jump = () => { const el = document.getElementById('ref-' + k); if (el) { el.style.transition = 'background .2s'; el.style.background = 'color-mix(in srgb, var(--clay), transparent 86%)'; setTimeout(() => (el.style.background = ''), 1100); el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } };
  return <sup className="cite" title={REFS[k] || k} onClick={jump} style={{ cursor: 'pointer' }}>{k}</sup>;
}

/* RichText — renders *emphasis* and [Citation] markers inside a string. */
export function RichText({ children, ...rest }) {
  const parts = String(children).split(/(\*[^*]+\*|\[[^\]]+\])/g).filter(Boolean);
  return (
    <p {...rest}>
      {parts.map((p, i) => {
        if (p[0] === '*' && p[p.length - 1] === '*') return <em key={i} style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{p.slice(1, -1)}</em>;
        if (p[0] === '[' && p[p.length - 1] === ']') return <Cite key={i} k={p.slice(1, -1)} />;
        return <React.Fragment key={i}>{p}</React.Fragment>;
      })}
    </p>
  );
}

/* ── Semantic-wave chart ──────────────────────────────────────────
   pts: [t(0..1), v(0..1)] with v=0 the weak-gravity ceiling (abstract)
   and v=1 the strong-gravity floor (concrete). */
export function WaveChart({ pts, w = 520, h = 200, hue = 'var(--d-sem)', pad = 28, labels = true, dots = true, flat = false, stroke = 2.5, active = -1 }) {
  const x = (t) => pad + t * (w - pad * 2);
  const y = (v) => pad + v * (h - pad * 2);
  const P = pts.map(([t, v]) => [x(t), y(v)]);
  let d = `M ${P[0][0]},${P[0][1]}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || P[i + 1];
    d += ` C ${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {[0, 0.5, 1].map((g) => <line key={g} x1={pad} x2={w - pad} y1={y(g)} y2={y(g)} stroke="var(--line)" strokeWidth="1" strokeDasharray={g === 0.5 ? '3 5' : null} />)}
      <line x1={pad} x2={pad} y1={pad - 6} y2={h - pad + 6} stroke="var(--line-strong)" strokeWidth="1" />
      {labels && (
        <g style={{ fontFamily: 'var(--mono)', fontSize: 9.5, fill: 'var(--ink-3)' }}>
          <text x={pad + 6} y={y(0) - 6}>SG−  abstract</text>
          <text x={pad + 6} y={y(1) + 14}>SG+  concrete</text>
        </g>
      )}
      <path d={d} fill="none" stroke={hue} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={flat ? '5 6' : null} opacity={flat ? 0.55 : 1} />
      {dots && P.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === active ? 5.5 : 3.6} fill={i === active ? hue : 'var(--surface)'} stroke={hue} strokeWidth="2" />
      ))}
    </svg>
  );
}

/* ── Code plane ───────────────────────────────────────────────────
   The Cartesian device at the heart of LCT: two relations, four codes. */
export function CodePlane({ planeKey, hue, highlight }) {
  const pl = PLANES[planeKey];
  const [hov, setHov] = React.useState(highlight || null);
  const cells = [['tl', pl.quads.tl], ['tr', pl.quads.tr], ['bl', pl.quads.bl], ['br', pl.quads.br]];
  return (
    <div style={{ position: 'relative', padding: '22px 30px 30px 34px' }}>
      {/* Y axis label */}
      <div style={{ position: 'absolute', left: 2, top: '50%', transform: 'translateY(-50%) rotate(-180deg)', writingMode: 'vertical-rl', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="san" style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{pl.axisY.minus}</span>
        <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: hue }}>{pl.axisY.code} +</span>
        <span className="san" style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{pl.axisY.plus}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 2, aspectRatio: '1.18 / 1', background: 'var(--line-strong)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 0 var(--line)' }}>
        {cells.map(([k, q]) => {
          const on = hov === k;
          return (
            <div key={k} onMouseEnter={() => setHov(k)} onMouseLeave={() => setHov(highlight || null)}
              style={{ background: on ? `color-mix(in srgb, ${hue}, var(--surface) 78%)` : 'var(--surface)', padding: '14px 15px', display: 'flex', flexDirection: 'column', gap: 4, cursor: 'default', transition: 'background .15s', boxShadow: on ? `inset 0 0 0 1.5px ${hue}` : 'none' }}>
              <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: hue }}>{q.code}</span>
              <span className="ser" style={{ fontSize: 17, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{q.name}</span>
              <span className="san" style={{ fontSize: 11.5, lineHeight: 1.4, color: 'var(--ink-2)' }}>{q.note}</span>
            </div>
          );
        })}
      </div>
      {/* X axis label */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 9 }}>
        <span className="san" style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{pl.axisX.minus}</span>
        <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: hue }}>{pl.axisX.code} +</span>
        <span className="san" style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{pl.axisX.plus}</span>
      </div>
    </div>
  );
}

/* ── persistent left nav rail ─────────────────────────────────────── */
function RailBtn({ active, hue, title, onClick, children }) {
  const [h, setH] = React.useState(false);
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <button onClick={onClick} title={title}
        style={{ width: 40, height: 40, borderRadius: 11, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: active ? (hue || 'var(--ink)') : 'transparent', color: active ? '#fff' : 'var(--ink-2)', transition: 'background .15s' }}>
        {children}
      </button>
      {h && <div className="san" style={{ position: 'absolute', left: 50, top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap', background: 'var(--ink)', color: 'var(--paper)', fontSize: 11.5, fontWeight: 500, padding: '5px 9px', borderRadius: 7, zIndex: 50, pointerEvents: 'none', boxShadow: '0 6px 18px rgba(0,0,0,.2)' }}>{title}</div>}
    </div>
  );
}

export function NavRail({ route, dim, go }) {
  return (
    <nav style={{ width: 62, flex: '0 0 auto', background: 'var(--surface-2)', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: 6, zIndex: 20 }}>
      <button onClick={() => go('map')} title="Constellation home" style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 10 }}>
        <svg width="30" height="30" viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="var(--ink)" /><path d="M5 19c2.4 0 2.4-8 4.8-8s2.4 8 4.8 8 2.4-8 4.8-8 2.4 8 4.8 8" fill="none" stroke="var(--paper)" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </button>
      <RailBtn active={route === 'map'} title="Constellation" onClick={() => go('map')}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="9" r="2" /><circle cx="3" cy="4" r="1.5" /><circle cx="15" cy="5" r="1.5" /><circle cx="14" cy="14" r="1.5" /><circle cx="4" cy="14" r="1.5" /><path d="M9 9l-6-5M9 9l6-4M9 9l5 5M9 9l-5 5" opacity=".5" /></svg>
      </RailBtn>
      <RailBtn active={route === 'foundations'} title="Foundations" onClick={() => go('foundations')}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 4.5C7.5 3.3 5.5 3 3.5 3.4V14c2-.4 4 0 5.5 1.2M9 4.5c1.5-1.2 3.5-1.5 5.5-1.1V14c-2-.4-4 0-5.5 1.2M9 4.5V15" strokeLinejoin="round" /></svg>
      </RailBtn>
      <div style={{ width: 24, height: 1, background: 'var(--line)', margin: '4px 0' }} />
      {DIMS.map((m) => (
        <RailBtn key={m.key} active={route === 'dimension' && dim === m.key} hue={m.hue} title={`${m.n} · ${m.name}`} onClick={() => go('dimension', m.key)}>
          <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: route === 'dimension' && dim === m.key ? '#fff' : m.hue }}>{m.n}</span>
        </RailBtn>
      ))}
      <div style={{ width: 24, height: 1, background: 'var(--line)', margin: '4px 0' }} />
      <RailBtn active={route === 'studio'} title="The Studio — code a text" hue="var(--clay)" onClick={() => go('studio')}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 13c2-.2 2-7 4-7s2 5 4 5 2-7 4-7" /></svg>
      </RailBtn>
      <div style={{ flex: 1 }} />
      <div style={{ width: 34, height: 34, borderRadius: 34, background: 'var(--d-spec)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>AO</div>
    </nav>
  );
}
