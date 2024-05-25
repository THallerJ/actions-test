import Note from './Note';
import styles from './note.module.scss';
import { useTabContext } from '../../stores/useTabContext';
import { ClickAway } from '@/components';

const Staff = () => {
  const { setShowInput } = useTabContext();

  return (
    <ClickAway callback={() => setShowInput(false)}>
      <div className={styles.staff}>
        <RenderNotes />
      </div>
    </ClickAway>
  );
};

export default Staff;

const RenderNotes = () => {
  const { tab } = useTabContext();
  const res = [];

  for (let note = 0; note < tab.count; note++) {
    const currNotes: React.ReactNode[] = [];

    for (let str = 0; str < tab.gtr_string_count; str++) {
      if (
        tab.notes[note] &&
        (str in tab.notes[note] || tab.notes[note]['bar'])
      ) {
        currNotes.push(
          <Note
            fret={tab.notes[note]['bar'] ? '|' : tab.notes[note][str]}
            note={note}
            str={str}
            key={`hasNote${str}${note}`}
          />
        );
      } else {
        currNotes.push(
          <Note key={`noNote$${str}${note}`} note={note} str={str} />
        );
      }
    }
    res.push(
      <div className={styles.tab_col} key={`staff${note}`}>
        {currNotes}
      </div>
    );
  }

  return res;
};
