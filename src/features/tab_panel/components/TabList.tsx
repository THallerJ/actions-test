'use client';
import { useRef } from 'react';
import Link from 'next/link';
import TabItem from './TabItem';
import styles from './styles/tab_panel.module.scss';
import Spinner from '@/components/spinner/Spinner';
import { LoadingBar } from '@/components';
import { useInfiniteScroll } from '@/hooks';
import { Tab } from '@/common/types.';
import { UseInfiniteQueryResult, InfiniteData } from '@tanstack/react-query';

type TabListProps = {
  query: UseInfiniteQueryResult<InfiniteData<Tab[], unknown>, Error>;
};

const TabList = ({ query }: TabListProps) => {
  const root = useRef(null);

  const lastItemCb = useInfiniteScroll(() => query.fetchNextPage(), root);

  const RenderTabList = () => {
    if (!query.isLoading && query.data) {
      const arr: React.ReactNode[] = [];

      query.data.pages.forEach((page, i) => {
        page.forEach((item, j) => {
          arr.push(
            <Link
              ref={
                j === query.data.pages[i].length - 1 ? lastItemCb : undefined
              }
              key={item._id}
              href={{
                pathname: `/tab_viewer/` + item._id,
              }}
            >
              <TabItem item={item} />
              {showDivider(query.data, i, j) ? (
                <div className={styles.itemDivider} />
              ) : null}
            </Link>
          );
        });
      });

      return arr;
    }
  };

  return (
    <div className={styles.wrapper}>
      {query.isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : null}

      {query.isFetchingNextPage ? (
        <div className={styles.loadingBar}>
          <LoadingBar />
        </div>
      ) : null}

      <div className={styles.tabList} ref={root}>
        {RenderTabList()}
      </div>
    </div>
  );
};

export default TabList;

const showDivider = (
  data: InfiniteData<Tab[], unknown>,
  i: number,
  j: number
): boolean => {
  const pLen = data.pages.length;

  if (
    (i === pLen - 1 || (i === pLen - 2 && data.pages[pLen - 1].length === 0)) &&
    j === data.pages[i].length - 1
  )
    return false;
  else return true;
};
