import { useCallback, useEffect, useState } from 'react';

export const usePageLoadState = (delay = 350) => {
  const [attempt, setAttempt] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [attempt, delay]);

  const retry = useCallback(() => {
    setAttempt((prev) => prev + 1);
  }, []);

  return { isLoading, retry };
};
