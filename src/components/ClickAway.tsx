'use client';
import { useEffect, useRef } from 'react';

// This component triggers a callback when the mouse is clicked outside the child element
type ClickAwayProps = {
  callback: () => void;
  children: React.ReactNode;
};
export const ClickAway = ({ callback, children }: ClickAwayProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return <div ref={ref}>{children}</div>;
};

export default ClickAway;
