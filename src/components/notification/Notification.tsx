'use client';
import styles from './notification.module.scss';
import ConditionalHandler from '../ConditionalHandler';
import { CloseIcon } from '@/assets';

const Notification = ({ show, text, error, onCancel }: NotificationProps) => {
  return (
    <ConditionalHandler condition={show}>
      <div className={`${styles.wrapper} ${error ? styles.error : null}`}>
        <span>{text}</span>
        <button className={styles.btn} onClick={onCancel}>
          <CloseIcon className={styles.close} />
        </button>
      </div>
    </ConditionalHandler>
  );
};

export default Notification;

type NotificationProps = {
  show: boolean;
  text: string;
  error?: boolean;
  onCancel: () => void;
};
