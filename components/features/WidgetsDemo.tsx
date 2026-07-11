'use client';

import { useRef } from 'react';
import { DemoFloatingWidgetCard } from '@/components/demo/DemoFloatingWidgetCard';
import { ProductDemoFrame } from '@/components/demo/ProductDemoFrame';
import { FeaturePanel } from '@/components/features/FeaturePanel';
import { featureCopy } from '@/lib/marketingCopy';
import { useWidgetDemoCycle } from '@/hooks/useWidgetDemoCycle';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useInViewPause } from '@/lib/useInViewPause';

export function WidgetsDemo() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetLayerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewPause(containerRef);

  const { activeId, morphPhase, originRect, floatPosition, handleMorphComplete } =
    useWidgetDemoCycle(isVisible, reduced, widgetLayerRef);

  const showCard =
    activeId !== undefined &&
    morphPhase !== 'closed' &&
    originRect !== null &&
    floatPosition !== null;

  return (
    <FeaturePanel
      id="feature-widgets"
      label="Widgets"
      labelColor="var(--cat-violet)"
      headline={featureCopy.widgets.headline}
      subheadline={featureCopy.widgets.subheadline}
    >
      <div ref={containerRef} className="relative">
        <ProductDemoFrame
          activeWidgetId={activeId}
          morphPhase={morphPhase}
          widgetLayerRef={widgetLayerRef}
          widgetOverlay={
            showCard ? (
              <DemoFloatingWidgetCard
                widgetId={activeId}
                morphPhase={morphPhase}
                originRect={originRect}
                floatPosition={floatPosition}
                onMorphComplete={handleMorphComplete}
              />
            ) : null
          }
        />
        <p className="mt-4 text-center text-xs text-[var(--text-tertiary)]">
          Connected widgets require signing in.
        </p>
      </div>
    </FeaturePanel>
  );
}
