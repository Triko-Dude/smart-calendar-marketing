'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLenisScroll } from '@/components/layout/SmoothScrollProvider';

export function SiteHeader() {
  const { scroll } = useLenisScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bgOpacity = mounted ? Math.min(1, Math.max(0, scroll / 80)) : 0;
  const borderOpacity = bgOpacity;

  return (
    <motion.header
      className="fixed top-0 z-50 w-full"
      style={{ height: 'var(--header-height, 64px)' }}
    >
      <div
        className="absolute inset-0 bg-[var(--background)] transition-opacity duration-150"
        style={{ opacity: bgOpacity }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-[var(--border)] transition-opacity duration-150"
        style={{ opacity: borderOpacity }}
      />
      <div className="relative mx-auto flex h-14 md:h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-[var(--foreground)]"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_62%,var(--foreground))] text-[var(--accent-foreground)] shadow-md"
            aria-hidden
          >
            <CalendarDays className="h-4 w-4" />
          </span>
          Smart Calendar
        </Link>
        <Button variant="outline" size="sm" asChild>
          <Link href="/download">Download</Link>
        </Button>
      </div>
    </motion.header>
  );
}
