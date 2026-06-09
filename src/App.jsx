/* App.jsx — shell: persistent rail + hash-based router across the views.
   Routes are URL-addressable (#/foundations, #/dimension/semantics, …) so
   views are linkable and the browser back/forward buttons work. */

import React from 'react';
import { DIMS } from './data.js';
import { NavRail } from './components.jsx';
import { ConstellationView } from './Constellation.jsx';
import { DimensionView } from './Dimension.jsx';
import { FoundationsView } from './Foundations.jsx';
import { StudioView } from './Studio.jsx';
import { GlossaryView } from './Glossary.jsx';
import { WelcomeView } from './Welcome.jsx';

const PAGES = ['welcome', 'map', 'foundations', 'glossary', 'studio'];

function hashFor(route, dim) {
  return route === 'dimension' ? `#/dimension/${dim}` : `#/${route}`;
}

// Parse the URL hash into a {route, dim} state, or null if it isn't a valid route.
function parseHash() {
  const [route, dim] = window.location.hash.replace(/^#\/?/, '').split('/');
  if (route === 'dimension' && DIMS.some((d) => d.key === dim)) return { route: 'dimension', dim };
  if (PAGES.includes(route)) return { route, dim: null };
  return null;
}

function initialState() {
  // A specific hash (deep link, reload, back/forward) wins; otherwise the app
  // opens on the welcome screen.
  const parsed = parseHash();
  if (parsed) return { route: parsed.route, dim: parsed.dim || 'semantics' };
  return { route: 'welcome', dim: 'semantics' };
}

export default function App() {
  const [st, setSt] = React.useState(initialState);
  const dimRef = React.useRef(st.dim);
  dimRef.current = st.dim;

  // Make the URL reflect the initial state (e.g. first visit with an empty hash).
  React.useEffect(() => {
    if (!parseHash()) window.history.replaceState(null, '', hashFor(st.route, st.dim));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Browser back/forward and external hash edits drive state.
  React.useEffect(() => {
    const onHash = () => {
      const parsed = parseHash();
      if (parsed) setSt((s) => ({ route: parsed.route, dim: parsed.route === 'dimension' ? parsed.dim : s.dim }));
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = React.useCallback((route, dim) => {
    const d = dim || dimRef.current;
    setSt({ route, dim: d });
    const hash = hashFor(route, d);
    if (window.location.hash !== hash) window.location.hash = hash; // pushes history; hashchange is then a no-op
  }, []);

  let view;
  if (st.route === 'welcome') view = <WelcomeView go={go} />;
  else if (st.route === 'dimension') view = <DimensionView dim={st.dim} go={go} />;
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
