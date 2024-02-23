'use client';
import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Tab } from '@/common/types.';
import { useTabPanelContext } from '../stores/useTabPanelContext';
import TabList from './TabList';
// TODO: use query keys for search filter
const TabBrowse = () => {
  const { queryKey, apiRoute } = useTabPanelContext();

  const query = useInfiniteQuery<Tab[], Error>({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) => fetchTabs(apiRoute, pageParam),
    getNextPageParam: lastPage =>
      lastPage.length ? lastPage[lastPage.length - 1]._id : undefined,
    initialPageParam: undefined,
  });

  return <TabList query={query} />;
};

export default TabBrowse;

const fetchTabs = async (apiRoute: string, id?: unknown): Promise<Tab[]> => {
  const getUrl = (): string => {
    if (id && typeof id === 'string') {
      const params = new URLSearchParams({
        id,
      });

      return `${apiRoute}?${params}`;
    } else return apiRoute;
  };

  const resp = await fetch(getUrl());
  return await resp.json();
};
