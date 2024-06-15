'use client';
import styles from './confirm_modal.module.scss';
import ConditionalHandler from '../ConditionalHandler';

const ConfirmModal = ({
  children,
  show,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <ConditionalHandler condition={show}>
      <>
        <div className={styles.modal} onClick={onClose} />
        <div className={styles.dialogue}>
          <div className={styles.text}>{children}</div>
          <div className={styles.buttons}>
            <button
              className={`${styles.button}`}
              aria-label="no"
              onClick={onClose}
            >
              No
            </button>
            <button
              className={`${styles.button}`}
              aria-label="yes"
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
    </ConditionalHandler>
  );
};

export default ConfirmModal;

type ConfirmModalProps = {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
