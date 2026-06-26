'use client';

import { useEffect, useState, type RefObject } from 'react';

export function useInViewPause<T extends Element>(ref: RefObject<T | null>, rootMargin = '100px') {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin, threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isVisible;
}
