'use client';
import { TabPanelContextProvider } from '../stores/useTabPanelContext';
import { TabPanelContextProviderProps } from '../common/types';

const ContextWrapper = (props: TabPanelContextProviderProps) => {
  return (
    <TabPanelContextProvider {...props}>
      {props.children}
    </TabPanelContextProvider>
  );
};

export default ContextWrapper;
