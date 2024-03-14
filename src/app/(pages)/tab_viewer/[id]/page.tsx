import GuitarTab from '@/features/guitar_tab';

type Params = { params: { id: string } };

const TabViewerPage = ({ params: { id } }: Params) => {
  return <GuitarTab id={id} readonly={true} />;
};

export default TabViewerPage;
