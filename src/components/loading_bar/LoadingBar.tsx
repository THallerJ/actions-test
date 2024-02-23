import styles from './loading_bar.module.scss';

const LoadingBar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loading}></div>
    </div>
  );
};

export default LoadingBar;
