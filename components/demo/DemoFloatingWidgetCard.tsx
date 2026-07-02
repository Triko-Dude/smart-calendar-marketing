'use client';

import { useEffect, useState } from 'react';
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
  const [reduceMotion, setReduceMotion] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(0);

  const isMorphing = morphPhase === 'opening' || morphPhase === 'docking';
  const isVisible = morphPhase !== 'closed';

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (morphPhase === 'opening' || morphPhase === 'docking') {
      setContentOpacity(0);
    } else if (morphPhase === 'floating') {
      setContentOpacity(1);
    }
  }, [morphPhase]);

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
