'use client';

import { Mail } from 'lucide-react';
import type { DemoWidgetPanelProps } from '@/lib/demoWidgetRegistry';

const MESSAGES = [
  { from: 'Team sync', subject: 'Sprint planning notes', snippet: 'Agenda for Thursday…', time: '12m' },
  { from: 'Invoice', subject: 'Receipt for March', snippet: 'Your payment was received…', time: '1h' },
  { from: 'Newsletter', subject: 'Weekly digest', snippet: 'Top stories this week…', time: '3h' },
];

export function DemoGmailPanel(_props: DemoWidgetPanelProps) {
  return (
    <div className="space-y-2">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-[var(--border)] px-2 py-1.5 text-[10px] font-medium text-[var(--muted)]"
      >
        <Mail className="h-3 w-3" aria-hidden />
        Connected Gmail
      </button>

      <ul className="space-y-1.5">
        {MESSAGES.map((msg) => (
          <li
            key={msg.subject}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 py-1.5"
          >
            <div className="flex items-start justify-between gap-1">
              <p className="truncate text-[10px] font-semibold text-[var(--foreground)]">{msg.from}</p>
              <span className="shrink-0 text-[8px] text-[var(--muted)]">{msg.time}</span>
            </div>
            <p className="truncate text-[9px] text-[var(--muted)]">{msg.subject}</p>
            <p className="truncate text-[8px] text-[var(--muted)]/80">{msg.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
