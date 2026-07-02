'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SPRING_TASK_PANEL } from '@/lib/motionPresets';
import {
  DEMO_TASK_PANEL_W,
  TASK_TAB_GAP,
  TASK_TAB_STACK_INSET_BOTTOM,
  TASK_TAB_STACK_INSET_TOP,
} from '@/lib/taskPanelMetrics';
import { getTabLabelColor, tabRailFillColor } from '@/lib/eventColors';
import styles from '@/components/demo/demo.module.css';

export interface DemoTab {
  id: string;
  label: string;
  color: string;
}

const DEFAULT_TABS: DemoTab[] = [
  { id: 'work', label: 'Work', color: 'var(--cat-blue)' },
  { id: 'health', label: 'Health', color: 'var(--cat-emerald)' },
  { id: 'life', label: 'Life', color: 'var(--cat-coral)' },
];

function equalTabHeights(stackHeight: number, tabCount: number): number {
  const totalGap = TASK_TAB_GAP * Math.max(0, tabCount - 1);
  return Math.max(22, (stackHeight - totalGap) / tabCount);
}

function buildYPositions(heights: number[]): number[] {
  const ys: number[] = [];
  let y = 0;
  for (let i = 0; i < heights.length; i++) {
    ys.push(y);
    y += heights[i] + TASK_TAB_GAP;
  }
  return ys;
}

interface DemoTaskTabRailProps {
  activeTabId?: string;
  expandedTabId?: string | null;
  panelOpen?: boolean;
  nubWidth: number;
  expandedWidth: number;
  rightOffset: number;
  onTabClick?: (tabId: string) => void;
}

export function DemoTaskTabRail({
  activeTabId = 'work',
  expandedTabId,
  panelOpen = false,
  nubWidth,
  expandedWidth,
  rightOffset,
  onTabClick,
}: DemoTaskTabRailProps) {
  const stackHeight = 440 - TASK_TAB_STACK_INSET_TOP - TASK_TAB_STACK_INSET_BOTTOM;
  const tabHeights = DEFAULT_TABS.map(() => equalTabHeights(stackHeight, DEFAULT_TABS.length));
  const yPositions = buildYPositions(tabHeights);

  return (
    <div
      className={styles.tabRail}
      style={{
        right: rightOffset,
        width: expandedWidth,
        top: TASK_TAB_STACK_INSET_TOP,
        bottom: TASK_TAB_STACK_INSET_BOTTOM,
      }}
    >
      <div className={styles.tabStack}>
        {DEFAULT_TABS.map((tab, i) => {
          const expanded = expandedTabId === tab.id;
          const active = tab.id === activeTabId;
          const width = expanded ? expandedWidth : nubWidth;
          const fill = tabRailFillColor(tab.color, active, panelOpen);
          const labelColor = getTabLabelColor(fill);

          return (
            <motion.button
              key={tab.id}
              type="button"
              className={styles.tabButton}
              style={{
                top: yPositions[i],
                height: tabHeights[i],
                width,
              }}
              animate={{ width }}
              transition={{ type: 'spring', stiffness: 520, damping: 42, mass: 0.5 }}
              onClick={() => onTabClick?.(tab.id)}
              aria-label={`${tab.label} tasks`}
            >
              <div className={styles.tabSurface} style={{ backgroundColor: fill }}>
                {(expanded || (panelOpen && active)) && (
                  <span className={styles.tabLabel} style={{ color: labelColor }}>
                    {tab.label}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

interface DemoTaskSidebarProps {
  open: boolean;
  activeColor?: string;
  tasks: { title: string; color: string; duration?: string }[];
}

export function DemoTaskSidebar({ open, activeColor = 'var(--cat-blue)', tasks }: DemoTaskSidebarProps) {
  return (
    <motion.aside
      className="absolute top-0 z-20 overflow-hidden border-l border-[var(--border)] bg-[var(--panel)] will-change-transform"
      style={{ bottom: 0, right: 0, width: DEMO_TASK_PANEL_W }}
      initial={false}
      animate={{ x: open ? 0 : '100%' }}
      transition={SPRING_TASK_PANEL}
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-[var(--border)] px-4 pb-2.5 pt-4">
          <h3 className="text-sm font-bold tracking-tight">Tasks</h3>
        </div>
        <div className="flex-1 space-y-2 overflow-hidden p-3">
          {tasks.map((t) => (
            <div
              key={t.title}
              className="rounded-xl border px-3 py-2.5"
              style={{
                backgroundColor: `color-mix(in srgb, ${t.color} 15%, transparent)`,
                borderColor: `color-mix(in srgb, ${t.color} 30%, transparent)`,
                borderLeft: `3px solid ${t.color}`,
              }}
            >
              <p className="text-xs font-semibold leading-tight">{t.title}</p>
              {t.duration && (
                <p className="mt-0.5 text-[10px] text-[var(--muted)]">{t.duration}</p>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--border)] p-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold text-white"
            style={{ backgroundColor: activeColor }}
          >
            <Plus className="h-3.5 w-3.5" />
            Add Task
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

export const DEMO_TASKS = [
  { title: 'Deep work', color: 'var(--cat-blue)', duration: '90 min' },
  { title: 'Write proposal', color: 'var(--cat-blue)', duration: '60 min' },
  { title: 'Gym', color: 'var(--cat-emerald)', duration: '45 min' },
  { title: 'Call mom', color: 'var(--cat-coral)', duration: '30 min' },
];
