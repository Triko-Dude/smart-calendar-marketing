import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-overlay)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-semibold text-[var(--foreground)]">Smart Calendar</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">The quiet calendar.</p>
        </div>
        <div className="space-y-2 text-sm">
          <Link href="/download" className="block text-[var(--text-secondary)] hover:text-[var(--foreground)]">
            Download
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
          <a href="mailto:hello@smartcalendar.app" className="block hover:text-[var(--foreground)]">
            hello@smartcalendar.app
          </a>
        </div>
      </div>
      <div className="border-t border-[var(--border)] px-6 py-6 text-center text-xs text-[var(--text-tertiary)]">
        © 2026 Smart Calendar. Made with care.
      </div>
    </footer>
  );
}
