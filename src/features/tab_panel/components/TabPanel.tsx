'use client';
import styles from './styles/tab_panel.module.scss';
import TabList from './TabList';
import SearchForm from './SearchForm';
import { TabPanelContextProvider } from '../stores/useTabPanelContext';
import { QueryContextProvider } from '../stores/useQueryContext';

const TabPanel = ({ title, ...props }: TabPanelProps) => {
  return (
    <TabPanelContextProvider {...props}>
      <section id="tab-panel" className={styles.tabPanel}>
        <div className={styles.searchWrapper}>
          <label htmlFor="tab_search" className={styles.searchLabel}>
            {title}
          </label>
          <SearchForm />
        </div>
        <QueryContextProvider>
          <TabList />
        </QueryContextProvider>
      </section>
    </TabPanelContextProvider>
  );
};

export default TabPanel;

type TabPanelProps = {
  title: string;
  apiRoute: string;
  route: string;
};
