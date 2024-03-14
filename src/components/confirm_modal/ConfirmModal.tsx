'use client';
import styles from './confirm_modal.module.scss';

const ConfirmModal = ({
  children,
  show,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  return show ? (
    <>
      <div className={styles.modal} onClick={onClose} />
      <div className={styles.dialogue}>
        <div className={styles.text}>{children}</div>
        <div className={styles.buttons}>
          <button className={`${styles.button}`} onClick={onClose}>
            No
          </button>
          <button
            className={`${styles.button}`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default ConfirmModal;

type ConfirmModalProps = {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
