import Link from 'next/link';
import { CONTACT_EMAIL, PRODUCT_NAME, PRODUCT_TAGLINE } from '@/lib/brand';

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-overlay)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-semibold text-[var(--foreground)]">{PRODUCT_NAME}</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{PRODUCT_TAGLINE}</p>
        </div>
        <div className="space-y-2 text-sm">
          <Link href="/download" className="block text-[var(--text-secondary)] hover:text-[var(--foreground)]">
            Download
          </Link>
          <Link href="/request" className="block text-[var(--text-secondary)] hover:text-[var(--foreground)]">
            Share a request
          </Link>
          <Link href="/changelog" className="block text-[var(--text-secondary)] hover:text-[var(--foreground)]">
            Changelog
          </Link>
          <Link href="/privacy" className="block text-[var(--text-secondary)] hover:text-[var(--foreground)]">
            Privacy
          </Link>
          <Link href="/terms" className="block text-[var(--text-secondary)] hover:text-[var(--foreground)]">
            Terms
          </Link>
        </div>
        <div className="space-y-2 text-sm text-[var(--text-secondary)]">
          <Link href="/request" className="block hover:text-[var(--foreground)]">
            Tell us what you need
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="block hover:text-[var(--foreground)]">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
      <div className="border-t border-[var(--border)] px-6 py-6 text-center text-xs text-[var(--text-tertiary)]">
        © 2026 {PRODUCT_NAME}. Made with care.
      </div>
    </footer>
  );
}
