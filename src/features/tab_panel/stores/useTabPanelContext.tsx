import { createContext, useContext, useState } from 'react';
import { TabPanelContextProviderProps } from '../common/types';

type TabPanelProps = {
  queryKey: string;
  apiRoute: string;
  showCreator?: boolean;
  searchQuery: string | null;
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
};

export const TabPanelContext = createContext<TabPanelProps | null>(null);

export const TabPanelContextProvider = ({
  queryKey,
  apiRoute,
  showCreator,
  children,
}: TabPanelContextProviderProps) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const value = {
    queryKey,
    apiRoute,
    showCreator,
    searchQuery,
    setSearchQuery,
  };

  return (
    <TabPanelContext.Provider value={value}>
      {children}
    </TabPanelContext.Provider>
  );
};

export const useTabPanelContext = () => {
  const context = useContext(TabPanelContext);

  if (!context)
    throw new Error(
      'useTabPanelContext must be called from within the TabContextProvider'
    );

  return context;
};
