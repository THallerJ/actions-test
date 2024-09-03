'use client';
import styles from './note.module.scss';
import { useState, useRef, useEffect } from 'react';
import { NoteProps } from '../../common/tab.type';
import useNoteInputKeyDown from '../../hooks/useNoteInputKeyDown';

const NoteInput = ({ note, str, fret }: NoteProps) => {
  const [inputTxt, setInputTxt] = useState(fret || '');
  const [enterPressed, setEnterPressed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [doSelectAll, setDoSelectAll] = useState(true);
  const handleKeyDown = useNoteInputKeyDown(str, note, inputTxt);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') setEnterPressed(true);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTxt(e.target.value);
    setDoSelectAll(false);
  };

  useEffect(() => {
    inputRef.current?.setSelectionRange(
      doSelectAll && !enterPressed ? 0 : inputTxt.length,
      inputTxt.length
    );
  }, [inputTxt, inputRef, enterPressed, doSelectAll]);

  return (
    <input
      className={`${styles.noteInput} ${
        enterPressed ? styles.enterPressed : null
      }`}
      defaultValue={fret !== undefined && fret !== '|' ? fret : ''}
      type="text"
      id={`input_note_${note}_str_${str}`}
      maxLength={3}
      autoFocus
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onChange={handleOnChange}
      autoComplete="off"
      ref={inputRef}
    />
  );
};

export default NoteInput;
