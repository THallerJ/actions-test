import Note from '../note/Note';
import styles from './staff.module.scss';
import { useTabContext } from '../../stores/useTabContext';
import { ClickAway } from '@/components';

const Staff = () => {
  const { tab, setShowInput } = useTabContext();

  const RenderNotes = (): React.ReactNode => {
    const res = [];

    for (let note = 0; note < tab.count; note++) {
      const currNotes: React.ReactNode[] = [];

      for (let str = 0; str < tab.gtr_string_count; str++) {
        if (tab.notes[note] && str in tab.notes[note]) {
          currNotes.push(
            <Note
              fret={tab.notes[note][str]}
              note={note}
              str={str}
              key={str + note}
            />
          );
        } else {
          currNotes.push(<Note key={str + note} note={note} str={str} />);
        }
      }
      res.push(
        <div
          className={styles.tab_row}
          key={Math.random().toString(16).slice(2)}
        >
          {currNotes}
        </div>
      );
    }

    return res;
  };

  return (
    <ClickAway callback={() => setShowInput(false)}>
      <div className={styles.tab_col}>{RenderNotes()}</div>
    </ClickAway>
  );
};

export default Staff;
