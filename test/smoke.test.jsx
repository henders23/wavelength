/* Runtime smoke test: mount the whole app and every view through React in
   jsdom. Any render-time error (bad import, undefined access, broken hook)
   fails the test — this is the runtime check the production build can't give. */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, fireEvent, within } from '@testing-library/react';
import App from '../src/App.jsx';
import { ConstellationView } from '../src/Constellation.jsx';
import { DimensionView } from '../src/Dimension.jsx';
import { FoundationsView } from '../src/Foundations.jsx';
import { StudioView } from '../src/Studio.jsx';
import { GlossaryView } from '../src/Glossary.jsx';
import { LibraryView } from '../src/Library.jsx';
import { FieldworkView } from '../src/Fieldwork.jsx';
import { MaterialsLabView } from '../src/MaterialsLab.jsx';
import { DIMS, FIELDWORK, FOUNDATIONS, GLOSSARY, LAB, LIBRARY, REFS, SAMPLES, SORTER } from '../src/data.js';

const go = () => {};

// The app now opens on the welcome screen by default; most App tests want to
// start on the map, so enter via a #/map deep link. The welcome test clears it.
beforeEach(() => {
  window.location.hash = '#/map';
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  // reset any document-root tweaks so state doesn't leak between tests
  document.documentElement.classList.remove('wl-reduce-motion');
  document.documentElement.removeAttribute('style');
  window.location.hash = '';
  window.innerWidth = 1024;
});

