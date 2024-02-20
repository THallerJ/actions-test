import { getTabsArrayDb } from '@/db';
import Link from 'next/link';
import TabItem from './TabItem';
import styles from '../page.module.scss';

const TabList = async () => {
  const tabs = await getTabsArrayDb();

  return (
    <div className={styles.tabList}>
      {tabs?.map((item, i) => (
        <Link
          key={item._id}
          href={{
            pathname: `/tabviewer/` + item._id,
          }}
        >
          <TabItem item={item} />
          {i < tabs.length - 1 ? <div className={styles.itemDivider} /> : null}
        </Link>
      ))}
    </div>
  );
};

export default TabList;
