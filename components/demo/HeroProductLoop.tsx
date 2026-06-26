'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  dayLeft,
  dayWidth,
  slotHeight,
  slotTop,
} from '@/components/demo/CalendarGridShell';
import { DemoEventBlock } from '@/components/demo/DemoEventBlock';
import {
  DEMO_TASKS,
  DemoTaskSidebar,
  DemoTaskTabRail,
} from '@/components/demo/DemoTaskTabRail';
import { DemoFocusZone } from '@/components/demo/DemoFocusZone';
import { ProductDemoFrame } from '@/components/demo/ProductDemoFrame';
import {
  DEMO_TASK_PANEL_W,
  DEMO_TASK_TAB_EXPANDED_W,
  DEMO_TASK_TAB_NUB_W,
} from '@/lib/taskPanelMetrics';
import { REFLOW_STAGGER_DELAY, SPRING_REFLOW, TASK_CARD_STAGGER } from '@/lib/motionPresets';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useInViewPause } from '@/lib/useInViewPause';

type Phase = 'idle' | 'open' | 'drag' | 'fill' | 'hold';

interface BlockState {
  id: string;
  title: string;
  color: string;
  day: number;
  y: number;
  height: number;
  visible: boolean;
}

const RESOLVED: BlockState[] = [
  { id: 'deep', title: 'Deep work', color: 'var(--cat-blue)', day: 1, y: slotTop(9), height: slotHeight(90), visible: true },
  { id: 'gym', title: 'Gym', color: 'var(--cat-emerald)', day: 1, y: slotTop(11, 30), height: slotHeight(60), visible: true },
  { id: 'write', title: 'Write', color: 'var(--cat-coral)', day: 1, y: slotTop(13), height: slotHeight(60), visible: true },
];

const INITIAL = RESOLVED.map((b) => ({ ...b, visible: false }));

export function HeroProductLoop() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewPause(containerRef);
  const [phase, setPhase] = useState<Phase>(reduced ? 'hold' : 'idle');
  const [panelOpen, setPanelOpen] = useState(reduced);
  const [expandedTab, setExpandedTab] = useState<string | null>(reduced ? 'work' : null);
  const [blocks, setBlocks] = useState(reduced ? RESOLVED : INITIAL);
  const [showZone, setShowZone] = useState(reduced);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    if (reduced || !isVisible) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setPhase('idle');
      setPanelOpen(false);
      setExpandedTab(null);
      setBlocks(INITIAL);
      setShowZone(false);
      setCursor({ x: 0, y: 0, visible: false });

      timers.push(setTimeout(() => {
        if (cancelled) return;
        setExpandedTab('work');
      }, 500));

      timers.push(setTimeout(() => {
        if (cancelled) return;
        setPhase('open');
        setPanelOpen(true);
        setCursor({ x: 340, y: 180, visible: true });
      }, 1100));

      timers.push(setTimeout(() => {
        if (cancelled) return;
        setPhase('drag');
        setCursor({ x: 200, y: 140, visible: true });
      }, 2200));

      timers.push(setTimeout(() => {
        if (cancelled) return;
        setPhase('fill');
        setPanelOpen(false);
        setExpandedTab('work');
        setShowZone(true);
        setBlocks(RESOLVED.map((b) => ({ ...b, visible: true })));
        setCursor((c) => ({ ...c, visible: false }));
      }, 3000));

      timers.push(setTimeout(() => {
        if (cancelled) return;
        setPhase('hold');
      }, 4200));

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
    <div ref={containerRef} className="relative mx-auto max-w-2xl">
      <ProductDemoFrame
        panelOpen={panelOpen}
        sidebar={
          <DemoTaskSidebar
            open={panelOpen || reduced}
            tasks={DEMO_TASKS}
          />
        }
        tabRail={
          <DemoTaskTabRail
            activeTabId="work"
            expandedTabId={expandedTab}
            panelOpen={panelOpen}
            nubWidth={DEMO_TASK_TAB_NUB_W}
            expandedWidth={DEMO_TASK_TAB_EXPANDED_W}
            rightOffset={panelOpen ? DEMO_TASK_PANEL_W : 0}
          />
        }
      >
        <DemoFocusZone
          visible={showZone || reduced}
          style={{
            left: dayLeft(1),
            width: dayWidth(),
            top: slotTop(9) - 4,
            height: slotHeight(300) + 8,
          }}
        />

        <AnimatePresence>
          {blocks
            .filter((b) => b.visible || reduced)
            .map((block, i) => (
              <motion.div
                key={block.id}
                className="absolute z-10"
                style={{
                  left: dayLeft(block.day),
                  width: dayWidth(),
                  height: block.height,
                  top: 0,
                }}
                initial={
                  reduced
                    ? false
                    : {
                        ...TASK_CARD_STAGGER.hidden,
                        y: block.id === 'deep' && phase === 'drag' ? 120 : block.y + 30,
                        x: block.id === 'deep' && phase === 'drag' ? 80 : 0,
                      }
                }
                animate={{
                  ...TASK_CARD_STAGGER.show(i),
                  y: block.y,
                  x: 0,
                }}
                transition={{
                  ...SPRING_REFLOW,
                  delay: i * REFLOW_STAGGER_DELAY,
                }}
              >
                <DemoEventBlock title={block.title} color={block.color} />
              </motion.div>
            ))}
        </AnimatePresence>
      </ProductDemoFrame>

      {!reduced && cursor.visible && (
        <motion.div
          className="pointer-events-none absolute z-50 h-4 w-4 rounded-full border-2 border-white/90 bg-white/25 shadow-lg backdrop-blur-sm"
          animate={{ left: cursor.x, top: cursor.y }}
          transition={SPRING_REFLOW}
          style={{ left: cursor.x, top: cursor.y }}
        />
      )}
    </div>
  );
}
