import styles from './guitar_tab.module.scss';
import { saveTab } from '@/actions';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useTabContext } from '../../stores/useTabContext';

const TabForm = () => {
  const { user } = useUser();
  const { tab } = useTabContext();

  return (
    <form action={saveTab} className={styles.fm}>
      <div>
        <input type="text" name="title" />
        <input type="text" name="artist" />
        <input type="checkbox" name="private" id="private" />
        <label htmlFor="private">Private</label>
        <input type="hidden" name="user" value={user?.nickname || ''} />
        <input type="hidden" name="notes" value={JSON.stringify(tab.notes)} />
        <input type="hidden" name="count" value={tab.count} />
        <input
          type="hidden"
          name="gtr_string_count"
          value={tab.gtr_string_count}
        />
      </div>
      <button type="submit" className={styles.btn}>
        Submit
      </button>
    </form>
  );
};

export default TabForm;
