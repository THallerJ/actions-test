import { createContext, useState, useContext, useEffect } from 'react';
import { ReducerAction } from '../common/tab.type';
import useTabReducer from './useTabReducer';
import { Tab } from '@/common/types.';

type TabContextProps = {
  activeKey: string | null;
  setActiveKey: React.Dispatch<React.SetStateAction<string | null>>;
  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  tab: Tab;
  tabDispatch: React.Dispatch<ReducerAction>;
  readOnly: boolean;
};

export const TabContext = createContext<TabContextProps | null>(null);

type TabContextProviderProps = {
  initialTab?: Tab | null;
  children: React.ReactNode;
};

export const TabContextProvider = ({
  initialTab,
  children,
}: TabContextProviderProps) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [tab, tabDispatch] = useTabReducer(initialTab);
  const [readOnly, setReadOnly] = useState<boolean>(true);

  useEffect(() => {
    if (!initialTab) setReadOnly(false);
  }, [initialTab]);

  const value = {
    activeKey,
    setActiveKey,
    tab,
    showInput,
    setShowInput,
    tabDispatch,
    readOnly,
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
