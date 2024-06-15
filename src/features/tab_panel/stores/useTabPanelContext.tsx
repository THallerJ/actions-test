import { createContext, useContext } from 'react';
import { useSearchParams } from 'next/navigation';

export const TabPanelContext = createContext<TabPanelContextProps | null>(null);

export const TabPanelContextProvider = ({
  userOnly,
  route,
  children,
}: TabPanelContextProviderProps) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search_query');

  const value = {
    userOnly,
    route,
    searchQuery,
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
      'useTabPanelContext must be called from within the TabPanelContextProvider'
    );

  return context;
};

type TabPanelContextProps = {
  userOnly: boolean;
  route: string;
  searchQuery: string | null;
};

type TabPanelContextProviderProps = {
  userOnly: boolean;
  route: string;
  children: React.ReactNode;
};
