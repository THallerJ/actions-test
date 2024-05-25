'use client';
import { useEffect } from 'react';
import { TabRespSchema } from '@/common/types.';
import { useQuery } from '@tanstack/react-query';
import { TabContextProvider } from '../../stores/useTabContext';
import styles from './guitar_tab.module.scss';
import GuitarTabChild from './GuitarTabChild';
import { useAlertContext } from '@/stores';

const GuitarTab = ({ id, readonly }: GuitarTabProps) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [id],
    queryFn: () => fetchTab(id, readonly),
  });
  const { notifyAlert } = useAlertContext();

  useEffect(() => {
    if (error) {
      notifyAlert({
        isError: true,
        message: 'An error occured when retrieving the tab',
      });
    }
  }, [error, notifyAlert]);

  return (
    <div className={styles.wrapper}>
      <TabContextProvider
        id={id}
        readonly={readonly}
        initialTab={data?.tab}
        editAccess={data?.editAccess}
      >
        <GuitarTabChild isLoading={isLoading} isError={isError} />
      </TabContextProvider>
    </div>
  );
};

export default GuitarTab;

const fetchTab = async (id?: string, readonly?: boolean) => {
  if (id) {
    const params = new URLSearchParams();
    params.append('id', id);
    if (readonly) params.append('readonly', 'true');

    const resp = await fetch(`/api/tab?${params}`);
    const json = await resp.json();

    const result = TabRespSchema.safeParse(json);

    if (result.success) return result.data;
    else throw Error();
  }

  return null;
};

type GuitarTabProps = {
  id?: string;
  readonly?: boolean;
};
