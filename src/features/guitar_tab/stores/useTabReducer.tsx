import { useReducer, useEffect } from 'react';
import { ReducerAction } from '../common/tab.type';
import { TabEditable, TabSelectable } from '@/common/types.';
import { TAB_COUNT } from '../common/constants';

const useTabReducer = (initialTab?: TabEditable | TabSelectable | null) => {
  const reducer = (state: TabEditable, action: ReducerAction): TabEditable => {
    switch (action.type) {
      case 'ADD_NOTE': {
        const gtrStr = action.payload.gtrStr;
        const noteNum = action.payload.noteNum;
        const fretNum = action.payload.fretNum;
        const newState = { ...state };

        if (!newState.notes[noteNum]) newState.notes[noteNum] = {};
        if (fretNum === '|') newState.notes[noteNum] = { bar: true };
        else {
          newState.notes[noteNum]['bar'] = false;
          newState.notes[noteNum][gtrStr] = fretNum;
        }

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
      case 'SET': {
        const newState = action.payload.tab;
        return newState;
      }
      case 'RESET': {
        const newState = { ...state };
        newState.notes = {};
        newState.count = TAB_COUNT;
        return newState;
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialTab || INITIAL_TAB);

  useEffect(() => {
    if (initialTab) dispatch({ type: 'SET', payload: { tab: initialTab } });
  }, [initialTab, dispatch]);

  return [state, dispatch] as const;
};

export default useTabReducer;

const INITIAL_TAB: TabEditable = {
  count: TAB_COUNT,
  gtr_string_count: 6,
  notes: {},
};
