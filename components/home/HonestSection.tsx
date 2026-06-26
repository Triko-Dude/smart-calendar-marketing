'use client';

import { motion } from 'framer-motion';
import { SECTION_REVEAL } from '@/lib/motionPresets';

const CARDS = [
  {
    title: 'Not a project management tool.',
    body: 'No tickets, no boards, no Gantt charts. If you need Jira, you need Jira.',
  },
  {
    title: 'Not a team collaboration suite.',
    body: 'Smart Calendar is for one person planning one week. No shared workspaces, no @-mentions, no permissions matrix.',
  },
  {
    title: 'Not a CRM, journal, or note-taking app.',
    body: 'We do one thing — protect your time and schedule your focused work. Notion, Obsidian, and the rest are excellent at the rest.',
  },
];

export function HonestSection() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
          A few things this is not.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
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
