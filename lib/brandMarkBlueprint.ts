/**
 * Chronocal C-mark blueprint (1000×1000) — production geometry + Animation Lab tuning.
 *
 * ORIENTATION CONTRACT (enforced by tests — do not flip again):
 * - Classic C that opens RIGHT; tip on the RIGHT half (tip.x > 500).
 * - Body large-arc midpoint on the LEFT (mid.x < 500).
 * - Defaults are hand-locked lab tune. Sweep is chosen so mid.x < 500
 *   (prefer production sweep 1 when both qualify / tie).
 * - Never X-mirror “to fix” orientation. No tip glow / specular highlight in product or lab.
 */

import {
  BRAND_BG,
  BRAND_GRADIENT,
  BRAND_GRADIENT_STOPS,
  BRAND_MARK_SKY,
} from '@/lib/brandMark';

export const BLUEPRINT_CENTER = { x: 500, y: 500 } as const;
export const BLUEPRINT_STROKE_WIDTH = 160;
export const BLUEPRINT_ARC_RADIUS = 280;
export const BLUEPRINT_CAP_RADIUS = BLUEPRINT_STROKE_WIDTH / 2;

/** Production path uses SVG sweep-flag 1 (clockwise). */
export const BLUEPRINT_PRODUCTION_ARC_SWEEP: 0 | 1 = 1;

export const BLUEPRINT_VIEW_BOX = '0 0 1000 1000';
export const BLUEPRINT_BG = BRAND_BG;

/** Tip (sky) → base (purple); same axis as production BRAND_GRADIENT. */
export const BLUEPRINT_GRADIENT = BRAND_GRADIENT;

export { BRAND_GRADIENT_STOPS as BLUEPRINT_GRADIENT_STOPS };
export { BRAND_MARK_SKY as BLUEPRINT_MARK_SKY };

export interface BrandBlueprintTune {
  arcStartDeg: number;
  arcEndDeg: number;
  /** Distance from P₀ along exit tangent (negative flips direction). */
  p1Reach: number;
  p1Lateral: number;
  p2x: number;
  p2y: number;
  p3x: number;
  p3y: number;
  /** Tip capsule diameter at P₃ (user-space). */
  tipThickness: number;
  /** Main C stroke width (user-space). */
  lineThickness: number;
}

export interface BrandBlueprintGeometry {
  path: string;
  join: { x: number; y: number };
  p1: { x: number; y: number };
  joinTangent: { x: number; y: number };
  tip: { x: number; y: number };
  start: { x: number; y: number };
  glow: { cx: number; cy: number; r: number };
  highlight: { cx: number; cy: number; r: number };
  /** Large-arc sweep used for this path (0 | 1). */
  sweep: 0 | 1;
}

