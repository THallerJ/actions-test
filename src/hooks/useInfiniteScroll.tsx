import { useRef, useCallback, useEffect } from 'react';

const useInfiniteScroll = (
  callback: () => void,
  root?: React.MutableRefObject<null>
) => {
  const callbackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const observer = useRef<IntersectionObserver>();

  const lastItemCb = useCallback(
    (elem: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            if (callbackRef.current) callbackRef.current();
            if (elem) observer.current?.unobserve(elem);
          }
        },
        { threshold: 1, root: root ? root.current : undefined }
      );

      if (elem) observer.current.observe(elem);
    },
    [root]
  );

  return lastItemCb;
};

export default useInfiniteScroll;
