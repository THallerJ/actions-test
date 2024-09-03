const extractNoteKey = (key: string) => {
  const sPos = key.indexOf('s');
  const s = Number(key.substring(0, sPos));
  const n = Number(key.substring(sPos + 1, key.length - 1));
  return { s, n };
};

const generateNoteKey = (str: number, note: number) => `${str}s${note}n`;

export { generateNoteKey, extractNoteKey };
