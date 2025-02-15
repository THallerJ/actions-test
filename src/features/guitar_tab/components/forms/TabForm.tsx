import styles from './styles/tab_form.module.scss';
import { saveTab } from '@/actions';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useTabContext } from '../../stores/useTabContext';
import { TabSelectableSchema, RecentTabInfoRespSchema } from '@/common/types.';
import { ConditionalHandler } from '@/components';
import FormPending from './FormPending';
import { useAlertContext } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUrlSlug } from '@/common/utils';

const TabForm = () => {
  const { user } = useUser();
  const { tab, hadIntitialTab, isNewTab } = useTabContext();
  const { notifyAlert } = useAlertContext();
  const [doRedirect, setDoRedirect] = useState(false);
  const result = TabSelectableSchema.safeParse(tab);
  const router = useRouter();
  const { data } = useQuery({
    queryKey: [doRedirect],
    queryFn: () => fetchTab(doRedirect),
  });

  const saveTabClientAction = async (formData: FormData) => {
    try {
      await saveTab(formData);
      notifyAlert({ isError: false, message: 'Tab saved!' });
      if (isNewTab) {
        setDoRedirect(true);
      }
    } catch (e: unknown) {
      notifyAlert({
        isError: true,
        message: 'An error occured when saving the tab',
      });
    }
  };

  useEffect(() => {
    if (data && doRedirect)
      router.push(
        `/tab_editor/${getUrlSlug(data.id, data.artist, data.title)}`
      );
  }, [data, router, doRedirect]);

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
            <input
              type="checkbox"
              name="is_private"
              id="is_private"
              className={styles.checkbox}
              defaultChecked={result.success ? result.data.is_private : false}
            />
            <label htmlFor="is_private" className={styles.checkboxLabel}>
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
        <input type="hidden" name="username" value={user?.nickname || ''} />
        <input type="hidden" name="notes" value={JSON.stringify(tab.notes)} />
        <input type="hidden" name="note_count" value={tab.note_count} />
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

const fetchTab = async (doFetch: boolean) => {
  if (doFetch) {
    const resp = await fetch(`/api/recent_tab_info`);
    const json = await resp.json();

    const result = RecentTabInfoRespSchema.safeParse(json);

    if (result.success) return result.data;
  }

  return null;
};

export default TabForm;
