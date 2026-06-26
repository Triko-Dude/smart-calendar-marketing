'use client';

import { useEffect, useRef, useState } from 'react';
import { ProductDemoFrame } from '@/components/demo/ProductDemoFrame';
import { DemoWidgetPanel, DEMO_WIDGETS } from '@/components/demo/DemoWidgetPanel';
import { FeaturePanel } from '@/components/features/FeaturePanel';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useInViewPause } from '@/lib/useInViewPause';

export function WidgetsDemo() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewPause(containerRef);
  const [activeId, setActiveId] = useState<string | undefined>(
    reduced ? DEMO_WIDGETS[1].id : undefined
  );

  useEffect(() => {
    if (reduced || !isVisible) return;
    let i = 0;
    const interval = setInterval(() => {
      setActiveId(DEMO_WIDGETS[i % DEMO_WIDGETS.length].id);
      i++;
    }, 2400);
    return () => clearInterval(interval);
  }, [reduced, isVisible]);

  return (
    <FeaturePanel
      id="feature-widgets"
      label="Widgets"
      labelColor="var(--cat-violet)"
      headline="Information without intrusion."
      subheadline="A timer that works offline. Weather, email, and social when you connect an account — docked at the edge, expandable when wanted, invisible when not."
    >
      <div ref={containerRef} className="relative">
        <ProductDemoFrame activeWidgetId={activeId} overlay={<DemoWidgetPanel activeId={activeId} />} />
        <p className="mt-4 text-center text-xs text-[var(--text-tertiary)]">
          Connected widgets require signing in.
        </p>
      </div>
    </FeaturePanel>
  );
}
