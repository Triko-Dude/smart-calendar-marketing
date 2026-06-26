'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CloudSun, Timer, Mail, Camera } from 'lucide-react';
import { SPRING_TASK_PANEL } from '@/lib/motionPresets';
import { cn } from '@/lib/cn';

const WIDGETS = [
  {
    id: 'weather',
    icon: CloudSun,
    label: 'Weather',
    accent: 'var(--cat-amber)',
    detail: '72°F · Partly cloudy',
  },
  {
    id: 'clock',
    icon: Timer,
    label: 'Timer',
    accent: 'var(--cat-blue)',
    detail: '25:00 · works offline',
  },
  {
    id: 'gmail',
    icon: Mail,
    label: 'Gmail',
    accent: 'var(--cat-coral)',
    detail: '3 unread',
  },
  {
    id: 'instagram',
    icon: Camera,
    label: 'Instagram',
    accent: 'var(--cat-violet)',
    detail: 'When connected',
  },
] as const;

interface DemoWidgetPanelProps {
  activeId?: string;
  className?: string;
}

export function DemoWidgetPanel({ activeId, className }: DemoWidgetPanelProps) {
  const active = WIDGETS.find((w) => w.id === activeId);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={active.id}
          className={cn(
            'absolute bottom-0 left-[40px] top-12 z-10 w-44 overflow-hidden border-r border-[var(--border)] bg-[var(--panel)] shadow-lg',
            className
          )}
          initial={{ x: -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -24, opacity: 0 }}
          transition={SPRING_TASK_PANEL}
        >
          <div className="flex h-full flex-col p-3">
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)]"
                style={{ backgroundColor: `color-mix(in srgb, ${active.accent} 18%, transparent)` }}
              >
                <active.icon className="h-4 w-4" style={{ color: active.accent }} />
              </div>
              <div>
                <p className="text-xs font-semibold">{active.label}</p>
                <p className="text-[10px] text-[var(--muted)]">{active.detail}</p>
              </div>
            </div>
            <div className="mt-4 flex-1 rounded-lg border border-[var(--border)] bg-[var(--card)]/60 p-3">
              {active.id === 'clock' && (
                <p className="text-center text-2xl font-semibold tabular-nums tracking-tight">25:00</p>
              )}
              {active.id === 'weather' && (
                <div className="text-center">
                  <p className="text-2xl font-semibold">72°</p>
                  <p className="mt-1 text-[10px] text-[var(--muted)]">Partly cloudy</p>
                </div>
              )}
              {active.id === 'gmail' && (
                <div className="space-y-2">
                  {['Team sync', 'Invoice', 'Newsletter'].map((s) => (
                    <div key={s} className="rounded-md bg-[var(--background)]/50 px-2 py-1.5 text-[10px]">
                      {s}
                    </div>
                  ))}
                </div>
              )}
              {active.id === 'instagram' && (
                <p className="text-center text-[10px] text-[var(--muted)]">Connect to view feed</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { WIDGETS as DEMO_WIDGETS };
