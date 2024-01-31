import styles from './guitar_tab.module.scss';
import { useTabContext } from '../../stores/useTabContext';

const TabButtons = () => {
  const { tabDispatch } = useTabContext();

  const handleAddStaff = () => {
    tabDispatch({ type: 'ADD_STAFF' });
  };

  const handleDeleteStaff = () => {
    tabDispatch({ type: 'DELETE_STAFF' });
  };

  return (
    <div className={styles.btnFlex}>
      <button className={styles.btn} onClick={handleAddStaff}>
        Add Staff
      </button>
      <button className={styles.btn} onClick={handleDeleteStaff}>
        Delete Staff
      </button>
    </div>
  );
};

export default TabButtons;
