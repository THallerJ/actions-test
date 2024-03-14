'use client';
import styles from './note.module.scss';
import { useState } from 'react';
import { useTabContext } from '../../stores/useTabContext';
import { NoteProps } from '../../common/tab.type';

const NoteInput = ({ note, str, fret }: NoteProps) => {
  const { tabDispatch, setShowInput } = useTabContext();
  const [inputTxt, setInputTxt] = useState(fret || '');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowInput(false);

      if (inputTxt !== '') {
        tabDispatch({
          type: 'ADD_NOTE',
          payload: {
            gtrStr: str,
            noteNum: note,
            fretNum: inputTxt,
          },
        });
      } else {
        tabDispatch({
          type: 'DELETE_NOTE',
          payload: { gtrStr: str, noteNum: note },
        });
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTxt(e.target.value);
  };

  return (
    <input
      className={styles.noteInput}
      defaultValue={fret !== undefined && fret !== '|' ? fret : ''}
      type="text"
      maxLength={3}
      autoFocus
      onKeyDown={handleKeyDown}
      onChange={handleOnChange}
    />
  );
};

export default NoteInput;
