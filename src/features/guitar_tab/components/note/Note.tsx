import styles from './note.module.scss';
import { useTabContext } from '../../stores/useTabContext';
import NoteInput from './NoteInput';
import { NoteProps } from '../../common/tab.type';

const Note = ({ fret, note, str }: NoteProps) => {
  const NOTE_KEY = `${str}s${note}n`;
  const { activeKey, setActiveKey, showInput, setShowInput, readOnly } =
    useTabContext();

  const handleOnClick = () => {
    setActiveKey(NOTE_KEY);
    setShowInput(true);
  };

  const renderNote = () => {
    if (!readOnly && showInput && activeKey === NOTE_KEY) {
      return <NoteInput note={note} str={str} fret={fret} />;
    } else {
      return fret ? <span className={styles.noteTxt}>{fret}</span> : null;
    }
  };

  return (
    <div
      className={`${styles.note} ${!readOnly ? styles.hoverPointer : null}`}
      onClick={handleOnClick}
    >
      <span className={styles.gtrStr} />
      {renderNote()}
    </div>
  );
};

export default Note;
