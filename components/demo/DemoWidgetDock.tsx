'use client';

import { Plus } from 'lucide-react';
import styles from '@/components/demo/demo.module.css';
import { cn } from '@/lib/cn';
import {
  DEMO_WIDGET_REGISTRY,
  type DemoMorphPhase,
  type DemoWidgetId,
} from '@/lib/demoWidgetRegistry';

interface DemoWidgetDockProps {
  activeId?: DemoWidgetId;
  morphPhase?: DemoMorphPhase;
  className?: string;
}

export function DemoWidgetDock({
  activeId,
  morphPhase = 'closed',
  className,
}: DemoWidgetDockProps) {
  return (
    <aside className={cn(styles.widgetStrip, className)} aria-label="Widget dock">
      <div className={styles.widgetStack}>
        {DEMO_WIDGET_REGISTRY.map((widget) => {
          const Icon = widget.icon;
          const isActive = activeId === widget.id;
          const isHidden = isActive && morphPhase !== 'docking' && morphPhase !== 'closed';
          const showTimerReadout = widget.id === 'clock' && isActive && morphPhase === 'floating';

          return (
            <div
              key={widget.id}
              data-widget-dot={widget.id}
              className={cn(
                styles.widgetDot,
                isActive && styles.widgetDotActive,
                isHidden && styles.widgetDotHidden,
                showTimerReadout && styles.widgetDotRunning
              )}
              style={{ '--widget-accent': widget.accent } as React.CSSProperties}
            >
              {showTimerReadout ? (
                <span className={styles.timerReadout}>25:00</span>
              ) : (
                <Icon className="h-3.5 w-3.5" style={{ color: widget.accent }} aria-hidden />
              )}
              {widget.badgeCount && widget.badgeCount > 0 && !isHidden ? (
                <span className={styles.widgetBadge} aria-hidden>
                  {widget.badgeCount > 9 ? '9+' : widget.badgeCount}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className={styles.widgetFooter}>
        <button
          type="button"
          className={styles.widgetAddDot}
          aria-label="Add widget"
          aria-disabled="true"
          title="Coming soon"
          disabled
        >
          <Plus className="h-3 w-3" aria-hidden />
        </button>
      </div>
    </aside>
  );
}
