'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dayLeft, dayWidth, slotHeight, slotTop } from '@/components/demo/CalendarGridShell';
import { DemoEventBlock } from '@/components/demo/DemoEventBlock';
import {
  DEMO_TASKS,
  DemoTaskSidebar,
  DemoTaskTabRail,
} from '@/components/demo/DemoTaskTabRail';
import { ProductDemoFrame } from '@/components/demo/ProductDemoFrame';
import {
  DEMO_TASK_PANEL_W,
  DEMO_TASK_TAB_EXPANDED_W,
  DEMO_TASK_TAB_NUB_W,
} from '@/lib/taskPanelMetrics';
import { FeaturePanel } from '@/components/features/FeaturePanel';
import { featureCopy } from '@/lib/marketingCopy';
import { SPRING_REFLOW } from '@/lib/motionPresets';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useInViewPause } from '@/lib/useInViewPause';

export function TasksTabDemo() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewPause(containerRef);
  const [panelOpen, setPanelOpen] = useState(reduced);
  const [activeTab, setActiveTab] = useState('work');
  const [expandedTab, setExpandedTab] = useState<string | null>(reduced ? 'work' : null);
  const [placedTask, setPlacedTask] = useState(reduced);

  useEffect(() => {
    if (reduced || !isVisible) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setPanelOpen(false);
      setExpandedTab(null);
      setPlacedTask(false);
      setActiveTab('work');

      timers.push(setTimeout(() => {
        if (cancelled) return;
        setExpandedTab('work');
      }, 600));

      timers.push(setTimeout(() => {
        if (cancelled) return;
        setPanelOpen(true);
      }, 1000));

      timers.push(setTimeout(() => {
        if (cancelled) return;
        setPlacedTask(true);
      }, 2400));

      timers.push(setTimeout(() => {
        if (cancelled) return;
        run();
      }, 6500));
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduced, isVisible]);

  return (
    <FeaturePanel
      id="feature-tasks"
      label="Tasks"
      labelColor="var(--accent-blue)"
      headline={featureCopy.tasks.headline}
      subheadline={featureCopy.tasks.subheadline}
    >
      <div ref={containerRef}>
        <ProductDemoFrame
          panelOpen={panelOpen}
          sidebar={
            <DemoTaskSidebar
              open={panelOpen || reduced}
              activeColor="var(--cat-blue)"
              tasks={DEMO_TASKS}
            />
          }
          tabRail={
            <DemoTaskTabRail
              activeTabId={activeTab}
              expandedTabId={expandedTab}
              panelOpen={panelOpen}
              nubWidth={DEMO_TASK_TAB_NUB_W}
              expandedWidth={DEMO_TASK_TAB_EXPANDED_W}
              rightOffset={panelOpen ? DEMO_TASK_PANEL_W : 0}
              onTabClick={(id) => {
                setActiveTab(id);
                setExpandedTab(id);
                setPanelOpen(true);
              }}
            />
          }
        >
          <AnimatePresence>
            {(placedTask || reduced) && (
              <motion.div
                key="placed"
                className="absolute z-10"
                style={{
                  left: dayLeft(1),
                  width: dayWidth(),
                  top: slotTop(10),
                  height: slotHeight(90),
                }}
                initial={reduced ? false : { opacity: 0, scale: 0.92, x: 48 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={SPRING_REFLOW}
              >
                <DemoEventBlock title="Deep work" color="var(--cat-blue)" timeRange="10:00 – 11:30" />
              </motion.div>
            )}
          </AnimatePresence>
        </ProductDemoFrame>
      </div>
    </FeaturePanel>
  );
}
