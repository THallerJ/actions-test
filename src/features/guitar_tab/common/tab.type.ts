export type Tab = {
  user?: string;
  count: number;
  gtr_string_count: number;
  notes: Record<number, Record<number, string>>;
};

export type ReducerAction =
  | { type: 'ADD_STAFF' | 'DELETE_STAFF' }
  | {
      type: 'ADD_NOTE';
      payload: { gtrStr: number; noteNum: number; fretNum: string };
    }
  | {
      type: 'DELETE_NOTE';
      payload: { gtrStr: number; noteNum: number };
    };

export type NoteProps = {
  fret?: string;
  note: number;
  str: number;
};
