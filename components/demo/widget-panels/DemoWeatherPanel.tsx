'use client';

import { CloudSun } from 'lucide-react';
import type { DemoWidgetPanelProps } from '@/lib/demoWidgetRegistry';

const HOURLY = [
  { time: '2 PM', temp: 74 },
  { time: '3 PM', temp: 73 },
  { time: '4 PM', temp: 71 },
  { time: '5 PM', temp: 69 },
];

export function DemoWeatherPanel({ accent }: DemoWidgetPanelProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        <CloudSun className="h-7 w-7 shrink-0" style={{ color: accent }} aria-hidden />
        <div className="min-w-0">
          <p className="text-xl font-semibold tracking-tight text-[var(--foreground)]">72°</p>
          <p className="text-[10px] text-[var(--muted)]">Partly cloudy</p>
          <p className="text-[9px] text-[var(--muted)]">Austin, TX</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 text-center text-[9px]">
        {HOURLY.map((hour) => (
          <div key={hour.time} className="rounded-lg bg-[var(--card)] px-1 py-1.5 text-[var(--muted)]">
            <p className="font-semibold text-[var(--foreground)]">{hour.time}</p>
            <p>{hour.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
