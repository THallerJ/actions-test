import { TabPanel } from '@/features/tab_panel';

const Home = async () => {
  return (
    <TabPanel
      apiRoute="api/tabs/all"
      queryKey="allTabs"
      title="All Tabs"
      showCreator
    />
  );
};

export default Home;
