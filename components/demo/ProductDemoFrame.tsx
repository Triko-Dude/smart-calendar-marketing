'use client';

import { type ReactNode } from 'react';
import { AppChromeFrame } from '@/components/demo/AppChromeFrame';
import { CalendarGridShell } from '@/components/demo/CalendarGridShell';
import { DemoCalendarHeader } from '@/components/demo/DemoCalendarHeader';
import { cn } from '@/lib/cn';

interface ProductDemoFrameProps {
  children?: ReactNode;
  className?: string;
  panelOpen?: boolean;
  activeWidgetId?: string;
  sidebar?: ReactNode;
  tabRail?: ReactNode;
  overlay?: ReactNode;
  height?: number;
  todayIndex?: number;
  monthTitle?: string;
}

export function ProductDemoFrame({
  children,
  className,
  panelOpen,
  activeWidgetId,
  sidebar,
  tabRail,
  overlay,
  height = 440,
  todayIndex = 1,
  monthTitle,
}: ProductDemoFrameProps) {
  return (
    <AppChromeFrame
      className={cn(className)}
      panelOpen={panelOpen}
      activeWidgetId={activeWidgetId}
      height={height}
      header={<DemoCalendarHeader title={monthTitle} />}
      sidebar={sidebar}
      tabRail={tabRail}
    >
      <CalendarGridShell todayIndex={todayIndex}>{children}</CalendarGridShell>
      {overlay}
    </AppChromeFrame>
  );
}
