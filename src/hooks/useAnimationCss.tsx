import { useState, useEffect, useRef } from 'react';

const useAnimationCss = (
  toggled: boolean,
  foreward: string,
  reverse: string,
  defaultStyle: string
) => {
  const [init, setInit] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    if (toggled && mounted.current) setInit(true);
    mounted.current = true;
  }, [toggled]);

  if (init) return toggled ? foreward : reverse;
  else return defaultStyle;
};

export default useAnimationCss;
