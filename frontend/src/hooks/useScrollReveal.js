import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — aplica a classe CSS "revealed" ao elemento quando ele
 * entra na viewport. Use em conjunto com a classe .reveal no CSS.
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
