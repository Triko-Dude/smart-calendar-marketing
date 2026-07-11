'use client';

import { motion } from 'framer-motion';
import { storyCopy } from '@/lib/marketingCopy';
import { SECTION_REVEAL } from '@/lib/motionPresets';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: SECTION_REVEAL },
};

export function StorySection() {
  return (
    <section className="bg-[var(--background-overlay)] py-32">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
          {storyCopy.eyebrow}
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] md:text-5xl">
          {storyCopy.headline}
        </h2>
        <motion.div
          className="mt-12 space-y-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {storyCopy.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={item}
              className="max-w-[70ch] text-pretty text-base leading-relaxed text-[var(--text-secondary)] md:text-lg"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
