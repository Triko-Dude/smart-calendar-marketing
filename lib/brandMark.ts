/** Shared Chronocal brand palette and production mark constants (1000×1000 blueprint). */

/** Reference icon palette — purple base → sky tip. */
export const BRAND_MARK_BLUE = '#65B5FF';
export const BRAND_MARK_SKY = '#65B5FF';
export const BRAND_MARK_INDIGO = '#8B7CFF';
export const BRAND_MARK_MAGENTA = '#BE66FF';
export const BRAND_MARK_VIOLET = '#BE66FF';
export const BRAND_MARK_MID_VIOLET = '#9A6AFF';

export const BRAND_BG = '#0D0D0F';

/** Production artboard matches the mathematical blueprint. */
export const BRAND_VIEW_BOX = '0 0 1000 1000';
/** Squircle radius on the 1000×1000 artboard. */
export const BRAND_SQUIRCLE_RX = 220;

/**
 * Locked production center-line path from Animation Lab defaults
 * (see lib/brandMarkBlueprint.ts DEFAULT_BRAND_BLUEPRINT_TUNE).
 */
export const BRAND_C_PATH =
  'M 776.553 543.802 A 280 280 0 1 1 631.452 252.775 C 661.808 255.325, 742.000 320.000, 818.000 217.000';

/** Main body stroke width (user-space); tip uses a separate round cap. */
export const BRAND_C_STROKE_WIDTH = 116;
export const BRAND_TIP_THICKNESS = 112;

/** Tip (sky) → base (purple) on the 1000×1000 artboard. */
export const BRAND_GRADIENT = {
  x1: 350,
  y1: 800,
  x2: 725,
  y2: 225,
} as const;

export const BRAND_GRADIENT_STOPS = [
  { offset: '0%', color: BRAND_MARK_VIOLET },
  { offset: '45%', color: BRAND_MARK_INDIGO },
  { offset: '100%', color: BRAND_MARK_SKY },
] as const;

export const BRAND_GROUP_TRANSLATE = { x: 0, y: 0 } as const;
