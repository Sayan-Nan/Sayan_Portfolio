import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to track which DOM section is currently active in the viewport.
 * Uses an IntersectionObserver with a tuned reading-zone rootMargin and threshold,
 * coupled with a debounce stabilization mechanism to prevent jittery highlighting
 * and active/deactive thrashing during continuous scrolling.
 */
export function useScrollSpy(
  sectionIds: string[], 
  offset: number = 140,
  debounceMs: number = 70
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '');
  const activeIdRef = useRef<string>(activeId);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep ref synchronized with state
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    if (!sectionIds.length) return;

    // Helper to safely commit state with debounce stabilization
    const scheduleUpdate = (newId: string, immediate: boolean = false) => {
      if (!newId || activeIdRef.current === newId) return;

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }

      if (immediate || debounceMs <= 0) {
        activeIdRef.current = newId;
        setActiveId(newId);
        return;
      }

      debounceTimerRef.current = setTimeout(() => {
        if (activeIdRef.current !== newId) {
          activeIdRef.current = newId;
          setActiveId(newId);
        }
      }, debounceMs);
    };

    // Keep track of visible sections reported by IntersectionObserver
    const intersectingEntries = new Map<string, IntersectionObserverEntry>();

    // IntersectionObserver reading-zone configuration:
    // Top offset matches sticky header + scrollspy subbar
    // Bottom offset focuses the detection zone on the upper 50% reading band of the viewport
    const topMargin = Math.max(0, offset - 10);
    const rootMargin = `-${topMargin}px 0px -45% 0px`;
    const threshold = [0.05, 0.2, 0.4];

    let observer: IntersectionObserver | null = null;

    const evaluateBestActive = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. Immediate activation at absolute top of page
      if (scrollPosition < 50) {
        scheduleUpdate(sectionIds[0], true);
        return;
      }

      // 2. Immediate activation at bottom of document
      if (scrollPosition + windowHeight >= documentHeight - 50) {
        scheduleUpdate(sectionIds[sectionIds.length - 1], true);
        return;
      }

      // 3. If IntersectionObserver has intersecting sections in the reading band
      if (intersectingEntries.size > 0) {
        let bestCandidate = '';
        let highestProminence = -Infinity;

        intersectingEntries.forEach((entry, id) => {
          const rect = entry.boundingClientRect;
          // Score combines intersection ratio and vertical proximity to top of reading line
          const distanceToReadingLine = Math.max(0, rect.top - topMargin);
          const score = (entry.intersectionRatio * 100) - (distanceToReadingLine * 0.08);

          if (score > highestProminence) {
            highestProminence = score;
            bestCandidate = id;
          }
        });

        if (bestCandidate) {
          scheduleUpdate(bestCandidate, false);
          return;
        }
      }

      // 4. Fallback: Geometric scan for which section spans across or is closest to the activation line
      const activationLine = offset + 20;
      let fallbackCandidate = '';

      // Check section spanning reading line first
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= activationLine && rect.bottom > activationLine) {
            fallbackCandidate = sectionIds[i];
            break;
          }
        }
      }

      // If in gap, take most recent section that passed the threshold
      if (!fallbackCandidate) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= activationLine) {
              fallbackCandidate = sectionIds[i];
              break;
            }
          }
        }
      }

      if (fallbackCandidate) {
        scheduleUpdate(fallbackCandidate, false);
      }
    };

    // Initialize IntersectionObserver if supported in environment
    if (typeof IntersectionObserver !== 'undefined') {
      try {
        observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const id = entry.target.id;
            if (!id) return;

            if (entry.isIntersecting) {
              intersectingEntries.set(id, entry);
            } else {
              intersectingEntries.delete(id);
            }
          });

          evaluateBestActive();
        }, {
          rootMargin,
          threshold
        });

        // Observe each registered section
        sectionIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el && observer) {
            observer.observe(el);
          }
        });
      } catch {
        observer = null;
      }
    }

    // Scroll and resize listener for boundary checks and observer fallback
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          evaluateBestActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial check after mount/DOM paint
    const initialTimer = setTimeout(evaluateBestActive, 100);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      clearTimeout(initialTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionIds, offset, debounceMs]);

  return activeId;
}
