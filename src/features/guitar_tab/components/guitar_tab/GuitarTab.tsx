'use client';
import GuitarTabChild from './GuitarTabChild';
import { TabContextProvider } from '../../stores/useTabContext';
import { Tab } from '@/common/types.type';
import styles from './guitar_tab.module.scss';

type GuitarTabProps = {
  tab?: Tab | null;
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
