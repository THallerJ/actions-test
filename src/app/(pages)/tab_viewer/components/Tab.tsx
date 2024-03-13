import { getTabDb } from '@/db';
import GuitarTab from '@/features/guitar_tab';

type TabProps = {
  id: string;
};

const Tab = async ({ id }: TabProps) => {
  const tab = await getTabDb(id);

  return tab ? (
    <GuitarTab tab={tab} />
  ) : (
    <span>You do not have access to this tab. It is private.</span>
  );
};

export default Tab;
