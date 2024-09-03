import React from 'react';
import { TabEditable, TabSelectable } from '@/common/types.';
import { generateNoteKey, extractNoteKey } from '../common/util';

// This hook moves the active note when the user presses an arrow key on their keyboard
const useHandleKeyDownNote = (
  noteKey: string,
  setActiveKey: React.Dispatch<React.SetStateAction<string | null>>,
  tab: TabSelectable | TabEditable
) => {
  const updateActiveKey = (
    condition: boolean,
    s: number,
    n: number,
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    if (condition) setActiveKey(generateNoteKey(s, n));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = extractNoteKey(noteKey);

    switch (e.key) {
      case 'ArrowLeft': {
        updateActiveKey(key.n !== 0, key.s, key.n - 1, e);
        break;
      }
      case 'ArrowRight': {
        updateActiveKey(key.n !== tab.note_count - 1, key.s, key.n + 1, e);
        break;
      }
      case 'ArrowDown': {
        updateActiveKey(
          key.s !== tab.gtr_string_count - 1,
          key.s + 1,
          key.n,
          e
        );
        break;
      }
      case 'ArrowUp': {
        updateActiveKey(key.s !== 0, key.s - 1, key.n, e);
        break;
      }
      default:
        break;
    }
  };

  return handleKeyDown;
};

export default useHandleKeyDownNote;
