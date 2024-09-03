import { useTabContext } from '../stores/useTabContext';

const useNoteInputHelper = (str: number, note: number, inputTxt: string) => {
  const { tabDispatch, setShowInput } = useTabContext();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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
    } else if (e.key === 'Escape') setShowInput(false);
  };

  return handleKeyDown;
};

export default useNoteInputHelper;
