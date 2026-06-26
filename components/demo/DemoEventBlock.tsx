'use client';

import { cn } from '@/lib/cn';
import { getEventFill } from '@/lib/eventColors';

interface DemoEventBlockProps {
  title: string;
  color?: string;
  timeRange?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function DemoEventBlock({
  title,
  color = 'var(--cat-blue)',
  timeRange,
  className,
  style,
  children,
}: DemoEventBlockProps) {
  const fill = getEventFill(color);

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-lg p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.2)]',
        className
      )}
      style={{
        backgroundColor: fill,
        borderLeft: `3px solid ${color}`,
        color: 'var(--on-event)',
        ...style,
      }}
    >
      <span className="line-clamp-2 text-[10px] font-semibold leading-tight">{title}</span>
      {timeRange && (
        <span className="mt-0.5 text-[8px] font-medium text-[var(--on-event)]/70">{timeRange}</span>
      )}
      {children}
    </div>
  );
}
