import { createContext, useState, useContext } from 'react';
import { ReducerAction } from '../common/tab.type';
import useTabReducer from './useTabReducer';
import { TabEditable, TabSelectable } from '@/common/types.';

type TabContextProps = {
  activeKey: string | null;
  setActiveKey: React.Dispatch<React.SetStateAction<string | null>>;
  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  tab: TabSelectable | TabEditable;
  tabDispatch: React.Dispatch<ReducerAction>;
  readonly: boolean;
  hadIntitialTab: boolean;
  editAccess: boolean;
  id: string | null;
  isNewTab: boolean;
};

export const TabContext = createContext<TabContextProps | null>(null);

type TabContextProviderProps = {
  id?: string;
  initialTab?: TabSelectable | null;
  readonly?: boolean;
  editAccess?: boolean;
  children: React.ReactNode;
};

export const TabContextProvider = ({
  id,
  initialTab,
  readonly,
  editAccess,
  children,
}: TabContextProviderProps) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [tab, tabDispatch] = useTabReducer(initialTab);

  const value = {
    activeKey,
    setActiveKey,
    tab,
    showInput,
    setShowInput,
    tabDispatch,
    id: id ? id : null,
    isNewTab: id === undefined,
    hadIntitialTab: initialTab !== undefined && initialTab !== null,
    readonly: readonly ? readonly : false,
    editAccess: editAccess ? editAccess : false,
  };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export const useTabContext = () => {
  const context = useContext(TabContext);

  if (!context)
    throw new Error(
      'useTabContext must be called from within the TabContextProvider'
    );

  return context;
};
