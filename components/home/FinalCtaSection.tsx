import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { finalCtaCopy } from '@/lib/marketingCopy';
import { PLATFORM_STRIP } from '@/lib/platformCopy';

export function FinalCtaSection() {
  return (
    <section id="download" className="py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
          {finalCtaCopy.headline}
        </h2>
        <div className="mt-10">
          <Button size="lg" asChild>
            <Link href="/download">{finalCtaCopy.ctaLabel}</Link>
          </Button>
        </div>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
          {PLATFORM_STRIP}
        </p>
      </div>
    </section>
  );
}
