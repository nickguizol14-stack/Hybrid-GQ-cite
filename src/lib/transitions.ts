// src/lib/transitions.ts
import type { Variants, Transition } from 'framer-motion';

export const pageTransition: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1], // ease-smooth
};

export const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
