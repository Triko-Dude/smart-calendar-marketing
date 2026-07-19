import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { RequestForm } from '@/components/request/RequestForm';
import { CONTACT_EMAIL, PRODUCT_NAME } from '@/lib/brand';

export const metadata: Metadata = {
  title: `Share a request — ${PRODUCT_NAME}`,
  description: `Tell the ${PRODUCT_NAME} team what would help. Feature ideas, feedback, bugs — we read every note.`,
};

export default function RequestPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 pb-24 pt-28 md:pt-32">
        <p className="text-sm font-medium tracking-wide text-[var(--accent-blue)]">
          You&apos;re part of this
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
          Share a request
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
          Ideas, rough edges, early-access questions — send a short note. No account
          required. It goes straight to the Chronocal inbox (
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[var(--foreground)] underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          ), and we&apos;ll follow up.
        </p>

        <div className="mt-10">
          <RequestForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
