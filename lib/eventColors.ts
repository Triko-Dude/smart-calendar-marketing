const SURFACE_BG = '#13132b';

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function resolveColor(color: string): string {
  if (color.startsWith('var(--cat-')) {
    const map: Record<string, string> = {
      'var(--cat-blue)': '#4f7cff',
      'var(--cat-emerald)': '#2fbf71',
      'var(--cat-coral)': '#ff5d6c',
      'var(--cat-violet)': '#8b6cff',
      'var(--cat-amber)': '#f4a93c',
    };
    return map[color] ?? '#4f7cff';
  }
  return color;
}

export function mixColors(a: string, b: string, ratio: number): string {
  const [r1, g1, b1] = hexToRgb(resolveColor(a));
  const [r2, g2, b2] = hexToRgb(b.startsWith('#') ? b : SURFACE_BG);
  const t = Math.max(0, Math.min(1, ratio));
  const r = Math.round(r1 * (1 - t) + r2 * t);
  const g = Math.round(g1 * (1 - t) + g2 * t);
  const bl = Math.round(b1 * (1 - t) + b2 * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

/** Match app getEventFill — mix category color with canvas at ~18% */
export function getEventFill(color: string): string {
  return mixColors(resolveColor(color), SURFACE_BG, 0.18);
}

export function tabRailFillColor(color: string, active: boolean, panelOpen: boolean): string {
  const resolved = resolveColor(color);
  if (!panelOpen || active) return resolved;
  return `color-mix(in srgb, ${resolved} 38%, var(--background))`;
}

export function getTabLabelColor(bgColor: string): string {
  const resolved = resolveColor(bgColor);
  const [r, g, b] = hexToRgb(resolved);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#14141f' : '#ffffff';
}
