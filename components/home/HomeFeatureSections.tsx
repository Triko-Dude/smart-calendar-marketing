'use client';

import dynamic from 'next/dynamic';

function FeatureSkeleton() {
  return (
    <div className="mx-6 my-24 min-h-[60vh] animate-pulse rounded-xl bg-[var(--background-elevated)]/50" />
  );
}

const TasksTabDemo = dynamic(
  () => import('@/components/features/TasksTabDemo').then((m) => m.TasksTabDemo),
  { ssr: false, loading: FeatureSkeleton }
);
const FocusZonesDemo = dynamic(
  () => import('@/components/features/FocusZonesDemo').then((m) => m.FocusZonesDemo),
  { ssr: false, loading: FeatureSkeleton }
);
const CascadeDemo = dynamic(
  () => import('@/components/features/CascadeDemo').then((m) => m.CascadeDemo),
  { ssr: false, loading: FeatureSkeleton }
);
const GoalsWaterDemo = dynamic(
  () => import('@/components/features/GoalsWaterDemo').then((m) => m.GoalsWaterDemo),
  { ssr: false, loading: FeatureSkeleton }
);
const WidgetsDemo = dynamic(
  () => import('@/components/features/WidgetsDemo').then((m) => m.WidgetsDemo),
  { ssr: false, loading: FeatureSkeleton }
);
const SyncDemo = dynamic(
  () => import('@/components/features/SyncDemo').then((m) => m.SyncDemo),
  { ssr: false, loading: FeatureSkeleton }
);
const EverywhereDemo = dynamic(
  () => import('@/components/features/EverywhereDemo').then((m) => m.EverywhereDemo),
  { ssr: false, loading: FeatureSkeleton }
);

export function HomeFeatureSections() {
  return (
    <>
      <TasksTabDemo />
      <FocusZonesDemo />
      <CascadeDemo />
      <GoalsWaterDemo />
      <WidgetsDemo />
      <SyncDemo />
      <EverywhereDemo />
    </>
  );
}
