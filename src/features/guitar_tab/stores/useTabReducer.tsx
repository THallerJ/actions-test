import { useReducer, useEffect } from 'react';
import { ReducerAction } from '../common/tab.type';
import { TabEditable, TabSelectable } from '@/common/types.';
import { TAB_COUNT } from '../common/constants';
import {
  addNote,
  addStaff,
  deleteNote,
  deleteStaff,
  reset,
  set,
} from './TabReducerActions';

const useTabReducer = (initialTab?: TabEditable | TabSelectable | null) => {
  const reducer = (
    state: TabEditable | TabSelectable,
    action: ReducerAction
  ): TabEditable | TabSelectable => {
    switch (action.type) {
      case 'ADD_NOTE':
        return addNote(state, action);
      case 'DELETE_NOTE':
        return deleteNote(state, action);
      case 'ADD_STAFF':
        return addStaff(state);
      case 'DELETE_STAFF':
        return deleteStaff(state);
      case 'SET':
        return set(action);
      case 'RESET':
        return reset(state);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialTab || INITIAL_TAB);

  useEffect(() => {
    if (initialTab) dispatch({ type: 'SET', payload: { tab: initialTab } });
  }, [initialTab, dispatch]);

  return [state, dispatch] as const satisfies [
    TabSelectable | TabEditable,
    React.Dispatch<ReducerAction>
  ];
};

export default useTabReducer;

const INITIAL_TAB: TabEditable = {
  note_count: TAB_COUNT,
  gtr_string_count: 6,
  notes: {},
};
