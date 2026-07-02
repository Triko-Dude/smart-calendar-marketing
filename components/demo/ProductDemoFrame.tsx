'use client';

import { type ReactNode, type RefObject } from 'react';
import { AppChromeFrame } from '@/components/demo/AppChromeFrame';
import { CalendarGridShell } from '@/components/demo/CalendarGridShell';
import { DemoCalendarHeader } from '@/components/demo/DemoCalendarHeader';
import { cn } from '@/lib/cn';
import type { DemoMorphPhase, DemoWidgetId } from '@/lib/demoWidgetRegistry';

interface ProductDemoFrameProps {
  children?: ReactNode;
  className?: string;
  panelOpen?: boolean;
  activeWidgetId?: DemoWidgetId;
  morphPhase?: DemoMorphPhase;
  widgetLayerRef?: RefObject<HTMLDivElement | null>;
  widgetOverlay?: ReactNode;
  sidebar?: ReactNode;
  tabRail?: ReactNode;
  height?: number;
  todayIndex?: number;
  monthTitle?: string;
}

export function ProductDemoFrame({
  children,
  className,
  panelOpen,
  activeWidgetId,
  morphPhase,
  widgetLayerRef,
  widgetOverlay,
  sidebar,
  tabRail,
  height = 440,
  todayIndex = 1,
  monthTitle,
}: ProductDemoFrameProps) {
  return (
    <AppChromeFrame
      className={cn(className)}
      panelOpen={panelOpen}
      activeWidgetId={activeWidgetId}
      morphPhase={morphPhase}
      widgetLayerRef={widgetLayerRef}
      widgetOverlay={widgetOverlay}
      height={height}
      header={<DemoCalendarHeader title={monthTitle} />}
      sidebar={sidebar}
      tabRail={tabRail}
    >
      <CalendarGridShell todayIndex={todayIndex}>{children}</CalendarGridShell>
    </AppChromeFrame>
  );
}
