import { TabPanel } from '@/features/tab_panel';
import { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const MyTabsPage: NextPage = withPageAuthRequired(
  async () => {
    return (
      <TabPanel
        title="My Tabs"
        apiRoute="api/tabs/user"
        route="my_tabs/"
        showCreator={false}
      />
    );
  },
  { returnTo: '/' }
);

export default MyTabsPage;
