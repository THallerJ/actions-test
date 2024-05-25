import React, { createContext, useContext, useEffect } from 'react';
import { useTabPanelContext } from './useTabPanelContext';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseMutationResult,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { TabArrayResp } from '@/common/types.';
import { onDelete, fetchTabs } from '../common';
import { useAlertContext } from '@/stores';

export const QueryContext = createContext<QueryContextProps | null>(null);

export const QueryContextProvider = ({
  children,
}: QueryContextProviderProps) => {
  const { apiRoute, searchQuery } = useTabPanelContext();
  const queryClient = useQueryClient();
  const queryKey = [apiRoute, searchQuery];
  const { notifyAlert } = useAlertContext();

  const query = useInfiniteQuery<TabArrayResp, Error>({
    queryKey,
    queryFn: ({ pageParam }) => fetchTabs(apiRoute, pageParam, searchQuery),
    getNextPageParam: lastPage => {
      if (lastPage.hasNextPage) return lastPage.nextPage;
    },
    initialPageParam: 0,
  });

  const { error } = query;

  useEffect(() => {
    if (error) {
      notifyAlert({
        isError: true,
        message: 'An error occured when retrieving the tabs',
      });
    }
  }, [error, notifyAlert]);

  const mutation = useMutation({
    mutationFn: (id: number) => onDelete(id),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey,
      });
    },
    onError: () => {
      notifyAlert({
        isError: true,
        message: 'An error occured when deleting the tab',
      });
    },
  });

  const value = {
    query,
    mutation,
  };

  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
};

export const useQueryContext = () => {
  const context = useContext(QueryContext);

  if (!context)
    throw new Error(
      'useQueryContext must be called from within the QueryContextProvider'
    );

  return context;
};

type QueryContextProviderProps = {
  children: React.ReactNode;
};

type QueryContextProps = {
  query: UseInfiniteQueryResult<InfiniteData<TabArrayResp, unknown>, Error>;
  mutation: UseMutationResult<void, globalThis.Error, number, unknown>;
};
