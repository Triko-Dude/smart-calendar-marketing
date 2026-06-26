'use client';

import { type ReactNode } from 'react';
import {
  DAY_LABELS,
  DEMO_GUTTER_WIDTH,
  DEMO_GRID_HEIGHT,
  DEMO_HOUR_HEIGHT,
  DEMO_VISIBLE_END_HOUR,
  DEMO_VISIBLE_START_HOUR,
} from '@/lib/calendarConstants';
import { cn } from '@/lib/cn';

interface CalendarGridShellProps {
  children?: ReactNode;
  className?: string;
  todayIndex?: number;
}

export function CalendarGridShell({
  children,
  className,
  todayIndex = 1,
}: CalendarGridShellProps) {
  const hours = Array.from(
    { length: DEMO_VISIBLE_END_HOUR - DEMO_VISIBLE_START_HOUR },
    (_, i) => DEMO_VISIBLE_START_HOUR + i
  );

  return (
    <div className={cn('flex h-full flex-col bg-[var(--background)]', className)}>
      <div
        className="grid shrink-0 border-b border-[var(--border)]"
        style={{ gridTemplateColumns: `${DEMO_GUTTER_WIDTH}px repeat(7, minmax(0, 1fr))` }}
      >
        <div />
        {DAY_LABELS.map((day, i) => {
          const isToday = i === todayIndex;
          return (
            <div key={day} className="flex justify-center px-0.5 py-1">
              <div
                className={cn(
                  'flex min-w-[40px] flex-col items-center rounded-2xl px-1.5 py-1',
                  isToday
                    ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-sm'
                    : 'bg-[var(--card)]/60 text-[var(--muted)]'
                )}
              >
                <span className="cal-day-name text-[9px]">{day}</span>
                <span className="text-base font-bold leading-none tracking-tight">
                  {23 + i}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `${DEMO_GUTTER_WIDTH}px repeat(7, minmax(0, 1fr))`,
            height: DEMO_GRID_HEIGHT,
          }}
        >
          <div className="relative border-r border-[var(--border)]/60">
            {hours.map((h) => (
              <div
                key={h}
                className="relative border-b border-[var(--border)]/40"
                style={{ height: DEMO_HOUR_HEIGHT }}
              >
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] font-medium text-[var(--muted)]">
                  {h <= 12 ? `${h} AM` : `${h - 12} PM`}
                </span>
              </div>
            ))}
          </div>
          {DAY_LABELS.map((day) => (
            <div key={day} className="relative border-l border-[var(--border)]/60">
              {hours.map((h) => (
                <div
                  key={h}
                  className="border-b border-[var(--border)]/40"
                  style={{ height: DEMO_HOUR_HEIGHT }}
                />
              ))}
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute"
          style={{
            left: DEMO_GUTTER_WIDTH,
            right: 0,
            top: 0,
            height: DEMO_GRID_HEIGHT,
          }}
        >
          <div className="relative h-full w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

export { slotTop, slotHeight } from '@/lib/calendarConstants';

export function dayLeft(dayIndex: number): string {
  return `calc(${(dayIndex / 7) * 100}% + 2px)`;
}

export function dayWidth(): string {
  return 'calc(100% / 7 - 4px)';
}
