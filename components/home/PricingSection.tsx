import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pricingCopy } from '@/lib/marketingCopy';

export function PricingSection() {
  return (
    <section id="pricing" className="py-32">
      <div className="mx-auto max-w-lg px-6">
        <h2 className="text-center text-balance text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
          {pricingCopy.headline}
        </h2>
        <article className="mt-12 rounded-xl border border-[var(--accent-blue)]/40 bg-[var(--background-elevated)] p-8">
          <p className="text-5xl font-semibold tracking-[-0.03em]">{pricingCopy.price}</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{pricingCopy.priceSubline}</p>
          <ul className="mt-8 space-y-3 text-sm text-[var(--text-secondary)]">
            {pricingCopy.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cat-emerald)]" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-8 w-full" asChild>
            <Link href="/download">{pricingCopy.ctaLabel}</Link>
          </Button>
        </article>
        <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
          {pricingCopy.footerNote}
        </p>
      </div>
    </section>
  );
}
