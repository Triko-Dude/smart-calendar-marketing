'use client';

import { Pause, Play } from 'lucide-react';
import type { DemoWidgetPanelProps } from '@/lib/demoWidgetRegistry';

export function DemoClockPanel({ accent }: DemoWidgetPanelProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex justify-center gap-1 rounded-lg bg-[var(--card)] p-0.5">
        {['Stopwatch', 'Countdown', 'Pomodoro'].map((label) => {
          const active = label === 'Pomodoro';
          return (
            <span
              key={label}
              className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                active ? 'text-white' : 'text-[var(--muted)]'
              }`}
              style={active ? { backgroundColor: accent } : undefined}
            >
              {label}
            </span>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-xl border border-[var(--border)] p-2.5">
        <div
          className="absolute inset-x-0 bottom-0 rounded-xl opacity-30"
          style={{
            height: '62%',
            background: `linear-gradient(180deg, transparent, color-mix(in srgb, ${accent} 55%, transparent))`,
          }}
        />
        <p className="relative z-10 text-center text-2xl font-semibold tabular-nums tracking-tight text-[var(--foreground)]">
          25:00
        </p>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: accent }}
          aria-label="Pause"
        >
          <Pause className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)]"
          aria-label="Reset"
        >
          <Play className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
