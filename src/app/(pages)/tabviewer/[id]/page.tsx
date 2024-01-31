import { Suspense } from 'react';
import DisplayTab from '../components/Tab';

type Params = { params: { id: string } };

const TabViewerPage = ({ params: { id } }: Params) => {
  return (
    <Suspense fallback="loading">
      <DisplayTab id={id} />;
    </Suspense>
  );
};

export default TabViewerPage;
