'use client';
import { useState } from 'react';
import styles from './styles/tab_panel.module.scss';
import { SearchIcon } from '@/assets';
import { useTabPanelContext } from '../stores/useTabPanelContext';

const SearchForm = () => {
  const [curr, setCurr] = useState('');
  const { setSearchQuery } = useTabPanelContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(curr);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        type="text"
        id="tab_search"
        placeholder="Search for song or artist"
        onChange={e => setCurr(e.target.value)}
      />
      <button className={styles.searchBtn}>
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchForm;
