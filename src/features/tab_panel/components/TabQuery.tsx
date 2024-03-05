'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TabRespSchema, TabResp } from '@/common/types.';
import { useTabPanelContext } from '../stores/useTabPanelContext';
import TabList from './TabList';

const TabQuery = () => {
  const { apiRoute, searchQuery } = useTabPanelContext();

  const query = useInfiniteQuery<TabResp, Error>({
    queryKey: [apiRoute, searchQuery],
    queryFn: ({ pageParam }) => fetchTabs(apiRoute, pageParam, searchQuery),
    getNextPageParam: lastPage => {
      if (lastPage.hasNextPage) return lastPage.nextPage;
    },
    initialPageParam: 0,
  });

  return <TabList query={query} />;
};

export default TabQuery;

const fetchTabs = async (
  apiRoute: string,
  page?: unknown,
  searchQuery?: string | null
): Promise<TabResp> => {
  const getUrl = (): string => {
    let params = new URLSearchParams();

    if (page && typeof page === 'number') params.append('page', String(page));
    if (searchQuery && searchQuery.length > 0)
      params.append('searchQuery', searchQuery);

    return params.size > 0 ? `${apiRoute}?${params}` : apiRoute;
  };

  const resp = await fetch(getUrl());
  const json = await resp.json();

  const result = TabRespSchema.safeParse(json);

  if (result.success) return result.data;
  else return { nextPage: 0, tabs: [], hasNextPage: false };
};
