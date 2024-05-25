import { useState } from 'react';
import styles from './styles/tab_form.module.scss';
import TabForm from './TabForm';
import { DownIcon, UpIcon } from '@/assets';
import { useAnimationCss } from '@/hooks';
import TabInfo from './TabInfo';

const Form = () => {
  const [showForm, setShowForm] = useState(false);
  const animation = useAnimationCss(
    showForm,
    styles.showForm,
    styles.hideForm,
    styles.defaultStyle
  );

  const toggleShowForm = () => setShowForm(prev => !prev);

  return (
    <div className={styles.formWrapper}>
      <button
        aria-label="toggle form"
        className={`${styles.openFormBtn} ${styles.hideDesktop}`}
        onClick={toggleShowForm}
      >
        <TabInfo />

        <div className={styles.formMobileToggleFooterWrapper}>
          <div className={styles.formMobileToggleFooter}>
            <span>Submit Tab</span>
            {showForm ? <UpIcon /> : <DownIcon />}
          </div>
        </div>
      </button>
      <div className={`${styles.formPanel} ${animation}`}>
        <TabForm />
      </div>
    </div>
  );
};

export default Form;
