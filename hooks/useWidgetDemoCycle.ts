'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import {
  computeDemoFloatPosition,
  getDotRectRelative,
} from '@/lib/demoWidgetMetrics';
import {
  DEMO_WIDGETS,
  type DemoMorphPhase,
  type DemoWidgetId,
} from '@/lib/demoWidgetRegistry';

const HOLD_MS = 2000;
const ADVANCE_MS = 400;

interface WidgetDemoCycleState {
  activeId?: DemoWidgetId;
  morphPhase: DemoMorphPhase;
  originRect: DOMRect | null;
  floatPosition: { x: number; y: number } | null;
  handleMorphComplete: (phase: DemoMorphPhase) => void;
}

export function useWidgetDemoCycle(
  isVisible: boolean,
  reduced: boolean,
  containerRef: RefObject<HTMLDivElement | null>
): WidgetDemoCycleState {
  const [activeId, setActiveId] = useState<DemoWidgetId | undefined>();
  const [morphPhase, setMorphPhase] = useState<DemoMorphPhase>('closed');
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [floatPosition, setFloatPosition] = useState<{ x: number; y: number } | null>(null);
  const indexRef = useRef(0);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const clearTimers = useCallback(() => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
  }, []);

  const openAtIndex = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;
      const widget = DEMO_WIDGETS[index % DEMO_WIDGETS.length];
      const rect = getDotRectRelative(widget.id, container);
      if (!rect) return;
      setActiveId(widget.id);
      setOriginRect(rect);
      setFloatPosition(computeDemoFloatPosition(rect));
      setMorphPhase('opening');
    },
    [containerRef]
  );

  const handleMorphComplete = useCallback(
    (phase: DemoMorphPhase) => {
      if (phase === 'floating') {
        setMorphPhase('floating');
        holdTimerRef.current = setTimeout(() => setMorphPhase('docking'), HOLD_MS);
      } else if (phase === 'closed') {
        setMorphPhase('closed');
        setActiveId(undefined);
        setOriginRect(null);
        setFloatPosition(null);
        indexRef.current = (indexRef.current + 1) % DEMO_WIDGETS.length;
        advanceTimerRef.current = setTimeout(() => openAtIndex(indexRef.current), ADVANCE_MS);
      }
    },
    [openAtIndex]
  );

  useEffect(() => {
    clearTimers();

    if (reduced) {
      const container = containerRef.current;
      if (!container) return;
      const rect = getDotRectRelative('clock', container);
      if (!rect) return;
      setActiveId('clock');
      setOriginRect(rect);
      setFloatPosition(computeDemoFloatPosition(rect));
      setMorphPhase('floating');
      return;
    }

    if (!isVisible) {
      setMorphPhase('closed');
      setActiveId(undefined);
      setOriginRect(null);
      setFloatPosition(null);
      return;
    }

    const frame = requestAnimationFrame(() => openAtIndex(indexRef.current));
    return () => {
      cancelAnimationFrame(frame);
      clearTimers();
    };
  }, [clearTimers, containerRef, isVisible, openAtIndex, reduced]);

  return {
    activeId,
    morphPhase,
    originRect,
    floatPosition,
    handleMorphComplete,
  };
}
