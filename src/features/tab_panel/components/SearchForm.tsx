'use client';
import { useState } from 'react';
import styles from './styles/tab_panel.module.scss';
import { SearchIcon, CloseIcon } from '@/assets';
import { useRouter } from 'next/navigation';
import { useTabPanelContext } from '../stores/useTabPanelContext';

const SearchForm = () => {
  const router = useRouter();
  const [curr, setCurr] = useState<string>('');
  const { searchQuery, route } = useTabPanelContext();

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

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        value={curr}
        className={styles.searchInput}
        type="text"
        id="tab_search"
        placeholder="Search for song or artist"
        onChange={e => setCurr(e.target.value)}
      />
      <button aria-label="search" className={styles.searchBtn}>
        {doReset ? <CloseIcon /> : <SearchIcon />}
      </button>
    </form>
  );
};

export default SearchForm;
