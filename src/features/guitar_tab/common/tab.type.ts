import { TabEditable } from '@/common/types.';

export type NoPayloadAction =
  | { type: 'ADD_STAFF' }
  | { type: 'DELETE_STAFF' }
  | { type: 'RESET' };

export type AddNoteAction = {
  type: 'ADD_NOTE';
  payload: { gtrStr: number; noteNum: number; fretNum: string };
};

export type DeleteNoteAction = {
  type: 'DELETE_NOTE';
  payload: { gtrStr: number; noteNum: number };
};

export type SetAction = { type: 'SET'; payload: { tab: TabEditable } };

export type ReducerAction =
  | NoPayloadAction
  | AddNoteAction
  | DeleteNoteAction
  | SetAction;

export type NoteProps = {
  fret?: string;
  note: number;
  str: number;
};
