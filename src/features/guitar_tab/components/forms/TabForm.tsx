import styles from './styles/tab_form.module.scss';
import { saveTab } from '@/actions';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useTabContext } from '../../stores/useTabContext';
import { TabSelectableSchema } from '@/common/types.';
import { ConditionalHandler } from '@/components';
import FormPending from './FormPending';
import { useAlertContext } from '@/stores';

const TabForm = () => {
  const { user } = useUser();
  const { tab, hadIntitialTab } = useTabContext();
  const { notifyAlert } = useAlertContext();
  const result = TabSelectableSchema.safeParse(tab);

  const saveTabClientAction = async (formData: FormData) => {
    try {
      await saveTab(formData);
      notifyAlert({ isError: false, message: 'Tab saved!' });
    } catch (e: unknown) {
      notifyAlert({
        isError: true,
        message: 'An error occured when saving the tab',
      });
    }
  };

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
        <button
          aria-label="save"
          type="submit"
          className={styles.saveBtn}
          title="save"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default TabForm;
