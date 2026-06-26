'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import {
  BUBBLE_SPAWN_INTERVAL_MS,
  PHASE_STEP,
  type Bubble,
  createBubble,
  drawGoalWater,
} from '@/lib/goalWaterCanvas';
import { ProductDemoFrame } from '@/components/demo/ProductDemoFrame';
import { DemoTaskTabRail } from '@/components/demo/DemoTaskTabRail';
import {
  DEMO_TASK_PANEL_W,
  DEMO_TASK_TAB_EXPANDED_W,
  DEMO_TASK_TAB_NUB_W,
} from '@/lib/taskPanelMetrics';
import { SPRING_TASK_PANEL } from '@/lib/motionPresets';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useInViewPause } from '@/lib/useInViewPause';
import { FeaturePanel } from '@/components/features/FeaturePanel';

const GOAL_COLOR = '#2fbf71';
const TARGET_RATIO = 0.6;

function GoalSidebar({
  displayRef,
  cardRef,
  canvasRef,
}: {
  displayRef: React.RefObject<HTMLParagraphElement | null>;
  cardRef: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  return (
    <motion.aside
      className="absolute top-0 z-20 hidden overflow-hidden border-l border-[var(--border)] bg-[var(--panel)] md:block"
      style={{ bottom: 0, right: 0, width: DEMO_TASK_PANEL_W }}
      initial={false}
      animate={{ x: 0 }}
      transition={SPRING_TASK_PANEL}
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-[var(--border)] px-4 pb-2.5 pt-4">
          <h3 className="text-sm font-bold tracking-tight">Tasks</h3>
        </div>
        <div className="flex-1 space-y-2 overflow-hidden p-3">
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-xl border"
            style={{
              borderColor: 'color-mix(in srgb, var(--cat-emerald) 30%, transparent)',
              borderLeft: '3px solid var(--cat-emerald)',
              minHeight: 88,
            }}
          >
            <canvas ref={canvasRef} className="absolute inset-0" />
            <div className="relative z-10 px-3 py-2.5">
              <p className="text-xs font-semibold leading-tight">Read 5 hours</p>
              <p ref={displayRef} className="mt-0.5 text-[10px] text-[var(--muted)]">
                0 of 5 hours
              </p>
            </div>
          </div>
          <div
            className="rounded-xl border px-3 py-2.5"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--cat-emerald) 15%, transparent)',
              borderColor: 'color-mix(in srgb, var(--cat-emerald) 30%, transparent)',
              borderLeft: '3px solid var(--cat-emerald)',
            }}
          >
            <p className="text-xs font-semibold leading-tight">Gym</p>
            <p className="mt-0.5 text-[10px] text-[var(--muted)]">45 min</p>
          </div>
        </div>
        <div className="border-t border-[var(--border)] p-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold text-white"
            style={{ backgroundColor: 'var(--cat-emerald)' }}
          >
            <Plus className="h-3.5 w-3.5" />
            Add Task
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

export function GoalsWaterDemo() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLParagraphElement>(null);
  const isVisible = useInViewPause(containerRef);
  const progressRef = useRef(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    visibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fillBaselineRef = { value: 0 };
    const phaseRef = { value: 0 };
    const bubblesRef: Bubble[] = [];
    let size = { w: 0, h: 0 };
    let drawFn: (() => void) | null = null;
    let intervalId = 0;
    let gsapModule: typeof import('gsap').default | null = null;

    const resize = () => {
      const w = card.clientWidth;
      const h = card.clientHeight;
      if (w === 0 || h === 0) return;
      const dpr = 2;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size = { w, h };
      fillBaselineRef.value = h * (1 - progressRef.current);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(card);

    const startAnimation = async () => {
      const gsap = (await import('gsap')).default;
      gsapModule = gsap;

      if (reduced) {
        progressRef.current = TARGET_RATIO;
        resize();
        drawGoalWater(ctx, size.w, size.h, {
          color: GOAL_COLOR,
          fillBaseline: size.h * (1 - TARGET_RATIO),
          phase: 0,
          bubbles: [],
          showBubbles: false,
        });
        if (displayRef.current) displayRef.current.textContent = '3 of 5 hours';
        return;
      }

      gsap.to(progressRef, {
        current: TARGET_RATIO,
        duration: 3,
        ease: 'power2.out',
        onUpdate: () => {
          fillBaselineRef.value = size.h * (1 - progressRef.current);
          if (displayRef.current) {
            const hours = Math.round(progressRef.current * 5);
            displayRef.current.textContent = `${hours} of 5 hours`;
          }
        },
      });

      drawFn = () => {
        if (size.w === 0 || !visibleRef.current) return;
        phaseRef.value += PHASE_STEP;
        drawGoalWater(ctx, size.w, size.h, {
          color: GOAL_COLOR,
          fillBaseline: fillBaselineRef.value,
          phase: phaseRef.value,
          bubbles: bubblesRef,
          showBubbles: progressRef.current > 0,
        });
      };

      gsap.ticker.add(drawFn);

      intervalId = window.setInterval(() => {
        if (!visibleRef.current || progressRef.current <= 0 || size.w === 0) return;
        const b = createBubble(size.w, size.h);
        bubblesRef.push(b);
        gsap.to(b, {
          y: -b.r,
          duration: b.duration,
          ease: 'none',
          onComplete: () => {
            const idx = bubblesRef.indexOf(b);
            if (idx > -1) bubblesRef.splice(idx, 1);
          },
        });
      }, BUBBLE_SPAWN_INTERVAL_MS);
    };

    void startAnimation();

    return () => {
      observer.disconnect();
      if (drawFn && gsapModule) gsapModule.ticker.remove(drawFn);
      clearInterval(intervalId);
      bubblesRef.forEach((b) => gsapModule?.killTweensOf(b));
    };
  }, [reduced]);

  return (
    <FeaturePanel
      id="feature-goals"
      label="Goals"
      labelColor="var(--cat-emerald)"
      headline="Progress, made visible."
      subheadline="Set a weekly target — read 5 hours, gym 4 times. As you complete sessions, the goal card fills like water. Quiet, ambient, never demanding."
    >
      <div ref={containerRef}>
        <ProductDemoFrame
          panelOpen
          sidebar={
            <GoalSidebar
              displayRef={displayRef}
              cardRef={cardRef}
              canvasRef={canvasRef}
            />
          }
          tabRail={
            <DemoTaskTabRail
              activeTabId="health"
              expandedTabId="health"
              panelOpen
              nubWidth={DEMO_TASK_TAB_NUB_W}
              expandedWidth={DEMO_TASK_TAB_EXPANDED_W}
              rightOffset={DEMO_TASK_PANEL_W}
            />
          }
        />
      </div>
    </FeaturePanel>
  );
}
