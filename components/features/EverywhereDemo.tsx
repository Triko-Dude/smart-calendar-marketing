'use client';

import { ProductDemoFrame } from '@/components/demo/ProductDemoFrame';
import { dayLeft, dayWidth, slotHeight, slotTop } from '@/components/demo/CalendarGridShell';
import { DemoEventBlock } from '@/components/demo/DemoEventBlock';
import { FeaturePanel } from '@/components/features/FeaturePanel';
import { featureCopy } from '@/lib/marketingCopy';

function DeviceFrame({
  label,
  status,
  className,
  children,
}: {
  label: string;
  status?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className ?? ''}`}>
      <div className="overflow-hidden rounded-xl border-4 border-[var(--border)] bg-[var(--panel)] shadow-xl">
        {children}
      </div>
      <span className="text-xs text-[var(--text-tertiary)]">{label}</span>
      {status && (
        <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--accent-blue)]">
          {status}
        </span>
      )}
    </div>
  );
}

function MiniChrome({ height = 200 }: { height?: number }) {
  return (
    <ProductDemoFrame height={height} className="rounded-none border-0 shadow-none">
      <div
        className="absolute z-10"
        style={{
          left: dayLeft(1),
          width: dayWidth(),
          top: slotTop(10),
          height: slotHeight(60),
        }}
      >
        <DemoEventBlock title="Deep work" color="var(--cat-blue)" />
      </div>
      <div
        className="absolute z-10"
        style={{
          left: dayLeft(2),
          width: dayWidth(),
          top: slotTop(12),
          height: slotHeight(45),
        }}
      >
        <DemoEventBlock title="Gym" color="var(--cat-emerald)" />
      </div>
    </ProductDemoFrame>
  );
}

export function EverywhereDemo() {
  return (
    <FeaturePanel
      id="feature-everywhere"
      label="Everywhere"
      labelColor="var(--accent-blue)"
      headline={featureCopy.everywhere.headline}
      subheadline={featureCopy.everywhere.subheadline}
    >
      <div className="flex flex-wrap items-end justify-center gap-8">
        <DeviceFrame label="Windows" status="Available" className="w-56">
          <div className="w-52">
            <MiniChrome height={180} />
          </div>
        </DeviceFrame>
        <DeviceFrame label="Web" status="Live now" className="w-full max-w-md">
          <div className="w-80">
            <MiniChrome height={220} />
          </div>
        </DeviceFrame>
        <DeviceFrame label="macOS" status="Coming soon" className="w-44">
          <div className="w-40 opacity-70">
            <MiniChrome height={160} />
          </div>
        </DeviceFrame>
        <DeviceFrame label="Linux" status="Coming soon" className="w-44">
          <div className="w-40 opacity-70">
            <MiniChrome height={160} />
          </div>
        </DeviceFrame>
        <DeviceFrame label="Mobile" status="Coming soon" className="w-36">
          <div className="w-32 opacity-70">
            <MiniChrome height={160} />
          </div>
        </DeviceFrame>
      </div>
    </FeaturePanel>
  );
}
