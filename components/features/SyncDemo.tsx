'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, RefreshCw, Download, Upload } from 'lucide-react';
import { ProductDemoFrame } from '@/components/demo/ProductDemoFrame';
import { dayLeft, dayWidth, slotHeight, slotTop } from '@/components/demo/CalendarGridShell';
import { DemoEventBlock } from '@/components/demo/DemoEventBlock';
import { FeaturePanel } from '@/components/features/FeaturePanel';
import { featureCopy } from '@/lib/marketingCopy';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useInViewPause } from '@/lib/useInViewPause';
import { getEventFill } from '@/lib/eventColors';

type SyncState = 'idle' | 'syncing' | 'done';

export function SyncDemo() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewPause(containerRef);
  const [state, setState] = useState<SyncState>(reduced ? 'done' : 'idle');

  useEffect(() => {
    if (reduced || !isVisible) return;
    const sequence: SyncState[] = ['idle', 'syncing', 'done'];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % sequence.length;
      setState(sequence[i]);
    }, 2200);
    return () => clearInterval(interval);
  }, [reduced, isVisible]);

  return (
    <FeaturePanel
      id="feature-sync"
      label="Sync"
      labelColor="var(--accent-blue)"
      headline={featureCopy.sync.headline}
      subheadline={featureCopy.sync.subheadline}
    >
      <div ref={containerRef} className="space-y-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
          <motion.button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)]"
            animate={state === 'syncing' ? { rotate: 360 } : { rotate: 0 }}
            transition={
              state === 'syncing'
                ? { duration: 1, repeat: Infinity, ease: 'linear' }
                : { duration: 0.3 }
            }
          >
            {state === 'idle' && <RefreshCw className="h-5 w-5 text-[var(--muted)]" />}
            {state === 'syncing' && <Loader2 className="h-5 w-5 text-[var(--accent-blue)]" />}
            {state === 'done' && <Check className="h-5 w-5 text-[var(--cat-emerald)]" />}
          </motion.button>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="w-48 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-3">
              <div className="flex items-center gap-2">
                <Upload className="h-3.5 w-3.5 text-[var(--accent-blue)]" />
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Google (import)
                </p>
              </div>
              <div className="mt-3 space-y-1.5">
                <div
                  className="rounded-md px-2 py-1.5 text-[9px] font-medium"
                  style={{
                    backgroundColor: getEventFill('var(--cat-blue)'),
                    borderLeft: '2px solid var(--cat-blue)',
                  }}
                >
                  Team standup
                </div>
                <div
                  className="rounded-md px-2 py-1.5 text-[9px] font-medium"
                  style={{
                    backgroundColor: getEventFill('var(--cat-emerald)'),
                    borderLeft: '2px solid var(--cat-emerald)',
                  }}
                >
                  Focus block
                </div>
              </div>
            </div>
            <div className="w-48 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-3">
              <div className="flex items-center gap-2">
                <Download className="h-3.5 w-3.5 text-[var(--muted)]" />
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Export (.ics)
                </p>
              </div>
              <div className="mt-3 space-y-1.5">
                {['Apple Calendar', 'Outlook link'].map((label) => (
                  <div
                    key={label}
                    className="rounded-md border border-[var(--border)] bg-[var(--card)]/60 px-2 py-1.5 text-[9px] text-[var(--muted)]"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ProductDemoFrame height={320}>
          <div
            className="absolute z-10"
            style={{
              left: dayLeft(3),
              width: dayWidth(),
              top: slotTop(10),
              height: slotHeight(60),
            }}
          >
            <DemoEventBlock
              title="Team standup"
              color="var(--cat-blue)"
              timeRange="10:00 – 11:00"
            />
          </div>
          <div
            className="absolute z-10 opacity-60"
            style={{
              left: dayLeft(4),
              width: dayWidth(),
              top: slotTop(14),
              height: slotHeight(45),
            }}
          >
            <DemoEventBlock title="Focus block" color="var(--cat-emerald)" timeRange="2:00 – 2:45" />
          </div>
        </ProductDemoFrame>
      </div>
    </FeaturePanel>
  );
}
