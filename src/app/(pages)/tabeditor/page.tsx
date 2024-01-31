import GuitarTab from '@/features/guitar_tab';
import { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const TabEditorPage: NextPage = withPageAuthRequired(
  async () => {
    return <GuitarTab />;
  },
  { returnTo: '/' }
);

export default TabEditorPage;
