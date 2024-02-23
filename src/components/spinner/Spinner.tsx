import styles from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.spinner} />
    </div>
  );
};

export default Spinner;
