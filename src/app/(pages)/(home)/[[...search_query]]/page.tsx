import { TabPanel } from '@/features/tab_panel';

const Home = async () => {
  return <TabPanel apiRoute="api/tabs/all" title="All Tabs" route="/" />;
};

export default Home;
