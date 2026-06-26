'use client';

import { Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';
import { SPRING_REFLOW } from '@/lib/motionPresets';
import { cn } from '@/lib/cn';

interface DemoFocusZoneProps {
  visible?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  weekly?: boolean;
}

export function DemoFocusZone({
  visible = true,
  className,
  style,
  label = 'Deep work',
  weekly = true,
}: DemoFocusZoneProps) {
  return (
    <motion.div
      className={cn(
        'pointer-events-none absolute z-[5] overflow-hidden rounded-xl border border-solid',
        className
      )}
      style={{
        backgroundColor: 'color-mix(in srgb, var(--accent) 22%, transparent)',
        borderColor: 'color-mix(in srgb, var(--accent) 55%, transparent)',
        ...style,
      }}
      initial={{ opacity: 0, scaleY: 0.92 }}
      animate={{ opacity: visible ? 1 : 0, scaleY: visible ? 1 : 0.92 }}
      transition={SPRING_REFLOW}
    >
      <div className="flex items-center gap-1 px-2 py-1.5">
        <Crosshair className="h-3 w-3 shrink-0 text-[var(--accent)]" aria-hidden />
        <span className="truncate text-[9px] font-semibold text-[var(--accent)]">{label}</span>
        {weekly && (
          <span className="ml-auto rounded bg-[var(--accent)]/20 px-1 py-0.5 text-[7px] font-bold uppercase tracking-wide text-[var(--accent)]">
            Weekly
          </span>
        )}
      </div>
    </motion.div>
  );
}
