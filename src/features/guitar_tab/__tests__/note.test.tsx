import { describe, expect, it, vi } from 'vitest';
import Note from '../components/notes/Note';
import { render } from '@testing-library/react';
import { TabContextProvider } from '../stores/useTabContext';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { NoteProps } from '../common/tab.type';

describe('note component', () => {
  it('note input', async () => {
    const { getByText, queryByText, rerender } = render(<MockNotes />);

    expect(queryByText('0 0 0')).not.toBeInTheDocument();
    expect(queryByText('1 1 1')).not.toBeInTheDocument();

    await userEvent.click(getByText('0'));
    expect(getByText('0 0 0')).toBeInTheDocument();
    expect(queryByText('1 1 1')).not.toBeInTheDocument();

    await userEvent.click(getByText('1'));
    expect(getByText('1 1 1')).toBeInTheDocument();
    expect(queryByText('0 0 0')).not.toBeInTheDocument();
  });
});

vi.mock('../components/notes/NoteInput', () => ({
  default: ({ fret, str, note }: NoteProps) => {
    return <div>{`${fret} ${str} ${note}`}</div>;
  },
}));

const initProps = {
  id: 'id',
  readonly: false,
  editAccess: true,
};

const MockNotes = () => (
  <TabContextProvider {...initProps}>
    <Note fret="0" note={0} str={0} />
    <Note fret="1" note={1} str={1} />
  </TabContextProvider>
);
