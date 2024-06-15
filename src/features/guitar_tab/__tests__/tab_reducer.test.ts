import { describe, expect, it } from 'vitest';
import { TAB_COUNT } from '../common/constants';
import { TabSelectable, TabEditable } from '@/common/types.';
import {
  addNote,
  addStaff,
  deleteNote,
  deleteStaff,
} from '../stores/TabReducerActions';
import { AddNoteAction, DeleteNoteAction } from '../common/tab.type';
import { beforeEach } from 'node:test';

let tab = {};

beforeEach(() => {
  tab = {
    id: 0,
    created_at: new Date(),
    title: 'song',
    artist: 'artist',
    username: 'user',
    is_private: true,
    note_count: 40,
    gtr_string_count: 6,
    notes: { '1': { 1: '1', 3: '12', bar: false }, '12': { bar: true } },
  };
});

describe('tab reducer actions', () => {
  it('add note', () => {
    let tab: TabEditable = {
      notes: {},
      gtr_string_count: 6,
      note_count: TAB_COUNT,
    };

    let newNote: AddNoteAction = {
      type: 'ADD_NOTE',
      payload: { gtrStr: 6, noteNum: 20, fretNum: '4' },
    };

    tab = addNote(tab, newNote);
    expect(tab.note_count).toBe(40);
    expect(tab.gtr_string_count).toBe(7);
    expect(tab.notes[20][6]).toBe('4');
    expect(tab.notes[20].bar).toBe(false);

    newNote = {
      type: 'ADD_NOTE',
      payload: { gtrStr: 0, noteNum: 24, fretNum: '|' },
    };

    tab = addNote(tab, newNote);
    expect(tab.note_count).toBe(40);
    expect(tab.gtr_string_count).toBe(7);
    expect(tab.notes[20][6]).toBe('4');

    expect(tab.notes[20].bar).toBe(false);
    expect(tab.notes[24].bar).toBe(true);

    newNote = {
      type: 'ADD_NOTE',
      payload: { gtrStr: 3, noteNum: 20, fretNum: '6' },
    };

    tab = addNote(tab, newNote);
    expect(tab.notes[20][6]).toBe('4');
    expect(tab.notes[20][3]).toBe('6');
    expect(Object.keys(tab.notes).length).toBe(2);
    expect(Object.keys(tab.notes[20]).length).toBe(3);

    newNote = {
      type: 'ADD_NOTE',
      payload: { gtrStr: 0, noteNum: 20, fretNum: '|' },
    };

    tab = addNote(tab, newNote);
    expect(tab.notes[20].bar).toBe(true);
  });

  it('delete note', () => {
    let tab: TabSelectable = {
      id: 0,
      created_at: new Date(),
      title: 'song',
      artist: 'artist',
      username: 'user',
      is_private: true,
      note_count: 40,
      gtr_string_count: 6,
      notes: { '1': { 1: '1', 3: '12', bar: false }, '12': { bar: true } },
    };

    let deletedNote: DeleteNoteAction = {
      type: 'DELETE_NOTE',
      payload: { gtrStr: 3, noteNum: 1 },
    };

    tab = deleteNote(tab, deletedNote) as TabSelectable;
    expect(Object.keys(tab.notes[1]).length).toBe(2);

    deletedNote = {
      type: 'DELETE_NOTE',
      payload: { gtrStr: 1, noteNum: 1 },
    };

    tab = deleteNote(tab, deletedNote) as TabSelectable;
    expect(Object.keys(tab.notes).length).toBe(1);

    tab = deleteNote(tab, deletedNote) as TabSelectable;
    expect(Object.keys(tab.notes).length).toBe(1);
    expect(tab.notes[12]['bar']).toBe(true);
  });

  it('change staff size', () => {
    let tab: TabEditable = {
      notes: {},
      gtr_string_count: 6,
      note_count: TAB_COUNT,
    };

    tab = addStaff(tab);
    expect(tab.note_count).toBe(40);
    tab = addStaff(tab);
    expect(tab.note_count).toBe(60);

    tab = deleteStaff(tab);
    expect(tab.note_count).toBe(40);
    tab = deleteStaff(tab);
    expect(tab.note_count).toBe(20);
    tab = deleteStaff(tab);
    expect(tab.note_count).toBe(20);

    tab = {
      notes: { '39': { 3: '12' }, '20': { 0: '13' } },
      gtr_string_count: 6,
      note_count: TAB_COUNT * 2,
    };

    tab = deleteStaff(tab);
    expect(tab.note_count).toBe(20);
    expect(Object.keys(tab.notes).length).toBe(0);
  });
});
