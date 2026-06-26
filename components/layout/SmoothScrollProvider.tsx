'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface ScrollContextValue {
  scroll: number;
}

const ScrollContext = createContext<ScrollContextValue>({ scroll: 0 });

/** Tracks native window scroll — used by the site header fade. */
export function useLenisScroll() {
  return useContext(ScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <ScrollContext.Provider value={{ scroll }}>{children}</ScrollContext.Provider>;
}
