'use client';
import { useState } from 'react';
import styles from './styles/tab_panel.module.scss';
import { SearchIcon, CloseIcon, RefreshIcon } from '@/assets';
import { useRouter } from 'next/navigation';
import { useTabPanelContext } from '../stores/useTabPanelContext';
import { useQueryContext } from '../stores/useQueryContext';

const SearchForm = ({ title }: SearchFormProps) => {
  const router = useRouter();
  const [curr, setCurr] = useState<string>('');
  const { searchQuery, route } = useTabPanelContext();
  const { query } = useQueryContext();

  const doReset = searchQuery && searchQuery === curr;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (doReset) {
      router.push(route);
      setCurr('');
    } else {
      const params = new URLSearchParams({ search_query: curr });
      router.push(`${route}?${params}`);
    }
  };

  const handleRefresh = () => {
    query.refetch();
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.refreshFlex}>
        <button
          className={`${styles.btn} ${styles.refreshBtn}`}
          title="Refresh"
          onClick={handleRefresh}
        >
          <RefreshIcon />
        </button>
      </div>
      <label htmlFor="tab_search" className={styles.searchLabel}>
        {title}
      </label>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          value={curr}
          className={styles.searchInput}
          type="text"
          id="tab_search"
          placeholder="Search for song or artist"
          onChange={e => setCurr(e.target.value)}
        />
        <button
          aria-label="search"
          className={`${styles.searchBtn} ${styles.btn}`}
          title={doReset ? 'Clear' : 'Search'}
        >
          {doReset ? (
            <CloseIcon className={styles.closeIcon} />
          ) : (
            <SearchIcon />
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;

type SearchFormProps = {
  title: string;
};
