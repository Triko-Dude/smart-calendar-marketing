'use client';

import { Camera, MessageCircle } from 'lucide-react';
import type { DemoWidgetPanelProps } from '@/lib/demoWidgetRegistry';

const GRADIENTS = [
  'linear-gradient(135deg, #4f7cff 0%, #8b6cff 100%)',
  'linear-gradient(135deg, #f4a93c 0%, #ff5d6c 100%)',
  'linear-gradient(135deg, #8b6cff 0%, #4f7cff 100%)',
  'linear-gradient(135deg, #ff5d6c 0%, #f4a93c 100%)',
  'linear-gradient(135deg, #4f7cff 0%, #f4a93c 100%)',
  'linear-gradient(135deg, #8b6cff 0%, #ff5d6c 100%)',
];

export function DemoInstagramPanel(_props: DemoWidgetPanelProps) {
  return (
    <div className="space-y-2">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-[var(--border)] px-2 py-1.5 text-[10px] font-medium text-[var(--muted)]"
      >
        <Camera className="h-3 w-3" aria-hidden />
        Connected @studio
      </button>

      <div className="grid grid-cols-3 gap-1">
        {GRADIENTS.map((gradient, i) => (
          <div
            key={i}
            className="group relative aspect-square overflow-hidden rounded-md border border-[var(--border)]"
            style={{ background: gradient }}
          >
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/45 px-1 py-0.5 text-[7px] text-white opacity-0 transition-opacity group-hover:opacity-100">
              <span>{24 + i}</span>
              <span className="inline-flex items-center gap-0.5">
                <MessageCircle className="h-2 w-2" />
                {3 + i}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
