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
        <input type="checkbox" name="Isprivate" id="Isprivate" />
        <label htmlFor="isPrivate">Private</label>
        <input type="hidden" name="user" value={user?.nickname || ''} />
        <input type="hidden" name="tab" value={JSON.stringify(tab)} />
      </div>
      <button type="submit" className={styles.btn}>
        Submit
      </button>
    </form>
  );
};

export default TabForm;
