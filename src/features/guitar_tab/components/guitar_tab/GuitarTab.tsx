'use client';
import GuitarTabChild from './GuitarTabChild';
import { TabContextProvider } from '../../stores/useTabContext';
import { TabSelectable } from '@/common/types.';
import styles from './guitar_tab.module.scss';

type GuitarTabProps = {
  tab?: TabSelectable | null;
  edit?: boolean;
};

const GuitarTab = ({ tab }: GuitarTabProps) => {
  return (
    <div className={styles.wrapper}>
      <TabContextProvider initialTab={tab}>
        <GuitarTabChild />
      </TabContextProvider>
    </div>
  );
};

export default GuitarTab;
