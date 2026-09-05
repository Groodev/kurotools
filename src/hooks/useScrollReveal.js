import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for detecting when an element enters the viewport with IntersectionObserver
 * @param {Object} options
 * @param {number} options.threshold - Visibility ratio required to trigger (default 0.12)
 * @param {string} options.rootMargin - Margin around the root (default '0px 0px -40px 0px')
 * @param {boolean} options.once - Whether to trigger only once (default true)
 * @returns {[React.RefObject, boolean]} - [elementRef, isVisible]
 */
export function useScrollReveal({
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  once = true
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    // Fallback if IntersectionObserver is unsupported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}
