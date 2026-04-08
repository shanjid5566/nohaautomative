import { useCallback, useEffect, useState } from 'react';

export const usePageLoadState = (delay = 350) => {
  const [attempt, setAttempt] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Keep initial render fast; only show loading state on explicit retries.
    if (attempt === 0) {
      return undefined;
    }

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
