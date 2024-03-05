'use client';
import GuitarTabChild from './GuitarTabChild';
import { TabContextProvider } from '../../stores/useTabContext';
import { TabSelectable } from '@/common/types.';
import styles from './guitar_tab.module.scss';

type GuitarTabProps = {
  tab?: TabSelectable | null;
};

const GuitarTab = ({ tab }: GuitarTabProps) => {
  return tab ? (
    <div className={styles.wrapper}>
      <TabContextProvider initialTab={tab}>
        <GuitarTabChild />
      </TabContextProvider>
    </div>
  ) : (
    <span>You do not have access to this tab. It is private.</span>
  );
};

export default GuitarTab;
