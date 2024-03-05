import { createContext, useContext } from 'react';
import { useSearchParams } from 'next/navigation';

type TabPanelContextProps = {
  apiRoute: string;
  route: string;
  showCreator?: boolean;
  searchQuery: string | null;
};

export const TabPanelContext = createContext<TabPanelContextProps | null>(null);

type TabPanelContextProviderProps = {
  apiRoute: string;
  route: string;
  showCreator?: boolean;
  children: React.ReactNode;
};

export const TabPanelContextProvider = ({
  apiRoute,
  route,
  showCreator,
  children,
}: TabPanelContextProviderProps) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search_query');

  const value = {
    apiRoute,
    route,
    showCreator,
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
      'useTabPanelContext must be called from within the TabContextProvider'
    );

  return context;
};
