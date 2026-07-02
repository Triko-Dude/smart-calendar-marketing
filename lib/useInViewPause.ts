'use client';

import { useEffect, useState, type RefObject } from 'react';

function isElementInView(el: Element, rootMargin: string): boolean {
  const margin = parseInt(rootMargin, 10) || 0;
  const rect = el.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.bottom >= -margin &&
    rect.top <= viewHeight + margin &&
    rect.right >= -margin &&
    rect.left <= viewWidth + margin &&
    rect.height > 0 &&
    rect.width > 0
  );
}

export function useInViewPause<T extends Element>(ref: RefObject<T | null>, rootMargin = '100px') {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let rafId = 0;

    const attach = () => {
      const el = ref.current;
      if (!el) {
        rafId = requestAnimationFrame(attach);
        return;
      }

      setIsVisible(isElementInView(el, rootMargin));

      observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { rootMargin, threshold: 0.1 }
      );
      observer.observe(el);
    };

    attach();

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [ref, rootMargin]);

  return isVisible;
}
