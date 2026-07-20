import { APP_URL, SITE_URL_DEFAULT } from '@/lib/brand';

export type PlatformStatus = 'available' | 'coming_soon';

export interface PlatformDownload {
  id: string;
  label: string;
  status: PlatformStatus;
  url?: string;
  fileName?: string;
  fileSize?: string;
  requirements?: string;
  installSteps?: string[];
  sha256?: string;
  tagline?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL_DEFAULT;

const WINDOWS_INSTALLER_FILE = 'Chronocal_0.1.4_x64-setup.exe';

/**
 * Host the installer on the marketing site (`public/downloads/`).
 * GitHub Releases stay private while the app repo is private.
 */
const WINDOWS_INSTALLER_URL =
  process.env.NEXT_PUBLIC_WINDOWS_INSTALLER_URL ??
  `${SITE_URL}/downloads/${WINDOWS_INSTALLER_FILE}`;

/** Filled after build — update when shipping a new installer. */
const WINDOWS_INSTALLER_SHA256 =
  process.env.NEXT_PUBLIC_WINDOWS_INSTALLER_SHA256 ??
  '47FDE2F209FAB9887DEB8F8D52FC28A99AA05584F9AA58EE2747FBD8FBCDE9EF';

export const downloadsManifest = {
  githubRepo: 'Triko-Dude/smart-calendar',
  windowsInstallerPath: `/downloads/${WINDOWS_INSTALLER_FILE}`,
  windowsInstallerUrl: WINDOWS_INSTALLER_URL,
  siteUrl: SITE_URL,
  appUrl: APP_URL,
  platforms: [
    {
      id: 'windows',
      label: 'Windows',
      status: 'available' as const,
      url: WINDOWS_INSTALLER_URL,
      fileName: WINDOWS_INSTALLER_FILE,
      fileSize: '~37 MB',

      requirements: 'Windows 10 or later · Local-first beta — no account required',
      tagline: 'Install Chronocal on your PC. Your calendar stays on your device.',
      sha256: WINDOWS_INSTALLER_SHA256 || undefined,
      installSteps: [
        'Download the installer (.exe).',
        'Run it and follow the prompts (Windows may show an unsigned-app warning — expected for v0.1).',
        'Open Chronocal and start with an empty calendar or sample data.',
        'Sign in, then connect Google Calendar for two-way sync.',
      ],
    },
    {
      id: 'macos',
      label: 'macOS',
      status: 'coming_soon' as const,
      tagline: 'Use the web app today while the native Mac app is in development.',
      requirements: 'Requires macOS 13 or later',
      installSteps: [
        'Open the .dmg file.',
        'Drag Chronocal to Applications.',
        'Open it and start planning.',
      ],
    },
    {
      id: 'linux',
      label: 'Linux',
      status: 'coming_soon' as const,
      requirements: '.deb or AppImage',
    },
    {
      id: 'ios',
      label: 'iOS',
      status: 'coming_soon' as const,
      tagline: 'Apple users can plan in the web app today while mobile apps are in development.',
    },
    {
      id: 'android',
      label: 'Android',
      status: 'coming_soon' as const,
    },
    {
      id: 'web',
      label: 'Web App',
      status: 'available' as const,
      url: APP_URL,
      tagline:
        'Open Chronocal in your browser — no account required. Sign-in sync is optional beta.',
      installSteps: [
        'Open the web app in your browser (works without signing in).',
        'Plan on this device; export a backup anytime from Settings → Data.',
        'Optional: Sign in for cloud backup (beta), then connect Google Calendar in Settings if you want overlays.',
      ],
    },
  ] satisfies PlatformDownload[],
} as const;

export function getPlatformDownload(id: string): PlatformDownload | undefined {
  return downloadsManifest.platforms.find((p) => p.id === id);
}
