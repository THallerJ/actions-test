import { Tab } from '@/common/types.';
import styles from './styles/tab_panel.module.scss';
import { useTabPanelContext } from '../stores/useTabPanelContext';

type TabItemProps = {
  item: Tab;
};

const TabItem = ({ item }: TabItemProps) => {
  const { showCreator } = useTabPanelContext();

  return (
    <div className={styles.item}>
      <div className={showCreator ? styles.infoCol : styles.infoColFull}>
        <span className={styles.songTitle}>{item.title}</span>
        <span className={styles.artistTitle}>{item.artist}</span>
      </div>
      {showCreator ? (
        <div className={styles.createdCol}>
          <span className={styles.createdBy}>created by: {item.user}</span>
        </div>
      ) : null}
    </div>
  );
};

export default TabItem;
