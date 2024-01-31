import { Tab } from '@/common/types.type';
import styles from '../page.module.scss';

type TabItemProps = {
  item: Tab;
};

const TabItem = ({ item }: TabItemProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.infoCol}>
        <span className={styles.songTitle}>{item.title}</span>
        <span className={styles.artistTitle}>{item.artist}</span>
      </div>
      <span className={styles.user}>{item.user}</span>
    </div>
  );
};

export default TabItem;
