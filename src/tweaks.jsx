/* tweaks.jsx — a small appearance panel: accent colour, reading font and
   motion. Settings are applied by overriding the design-system CSS variables
   on <html> (so they cascade through every inline style) and persisted. */

import React from 'react';

// Local section label (kept here to avoid a components ↔ tweaks import cycle).
function Label({ children }) {
  return <span className="eyebrow" style={{ fontSize: 9.5, color: 'var(--ink-3)', marginBottom: 9, display: 'block' }}>{children}</span>;
}

const ACCENTS = [
  { name: 'Clay', value: '#B0543A' },
  { name: 'Teal', value: '#2E6E68' },
  { name: 'Ochre', value: '#B6852B' },
  { name: 'Plum', value: '#7A4E6B' },
  { name: 'Indigo', value: '#3E5C86' },
];
const FONTS = [
  { name: 'Editorial', value: "'Newsreader', Georgia, serif" },
  { name: 'Classic', value: "Georgia, 'Times New Roman', serif" },
  { name: 'Palatino', value: "'Palatino Linotype', 'Book Antiqua', Palatino, serif" },
];
const DEFAULTS = { accent: '#B0543A', serif: "'Newsreader', Georgia, serif", motion: true };

function load() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('wl-tweaks') || '{}') }; }
  catch { return { ...DEFAULTS }; }
}

/* Apply settings to the document root. Exported so the app can apply persisted
   tweaks on first paint, before the panel is ever opened. */
export function applyTweaks(t) {
  const root = document.documentElement;
  root.style.setProperty('--clay', t.accent);
  root.style.setProperty('--serif', t.serif);
  root.classList.toggle('wl-reduce-motion', !t.motion);
}

export function Tweaks() {
  const [open, setOpen] = React.useState(false);
  const [t, setT] = React.useState(load);
  const wrapRef = React.useRef(null);

  React.useLayoutEffect(() => { applyTweaks(t); localStorage.setItem('wl-tweaks', JSON.stringify(t)); }, [t]);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const set = (patch) => setT((cur) => ({ ...cur, ...patch }));

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <button onClick={() => setOpen((o) => !o)} title="Tweaks — appearance" aria-label="Tweaks"
        style={{ width: 40, height: 40, borderRadius: 11, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: open ? 'var(--ink)' : 'transparent', color: open ? '#fff' : 'var(--ink-2)', transition: 'background .15s' }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="9" r="2.4" /><path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.6 3.6l1.4 1.4M13 13l1.4 1.4M14.4 3.6L13 5M5 13l-1.4 1.4" strokeLinecap="round" /></svg>
      </button>

      {open && (
        <div className="san" style={{ position: 'absolute', left: 52, bottom: 0, width: 248, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: '16px 16px 18px', zIndex: 60, boxShadow: '0 18px 44px rgba(40,30,15,.22)' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, marginBottom: 14 }}>Tweaks</div>

          {/* Accent */}
          <Label>Accent</Label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {ACCENTS.map((a) => {
              const on = t.accent === a.value;
              return (
                <button key={a.value} onClick={() => set({ accent: a.value })} title={a.name} aria-label={a.name}
                  style={{ width: 26, height: 26, borderRadius: 26, background: a.value, cursor: 'pointer', border: on ? '2px solid var(--ink)' : '2px solid transparent', boxShadow: on ? '0 0 0 2px var(--surface), 0 0 0 3px ' + a.value : 'none', padding: 0 }} />
              );
            })}
          </div>

          {/* Reading font */}
          <Label>Reading font</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
            {FONTS.map((f) => {
              const on = t.serif === f.value;
              return (
                <button key={f.name} onClick={() => set({ serif: f.value })}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 11px', borderRadius: 9, cursor: 'pointer', border: `1px solid ${on ? 'var(--ink)' : 'var(--line)'}`, background: on ? 'var(--surface-2)' : 'var(--surface)' }}>
                  <span style={{ fontFamily: f.value, fontSize: 16 }}>{f.name}</span>
                  {on && <span style={{ fontSize: 12, color: 'var(--ink-2)' }}>✓</span>}
                </button>
              );
            })}
          </div>

          {/* Motion */}
          <Label>Motion</Label>
          <div style={{ display: 'flex', gap: 6 }}>
            {[['On', true], ['Reduced', false]].map(([label, val]) => {
              const on = t.motion === val;
              return (
                <button key={label} onClick={() => set({ motion: val })}
                  style={{ flex: 1, padding: '8px 0', borderRadius: 9, cursor: 'pointer', fontWeight: 600, fontSize: 12.5, border: `1px solid ${on ? 'var(--ink)' : 'var(--line)'}`, background: on ? 'var(--ink)' : 'var(--surface)', color: on ? 'var(--paper)' : 'var(--ink-2)' }}>{label}</button>
              );
            })}
          </div>

          <button onClick={() => setT({ ...DEFAULTS })} style={{ marginTop: 16, width: '100%', padding: '7px 0', borderRadius: 9, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', border: '1px solid var(--line)', background: 'transparent' }}>Reset to defaults</button>
        </div>
      )}
    </div>
  );
}
