'use client';

import { useId } from 'react';
import { cn } from '@/lib/cn';
import {
  BRAND_BG,
  BRAND_MARK_BLUE,
  BRAND_MARK_INDIGO,
  BRAND_MARK_SKY,
  BRAND_MARK_VIOLET,
  BRAND_GRADIENT_STOPS,
} from '@/lib/brandMark';
import {
  BLUEPRINT_GRADIENT,
  BLUEPRINT_VIEW_BOX,
  buildBrandBlueprintGeometry,
  DEFAULT_BRAND_BLUEPRINT_TUNE,
} from '@/lib/brandMarkBlueprint';

/** Squircle corner radius on the 1000×1000 artboard. */
const BLUEPRINT_SQUIRCLE_RX = 220;

/** Rasterize well above CSS size so curves stay crisp on high-DPI displays. */
const SUPERSAMPLE = 5;

interface BrandLogoProps {
  size?: number;
  className?: string;
  /** Optional squircle background for export assets (default false). */
  withBackground?: boolean;
  /** Use CSS theme tokens when available. */
  themed?: boolean;
}

/**
 * Chronocal brand mark — locked 1000×1000 blueprint C (dual-cap stroke, no tip glow).
 * Matches the product app / Animation Lab geometry.
 */
export function BrandLogo({
  size = 32,
  className,
  withBackground = false,
  themed = true,
}: BrandLogoProps) {
  const uid = useId().replace(/:/g, '');
  const gradientId = `brand-fluid-${uid}`;
  const tune = DEFAULT_BRAND_BLUEPRINT_TUNE;
  const geo = buildBrandBlueprintGeometry(tune);

  const tipColor = themed ? `var(--cat-blue, ${BRAND_MARK_BLUE})` : BRAND_MARK_SKY;
  const midColor = themed
    ? `color-mix(in srgb, var(--cat-blue, ${BRAND_MARK_BLUE}) 45%, var(--cat-violet, ${BRAND_MARK_VIOLET}))`
    : BRAND_MARK_INDIGO;
  const baseColor = themed ? `var(--cat-violet, ${BRAND_MARK_VIOLET})` : BRAND_MARK_VIOLET;
  const backgroundColor = themed ? `var(--card, ${BRAND_BG})` : BRAND_BG;

  const gradientStops = themed
    ? [
        { offset: '0%', color: baseColor },
        { offset: '45%', color: midColor },
        { offset: '100%', color: tipColor },
      ]
    : BRAND_GRADIENT_STOPS.map((stop) => ({ offset: stop.offset, color: stop.color }));

  const raster = size * SUPERSAMPLE;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={BLUEPRINT_VIEW_BOX}
      width={raster}
      height={raster}
      overflow="visible"
      className={cn('shrink-0', className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {withBackground && (
        <rect
          width="1000"
          height="1000"
          rx={BLUEPRINT_SQUIRCLE_RX}
          style={{ fill: backgroundColor }}
        />
      )}
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={BLUEPRINT_GRADIENT.x1}
          y1={BLUEPRINT_GRADIENT.y1}
          x2={BLUEPRINT_GRADIENT.x2}
          y2={BLUEPRINT_GRADIENT.y2}
        >
          {gradientStops.map((stop) => (
            <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
      </defs>
      <path
        d={geo.path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={tune.lineThickness}
        strokeLinecap="butt"
        strokeLinejoin="round"
        shapeRendering="geometricPrecision"
      />
      <circle
        cx={geo.start.x}
        cy={geo.start.y}
        r={tune.lineThickness / 2}
        fill={`url(#${gradientId})`}
      />
      <circle
        cx={geo.tip.x}
        cy={geo.tip.y}
        r={tune.tipThickness / 2}
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}
