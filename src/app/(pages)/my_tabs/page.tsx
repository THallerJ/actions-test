import { TabPanel } from '@/features/tab_panel';
import { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const MyTabsPage: NextPage = withPageAuthRequired(
  async () => {
    return (
      <TabPanel
        title="My Tabs"
        queryKey="myTabs"
        apiRoute="api/tabs/user"
        showCreator={false}
      />
    );
  },
  { returnTo: '/' }
);

export default MyTabsPage;
