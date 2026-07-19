'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { APP_URL, PRODUCT_NAME } from '@/lib/brand';
import { useLenisScroll } from '@/components/layout/SmoothScrollProvider';

export function SiteHeader() {
  const { scroll } = useLenisScroll();

  const bgOpacity = Math.min(1, Math.max(0, scroll / 80));
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
          <BrandLogo size={32} />
          {PRODUCT_NAME}
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/request">Share a request</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={APP_URL} rel="noopener noreferrer">
              Open web app
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/download">Download</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
