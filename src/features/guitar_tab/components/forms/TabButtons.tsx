import { useState } from 'react';
import styles from './styles/tab_form.module.scss';
import { useTabContext } from '../../stores/useTabContext';
import Link from 'next/link';
import { ConditionalHandler, ConfirmModal } from '@/components';
import { TAB_COUNT } from '../../common/constants';
import { TabSelectableSchema } from '@/common/types.';

const TabButtons = () => {
  const { readonly } = useTabContext();

  return (
    <div className={styles.btnFlex}>
      {!readonly ? <EditorButtons /> : <ViewerButtons />}
    </div>
  );
};

export default TabButtons;

const EditorButtons = () => {
  const { tabDispatch, tab } = useTabContext();
  const [showDelete, setShowDelete] = useState(false);
  const [showReset, setShowReset] = useState(false);

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
    if (tab.count > TAB_COUNT) setShowDelete(true);
  };

  const onClickReset = () => {
    if (Object.keys(tab.notes).length > 0 || tab.count > TAB_COUNT)
      setShowReset(true);
  };

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
      </div>
    </>
  );
};

const ViewerButtons = () => {
  const { editAccess, id, tab } = useTabContext();
  const result = TabSelectableSchema.safeParse(tab);

  return (
    <div className={styles.viewerButtonsFlex}>
      <ConditionalHandler condition={editAccess}>
        <Link prefetch={false} href={`/tab_editor/${id}`}>
          <button aria-label="edit" className={styles.btnEdit}>
            Edit
          </button>
        </Link>
      </ConditionalHandler>
      <ConditionalHandler condition={result.success && result.data.private}>
        <span className={styles.private_viewer_buttons}>Private</span>
      </ConditionalHandler>
    </div>
  );
};
