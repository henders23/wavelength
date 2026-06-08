/* App.jsx — shell: persistent rail + state router across the views. */

import React from 'react';
import { NavRail } from './components.jsx';
import { ConstellationView } from './Constellation.jsx';
import { DimensionView } from './Dimension.jsx';
import { FoundationsView } from './Foundations.jsx';
import { StudioView } from './Studio.jsx';
import { GlossaryView } from './Glossary.jsx';

export default function App() {
  const [st, setSt] = React.useState(() => {
    try { const s = JSON.parse(localStorage.getItem('wl-route') || 'null'); if (s && s.route) return s; } catch {}
    return { route: 'map', dim: 'semantics' };
  });
  const go = React.useCallback((route, dim) => {
    setSt((s) => { const n = { route, dim: dim || s.dim }; localStorage.setItem('wl-route', JSON.stringify(n)); return n; });
  }, []);

  let view;
  if (st.route === 'dimension') view = <DimensionView dim={st.dim} go={go} />;
  else if (st.route === 'foundations') view = <FoundationsView go={go} />;
  else if (st.route === 'studio') view = <StudioView go={go} />;
  else if (st.route === 'glossary') view = <GlossaryView go={go} />;
  else view = <ConstellationView go={go} />;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--paper)' }}>
      <NavRail route={st.route} dim={st.dim} go={go} />
      {view}
    </div>
  );
}
