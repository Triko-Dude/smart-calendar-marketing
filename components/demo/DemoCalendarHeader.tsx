'use client';

import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export function DemoCalendarHeader({ title = 'June 2026' }: { title?: string }) {
  return (
    <div className="relative z-20 flex h-10 shrink-0 items-center gap-2 border-b border-[var(--border)] bg-[var(--background)] px-3">
      <h2 className="min-w-0 truncate text-sm font-semibold tracking-tight">{title}</h2>
      <div className="flex shrink-0 items-center rounded-full bg-[var(--card)] p-0.5">
        <button type="button" className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--muted)]">
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button type="button" className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--muted)]">
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium text-[var(--muted)]"
      >
        Today
      </button>
      <div className="ml-auto flex items-center gap-1.5">
        <span className="rounded-full bg-[var(--card)] px-2 py-0.5 text-[10px] font-medium text-[var(--muted)]">
          Week
        </span>
        <button
          type="button"
          className="flex h-6 items-center gap-1 rounded-full px-2 text-[10px] font-medium text-white shadow-md"
          style={{
            background: 'var(--chrome-cta-gradient)',
            border: '1px solid var(--chrome-cta-border)',
          }}
        >
          <Sparkles className="h-3 w-3" />
          Auto-fill
        </button>
      </div>
    </div>
  );
}
