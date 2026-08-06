'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { SECTION_REVEAL } from '@/lib/motionPresets';

interface FeaturePanelProps {
  id: string;
  label: string;
  labelColor?: string;
  headline: string;
  subheadline: string;
  children: ReactNode;
  pin?: boolean;
  comingSoon?: boolean;
}

export function FeaturePanel({
  id,
  label,
  labelColor = 'var(--accent-blue)',
  headline,
  subheadline,
  children,
  pin = false,
  comingSoon = false,
}: FeaturePanelProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !pin) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const el = sectionRef.current;
      if (!el) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: '+=30%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });
      }, el);
    };

    void init();

    return () => {
      ctx?.revert();
    };
  }, [reducedMotion, pin]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={SECTION_REVEAL}
        >
          <div className="flex flex-wrap items-center gap-3">
            <p
              className="text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: labelColor }}
            >
              {label}
            </p>
            {comingSoon && (
              <span className="rounded-md border border-[var(--border)] bg-[var(--background-elevated)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
                Coming soon
              </span>
            )}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.025em] text-[var(--foreground)] md:text-5xl">
            {headline}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-lg text-[var(--text-secondary)]">
            {subheadline}
          </p>
        </motion.div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
