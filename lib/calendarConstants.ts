export const SLOT_HEIGHT_PX = 20;
export const SLOTS_PER_HOUR = 4;
export const HOUR_HEIGHT_PX = SLOT_HEIGHT_PX * SLOTS_PER_HOUR;
export const DAY_START_HOUR = 6;
export const DAY_END_HOUR = 24;

/** Scaled grid for marketing demos (0.6× app scale, fits in frames) */
export const DEMO_SCALE = 0.6;
export const DEMO_HOUR_HEIGHT = Math.round(HOUR_HEIGHT_PX * DEMO_SCALE);
export const DEMO_SLOT_HEIGHT = Math.round(SLOT_HEIGHT_PX * DEMO_SCALE);
export const DEMO_GUTTER_WIDTH = Math.round(64 * DEMO_SCALE);
export const DEMO_VISIBLE_START_HOUR = 8;
export const DEMO_VISIBLE_END_HOUR = 18;
export const DEMO_VISIBLE_HOURS = DEMO_VISIBLE_END_HOUR - DEMO_VISIBLE_START_HOUR;
export const DEMO_GRID_HEIGHT = DEMO_VISIBLE_HOURS * DEMO_HOUR_HEIGHT;

export const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export function slotTop(hour: number, minute = 0): number {
  const minutesFromStart = (hour - DEMO_VISIBLE_START_HOUR) * 60 + minute;
  return (minutesFromStart / 60) * DEMO_HOUR_HEIGHT;
}

export function slotHeight(minutes: number): number {
  return (minutes / 60) * DEMO_HOUR_HEIGHT;
}
