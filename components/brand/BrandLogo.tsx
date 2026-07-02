'use client';

import { useId } from 'react';
import { cn } from '@/lib/cn';

interface BrandLogoProps {
  size?: number;
  className?: string;
  /** Optional squircle background for export assets (default false). */
  withBackground?: boolean;
}

/** Static brand palette for the marketing site. */
const BRAND_DROPLET = '#4B9AFF';
const BRAND_BASE = '#BF5AF2';
const BRAND_BG = '#0B0D12';

/** Artboard — full 100×100 keeps glow, blur, and stroke caps inside the viewBox. */
const VIEW_BOX = '0 0 100 100';

/**
 * Chrono brand mark — gradient "C" with pinch-off droplet and separation glow.
 * Inline SVG with unique filter/gradient IDs per instance to avoid DOM collisions.
 */
export function BrandLogo({
  size = 32,
  className,
  withBackground = false,
}: BrandLogoProps) {
  const uid = useId().replace(/:/g, '');
  const gradientId = `brand-fluid-${uid}`;
  const filterId = `brand-pinch-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={VIEW_BOX}
      width={size}
      height={size}
      className={cn('shrink-0', className)}
      aria-hidden
    >
      {withBackground && (
        <rect width="100" height="100" rx="24" fill={BRAND_BG} />
      )}
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="75"
          y1="20"
          x2="35"
          y2="80"
        >
          <stop offset="0%" stopColor={BRAND_DROPLET} />
          <stop offset="100%" stopColor={BRAND_BASE} />
        </linearGradient>
        <filter
          id={filterId}
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
      <g transform="translate(5, 0)">
        <path
          d="M 65 30 A 28 28 0 1 0 70 70"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="13"
          strokeLinecap="round"
          shapeRendering="geometricPrecision"
        />
        <g filter={`url(#${filterId})`}>
          <circle cx="66" cy="28" r="6" fill={`url(#${gradientId})`} />
          <circle cx="72" cy="22" r="8" fill={`url(#${gradientId})`} />
        </g>
        <circle
          cx="72"
          cy="22"
          r="14"
          fill={BRAND_DROPLET}
          opacity="0.4"
          style={{ mixBlendMode: 'screen', filter: 'blur(4px)' }}
        />
        <circle
          cx="69.5"
          cy="19"
          r="2.6"
          fill="#ffffff"
          opacity="0.5"
          style={{ mixBlendMode: 'screen' }}
        />
      </g>
    </svg>
  );
}
