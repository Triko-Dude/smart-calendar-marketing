'use client';

import { motion } from 'framer-motion';
import { honestCopy } from '@/lib/marketingCopy';
import { SECTION_REVEAL } from '@/lib/motionPresets';

export function HonestSection() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
          {honestCopy.eyebrow}
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
          {honestCopy.headline}
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {honestCopy.cards.map((card, i) => (
            <motion.article
              key={card.title}
              className="rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] p-6"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...SECTION_REVEAL, delay: i * 0.08 }}
            >
              <h3 className="font-semibold text-[var(--foreground)]">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{card.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