describe('Wavelength views mount cleanly', () => {
  it('renders the app shell (nav rail + constellation) on the map route', () => {
    const { getByText, container } = render(<App />);
    // brand in the top strip + nav rail present
    expect(getByText('Wavelength')).toBeTruthy();
    expect(container.querySelector('nav')).toBeTruthy();
  });

  it('renders the constellation home with all five dimensions in the legend', () => {
    const { getAllByText } = render(<ConstellationView go={go} />);
    for (const m of DIMS) {
      // dimension name appears (node + legend), so at least one match
      expect(getAllByText(m.name).length).toBeGreaterThan(0);
    }
  });

  it('opens on the welcome screen by default and lets you enter the app', () => {
    window.location.hash = ''; // no deep link → the welcome landing
    const { getByText } = render(<App />);
    expect(getByText('How to use this app')).toBeTruthy();
    fireEvent.click(getByText('Explore the map →'));
    expect(getByText('Wavelength')).toBeTruthy(); // constellation brand
  });

  it('reopens the welcome guide from the rail help button', () => {
    const { getByTitle, getByText } = render(<App />); // starts on the map (welcomed)
    fireEvent.click(getByTitle('How to use Wavelength'));
    expect(getByText('How to use this app')).toBeTruthy();
  });

  it('layers dimension content: gist, examples, and a collapsible Going deeper', () => {
    const { getByText, container } = render(<DimensionView dim="autonomy" go={go} />);
    expect(getByText('Start here · the gist')).toBeTruthy();
    expect(getByText('See it in writing')).toBeTruthy();
    // advanced prose is hidden until the toggle is opened
    expect(container.textContent).not.toMatch(/Charting positional and relational autonomy/);
    fireEvent.click(getByText('Going deeper'));
    expect(container.textContent).toMatch(/Charting positional and relational autonomy/);
  });

  it('shows an annotated example and an exercise with reveal-able answers', () => {
    const { getByText, getAllByText, container } = render(<DimensionView dim="semantics" go={go} />);
    expect(getByText('Annotated example')).toBeTruthy();
    expect(getByText('Try it yourself')).toBeTruthy();
    // the answer is hidden until revealed
    expect(container.textContent).not.toMatch(/there is no concrete situation or example to ground it/);
    fireEvent.click(getAllByText('Reveal answer')[0]);
    expect(container.textContent).toMatch(/there is no concrete situation or example to ground it/);
  });

  it('renders every dimension reading view, including the code planes', () => {
    for (const m of DIMS) {
      const { getByRole, unmount } = render(<DimensionView dim={m.key} go={go} />);
      expect(getByRole('heading', { level: 1 }).textContent).toBe(m.name);
      unmount();
    }
  });

  it('renders Going deeper + In practice content for every dimension', () => {
    for (const m of DIMS) {
      const { getByText, getAllByText, unmount } = render(<DimensionView dim={m.key} go={go} />);
      expect(getByText('Going deeper')).toBeTruthy();
      expect(getAllByText(new RegExp('In practice')).length).toBeGreaterThan(0);
      unmount();
    }
  });

  it('steps through the Semantics unpack/repack lab without error', () => {
    const { getByText, getAllByText } = render(<DimensionView dim="semantics" go={go} />);
    // the lab's "Next →" renders before the footer dimension-nav's "Next →"
    const next = getAllByText('Next →')[0];
    fireEvent.click(next);
    fireEvent.click(next);
    expect(getByText(/3 \/ 5/)).toBeTruthy();
  });

  it('renders Foundations with its sections', () => {
    const { getByText } = render(<FoundationsView go={go} />);
    expect(getByText(/What is Legitimation Code/)).toBeTruthy();
    expect(getByText('The move: legitimation codes')).toBeTruthy();
    expect(getByText('The company it keeps: LCT & SFL')).toBeTruthy();
  });

  it('renders a Take it to class section on every dimension', () => {
    for (const m of DIMS) {
      const { getByText, unmount } = render(<DimensionView dim={m.key} go={go} />);
      expect(getByText('Take it to class')).toBeTruthy();
      expect(getByText(m.classroom[0].name)).toBeTruthy();
      unmount();
    }
  });

  it('renders the Library with every group and its annotated entries', () => {
    const { getByRole, getByText } = render(<LibraryView go={go} />);
    expect(getByRole('heading', { level: 1 }).textContent).toBe('The Library');
    for (const grp of LIBRARY.groups) expect(getByText(grp.h)).toBeTruthy();
  });

  it('reaches the Library from the nav rail', () => {
    const { getByTitle, getByRole } = render(<App />);
    fireEvent.click(getByTitle('The Library — annotated reading list'));
    expect(getByRole('heading', { level: 1 }).textContent).toBe('The Library');
  });

  it('renders Fieldwork with the specificity intro and every discipline chip', () => {
    const { getByRole, getByText, getAllByText } = render(<FieldworkView go={go} />);
    expect(getByRole('heading', { level: 1 }).textContent).toBe('Designing for the disciplines');
    expect(getByText('What LCT changes')).toBeTruthy();
    // every discipline appears at least once (the selected one also heads its profile)
    for (const d of FIELDWORK.disciplines) expect(getAllByText(d.name).length).toBeGreaterThan(0);
  });

  it('switches between discipline profiles in Fieldwork', () => {
    const { getByText, container } = render(<FieldworkView go={go} />);
    // opens on the first profile (sciences); nursing content not yet shown
    expect(container.textContent).toMatch(/Anti-Icarus drills/);
    expect(container.textContent).not.toMatch(/Rubric the wave/);
    fireEvent.click(getByText('Nursing & health sciences'));
    expect(container.textContent).toMatch(/Rubric the wave/);
    expect(getByText('Watch for the clash')).toBeTruthy();
  });

  it('reaches Fieldwork from the nav rail', () => {
    const { getByTitle, getByRole } = render(<App />);
    fireEvent.click(getByTitle('Fieldwork — designing for the disciplines'));
    expect(getByRole('heading', { level: 1 }).textContent).toBe('Designing for the disciplines');
  });

  it('profiles a task onto the Specialization plane in the Materials Lab', () => {
    const { getByText, container } = render(<MaterialsLabView go={go} />);
    // no verdict until every question is answered
    expect(container.textContent).not.toMatch(/knowledge code \(ER\+, SR−\)/);
    for (const q of LAB.profile.questions) fireEvent.click(getByText(q.options[0].label));
    // first options are ER-heavy → knowledge code, with its design advice
    expect(getByText('knowledge code (ER+, SR−)')).toBeTruthy();
    expect(container.textContent).toMatch(/Design for mastery made visible/);
  });

  it('plans a wave in the Materials Lab: stages, gravity & density sliders, shape verdicts', () => {
    const { getByText, getAllByLabelText, container } = render(<MaterialsLabView go={go} />);
    const gravity = getAllByLabelText(/gravity$/);
    const density = getAllByLabelText(/density$/);
    expect(gravity.length).toBe(LAB.waveplan.defaultStages.length);
    expect(density.length).toBe(LAB.waveplan.defaultStages.length);
    // the default template waves, and its density line has range
    expect(container.textContent).toMatch(/A genuine wave/);
    expect(container.textContent).not.toMatch(/The density line barely moves/);
    // flatten every gravity slider → flatline warning
    for (const s of gravity) fireEvent.change(s, { target: { value: '50' } });
    expect(container.textContent).toMatch(/This plan barely moves/);
    // flatten every density slider → the density hint appears too
    for (const s of density) fireEvent.change(s, { target: { value: '50' } });
    expect(container.textContent).toMatch(/The density line barely moves/);
    // add a stage → one more of each slider
    fireEvent.click(getByText('+ Add a stage'));
    expect(getAllByLabelText(/gravity$/).length).toBe(LAB.waveplan.defaultStages.length + 1);
    expect(getAllByLabelText(/density$/).length).toBe(LAB.waveplan.defaultStages.length + 1);
  });

  it('ticks off the audit checklist in the Materials Lab', () => {
    const { container } = render(<MaterialsLabView go={go} />);
    const boxes = container.querySelectorAll('input[type="checkbox"]');
    expect(boxes.length).toBe(LAB.checklist.items.length);
    fireEvent.click(boxes[0]);
    expect(boxes[0].checked).toBe(true);
  });

  it('reaches the Materials Lab from the nav rail', () => {
    const { getByTitle, getByRole } = render(<App />);
    fireEvent.click(getByTitle('The Materials Lab — design a unit'));
    expect(getByRole('heading', { level: 1 }).textContent).toBe('The Materials Lab');
  });

  it('offers guided pathways on the welcome screen that navigate into the app', () => {
    window.location.hash = '';
    const { getByText, getByRole } = render(<App />);
    expect(getByText('Choose your path')).toBeTruthy();
    fireEvent.click(getByText('The Materials Lab — profile the task, plan the wave, audit the draft'));
    expect(getByRole('heading', { level: 1 }).textContent).toBe('The Materials Lab');
  });

  it('serves discipline samples in the Studio with per-sentence analysis', () => {
    const { getByText } = render(<StudioView go={go} />);
    fireEvent.click(getByText('Discipline samples'));
    // chemistry opens first; sentence 1's analytic note shows
    expect(getByText(/mean titre decreased/)).toBeTruthy();
    expect(getByText(/The evidence floor/)).toBeTruthy();
    // switch to the extended nursing analysis — all eight sentences render
    fireEvent.click(getByText(/Nursing · reflective account/));
    expect(getByText(/Mr T refused his evening medication/)).toBeTruthy();
    const last = getByText(/operationalises autonomy at the bedside/);
    fireEvent.click(last);
    expect(getByText(/The wave ends on a climb/)).toBeTruthy();
  });

  it('opens the right sample when Fieldwork hands a discipline to the Studio', () => {
    let went = null;
    const { getByText } = render(<FieldworkView go={(r) => { went = r; }} />);
    fireEvent.click(getByText('Code this discipline’s sample in the Studio →'));
    expect(went).toBe('studio');
    expect(localStorage.getItem('wl-studio-sample')).toBe('sciences');
    // the Studio consumes the handoff and opens on that sample
    const studio = render(<StudioView go={go} />);
    expect(studio.getByText(/mean titre decreased/)).toBeTruthy();
    expect(localStorage.getItem('wl-studio-sample')).toBe(null);
  });

  it('runs the code sorter on the Specialization page', () => {
    const { getByText, getByRole } = render(<DimensionView dim="specialization" go={go} />);
    expect(getByText('SORT THE CODES · try it')).toBeTruthy();
    // first task is the physics problem sheet → knowledge code
    fireEvent.click(getByRole('button', { name: /knowledge code/ }));
    expect(getByText(/Pure epistemic relations/)).toBeTruthy();
    fireEvent.click(getByText('Next task →'));
    expect(getByText(/2 \/ 8 · score 1/)).toBeTruthy();
  });

  it('keeps the code sorter off the other dimension pages', () => {
    const { queryByText } = render(<DimensionView dim="semantics" go={go} />);
    expect(queryByText('SORT THE CODES · try it')).toBeNull();
  });

  it('renders the Studio and toggles between drafts', () => {
    const { getByText } = render(<StudioView go={go} />);
    expect(getByText(/Plot a paragraph/)).toBeTruthy();
    fireEvent.click(getByText('Reworked draft'));
    // reworked draft has a 4th sentence the flat draft lacks
    expect(getByText(/economists track as the inflation rate/)).toBeTruthy();
  });

  it('lets you code your own text in the Studio', () => {
    const { getByText, getByRole, getByPlaceholderText, container } = render(<StudioView go={go} />);
    fireEvent.click(getByRole('button', { name: 'Your text' }));
    const ta = getByPlaceholderText(/Paste or type a paragraph/);
    fireEvent.change(ta, { target: { value: 'Inflation is a sustained rise in prices. A pound buys less bread than last year.' } });
    fireEvent.click(getByText('Segment & plot →'));
    // both detected sentences render, and the rating sliders appear
    expect(getByText(/A pound buys less bread/)).toBeTruthy();
    expect(container.querySelectorAll('input[type="range"]').length).toBe(2);
  });

  it('searches from the constellation and navigates to a result', () => {
    const { getByLabelText, getByText, getByRole } = render(<App />);
    const input = getByLabelText('Search concepts and sources');
    fireEvent.change(input, { target: { value: 'autonomy tour' } });
    // a matching glossary term surfaces; clicking it routes to its dimension
    fireEvent.click(getByText('Autonomy tour'));
    expect(getByRole('heading', { level: 1 }).textContent).toBe('Autonomy');
  });

  it('renders the Glossary with the notation key and every key term', () => {
    const { getByText, getAllByText } = render(<GlossaryView go={go} />);
    expect(getByText('The notation')).toBeTruthy();
    for (const g of GLOSSARY) {
      expect(getAllByText(g.term).length).toBeGreaterThan(0);
    }
  });

  it('resolves every citation in the content against the reference list', () => {
    // inline [Key] and [Key; Key] markers anywhere in the prose content
    const prose = [
      ...DIMS.flatMap((m) => [
        m.simple, m.eap, m.worked?.note,
        ...(m.idea || []), ...(m.deeper || []),
        ...(m.classroom || []).map((c) => c.how),
        ...(m.readmore || []).map((r) => r.why),
      ]),
      ...FOUNDATIONS.sections.map((s) => s.t),
      ...GLOSSARY.map((g) => g.def),
      ...LIBRARY.groups.flatMap((grp) => grp.items.map((it) => it.why)),
      ...FIELDWORK.intro.map((s) => s.t),
      ...FIELDWORK.disciplines.flatMap((d) => [
        ...d.signature, d.grounding, d.clash,
        ...d.genres.map((g) => g.note),
        ...d.design.map((c) => c.how),
        ...d.annotated.segments.map((s) => s.note),
      ]),
      LAB.lede, LAB.profile.intro, LAB.waveplan.intro, LAB.checklist.intro,
      ...Object.values(LAB.profile.verdicts).map((v) => v.advice),
      ...LAB.checklist.items.map((c) => c.item),
      ...SAMPLES.flatMap((s) => [s.lede, s.verdict, ...s.sentences.map((x) => x.note)]),
      SORTER.intro, ...SORTER.items.map((x) => x.why),
    ].filter(Boolean);
    const inline = prose
      .flatMap((s) => [...String(s).matchAll(/\[([^\]]+)\]/g)])
      .flatMap((match) => match[1].split(';').map((k) => k.trim()));
    // keys referenced structurally: per-dimension cites/readmore and the Library
    const structural = [
      ...DIMS.flatMap((m) => [...m.cites, ...(m.readmore || []).map((r) => r.key)]),
      ...LIBRARY.groups.flatMap((grp) => grp.items.map((it) => it.key)),
    ];
    for (const k of [...inline, ...structural]) {
      expect(REFS[k], `citation key does not resolve: "${k}"`).toBeTruthy();
    }
  });

  it('reaches the Glossary from the nav rail', () => {
    const { getByTitle, getByRole } = render(<App />);
    fireEvent.click(getByTitle('Glossary & notation key'));
    expect(getByRole('heading', { level: 1 }).textContent).toMatch(/Glossary/);
  });

  it('opens the Tweaks panel and applies an accent and reduced motion', () => {
    const { getByLabelText, getByText } = render(<App />);
    fireEvent.click(getByLabelText('Tweaks'));
    // pick the Teal accent → overrides the --clay variable on <html>
    fireEvent.click(getByLabelText('Teal'));
    expect(document.documentElement.style.getPropertyValue('--clay')).toBe('#2E6E68');
    // reduce motion → adds the root class
    fireEvent.click(getByText('Reduced'));
    expect(document.documentElement.classList.contains('wl-reduce-motion')).toBe(true);
  });

  it('reflects navigation in the URL hash', () => {
    const { getByText } = render(<App />);
    fireEvent.click(getByText('Enter Semantics →'));
    expect(window.location.hash).toBe('#/dimension/semantics');
  });

  it('opens the view named by the URL hash on load', () => {
    window.location.hash = '#/glossary';
    const { getByRole } = render(<App />);
    expect(getByRole('heading', { level: 1 }).textContent).toMatch(/Glossary/);
  });

  it('renders and navigates on a narrow (mobile) viewport', () => {
    window.innerWidth = 480;
    const { getByText, getByRole } = render(<App />);
    expect(getByText('Wavelength')).toBeTruthy();
    fireEvent.click(getByText('Enter Semantics →'));
    expect(getByRole('heading', { level: 1 }).textContent).toBe('Semantics');
  });

  it('routes from constellation into a dimension and back via App state', () => {
    const { getByText, getAllByText, getByRole } = render(<App />);
    // enter Semantics from the docked panel button
    fireEvent.click(getByText('Enter Semantics →'));
    expect(getByRole('heading', { level: 1 }).textContent).toBe('Semantics');
    // back to the constellation
    fireEvent.click(getAllByText('← Constellation')[0]);
    expect(getByText('Wavelength')).toBeTruthy();
  });
});
