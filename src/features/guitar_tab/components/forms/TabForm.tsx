import styles from './styles/tab_form.module.scss';
import { saveTab } from '@/actions';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useTabContext } from '../../stores/useTabContext';
import { TabSelectableSchema, SaveTabResp } from '@/common/types.';
import { useNotify } from '@/hooks';
import { ConditionalHandler, Notification } from '@/components';
import { useState, useEffect } from 'react';
import FormPending from './FormPending';

const TabForm = () => {
  const { user } = useUser();
  const { tab, hadIntitialTab } = useTabContext();
  const [showAlert, notifyAlert, cancelAlert] = useNotify(3000);
  const [saveResp, setSaveResp] = useState<SaveTabResp | { code: null }>({
    code: null,
  });

  const result = TabSelectableSchema.safeParse(tab);

  const saveTabClientAction = async (formData: FormData) => {
    const res = await saveTab(formData);
    setSaveResp(res);
  };

  useEffect(() => {
    if (saveResp.code !== null) notifyAlert();
  }, [saveResp, notifyAlert]);

  return (
    <>
      <form
        action={saveTabClientAction}
        className={styles.form}
        autoComplete="off"
      >
        <FormPending />
        <div className={styles.left}>
          <div className={styles.textInputLabel}>
            <label htmlFor="title" className={`${styles.textLabelInput}`}>
              Song Title
            </label>
            <input
              type="text"
              minLength={1}
              maxLength={50}
              required
              name="title"
              id="title"
              placeholder="Title"
              className={styles.textField}
              defaultValue={result.success ? result.data.title : undefined}
            />
          </div>
          <div className={styles.textInputLabel}>
            <label htmlFor="artist" className={`${styles.textLabelInput}`}>
              Artist Name
            </label>
            <input
              id="artist"
              type="text"
              minLength={1}
              maxLength={35}
              name="artist"
              required
              placeholder="Name"
              className={styles.textField}
              defaultValue={result.success ? result.data.artist : undefined}
            />
          </div>
          <div className={styles.checkboxWrapper}>
            <input type="hidden" value="0" name="private" id="private" />
            <input
              type="checkbox"
              name="private"
              id="private"
              className={styles.checkbox}
              defaultChecked={result.success ? result.data.private : false}
            />
            <label htmlFor="private" className={styles.checkboxLabel}>
              Private
            </label>
          </div>
        </div>
        <ConditionalHandler condition={hadIntitialTab}>
          <input
            type="hidden"
            name="id"
            value={result.success ? result.data.id : 'undefined'}
          />
        </ConditionalHandler>
        <input type="hidden" name="user" value={user?.nickname || ''} />
        <input type="hidden" name="notes" value={JSON.stringify(tab.notes)} />
        <input type="hidden" name="count" value={tab.count} />
        <input
          type="hidden"
          name="gtr_string_count"
          value={tab.gtr_string_count}
        />
        <button type="submit" className={styles.saveBtn} title="save">
          Save
        </button>
      </form>
      <Notification
        show={showAlert}
        error={saveResp.code !== 200 ? true : false}
        text={saveResp.code === 200 ? 'Tab saved!' : 'An error occured'}
        onCancel={cancelAlert}
      />
    </>
  );
};

export default TabForm;
