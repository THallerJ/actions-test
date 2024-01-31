import Staff from '../staff/Staff';
import TabButtons from './TabButtons';
import TabForm from './TabForm';
import { useTabContext } from '../../stores/useTabContext';

const GuitarTabChild = () => {
  const { readOnly } = useTabContext();

  return (
    <>
      {!readOnly ? <TabButtons /> : null}
      <Staff />
      {!readOnly ? <TabForm /> : null}
    </>
  );
};

export default GuitarTabChild;
