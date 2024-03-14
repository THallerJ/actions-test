'use client';
import { useRef } from 'react';
import TabItem from './TabItem';
import styles from './styles/tab_panel.module.scss';
import {
  LoadingBar,
  Spinner,
  ConditionalHandler,
  Notification,
  Message,
} from '@/components';
import { useInfiniteScroll } from '@/hooks';
import { TabArrayResp } from '@/common/types.';
import { UseInfiniteQueryResult, InfiniteData } from '@tanstack/react-query';
import { useTabPanelContext } from '../stores/useTabPanelContext';
import { showDivider } from '../common';
import { useQueryContext } from '../stores/useQueryContext';
import Link from 'next/link';

const TabList = () => {
  const { searchQuery } = useTabPanelContext();
  const { query, mutation } = useQueryContext();
  const root = useRef(null);
  const { showError, cancelError } = useQueryContext();
  const lastItemCb = useInfiniteScroll(() => query.fetchNextPage(), root);

  return (
    <div className={styles.wrapper}>
      <Notification
        error
        text="An error has occured"
        show={showError}
        onCancel={cancelError}
      />
      <ConditionalHandler
        condition={
          searchQuery !== null && searchQuery !== '' && !query.isLoading
        }
      >
        <span className={styles.searchMsg}>
          Showing results for {`"${searchQuery}"`}
        </span>
      </ConditionalHandler>
      <ConditionalHandler condition={query.isLoading}>
        <div className={styles.spinner}>
          <Spinner />
        </div>
      </ConditionalHandler>
      <ConditionalHandler
        condition={query.isFetchingNextPage || mutation.isPending}
      >
        <div className={styles.loadingBar}>
          <LoadingBar />
        </div>
      </ConditionalHandler>
      <div className={styles.tabList} ref={root}>
        <RenderTabList query={query} lastItemCb={lastItemCb} />
      </div>
    </div>
  );
};

export default TabList;

const RenderTabList = ({ query, lastItemCb }: RenderTabListProps) => {
  if (!query.isLoading && query.data) {
    const arr: React.ReactNode[] = [];

    query.data.pages.forEach((page, i) => {
      page.tabs.forEach((item, j) => {
        arr.push(
          <div
            ref={
              j === query.data.pages[i].tabs.length - 1 ? lastItemCb : undefined
            }
            key={String(item.id)}
          >
            <TabItem item={item} />
            {showDivider(query.data, i, j) ? (
              <div className={styles.itemDivider} />
            ) : null}
          </div>
        );
      });
    });

    return query.data.pages[0].tabs.length > 0 ? (
      arr
    ) : (
      <div className={styles.emptyListMsg}>
        <Message>
          <span>
            There are no tabs here.{' '}
            <Link href="/tab_editor">
              <span className={styles.msgLink}>Click here</span>
            </Link>{' '}
            to create a tab.
          </span>
        </Message>
      </div>
    );
  }
};

type RenderTabListProps = {
  query: UseInfiniteQueryResult<InfiniteData<TabArrayResp, unknown>, Error>;
  lastItemCb: (elem: HTMLElement | null) => void;
};
