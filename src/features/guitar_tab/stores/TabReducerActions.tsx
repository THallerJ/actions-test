import { AddNoteAction, DeleteNoteAction, SetAction } from '../common/tab.type';
import { TabEditable, TabSelectable } from '@/common/types.';
import { TAB_COUNT } from '../common/constants';

export const addNote = (
  state: TabEditable | TabSelectable,
  action: AddNoteAction
) => {
  const gtrStr = action.payload.gtrStr;
  const noteNum = action.payload.noteNum;
  const fretNum = action.payload.fretNum;
  const newState = { ...state };

  if (gtrStr >= newState.gtr_string_count)
    newState.gtr_string_count = gtrStr + 1;

  if (noteNum >= newState.note_count)
    newState.note_count = TAB_COUNT * Math.ceil((TAB_COUNT + 1) / 20);

  if (!newState.notes[noteNum]) newState.notes[noteNum] = {};

  if (fretNum === '|') {
    newState.notes[noteNum] = { bar: true };
  } else {
    newState.notes[noteNum]['bar'] = false;
    newState.notes[noteNum][gtrStr] = fretNum;
  }

  return newState;
};

export const deleteNote = (
  state: TabEditable | TabSelectable,
  action: DeleteNoteAction
) => {
  const gtrStr = action.payload.gtrStr;
  const noteNum = action.payload.noteNum;
  const newState = { ...state };

  if (newState.notes[noteNum] && newState.notes[noteNum][gtrStr])
    delete newState.notes[noteNum][gtrStr];

  if (
    newState.notes[noteNum] &&
    Object.keys(newState.notes[noteNum]).length === 1
  )
    delete newState.notes[noteNum];

  return newState;
};

export const addStaff = (state: TabEditable | TabSelectable) => {
  const newState = { ...state };
  newState.note_count += TAB_COUNT;
  return newState;
};

export const deleteStaff = (state: TabEditable | TabSelectable) => {
  if (state.note_count > TAB_COUNT) {
    const newState = { ...state };

    for (let i = state.note_count - TAB_COUNT; i < state.note_count; i++) {
      delete newState.notes[i];
    }

    newState.note_count -= TAB_COUNT;
    return newState;
  } else {
    return state;
  }
};

export const set = (action: SetAction) => {
  const newState = action.payload.tab;
  return newState;
};

export const reset = (state: TabEditable | TabSelectable) => {
  const newState = { ...state };
  newState.notes = {};
  newState.note_count = TAB_COUNT;
  return newState;
};
