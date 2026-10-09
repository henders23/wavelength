/* Library.jsx — the annotated reading list: every reference in the app plus
   the wider practitioner reading, Harvard-formatted, grouped by purpose, each
   with a note on why it earns its place. */

import { DIMS, LIBRARY, REFS } from './data.js';
import { Dot, Eyebrow, RichText, useNarrow } from './components.jsx';

export function LibraryView({ go }) {
  const narrow = useNarrow();
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--paper)' }}>
      {/* sticky header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 14, padding: '13px 34px', background: 'color-mix(in srgb, var(--paper), transparent 8%)', borderBottom: '1px solid var(--line)', backdropFilter: 'blur(8px)' }}>
        <button onClick={() => go('map')} style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, padding: '7px 13px', borderRadius: 9, cursor: 'pointer', border: '1px solid var(--line-strong)', background: 'var(--surface)', color: 'var(--ink)' }}>← Constellation</button>
        <span className="san" style={{ fontSize: 13, color: 'var(--ink-2)' }}>The Library</span>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: narrow ? '34px 18px 56px' : '52px 34px 70px' }}>
        <Eyebrow size={11} hue="var(--clay)">Annotated references</Eyebrow>
        <h1 className="ser" style={{ margin: '14px 0 16px', fontSize: narrow ? 38 : 56, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1 }}>The Library</h1>
        <p className="ser" style={{ margin: '0 0 10px', fontSize: 21, fontStyle: 'italic', lineHeight: 1.4, color: 'var(--ink-2)' }}>{LIBRARY.lede}</p>

        {LIBRARY.groups.map((grp) => (
          <section key={grp.h} style={{ marginTop: 44 }}>
            <div style={{ height: 1, background: 'var(--line)', marginBottom: 26 }} />
            <Eyebrow size={11} hue="var(--clay)" style={{ display: 'block', marginBottom: 8 }}>{grp.h}</Eyebrow>
            <p className="san" style={{ margin: '0 0 20px', fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>{grp.blurb}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {grp.items.map((it) => {
                const dm = it.dim ? DIMS.find((d) => d.key === it.dim) : null;
                return (
                  <div key={it.key} id={'ref-' + it.key} style={{ padding: '16px 18px', borderRadius: 13, border: '1px solid var(--line)', background: 'var(--surface)' }}>
                    <RichText className="ser" style={{ margin: 0, fontSize: 15.5, lineHeight: 1.55, color: 'var(--ink)' }}>{REFS[it.key]}</RichText>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 9 }}>
                      <span className="san" style={{ color: 'var(--clay)', fontWeight: 700, flex: '0 0 auto', fontSize: 13 }}>↳</span>
                      <RichText className="san" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-2)' }}>{it.why}</RichText>
                      {dm && (
                        <button onClick={() => go('dimension', dm.key)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 20, border: '1px solid var(--line-strong)', background: 'var(--surface-2)', cursor: 'pointer', flex: '0 0 auto', marginLeft: 'auto' }}>
                          <Dot hue={dm.hue} size={6} /><span className="san" style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink-2)' }}>{dm.name}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <div style={{ marginTop: 40, padding: '16px 20px', borderRadius: 13, border: '1px dashed var(--line-strong)', background: 'var(--surface-2)' }}>
          <p className="san" style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)' }}>{LIBRARY.note}</p>
        </div>
      </div>
    </div>
  );
}
