'use client';
import styles from './notification.module.scss';
import { CloseIcon } from '@/assets';

const Notification = ({ show, text, error, onCancel }: NotificationProps) => {
  return (
    <div
      className={`${styles.wrapper} ${show ? styles.show : null} ${
        error ? styles.error : null
      }`}
    >
      <span>{text}</span>
      <button aria-label="close" className={styles.btn} onClick={onCancel}>
        <CloseIcon className={styles.close} />
      </button>
    </div>
  );
};

export default Notification;

type NotificationProps = {
  show: boolean;
  text: string;
  error?: boolean;
  onCancel: () => void;
};
