import { TabArrayResp, TabArrayRespSchema } from '@/common/types.';
import { InfiniteData } from '@tanstack/react-query';

export const fetchTabs = async (
  apiRoute: string,
  page?: unknown,
  searchQuery?: string | null
): Promise<TabArrayResp> => {
  const getUrl = (): string => {
    const params = new URLSearchParams();

    if (page && typeof page === 'number') params.append('page', String(page));
    if (searchQuery && searchQuery.length > 0)
      params.append('searchQuery', searchQuery);

    return params.size > 0 ? `${apiRoute}?${params}` : apiRoute;
  };

  const resp = await fetch(getUrl());
  const json = await resp.json();

  const result = TabArrayRespSchema.safeParse(json);

  if (result.success) return result.data;
  else return { nextPage: 0, tabs: [], hasNextPage: false };
};

export const onDelete = async (id: number) => {
  if (id) {
    const params = new URLSearchParams();
    params.append('id', String(id));
    await fetch(`/api/tab?${params}`, { method: 'DELETE' });
  }
};

export const showDivider = (
  data: InfiniteData<TabArrayResp, unknown>,
  i: number,
  j: number
): boolean => {
  const pLen = data.pages.length;

  if (
    (i === pLen - 1 ||
      (i === pLen - 2 && data.pages[pLen - 1].tabs.length === 0)) &&
    j === data.pages[i].tabs.length - 1
  )
    return false;
  else return true;
};
