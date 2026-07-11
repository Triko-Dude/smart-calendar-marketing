'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { dayLeft, dayWidth, slotHeight, slotTop } from '@/components/demo/CalendarGridShell';
import { DemoEventBlock } from '@/components/demo/DemoEventBlock';
import { ProductDemoFrame } from '@/components/demo/ProductDemoFrame';
import { REFLOW_STAGGER_DELAY, SPRING_REFLOW } from '@/lib/motionPresets';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useInViewPause } from '@/lib/useInViewPause';
import { FeaturePanel } from '@/components/features/FeaturePanel';
import { featureCopy } from '@/lib/marketingCopy';

interface Block {
  id: string;
  title: string;
  color: string;
  y: number;
  height: number;
}

const INITIAL: Block[] = [
  { id: 'a', title: 'Design review', color: 'var(--cat-blue)', y: slotTop(10), height: slotHeight(60) },
  { id: 'b', title: 'Standup', color: 'var(--cat-coral)', y: slotTop(11, 30), height: slotHeight(45) },
  { id: 'c', title: 'Deep work', color: 'var(--cat-emerald)', y: slotTop(13), height: slotHeight(90) },
];

const DISPLACED: Block[] = [
  { id: 'a', title: 'Design review', color: 'var(--cat-blue)', y: slotTop(10), height: slotHeight(60) },
  { id: 'b', title: 'Standup', color: 'var(--cat-coral)', y: slotTop(12, 15), height: slotHeight(45) },
  { id: 'c', title: 'Deep work', color: 'var(--cat-emerald)', y: slotTop(14), height: slotHeight(90) },
  { id: 'd', title: 'New task', color: 'var(--cat-violet)', y: slotTop(11, 30), height: slotHeight(45) },
];

export function CascadeDemo() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewPause(containerRef);
  const [blocks, setBlocks] = useState(reduced ? DISPLACED : INITIAL);

  useEffect(() => {
    if (reduced || !isVisible) return;

    let cancelled = false;
    const run = () => {
      setBlocks(INITIAL);
      setTimeout(() => {
        if (!cancelled) setBlocks(DISPLACED);
      }, 1200);
      setTimeout(() => {
        if (!cancelled) run();
      }, 5000);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [reduced, isVisible]);

  return (
    <FeaturePanel
      id="feature-cascade"
      label="Cascade"
      labelColor="var(--cat-coral)"
      headline={featureCopy.cascade.headline}
      subheadline={featureCopy.cascade.subheadline}
    >
      <div ref={containerRef}>
        <ProductDemoFrame>
          {blocks.map((b, i) => (
            <motion.div
              key={b.id}
              className="absolute z-10"
              style={{
                left: dayLeft(1),
                width: dayWidth(),
                height: b.height,
                top: 0,
                willChange: 'transform',
              }}
              animate={{ y: b.y }}
              transition={{ ...SPRING_REFLOW, delay: i * REFLOW_STAGGER_DELAY }}
            >
              <DemoEventBlock title={b.title} color={b.color} />
            </motion.div>
          ))}
        </ProductDemoFrame>
      </div>
    </FeaturePanel>
  );
}
