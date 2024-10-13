import { useState } from 'react';
import styles from './styles/tab_form.module.scss';
import { useTabContext } from '../../stores/useTabContext';
import Link from 'next/link';
import { ConditionalHandler, ConfirmModal } from '@/components';
import { TAB_COUNT } from '../../common/constants';
import { TabSelectableSchema } from '@/common/types.';
import { QuestionIcon } from '@/assets';
import TutorialModal from './TutorialModal';
import { getUrlSlug } from '@/common/utils';

const TabButtons = () => {
  const { readonly } = useTabContext();

  return (
    <div className={styles.wrapper}>
      {!readonly ? <EditorButtons /> : <ViewerButtons />}
    </div>
  );
};

export default TabButtons;

const EditorButtons = () => {
  const { tabDispatch, tab } = useTabContext();
  const [showDelete, setShowDelete] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleAddStaff = () => {
    tabDispatch({ type: 'ADD_STAFF' });
  };

  const handleDeleteStaff = () => {
    tabDispatch({ type: 'DELETE_STAFF' });
  };

  const handleReset = () => {
    tabDispatch({ type: 'RESET' });
  };

  const onClickDelete = () => {
    if (tab.note_count > TAB_COUNT) setShowDelete(true);
  };

  const onClickReset = () => {
    if (Object.keys(tab.notes).length > 0 || tab.note_count > TAB_COUNT)
      setShowReset(true);
  };

  const onClickTutorial = () => setShowTutorial(true);

  return (
    <>
      <button
        aria-label="clear"
        className={styles.btnClear}
        onClick={onClickReset}
      >
        Clear
      </button>
      <div className={styles.btnRight}>
        <button
          className={styles.btnTutorial}
          title="Tutorial"
          onClick={onClickTutorial}
        >
          <QuestionIcon />
        </button>
        <div className={styles.btnStaff}>
          <button
            aria-label="add staff"
            className={styles.btn}
            onClick={handleAddStaff}
          >
            Add Staff
          </button>
          <button
            aria-label="delete staff"
            className={styles.btn}
            onClick={onClickDelete}
          >
            Delete Staff
          </button>
        </div>
        <ConfirmModal
          show={showDelete}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDeleteStaff}
        >
          <span>Are you sure you want to delete a staff?</span>
        </ConfirmModal>
        <ConfirmModal
          show={showReset}
          onClose={() => setShowReset(false)}
          onConfirm={handleReset}
        >
          <span>Are you sure you want to clear the tab?</span>
        </ConfirmModal>
        <TutorialModal
          show={showTutorial}
          onClose={() => setShowTutorial(false)}
        />
      </div>
    </>
  );
};

const ViewerButtons = () => {
  const { editAccess, id, tab } = useTabContext();
  const result = TabSelectableSchema.safeParse(tab);
  const url = result.success
    ? getUrlSlug(result.data.id, result.data.artist, result.data.title)
    : id;

  return (
    <div className={styles.viewerButtonsFlex}>
      <ConditionalHandler condition={editAccess}>
        <Link prefetch={false} href={`/tab_editor/${url}`}>
          <button aria-label="edit" className={styles.btnEdit}>
            Edit
          </button>
        </Link>
      </ConditionalHandler>
      <ConditionalHandler condition={result.success && result.data.is_private}>
        <span className={styles.private_viewer_buttons}>Private</span>
      </ConditionalHandler>
    </div>
  );
};
