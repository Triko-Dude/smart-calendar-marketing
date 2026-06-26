'use client';

import { CloudSun, Timer, Mail, Camera } from 'lucide-react';
import styles from '@/components/demo/demo.module.css';
import { cn } from '@/lib/cn';

const WIDGETS = [
  { id: 'weather', icon: CloudSun, accent: 'var(--cat-amber)' },
  { id: 'clock', icon: Timer, accent: 'var(--cat-blue)' },
  { id: 'gmail', icon: Mail, accent: 'var(--cat-coral)' },
  { id: 'instagram', icon: Camera, accent: 'var(--cat-violet)' },
];

export function DemoWidgetDock({
  activeId,
  className,
}: {
  activeId?: string;
  className?: string;
}) {
  return (
    <aside className={cn(styles.widgetStrip, className)} aria-label="Widget dock">
      <div className={styles.widgetStack}>
        {WIDGETS.map((w) => {
          const Icon = w.icon;
          const active = activeId === w.id;
          return (
            <div
              key={w.id}
              className={cn(styles.widgetDot, active && styles.widgetDotActive)}
              style={{ '--widget-accent': w.accent } as React.CSSProperties}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: w.accent }} />
            </div>
          );
        })}
      </div>
    </aside>
  );
}
