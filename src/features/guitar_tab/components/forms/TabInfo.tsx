import { useTabContext } from '../../stores/useTabContext';
import styles from './styles/tab_form.module.scss';
import { TabSelectableSchema } from '@/common/types.';
import { ConditionalHandler } from '@/components';

const TabInfo = ({ full }: TabInfoProps) => {
  const { tab, hadIntitialTab } = useTabContext();
  const result = TabSelectableSchema.safeParse(tab);

  if (result.success)
    return (
      <>
        <ConditionalHandler condition={full || false}>
          <div className={styles.fullForm}>
            <div className={styles.leftNoInput}>
              <div className={styles.textNoInputLabel}>
                <label htmlFor="title" className={styles.textLabelNoInput}>
                  Song Title
                </label>
                <span className={styles.text}>{result.data.title}</span>
              </div>
              <VerticalDivider />
              <div className={styles.textNoInputLabel}>
                <label htmlFor="title" className={styles.textLabelNoInput}>
                  Artist
                </label>
                <span className={styles.text}>{result.data.artist}</span>
              </div>
            </div>
            <div className={`${styles.textNoInputLabel} ${styles.hideMobile}`}>
              <label htmlFor="title" className={styles.textLabelNoInput}>
                Created By
              </label>
              <span className={styles.text}>{result.data.user}</span>
            </div>
          </div>
        </ConditionalHandler>
        <div
          className={`${hadIntitialTab ? styles.tabInfoWrapper : styles.hide}`}
        >
          <div className={full ? styles.tabInfoFull : styles.tabInfo}>
            <span className={styles.tabInfoText}>
              {result.success ? result.data.artist : null}
            </span>
            <VerticalDivider />
            <span className={styles.tabInfoText}>
              {result.success ? result.data.title : null}
            </span>
          </div>
        </div>
      </>
    );
};

export default TabInfo;

const VerticalDivider = () => {
  return (
    <div className={`${styles.verticalDivider} ${styles.hideDesktop}`}></div>
  );
};

type TabInfoProps = {
  full?: boolean;
};
