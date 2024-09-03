import styles from './note.module.scss';
import { useTabContext } from '../../stores/useTabContext';
import NoteInput from './NoteInput';
import { NoteProps } from '../../common/tab.type';
import useNoteKeyDown from '../../hooks/useNoteKeyDown';
import { generateNoteKey } from '../../common/util';

const Note = ({ fret, note, str, bar }: NoteProps & { bar?: boolean }) => {
  const noteKey = generateNoteKey(str, note);
  const { setActiveKey, setShowInput, readonly, tab } = useTabContext();
  const handleKeyDown = useNoteKeyDown(noteKey, setActiveKey, tab);

  const handleOnClick = () => {
    setActiveKey(noteKey);
    setShowInput(true);
  };

  return (
    <div
      className={`${styles.note} ${!readonly ? styles.hoverPointer : null}`}
      onClick={handleOnClick}
      key={noteKey}
      id={`note_${note}_str_${str}`}
      onKeyDown={handleKeyDown}
    >
      <span className={styles.gtrStr} />
      {bar ? <span className={styles.bar} /> : null}
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
