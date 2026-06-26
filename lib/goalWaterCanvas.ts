import { transparentize } from '@/lib/colors';

export const WAVE_AMP = 6;
export const WAVE_FREQ = 0.012;
export const PHASE_STEP = 0.003;
export const BUBBLE_SPAWN_INTERVAL_MS = 700;
export const GOAL_BUBBLE_RADIUS_MIN = 2;
export const GOAL_BUBBLE_RADIUS_MAX = 4;
export const GOAL_BUBBLE_HOLLOW_RATIO = 0.7;

export interface Bubble {
  x: number;
  y: number;
  r: number;
  hollow: boolean;
  opacity: number;
  duration: number;
}

export interface GoalWaterDrawState {
  color: string;
  fillBaseline: number;
  phase: number;
  bubbles: Bubble[];
  showBubbles: boolean;
}

export function waveYAt(x: number, fillBaseline: number, phase: number): number {
  return fillBaseline + WAVE_AMP * Math.sin(x * WAVE_FREQ + phase);
}

export function createBubble(W: number, H: number): Bubble {
  const r =
    GOAL_BUBBLE_RADIUS_MIN +
    Math.random() * (GOAL_BUBBLE_RADIUS_MAX - GOAL_BUBBLE_RADIUS_MIN);
  const x = 20 + Math.random() * Math.max(W - 40, 1);
  return {
    x,
    y: H - r - 2,
    r,
    hollow: Math.random() < GOAL_BUBBLE_HOLLOW_RATIO,
    opacity: 1,
    duration: 10 + Math.random() * 4,
  };
}

function colorToLiquidGradient(
  ctx: CanvasRenderingContext2D,
  color: string,
  fillBaseline: number,
  H: number
): CanvasGradient {
  const grad = ctx.createLinearGradient(0, fillBaseline, 0, H);
  grad.addColorStop(0, transparentize(color, 0.35));
  grad.addColorStop(1, transparentize(color, 0.55));
  return grad;
}

export function drawGoalWater(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  state: GoalWaterDrawState
): Bubble[] {
  const killed: Bubble[] = [];
  const { color, fillBaseline, phase, bubbles, showBubbles } = state;

  ctx.clearRect(0, 0, W, H);

  const hasFill = fillBaseline < H - 1;

  if (hasFill) {
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 2) {
      ctx.lineTo(x, waveYAt(x, fillBaseline, phase));
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fillStyle = colorToLiquidGradient(ctx, color, fillBaseline, H);
    ctx.fill();
  }

  if (hasFill && showBubbles) {
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      const wy = waveYAt(b.x, fillBaseline, phase);
      if (b.y - b.r <= wy) {
        killed.push(b);
        bubbles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = b.opacity;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      if (b.hollow) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fill();
      }
      ctx.restore();
    }
  }

  return killed;
}
