import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ViewMode } from '../types';

interface ReadingProgressBarProps {
  currentView: ViewMode;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ currentView }) => {
  const [progress, setProgress] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; percent: number } | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const calculateProgress = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollableDistance = scrollHeight - clientHeight;

    if (scrollableDistance > 80) {
      setIsScrollable(true);
      const calculated = Math.min(100, Math.max(0, (scrollTop / scrollableDistance) * 100));
      setProgress(calculated);
    } else {
      setIsScrollable(false);
      setProgress(0);
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(calculateProgress);
    };

    // Recalculate immediately on view change and layout updates
    calculateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Use a small delay to handle asynchronous image/content rendering after view change
    const timeoutId = setTimeout(calculateProgress, 250);

    // Watch for DOM size changes (dynamic expansion, lazy images, accordion toggles)
    const resizeObserver = new ResizeObserver(() => {
      calculateProgress();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [currentView, calculateProgress]);

  // Handle clicking on the progress bar to seek through the long-form content
  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current || !isScrollable) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));

    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollableDistance = scrollHeight - clientHeight;
    const targetScrollY = ratio * scrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const percent = Math.round((x / rect.width) * 100);
    setHoverPosition({ x, percent });
  };

  if (!isScrollable) {
    return null;
  }

  return (
    <div
      ref={barRef}
      id="reading-progress-container"
      role="progressbar"
      aria-label="Reading progress bar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      onClick={handleBarClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoverPosition(null);
      }}
      className="absolute bottom-0 left-0 w-full h-[3px] bg-neutral-200/40 dark:bg-neutral-800/60 cursor-pointer group z-50 select-none transition-all duration-200"
      title={`Reading progress: ${Math.round(progress)}% (click anywhere to jump)`}
    >
      {/* Invisible expanded hover hit-area (6px up & down) to make interaction effortless */}
      <div className="absolute -top-1.5 -bottom-1.5 left-0 w-full pointer-events-auto" />

      {/* Dynamic Active Progress Gradient Line */}
      <div
        id="reading-progress-indicator"
        className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 relative transition-[width] duration-75 ease-out shadow-[0_0_10px_rgba(245,158,11,0.55)]"
        style={{ width: `${progress}%` }}
      >
        {/* Luminous leading bead */}
        {progress > 0 && progress < 99.5 && (
          <span 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.9)] ring-1 ring-amber-500/80 pointer-events-none transition-opacity" 
            aria-hidden="true"
          />
        )}
      </div>

      {/* Micro Hover Percentage Tooltip Badge */}
      {isHovered && hoverPosition && (
        <div
          className="absolute -top-7 pointer-events-none -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-neutral-900/90 dark:bg-neutral-100/90 text-neutral-100 dark:text-neutral-900 shadow-md backdrop-blur-xs transition-opacity duration-150 animate-in fade-in"
          style={{ left: `${hoverPosition.x}px` }}
        >
          {hoverPosition.percent}% read
        </div>
      )}
    </div>
  );
};
