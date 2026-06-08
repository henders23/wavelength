/* Runtime smoke test: mount the whole app and every view through React in
   jsdom. Any render-time error (bad import, undefined access, broken hook)
   fails the test — this is the runtime check the production build can't give. */

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, fireEvent, within } from '@testing-library/react';
import App from '../src/App.jsx';
import { ConstellationView } from '../src/Constellation.jsx';
import { DimensionView } from '../src/Dimension.jsx';
import { FoundationsView } from '../src/Foundations.jsx';
import { StudioView } from '../src/Studio.jsx';
import { GlossaryView } from '../src/Glossary.jsx';
import { DIMS, GLOSSARY } from '../src/data.js';

const go = () => {};

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('Wavelength views mount cleanly', () => {
  it('renders the app shell on the default (constellation) route', () => {
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

  it('renders every dimension reading view, including the code planes', () => {
    for (const m of DIMS) {
      const { getByRole, unmount } = render(<DimensionView dim={m.key} go={go} />);
      expect(getByRole('heading', { level: 1 }).textContent).toBe(m.name);
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

  it('renders Foundations with its four sections', () => {
    const { getByText } = render(<FoundationsView go={go} />);
    expect(getByText(/What is Legitimation Code/)).toBeTruthy();
    expect(getByText('The move: legitimation codes')).toBeTruthy();
  });

  it('renders the Studio and toggles between drafts', () => {
    const { getByText } = render(<StudioView go={go} />);
    expect(getByText(/Plot a paragraph/)).toBeTruthy();
    fireEvent.click(getByText('Reworked draft'));
    // reworked draft has a 4th sentence the flat draft lacks
    expect(getByText(/economists track as the inflation rate/)).toBeTruthy();
  });

  it('renders the Glossary with the notation key and every key term', () => {
    const { getByText, getAllByText } = render(<GlossaryView go={go} />);
    expect(getByText('The notation')).toBeTruthy();
    for (const g of GLOSSARY) {
      expect(getAllByText(g.term).length).toBeGreaterThan(0);
    }
  });

  it('reaches the Glossary from the nav rail', () => {
    const { getByTitle, getByRole } = render(<App />);
    fireEvent.click(getByTitle('Glossary & notation key'));
    expect(getByRole('heading', { level: 1 }).textContent).toMatch(/Glossary/);
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
