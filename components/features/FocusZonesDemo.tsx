'use client';

import { useEffect, useRef, useState } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { dayLeft, dayWidth, slotHeight, slotTop } from '@/components/demo/CalendarGridShell';
import { DemoEventBlock } from '@/components/demo/DemoEventBlock';
import { DemoFocusZone } from '@/components/demo/DemoFocusZone';
import { ProductDemoFrame } from '@/components/demo/ProductDemoFrame';
import { REFLOW_STAGGER_DELAY, SPRING_REFLOW } from '@/lib/motionPresets';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useInViewPause } from '@/lib/useInViewPause';
import { FeaturePanel } from '@/components/features/FeaturePanel';
import { featureCopy } from '@/lib/marketingCopy';

const TASKS = [
  { id: 't1', title: 'Research', color: 'var(--cat-blue)', top: slotTop(10), h: slotHeight(60) },
  { id: 't2', title: 'Draft', color: 'var(--cat-emerald)', top: slotTop(11, 30), h: slotHeight(60) },
  { id: 't3', title: 'Review', color: 'var(--cat-coral)', top: slotTop(13), h: slotHeight(45) },
  { id: 't4', title: 'Ship', color: 'var(--cat-violet)', top: slotTop(14, 30), h: slotHeight(45) },
];

export function FocusZonesDemo() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewPause(containerRef);
  const [showZone, setShowZone] = useState(reduced);
  const [showTasks, setShowTasks] = useState(reduced);

  useEffect(() => {
    if (reduced || !isVisible) return;
    const t1 = setTimeout(() => setShowZone(true), 600);
    const t2 = setTimeout(() => setShowTasks(true), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced, isVisible]);

  return (
    <FeaturePanel
      id="feature-focus"
      label="Focus"
      labelColor="var(--cat-blue)"
      headline={featureCopy.focus.headline}
      subheadline={featureCopy.focus.subheadline}
    >
      <div ref={containerRef}>
        <ProductDemoFrame todayIndex={2}>
          <DemoFocusZone
            visible={showZone}
            label="Deep work"
            style={{
              left: dayLeft(2),
              width: dayWidth(),
              top: slotTop(9) - 4,
              height: slotHeight(360),
            }}
          />
          <LayoutGroup>
            {showTasks &&
              TASKS.map((t, i) => (
                <motion.div
                  key={t.id}
                  layout
                  layoutId={t.id}
                  className="absolute z-10"
                  style={{
                    left: dayLeft(2),
                    width: dayWidth(),
                    top: t.top,
                    height: t.h,
                  }}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...SPRING_REFLOW, delay: i * REFLOW_STAGGER_DELAY }}
                >
                  <DemoEventBlock title={t.title} color={t.color} />
                </motion.div>
              ))}
          </LayoutGroup>
        </ProductDemoFrame>
      </div>
    </FeaturePanel>
  );
}
