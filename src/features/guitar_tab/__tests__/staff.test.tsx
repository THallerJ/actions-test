import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TabSelectable } from '@/common/types.';
import { render, within } from '@testing-library/react';
import Staff from '../components/notes/Staff';
import { TabContextProvider } from '../stores/useTabContext';
import '@testing-library/jest-dom/vitest';
import { NoteProps } from '../common/tab.type';

vi.mock('../components/notes/Note.tsx', () => ({
  default: ({ note, str, fret }: NoteProps) => (
    <div data-testid={`${note}n${str}s`}>{fret}</div>
  ),
}));

const mockTab = vi.fn();

mockTab.mockReturnValue({
  id: 0,
  created_at: new Date(),
  title: 'song',
  artist: 'artist',
  username: 'user',
  is_private: true,
  note_count: 20,
  gtr_string_count: 6,
  notes: {},
});

let tab = mockTab();

beforeEach(() => {
  tab = mockTab();
});

describe('render staff', () => {
  it('count strings', () => {
    const { getByTestId, queryByTestId, rerender } = render(<MockStaff />);

    expect(getByTestId('0n0s')).toBeInTheDocument();
    expect(getByTestId('0n5s')).toBeInTheDocument();
    expect(queryByTestId('0n6s')).not.toBeInTheDocument();

    tab = { ...tab, note_count: 80, gtr_string_count: 9 };
    rerender(<MockStaff />);

    expect(getByTestId('0n0s')).toBeInTheDocument();
    expect(getByTestId('0n8s')).toBeInTheDocument();
    expect(queryByTestId('0n9s')).not.toBeInTheDocument();
  });

  it('count notes', () => {
    tab = { ...tab, note_count: 20, gtr_string_count: 6 };
    const { queryByTestId, getByTestId, rerender } = render(<MockStaff />);

    expect(getByTestId('0n0s')).toBeInTheDocument();
    expect(getByTestId('19n0s')).toBeInTheDocument();
    expect(queryByTestId('20n0s')).not.toBeInTheDocument();

    tab = { ...tab, note_count: 80, gtr_string_count: 9 };
    rerender(<MockStaff />);

    expect(getByTestId('0n0s')).toBeInTheDocument();
    expect(getByTestId('79n0s')).toBeInTheDocument();
    expect(queryByTestId('80n0s')).not.toBeInTheDocument();
  });

  it('display fret number', () => {
    tab = {
      ...tab,
      note_count: 20,
      gtr_string_count: 6,
      notes: {
        '1': { 1: '1', 3: '12', bar: false },
        '19': { 2: '5', bar: false },
      },
    };
    const { getByTestId } = render(<MockStaff />);

    expect(within(getByTestId('1n1s')).getByText('1')).toBeInTheDocument();
    expect(within(getByTestId('1n3s')).getByText('12')).toBeInTheDocument();
    expect(within(getByTestId('19n2s')).getByText('5')).toBeInTheDocument();
    expect(
      within(getByTestId('18n2s')).queryByText('5')
    ).not.toBeInTheDocument();
  });
});

const MockStaff = () => (
  <TabContextProvider initialTab={tab}>
    <Staff />
  </TabContextProvider>
);
