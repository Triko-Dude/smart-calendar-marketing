'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  DEMO_WIDGET_CARD_EXPANDED_HEIGHT,
  DEMO_WIDGET_CARD_WIDTH,
  morphRadius,
} from '@/lib/demoWidgetMetrics';
import { getDemoWidget, type DemoMorphPhase, type DemoWidgetId } from '@/lib/demoWidgetRegistry';
import { TWEEN_WIDGET_MORPH } from '@/lib/motionPresets';

interface DemoFloatingWidgetCardProps {
  widgetId: DemoWidgetId;
  morphPhase: DemoMorphPhase;
  originRect: DOMRect | null;
  floatPosition: { x: number; y: number } | null;
  onMorphComplete: (phase: DemoMorphPhase) => void;
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function DemoFloatingWidgetCard({
  widgetId,
  morphPhase,
  originRect,
  floatPosition,
  onMorphComplete,
}: DemoFloatingWidgetCardProps) {
  const widget = getDemoWidget(widgetId);
  const Icon = widget.icon;
  const Panel = widget.Panel;
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const isMorphing = morphPhase === 'opening' || morphPhase === 'docking';
  const isVisible = morphPhase !== 'closed';
  const contentOpacity = morphPhase === 'floating' ? 1 : 0;

  useEffect(() => {
    if (!reduceMotion) return;
    if (morphPhase === 'opening') {
      onMorphComplete('floating');
    } else if (morphPhase === 'docking') {
      onMorphComplete('closed');
    }
  }, [morphPhase, onMorphComplete, reduceMotion]);

  if (!isVisible || !originRect || !floatPosition) return null;

  const collapsed = {
    left: originRect.x,
    top: originRect.y,
    width: originRect.width,
    height: originRect.height,
    borderRadius: morphRadius(originRect.width),
  };

  const expanded = {
    left: floatPosition.x,
    top: floatPosition.y,
    width: DEMO_WIDGET_CARD_WIDTH,
    height: DEMO_WIDGET_CARD_EXPANDED_HEIGHT,
    borderRadius: morphRadius(DEMO_WIDGET_CARD_WIDTH),
  };

  const animateTarget = morphPhase === 'docking' ? collapsed : expanded;

  const handleAnimationComplete = () => {
    if (reduceMotion) return;
    if (morphPhase === 'opening') {
      onMorphComplete('floating');
    } else if (morphPhase === 'docking') {
      onMorphComplete('closed');
    }
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="false"
      aria-label={`${widget.label} widget`}
      initial={reduceMotion ? expanded : collapsed}
      animate={{
        ...animateTarget,
        boxShadow: isMorphing
          ? '0 4px 16px rgba(0,0,0,0.2)'
          : '0 12px 40px rgba(0,0,0,0.38)',
      }}
      transition={TWEEN_WIDGET_MORPH}
      onAnimationComplete={handleAnimationComplete}
      className="absolute z-40 flex flex-col overflow-hidden border border-[var(--border)] bg-[var(--panel)]"
    >
      <motion.div
        className="flex min-h-0 flex-1 flex-col"
        animate={{ opacity: contentOpacity }}
        transition={{ duration: reduceMotion ? 0 : 0.12 }}
      >
        <div className="flex shrink-0 items-center gap-1.5 border-b border-[var(--border)] px-2 py-1.5">
          <Icon className="h-3 w-3 shrink-0" style={{ color: widget.accent }} aria-hidden />
          <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-[var(--foreground)]">
            {widget.label}
          </span>
          <button
            type="button"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[var(--muted)]"
            aria-label={`Close ${widget.label}`}
            tabIndex={-1}
          >
            <X className="h-3 w-3" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-2.5">
          <Panel accent={widget.accent} />
        </div>
      </motion.div>
    </motion.div>
  );
}
