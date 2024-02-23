import { useReducer } from 'react';
import { ReducerAction } from '../common/tab.type';
import { Tab } from '@/common/types.';

const useTabReducer = (initialTab?: Tab | null) => {
  const reducer = (state: Tab, action: ReducerAction): Tab => {
    switch (action.type) {
      case 'ADD_NOTE': {
        const gtrStr = action.payload.gtrStr;
        const noteNum = action.payload.noteNum;
        const fretNum = action.payload.fretNum;
        const newState = { ...state };

        if (!newState.notes[noteNum]) newState.notes[noteNum] = {};
        newState.notes[noteNum][gtrStr] = fretNum;
        return newState;
      }
      case 'DELETE_NOTE': {
        const gtrStr = action.payload.gtrStr;
        const noteNum = action.payload.noteNum;
        const newState = { ...state };

        if (newState.notes[noteNum] && newState.notes[noteNum][gtrStr])
          delete newState.notes[noteNum][gtrStr];

        if (
          newState.notes[noteNum] &&
          Object.keys(newState.notes[noteNum]).length === 0
        )
          delete newState.notes[noteNum];

        return newState;
      }
      case 'ADD_STAFF': {
        const newState = { ...state };
        newState.count += TAB_COUNT;
        return newState;
      }
      case 'DELETE_STAFF': {
        if (state.count > TAB_COUNT) {
          const newState = { ...state };

          for (let i = state.count - TAB_COUNT; i < state.count; i++) {
            delete newState.notes[i];
          }

          newState.count -= TAB_COUNT;
          return newState;
        } else {
          return state;
        }
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialTab || INITIAL_TAB);

  return [state, dispatch] as const;
};

export default useTabReducer;

const TAB_COUNT = 20;

const INITIAL_TAB: Tab = {
  count: 20,
  gtr_string_count: 6,
  notes: {},
};
