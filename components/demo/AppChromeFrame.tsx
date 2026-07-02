'use client';

import { type ReactNode, type RefObject } from 'react';
import { cn } from '@/lib/cn';
import { DemoTopNav } from '@/components/demo/DemoTopNav';
import { DemoWidgetDock } from '@/components/demo/DemoWidgetDock';
import {
  DEMO_TASK_PANEL_W,
  DEMO_TASK_TAB_EXPANDED_W,
  DEMO_TASK_TAB_NUB_W,
} from '@/lib/taskPanelMetrics';
import type { DemoMorphPhase, DemoWidgetId } from '@/lib/demoWidgetRegistry';

interface AppChromeFrameProps {
  children: ReactNode;
  className?: string;
  panelOpen?: boolean;
  activeWidgetId?: DemoWidgetId;
  morphPhase?: DemoMorphPhase;
  widgetLayerRef?: RefObject<HTMLDivElement | null>;
  widgetOverlay?: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  tabRail?: ReactNode;
  height?: number;
}

export function AppChromeFrame({
  children,
  className,
  panelOpen = false,
  activeWidgetId,
  morphPhase = 'closed',
  widgetLayerRef,
  widgetOverlay,
  header,
  sidebar,
  tabRail,
  height = 440,
}: AppChromeFrameProps) {
  const railW = panelOpen ? DEMO_TASK_TAB_EXPANDED_W : DEMO_TASK_TAB_NUB_W;
  const padRight = panelOpen ? DEMO_TASK_PANEL_W + railW : railW + 4;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] shadow-[0_24px_80px_rgba(0,0,0,0.45)]',
        className
      )}
      data-demo-frame
    >
      <DemoTopNav />
      <div className="flex" style={{ height }}>
        <DemoWidgetDock activeId={activeWidgetId} morphPhase={morphPhase} />
        <div className="relative flex min-w-0 flex-1 flex-col">
          {header}
          <div
            ref={widgetLayerRef}
            className="relative min-h-0 flex-1"
            style={{ paddingRight: padRight }}
          >
            <div className="absolute inset-0 overflow-hidden">{children}</div>
            {widgetOverlay}
          </div>
          {tabRail}
          {sidebar}
        </div>
      </div>
    </div>
  );
}

export { DEMO_TASK_PANEL_W, DEMO_TASK_TAB_NUB_W, DEMO_TASK_TAB_EXPANDED_W };