export interface GradientEndpoints {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function polarToXY(cx: number, cy: number, r: number, deg: number) {
  const rad = degToRad(deg);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function distance(
  a: { x: number; y: number },
  b: { x: number; y: number }
) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function dot(a: { x: number; y: number }, b: { x: number; y: number }) {
  return a.x * b.x + a.y * b.y;
}

export function normalize(v: { x: number; y: number }) {
  const len = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / len, y: v.y / len };
}

export function perp(v: { x: number; y: number }) {
  return { x: -v.y, y: v.x };
}

/**
 * Unit tangent on the R=280 circle at `deg` (0° = 3 o'clock, SVG y-down).
 * `ccw` = sweep-flag 0; `cw` = sweep-flag 1.
 */
export function arcTangentAtDeg(deg: number, direction: 'ccw' | 'cw' = 'cw') {
  const rad = degToRad(deg);
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  if (direction === 'ccw') {
    return normalize({ x: -sin, y: -cos });
  }
  return normalize({ x: sin, y: -cos });
}

/** Midpoint angle (degrees) along an SVG circular arc. */
export function arcMidpointDegrees(
  startDeg: number,
  endDeg: number,
  largeArc: boolean,
  sweep: 0 | 1
) {
  const twoPi = Math.PI * 2;
  const theta1 = degToRad(startDeg);
  let delta = degToRad(endDeg) - theta1;

  if (sweep === 0) {
    if (delta > 0) delta -= twoPi;
  } else if (delta < 0) {
    delta += twoPi;
  }

  if (largeArc) {
    if (Math.abs(delta) < Math.PI) delta -= Math.sign(delta || -1) * twoPi;
  } else if (Math.abs(delta) > Math.PI) {
    delta -= Math.sign(delta) * twoPi;
  }

  return (theta1 + delta / 2) * (180 / Math.PI);
}

/** XY of the large-arc midpoint for orientation checks. */
export function blueprintArcMidpoint(
  startDeg: number,
  endDeg: number,
  sweep: 0 | 1
) {
  const midDeg = arcMidpointDegrees(startDeg, endDeg, true, sweep);
  return polarToXY(
    BLUEPRINT_CENTER.x,
    BLUEPRINT_CENTER.y,
    BLUEPRINT_ARC_RADIUS,
    midDeg
  );
}

/**
 * Pick large-arc sweep so body sits LEFT of center (C opens RIGHT).
 * Prefer production sweep 1 when scores tie.
 */
export function resolveOpenRightSweep(
  startDeg: number,
  endDeg: number
): 0 | 1 {
  let best: 0 | 1 = BLUEPRINT_PRODUCTION_ARC_SWEEP;
  let bestScore = -Infinity;

  for (const sweep of [0, 1] as const) {
    const mid = blueprintArcMidpoint(startDeg, endDeg, sweep);
    // Higher score = farther left of center = clearer "opens right".
    const score = BLUEPRINT_CENTER.x - mid.x;
    if (
      score > bestScore ||
      (score === bestScore && sweep === BLUEPRINT_PRODUCTION_ARC_SWEEP)
    ) {
      bestScore = score;
      best = sweep;
    }
  }

  return best;
}

/**
 * Lab defaults — hand-locked from Animation Lab tuning (opens right, tip on right).
 * Thickness and tip placement are lab-only; do not re-derive from production blindly.
 */
export function deriveBlueprintTuneFromProduction(): BrandBlueprintTune {
  return {
    arcStartDeg: 9,
    arcEndDeg: -62,
    p1Reach: -28,
    p1Lateral: -12,
    p2x: 742,
    p2y: 320,
    p3x: 818,
    p3y: 217,
    tipThickness: 112,
    lineThickness: 116,
  };
}

export function computeBlueprintP1(
  join: { x: number; y: number },
  tune: Pick<BrandBlueprintTune, 'arcEndDeg' | 'p1Reach' | 'p1Lateral'>,
  sweep: 0 | 1 = BLUEPRINT_PRODUCTION_ARC_SWEEP
) {
  const rawTangent = arcTangentAtDeg(tune.arcEndDeg, sweep === 0 ? 'ccw' : 'cw');
  const reach = Math.abs(tune.p1Reach);
  const tangent =
    tune.p1Reach < 0
      ? { x: -rawTangent.x, y: -rawTangent.y }
      : rawTangent;
  const normal = perp(tangent);
  return {
    x: join.x + tangent.x * reach + normal.x * tune.p1Lateral,
    y: join.y + tangent.y * reach + normal.y * tune.p1Lateral,
  };
}

function formatNum(n: number) {
  return n.toFixed(3);
}

export function clampBlueprintTune(tune: BrandBlueprintTune): BrandBlueprintTune {
  const clamp = (key: keyof BrandBlueprintTune, value: number) => {
    const slider = BLUEPRINT_SLIDERS.find((s) => s.key === key);
    if (!slider) return value;
    return Math.min(slider.max, Math.max(slider.min, value));
  };

  return {
    arcStartDeg: clamp('arcStartDeg', tune.arcStartDeg),
    arcEndDeg: clamp('arcEndDeg', tune.arcEndDeg),
    p1Reach: clamp('p1Reach', tune.p1Reach),
    p1Lateral: clamp('p1Lateral', tune.p1Lateral),
    p2x: clamp('p2x', tune.p2x),
    p2y: clamp('p2y', tune.p2y),
    p3x: clamp('p3x', tune.p3x),
    p3y: clamp('p3y', tune.p3y),
    tipThickness: clamp('tipThickness', tune.tipThickness),
    lineThickness: clamp('lineThickness', tune.lineThickness),
  };
}

/** Build center-line path: open-right large arc + cubic tip. */
export function buildBrandBlueprintGeometry(
  tune: BrandBlueprintTune = deriveBlueprintTuneFromProduction()
): BrandBlueprintGeometry {
  const { x: cx, y: cy } = BLUEPRINT_CENTER;
  const R = BLUEPRINT_ARC_RADIUS;
  const safeTune = clampBlueprintTune(tune);

  const start = polarToXY(cx, cy, R, safeTune.arcStartDeg);
  const join = polarToXY(cx, cy, R, safeTune.arcEndDeg);
  const sweep = resolveOpenRightSweep(safeTune.arcStartDeg, safeTune.arcEndDeg);
  const rawJoinTangent = arcTangentAtDeg(
    safeTune.arcEndDeg,
    sweep === 0 ? 'ccw' : 'cw'
  );
  const joinTangent =
    safeTune.p1Reach < 0
      ? { x: -rawJoinTangent.x, y: -rawJoinTangent.y }
      : rawJoinTangent;
  const p1 = computeBlueprintP1(join, safeTune, sweep);
  const p2 = { x: safeTune.p2x, y: safeTune.p2y };
  const tip = { x: safeTune.p3x, y: safeTune.p3y };

  const path = `M ${formatNum(start.x)} ${formatNum(start.y)} A ${R} ${R} 0 1 ${sweep} ${formatNum(join.x)} ${formatNum(join.y)} C ${formatNum(p1.x)} ${formatNum(p1.y)}, ${formatNum(p2.x)} ${formatNum(p2.y)}, ${formatNum(tip.x)} ${formatNum(tip.y)}`;

  const exitDx = tip.x - p2.x;
  const exitDy = tip.y - p2.y;
  const exitLen = Math.hypot(exitDx, exitDy) || 1;
  const exitDir = { x: exitDx / exitLen, y: exitDy / exitLen };
  const normal = perp(exitDir);

  const glow = {
    cx: tip.x - exitDir.x * 10,
    cy: tip.y - exitDir.y * 10,
    r: 130,
  };

  return {
    path,
    join,
    p1,
    joinTangent,
    tip,
    start,
    sweep,
    glow,
    highlight: {
      cx: tip.x - exitDir.x * 15 - normal.x * 10,
      cy: tip.y - exitDir.y * 15 - normal.y * 10,
      r: 12,
    },
  };
}

function normalizePhase(phase: number): number {
  const wrapped = phase % 1;
  return wrapped < 0 ? wrapped + 1 : wrapped;
}

const blueprintGradientCenter = {
  cx: (BLUEPRINT_GRADIENT.x1 + BLUEPRINT_GRADIENT.x2) / 2,
  cy: (BLUEPRINT_GRADIENT.y1 + BLUEPRINT_GRADIENT.y2) / 2,
};
const blueprintOffset1 = {
  dx: BLUEPRINT_GRADIENT.x1 - blueprintGradientCenter.cx,
  dy: BLUEPRINT_GRADIENT.y1 - blueprintGradientCenter.cy,
};
const blueprintOffset2 = {
  dx: BLUEPRINT_GRADIENT.x2 - blueprintGradientCenter.cx,
  dy: BLUEPRINT_GRADIENT.y2 - blueprintGradientCenter.cy,
};

export function computeBlueprintGradientEndpoints(phase: number): GradientEndpoints {
  const p = normalizePhase(phase);
  const angle = p * 2 * Math.PI;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const { cx, cy } = blueprintGradientCenter;

  return {
    x1: cx + blueprintOffset1.dx * cos - blueprintOffset1.dy * sin,
    y1: cy + blueprintOffset1.dx * sin + blueprintOffset1.dy * cos,
    x2: cx + blueprintOffset2.dx * cos - blueprintOffset2.dy * sin,
    y2: cy + blueprintOffset2.dx * sin + blueprintOffset2.dy * cos,
  };
}

export const BLUEPRINT_SLIDERS: {
  key: keyof BrandBlueprintTune;
  label: string;
  min: number;
  max: number;
  step: number;
}[] = [
  { key: 'arcStartDeg', label: 'Arc start angle (°)', min: 0, max: 80, step: 1 },
  { key: 'arcEndDeg', label: 'Arc end angle (°)', min: -90, max: -30, step: 1 },
  { key: 'p1Reach', label: 'P₁ reach (along exit tangent)', min: -400, max: 400, step: 1 },
  { key: 'p1Lateral', label: 'P₁ lateral bow', min: -80, max: 80, step: 1 },
  { key: 'p2x', label: 'P₂ control X', min: -300, max: 1300, step: 1 },
  { key: 'p2y', label: 'P₂ control Y', min: -500, max: 1500, step: 1 },
  { key: 'p3x', label: 'P₃ tip X', min: -300, max: 1300, step: 1 },
  { key: 'p3y', label: 'P₃ tip Y', min: -300, max: 1300, step: 1 },
  { key: 'tipThickness', label: 'P₃ tip thickness', min: 20, max: 400, step: 1 },
  { key: 'lineThickness', label: 'Total line thickness', min: 20, max: 400, step: 1 },
];

export const DEFAULT_BRAND_BLUEPRINT_TUNE: BrandBlueprintTune =
  deriveBlueprintTuneFromProduction();

export const BLUEPRINT_SPEC_P1 = (() => {
  const geo = buildBrandBlueprintGeometry(DEFAULT_BRAND_BLUEPRINT_TUNE);
  return { x: geo.p1.x, y: geo.p1.y };
})();
