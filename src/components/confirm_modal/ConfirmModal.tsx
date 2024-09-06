'use client';
import styles from './confirm_modal.module.scss';
import ConditionalHandler from '../ConditionalHandler';

const ConfirmModal = ({
  children,
  show,
  onClose,
  onConfirm,
  noText,
  yesText,
  alignRight,
}: ConfirmModalProps) => {
  return (
    <ConditionalHandler condition={show}>
      <>
        <div className={styles.modal} onClick={onClose} />
        <div className={styles.dialogue}>
          <div className={styles.text}>{children}</div>
          <div
            className={`${!alignRight ? styles.buttons : styles.buttonsRight}`}
          >
            <button
              className={`${styles.button}`}
              aria-label="No"
              onClick={onClose}
            >
              {noText ? noText : 'No'}
            </button>

            {onConfirm ? (
              <button
                className={`${styles.button}`}
                aria-label="Yes"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {yesText ? yesText : 'Yes'}
              </button>
            ) : null}
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
  onConfirm?: () => void;
  noText?: string;
  yesText?: string;
  alignRight?: boolean;
};
