import { useFormStatus } from 'react-dom';
import { ConditionalHandler, LoadingBar } from '@/components';
import styles from './styles/tab_form.module.scss';

const FormPending = () => {
  const { pending } = useFormStatus();

  return (
    <ConditionalHandler condition={pending}>
      <div className={styles.loadingBar}>
        <LoadingBar />
      </div>
    </ConditionalHandler>
  );
};

export default FormPending;
