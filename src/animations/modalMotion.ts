import { type Variants, type Transition } from 'framer-motion';

/**
 * Spring physics configuration for the Depth Aperture + Subtle Slide-Up motion.
 * - Damping: 30 (cushioned, executive settle without bouncy oscillation)
 * - Stiffness: 340 (snappy, highly responsive launch)
 * - Mass: 0.85 (balanced, tactile physical feel)
 */
export const modalSpringTransition: Transition = {
  type: 'spring',
  damping: 30,
  stiffness: 340,
  mass: 0.85,
};

/**
 * Depth Aperture Backdrop:
 * Transitions smoothly from crisp transparency to a rich 16px frosted lens blur.
 */
export const modalBackdropVariants: Variants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(16px)',
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};

/**
 * Modal Card:
 * Harmonizes the Depth Aperture lens zoom with a subtle 28px slide-up entrance,
 * focused with optical blur dissipation and framed in natural spring dynamics.
 */
export const modalCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.94,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      ...modalSpringTransition,
      opacity: { duration: 0.28, ease: 'easeOut' },
      filter: { duration: 0.32, ease: 'easeOut' },
    },
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.96,
    filter: 'blur(4px)',
    transition: {
      duration: 0.2,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};
