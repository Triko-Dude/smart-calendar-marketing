/** Public product identity for the Chronocal marketing site. */
export const PRODUCT_NAME = 'Chronocal';

export const PRODUCT_TAGLINE = 'Everything in one Place';

/** Longer subtitle for hero and meta. */
export const PRODUCT_SUBTAGLINE =
  'A calendar created for people who want everything in one place, at one time.';

export const PRODUCT_HERO_BODY =
  'Plan your week in the browser — tasks, focus zones, and Auto Fill on one calendar. Saved on your device by default; sign-in sync and Google Calendar are optional beta.';

export const PRODUCT_DESCRIPTION =
  'Chronocal is a local-first calendar for tasks, focus, goals, and your week. Use it in the browser without an account; export a backup anytime. Cloud sync and Google Calendar are optional.';

export const CONTACT_EMAIL = 'hello@chronocal.tech';

export const MAKER_NAME = 'Kowen Leskiw';

export const SITE_URL_DEFAULT = 'https://chronocal.tech';

/**
 * Canonical branded planner host.
 * Requires DNS: CNAME `app` → the smart-calendar Vercel DNS target.
 */
export const APP_URL_DEFAULT = 'https://app.chronocal.tech';

/**
 * Reachable Vercel production alias for the planner.
 * Used when `NEXT_PUBLIC_APP_URL` is missing/invalid, or until `app.chronocal.tech` DNS is live.
 */
export const APP_URL_PRODUCTION_ALIAS =
  'https://smart-calendar-kowenleskiw-8498s-projects.vercel.app';

/**
 * Reject marketing-site URLs (including the old `/download` misconfig) so
 * "Open web app" / "Sign in" never point at chronocal.tech itself.
 */
export function normalizePlannerAppUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().replace(/\/$/, '');
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    const host = url.hostname.toLowerCase();
    if (host === 'chronocal.tech' || host === 'www.chronocal.tech') return null;
    if (url.pathname === '/download' || url.pathname.startsWith('/download/')) return null;
    return trimmed;
  } catch {
    return null;
  }
}

/**
 * Prefer a valid `NEXT_PUBLIC_APP_URL`. If unset or pointing at the marketing
 * site (e.g. `/download`), use the reachable planner alias — not `chronocal.tech`.
 * Switch the env to {@link APP_URL_DEFAULT} once `app` DNS is live.
 */
export const APP_URL =
  normalizePlannerAppUrl(process.env.NEXT_PUBLIC_APP_URL) ?? APP_URL_PRODUCTION_ALIAS;
