/** Shared Framer Motion spring presets — mirrored from the Chrono app. */

type SpringConfig = {
  stiffness: number;
  damping: number;
  mass: number;
};

const STIFFNESS_SCALE = 1.5;
const DAMPING_SCALE = 1.25;
const MASS_SCALE = 0.75;

export function tuneSpring(config: SpringConfig) {
  return {
    type: 'spring' as const,
    stiffness: Math.round(config.stiffness * STIFFNESS_SCALE),
    damping: Math.round(config.damping * DAMPING_SCALE),
    mass: Math.round(config.mass * MASS_SCALE * 100) / 100,
  };
}

export const SPRING_REFLOW = tuneSpring({ stiffness: 400, damping: 34, mass: 0.85 });
export const SPRING_CASCADE = tuneSpring({ stiffness: 460, damping: 36, mass: 0.8 });
export const SPRING_TASK_PANEL = tuneSpring({ stiffness: 400, damping: 32, mass: 0.88 });
export const SPRING_RAIL = tuneSpring({ stiffness: 520, damping: 42, mass: 0.5 });
export const SPRING_RAIL_LABEL = tuneSpring({ stiffness: 560, damping: 44, mass: 0.45 });
export const SPRING_SECTION = tuneSpring({ stiffness: 300, damping: 30, mass: 0.9 });
export const SPRING_PROGRESS = tuneSpring({ stiffness: 380, damping: 32, mass: 0.5 });

export const REFLOW_STAGGER_DELAY = 0.03;

export const TASK_CARD_STAGGER = {
  hidden: { opacity: 0, x: 28 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { ...SPRING_TASK_PANEL, delay: i * 0.025 },
  }),
} as const;

export const BUTTON_HOVER_SCALE = {
  scale: 1.02,
  transition: tuneSpring({ stiffness: 500, damping: 20, mass: 0.6 }),
} as const;

export const BUTTON_TAP_SCALE = {
  scale: 0.98,
  transition: tuneSpring({ stiffness: 500, damping: 20, mass: 0.6 }),
} as const;

export const SECTION_REVEAL = tuneSpring({ stiffness: 100, damping: 25, mass: 0.9 });

export const TWEEN_WIDGET_MORPH = { type: 'tween' as const, duration: 0.15, ease: 'easeOut' as const };
