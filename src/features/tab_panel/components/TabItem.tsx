'use client';
import { useState } from 'react';
import { TabSelectable } from '@/common/types.';
import styles from './styles/tab_panel.module.scss';
import Link from 'next/link';
import { ConditionalHandler, ConfirmModal } from '@/components';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useQueryContext } from '../stores/useQueryContext';

const TabItem = ({ item }: TabItemProps) => {
  const { user } = useUser();
  const [showDelete, setShowDelete] = useState(false);
  const { mutation } = useQueryContext();

  return (
    <div className={styles.item}>
      <Link
        prefetch={false}
        href={{
          pathname: `/tab_viewer/` + item.id,
        }}
        className={styles.infoCol}
      >
        <ConditionalHandler condition={item.private}>
          <span className={styles.private}>Private</span>
        </ConditionalHandler>
        <span className={styles.songTitle}>{item.title}</span>
        <span className={styles.artistTitle}>{item.artist}</span>
      </Link>
      <div className={styles.rightSide}>
        <ConditionalHandler condition={user?.nickname === item?.user}>
          <button
            aria-label="delete"
            className={styles.deleteBtn}
            onClick={() => setShowDelete(true)}
          >
            Delete
          </button>
        </ConditionalHandler>
        <div className={styles.createdCol}>
          <span className={styles.createdBy}>created by: {item.user}</span>
        </div>
      </div>
      <ConfirmModal
        onConfirm={() => mutation.mutate(item.id)}
        onClose={() => setShowDelete(false)}
        show={user?.nickname === item.user && showDelete}
      >
        <span>
          Are you sure you want to delete{' '}
          <b className={styles.italic}>{item.title}</b> by{' '}
          <b className={styles.italic}>{item.artist}</b>
        </span>
      </ConfirmModal>
    </div>
  );
};

type TabItemProps = {
  item: TabSelectable;
};

export default TabItem;
