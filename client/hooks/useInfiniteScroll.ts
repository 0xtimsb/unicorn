import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = (callback: () => any) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    const scrolled =
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) + 50;
    const offset = document.documentElement.offsetHeight;
    if (scrolled < offset || isFetching) return;
    setIsFetching(true);
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    if (callback) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return [isFetching, setIsFetching] as const;
};

export default useInfiniteScroll;
