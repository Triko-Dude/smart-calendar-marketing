import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FEATURES = [
  'Full planner — tasks, focus zones, auto-fill, goals',
  'Local-first — no account required',
  'Windows desktop installer and web app',
  'JSON backup and .ics export',
  'Timer widget works offline',
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-32">
      <div className="mx-auto max-w-lg px-6">
        <h2 className="text-center text-balance text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
          Free during beta.
        </h2>
        <article className="mt-12 rounded-xl border border-[var(--accent-blue)]/40 bg-[var(--background-elevated)] p-8">
          <p className="text-5xl font-semibold tracking-[-0.03em]">$0</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">No card. No trial countdown.</p>
          <ul className="mt-8 space-y-3 text-sm text-[var(--text-secondary)]">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cat-emerald)]" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-8 w-full" asChild>
            <Link href="/download">Download</Link>
          </Button>
        </article>
        <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
          We&apos;ll announce pricing before anything changes.
        </p>
      </div>
    </section>
  );
}
