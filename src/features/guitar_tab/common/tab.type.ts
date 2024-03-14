import { TabEditable, TabSelectable } from '@/common/types.';

export type ReducerAction =
  | { type: 'ADD_STAFF' | 'DELETE_STAFF' | 'RESET' }
  | { type: 'SET'; payload: { tab: TabEditable | TabSelectable } }
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
