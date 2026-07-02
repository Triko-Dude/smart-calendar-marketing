'use client';

import { CalendarDays, Home, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/cn';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { PRODUCT_NAME } from '@/lib/brand';

export function DemoTopNav() {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--panel)] px-4">
      <div className="flex items-center gap-2">
        <BrandLogo size={28} />
        <span className="text-sm font-semibold tracking-tight">{PRODUCT_NAME}</span>
      </div>
      <nav className="flex items-center gap-0.5 rounded-full bg-[var(--card)] p-0.5">
        {[
          { icon: Home, active: false },
          { icon: CalendarDays, active: true },
          { icon: BarChart3, active: false },
          { icon: Settings, active: false },
        ].map(({ icon: Icon, active }, i) => (
          <div
            key={i}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full',
              active
                ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-md'
                : 'text-[var(--muted)]'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </div>
        ))}
      </nav>
    </header>
  );
}
