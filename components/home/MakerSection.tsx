import { MAKER_NAME } from '@/lib/brand';
import { makerCopy } from '@/lib/marketingCopy';

export function MakerSection() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--background-overlay)] py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
          {makerCopy.eyebrow}
        </h2>
        <blockquote className="mt-8 space-y-6 text-pretty text-lg leading-relaxed text-[var(--text-secondary)]">
          {makerCopy.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </blockquote>
        <p className="mt-8 text-sm text-[var(--text-tertiary)]">— {MAKER_NAME}</p>
      </div>
    </section>
  );
}
