import TabList from './TabList';
import { Suspense } from 'react';
import styles from '../page.module.scss';

const TabPanel = () => {
  return (
    <div className={styles.tabPanel}>
      <div className={styles.search}>
        <label htmlFor="tab_search" className={styles.searchLabel}>
          Search Tabs
        </label>
        <input
          className={styles.searchInput}
          type="text"
          id="tab_search"
          placeholder="Search for song or artist"
        />
      </div>
      <Suspense fallback="loading">
        <TabList />
      </Suspense>
    </div>
  );
};

export default TabPanel;
