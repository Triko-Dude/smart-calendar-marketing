'use client';

import { motion } from 'framer-motion';
import { SECTION_REVEAL } from '@/lib/motionPresets';

const PARAGRAPHS = [
  'Most calendars were built for meetings. They treat your week as a grid of empty boxes you are expected to fill, then they applaud you when the grid is full. They confuse a scheduled hour with a completed one. They optimize for the appearance of progress, not the doing of the work.',
  'Chrono is built around a different idea. There is time in your week that belongs to you — protected hours when the only job is to do focused work. We call these focus zones. You organize work in color-coded tabs along the edge. You tell the app what you want to work on. It handles the boring planning: which task goes where, how to spread hours across days, what to do when a deadline is at risk. You handle the part that matters, which is showing up.',
  'Everything in the product flows from this posture. The auto-fill places tasks intelligently and gets out of the way. When you drag something, the rest of the calendar reflows in a quiet cascade — not because animation is a feature, but because abrupt jumps are a small disrespect to your attention. Goals fill like water as you complete sessions. Widgets sit in a dock and do their work. Your data stays on your device by default — account sync is there when you want it, not before.',
  'Chrono is for people who want to do focused work and are willing to protect the time it requires. If that sounds like you, the download is below.',
];

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
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] md:text-5xl">
          A different posture toward time.
        </h2>
        <motion.div
          className="mt-12 space-y-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PARAGRAPHS.map((p, i) => (
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
