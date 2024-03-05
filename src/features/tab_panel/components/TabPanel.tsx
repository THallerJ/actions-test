import { Suspense } from 'react';
import styles from './styles/tab_panel.module.scss';
import ContextWrapper from './ContextWrapper';
import TabQuery from './TabQuery';
import SearchForm from './SearchForm';

type TabPanelProps = {
  title: string;
  apiRoute: string;
  route: string;
  showCreator?: boolean;
};

const TabPanel = ({ title, ...props }: TabPanelProps) => {
  return (
    <ContextWrapper {...props}>
      <section id="tab-panel" className={styles.tabPanel}>
        <div className={styles.searchWrapper}>
          <label htmlFor="tab_search" className={styles.searchLabel}>
            {title}
          </label>
          <SearchForm />
        </div>
        <Suspense fallback="loading">
          <TabQuery />
        </Suspense>
      </section>
    </ContextWrapper>
  );
};

export default TabPanel;
