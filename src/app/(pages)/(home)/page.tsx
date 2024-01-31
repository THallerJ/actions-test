import { unstable_noStore as noStore } from 'next/cache';
import styles from './page.module.scss';
import TabPanel from './components/TabPanel';

const Home = async () => {
  return (
    <div className={styles.page}>
      <TabPanel />
    </div>
  );
};

export default Home;
