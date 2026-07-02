/** Scaled widget dimensions for marketing demos (~70% of production app). */

export const DEMO_DOCK_STRIP_WIDTH = 36;
export const DEMO_DOCK_DOT_SIZE = 28;
export const DEMO_DOCK_DOT_GAP = 10;
export const DEMO_DOCK_STACK_PADDING_Y = 14;
export const DEMO_DOCK_FOOTER_PADDING_BOTTOM = 14;

export const DEMO_WIDGET_CARD_WIDTH = 224;
export const DEMO_WIDGET_CARD_MIN_HEIGHT = 126;
export const DEMO_WIDGET_CARD_HEADER_HEIGHT = 34;
export const DEMO_WIDGET_CARD_EXPANDED_HEIGHT =
  DEMO_WIDGET_CARD_MIN_HEIGHT + DEMO_WIDGET_CARD_HEADER_HEIGHT;

export const DEMO_WIDGET_SPAWN_OFFSET_X = 8;
export const DEMO_WIDGET_SPAWN_OFFSET_Y = -16;
export const DEMO_WIDGET_MIN_Y = 8;

export function morphRadius(width: number): number {
  return Math.min(width / 2, 11);
}

export function computeDemoFloatPosition(origin: DOMRect): { x: number; y: number } {
  return {
    x: origin.x + origin.width + DEMO_WIDGET_SPAWN_OFFSET_X,
    y: Math.max(DEMO_WIDGET_MIN_Y, origin.y + DEMO_WIDGET_SPAWN_OFFSET_Y),
  };
}

export function getDotRectRelative(
  widgetId: string,
  container: HTMLElement
): DOMRect | null {
  const frame = container.closest('[data-demo-frame]');
  const dot = frame?.querySelector(`[data-widget-dot="${widgetId}"]`);
  if (!dot) return null;
  const dotRect = dot.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  return new DOMRect(
    dotRect.left - containerRect.left,
    dotRect.top - containerRect.top,
    dotRect.width,
    dotRect.height
  );
}
