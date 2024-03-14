import styles from './note.module.scss';
import { useTabContext } from '../../stores/useTabContext';
import NoteInput from './NoteInput';
import { NoteProps } from '../../common/tab.type';

const Note = ({ fret, note, str }: NoteProps) => {
  const noteKey = `${str}s${note}n`;
  const { setActiveKey, setShowInput, readonly } = useTabContext();

  const handleOnClick = () => {
    setActiveKey(noteKey);
    setShowInput(true);
  };

  return (
    <div
      className={`${styles.note} ${!readonly ? styles.hoverPointer : null}`}
      onClick={handleOnClick}
      key={noteKey}
    >
      <span className={styles.gtrStr} />
      <RenderNote noteKey={noteKey} str={str} fret={fret} note={note} />
    </div>
  );
};

export default Note;

const RenderNote = ({
  fret,
  note,
  str,
  noteKey,
}: NoteProps & { noteKey: string }) => {
  const { activeKey, showInput, readonly } = useTabContext();

  if (!readonly && showInput && activeKey === noteKey) {
    return (
      <NoteInput note={note} str={str} fret={fret} key={`renderNote${note}`} />
    );
  } else {
    return fret ? (
      <span className={styles.noteTxt} key={'renderNoteNoInput' + noteKey}>
        {fret}
      </span>
    ) : null;
  }
};
