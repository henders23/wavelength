/* search.jsx — the constellation's search: an index over dimensions, their
   organising concepts, glossary terms, the section pages and the sources.
   Selecting a result navigates there. */

import React from 'react';
import { DIMS, GLOSSARY, REFS } from './data.js';
import { Dot } from './components.jsx';

function buildIndex() {
  const out = [];
  DIMS.forEach((m) => {
    out.push({ label: m.name, sub: `Dimension ${m.n}`, hue: m.hue, route: ['dimension', m.key], hay: `${m.name} ${m.question} ${m.concepts.map((c) => `${c.code} ${c.label} ${c.gloss}`).join(' ')}` });
    m.concepts.forEach((c) => out.push({ label: `${c.code} · ${c.label}`, sub: m.name, hue: m.hue, route: ['dimension', m.key], hay: `${c.code} ${c.label} ${c.gloss}` }));
  });
  GLOSSARY.forEach((g) => {
    const dm = g.dim ? DIMS.find((d) => d.key === g.dim) : null;
    out.push({ label: g.term, sub: 'Glossary', hue: dm ? dm.hue : 'var(--ink-3)', route: dm ? ['dimension', dm.key] : ['glossary'], hay: `${g.term} ${g.def}` });
  });
  out.push({ label: 'Foundations', sub: 'Start here', hue: 'var(--clay)', route: ['foundations'], hay: 'foundations what is legitimation code theory bernstein bourdieu knowledge-blindness eap' });
  out.push({ label: 'The Studio', sub: 'Code a text', hue: 'var(--clay)', route: ['studio'], hay: 'studio semantic wave code a text gravity density paragraph profile' });
  out.push({ label: 'Glossary & notation key', sub: 'Reference', hue: 'var(--clay)', route: ['glossary'], hay: 'glossary notation key terms codes sources reference' });
  Object.keys(REFS).forEach((k) => out.push({ label: k, sub: 'Source', hue: 'var(--ink-3)', route: ['glossary'], hay: `${k} ${REFS[k]}` }));
  return out;
}
const INDEX = buildIndex();

export function Search({ go }) {
  const [q, setQ] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [hi, setHi] = React.useState(0);
  const wrapRef = React.useRef(null);

  const results = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return INDEX
      .map((it) => {
        const label = it.label.toLowerCase();
        const score = label.startsWith(s) ? 0 : label.includes(s) ? 1 : it.hay.toLowerCase().includes(s) ? 2 : -1;
        return { it, score };
      })
      .filter((x) => x.score >= 0)
      .sort((a, b) => a.score - b.score)
      .slice(0, 8)
      .map((x) => x.it);
  }, [q]);

  React.useEffect(() => setHi(0), [q]);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const choose = (it) => { setQ(''); setOpen(false); if (it) go(...it.route); };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(results.length - 1, h + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(0, h - 1)); }
    else if (e.key === 'Enter') { choose(results[hi]); }
    else if (e.key === 'Escape') { setOpen(false); }
  };

  const showResults = open && q.trim() && results.length > 0;

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: 'clamp(150px, 40vw, 264px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 13px', borderRadius: 9, background: 'var(--surface)', border: `1px solid ${open ? 'var(--line-strong)' : 'var(--line)'}`, color: 'var(--ink-3)' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="6" r="4.5" /><path d="M9.5 9.5L13 13" strokeLinecap="round" /></svg>
        <input value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={onKey}
          placeholder="Search concepts & sources…" aria-label="Search concepts and sources"
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--ink)', padding: 0 }} />
        {q && <button onClick={() => { setQ(''); }} aria-label="Clear search" style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink-3)', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>}
      </div>

      {showResults && (
        <div className="san" style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 11, padding: 5, zIndex: 30, boxShadow: '0 18px 44px rgba(40,30,15,.18)', maxHeight: 340, overflowY: 'auto' }}>
          {results.map((it, i) => (
            <button key={i} onMouseEnter={() => setHi(i)} onClick={() => choose(it)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', background: i === hi ? 'var(--surface-2)' : 'transparent' }}>
              <Dot hue={it.hue} size={8} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.label}</span>
              <span style={{ fontSize: 11, color: 'var(--ink-3)', flex: '0 0 auto' }}>{it.sub}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
