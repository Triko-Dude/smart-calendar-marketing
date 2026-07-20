import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Button } from '@/components/ui/button';
import {
  downloadsManifest,
  getPlatformDownload,
  type PlatformDownload,
} from '@/content/downloads.manifest';
import { detectPlatformFromUserAgent, PLATFORM_LABELS, type PlatformId } from '@/lib/osDetect';

import { PRODUCT_NAME, APP_URL } from '@/lib/brand';

export const metadata: Metadata = {
  title: `Download — ${PRODUCT_NAME}`,
  description: `Download ${PRODUCT_NAME} for Windows or open the web app.`,
};

function PlatformCard({
  platform,
  featured = false,
}: {
  platform: PlatformDownload;
  featured?: boolean;
}) {
  const available = platform.status === 'available' && platform.url;

  return (
    <article
      className={`rounded-xl border p-6 ${
        featured
          ? 'border-[var(--accent-blue)]/40 bg-[var(--background-elevated)]'
          : 'border-[var(--border)] bg-[var(--background-elevated)]/50'
      }`}
    >
      <h3 className="text-lg font-semibold">{platform.label}</h3>
      {platform.tagline && (
        <p className="mt-2 text-sm text-[var(--text-secondary)]">{platform.tagline}</p>
      )}
      {platform.requirements && (
        <p className="mt-1 text-xs text-[var(--text-tertiary)]">{platform.requirements}</p>
      )}
      {available ? (
        <>
          <Button className="mt-4" asChild>
            <a
              href={platform.url}
              download={platform.fileName ?? undefined}
              rel="noopener noreferrer"
            >
              {platform.id === 'web' ? 'Open web app' : `Download for ${platform.label}`}
            </a>
          </Button>
          {platform.fileSize && (
            <p className="mt-2 text-xs text-[var(--text-tertiary)]">{platform.fileSize}</p>
          )}
          {platform.sha256 && (
            <details className="mt-4 text-xs text-[var(--text-tertiary)]">
              <summary className="cursor-pointer hover:text-[var(--text-secondary)]">
                Verify the download
              </summary>
              <code className="mt-2 block break-all font-mono">{platform.sha256}</code>
            </details>
          )}
        </>
      ) : (
        <p className="mt-4 text-sm text-[var(--text-secondary)]">Coming soon</p>
      )}
    </article>
  );
}

export default async function DownloadPage() {
  const headersList = await headers();
  const ua = headersList.get('user-agent') ?? '';
  const detected: PlatformId = detectPlatformFromUserAgent(ua);
  const heroPlatform = getPlatformDownload(
    detected === 'unknown' || detected === 'web' ? 'windows' : detected,
  );
  const others = downloadsManifest.platforms.filter((p) => p.id !== heroPlatform?.id);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm text-[var(--text-secondary)]">
            Detected: {PLATFORM_LABELS[detected === 'unknown' ? 'web' : detected]}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href={APP_URL} rel="noopener noreferrer">
                Sign in
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={APP_URL} rel="noopener noreferrer">
                Open web app
              </a>
            </Button>
          </div>

          {heroPlatform && (
            <div className="mt-8">
              <PlatformCard platform={heroPlatform} featured />
              {heroPlatform.installSteps && (
                <div className="mt-8">
                  <h2 className="text-sm font-semibold text-[var(--foreground)]">
                    Install in three steps
                  </h2>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[var(--text-secondary)]">
                    {heroPlatform.installSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          <div className="my-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--border)]" />
            <span className="text-xs text-[var(--text-tertiary)]">Other platforms</span>
            <div className="h-px flex-1 bg-[var(--border)]" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {others.map((p) => (
              <PlatformCard key={p.id} platform={p} />
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-[var(--text-secondary)]">
            <Link href="/" className="hover:text-[var(--foreground)]">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
