import { getTabDb } from '@/db';
import GuitarTab from '@/features/guitar_tab';

type TabProps = {
  id: string;
};

const Tab = async ({ id }: TabProps) => {
  const tab = await getTabDb(id);

  return <GuitarTab tab={tab} />;
};

export default Tab;
