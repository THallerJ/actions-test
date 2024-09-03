import { ConfirmModal } from '@/components';
import styles from './styles/tab_form.module.scss';

const TutorialModal = ({ show, onClose }: TutorialModalProps) => {
  return (
    <ConfirmModal show={show} onClose={onClose} noText="Close" alignRight>
      <div className={styles.title}>Tutorial</div>

      <div className={styles.list}>
        <ul>
          <li className={styles.listItem}>
            {
              'Press the \u2190 \u2191 \u2192 \u2193 keys to navigate between notes in the tab editor'
            }
          </li>
          <li className={styles.listItem}>
            {"Save note by typing the note and hitting 'Enter'"}
          </li>
          <li className={styles.listItem}>
            {'Delete a note by overwriting it with an empty note'}
          </li>
          <li className={styles.listItem}>
            {"Create a measure by saving the '|' symobl "}
          </li>
        </ul>
      </div>
    </ConfirmModal>
  );
};

export default TutorialModal;

type TutorialModalProps = {
  show: boolean;
  onClose: () => void;
};
