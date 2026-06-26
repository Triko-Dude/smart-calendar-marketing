'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PLATFORM_STRIP } from '@/lib/platformCopy';

const HeroProductLoop = dynamic(
  () => import('@/components/demo/HeroProductLoop').then((m) => m.HeroProductLoop),
  { ssr: false, loading: () => <div className="mx-auto h-[488px] max-w-2xl rounded-xl bg-[var(--panel)] animate-pulse" /> }
);

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-24 pb-20 ambient-gradient overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <motion.h1
              className="text-balance text-5xl font-semibold tracking-[-0.04em] text-[var(--foreground)] md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              A calmer way to plan your week.
            </motion.h1>
            <motion.p
              className="mt-6 max-w-md text-pretty text-lg text-[var(--text-secondary)] md:text-xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Smart Calendar is a weekly calendar for focused work. It schedules your tasks,
              protects your time, and gets out of your way.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button size="lg" asChild>
                <Link href="/download">Download</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#feature-tasks">See how it works</a>
              </Button>
            </motion.div>
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              {PLATFORM_STRIP}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <HeroProductLoop />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
