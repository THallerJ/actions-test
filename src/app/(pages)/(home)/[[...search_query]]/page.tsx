import { TabPanel } from '@/features/tab_panel';

const Home = async () => {
  return <TabPanel userOnly={false} title="All Tabs" route="/" />;
};

export default Home;
