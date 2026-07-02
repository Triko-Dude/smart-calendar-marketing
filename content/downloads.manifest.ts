import { APP_URL_DEFAULT, PRODUCT_NAME, SITE_URL_DEFAULT } from '@/lib/brand';

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

const WINDOWS_INSTALLER_PATH = '/downloads/Chronocal_0.1.0_x64-setup.exe';

const WINDOWS_INSTALLER_URL =
  process.env.NEXT_PUBLIC_WINDOWS_INSTALLER_URL ??
  `${SITE_URL}${WINDOWS_INSTALLER_PATH}`;

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? APP_URL_DEFAULT;

/** Filled after build — update when shipping a new installer. */
const WINDOWS_INSTALLER_SHA256 = process.env.NEXT_PUBLIC_WINDOWS_INSTALLER_SHA256 ?? '';

export const downloadsManifest = {
  githubRepo: 'Triko-Dude/smart-calendar',
  windowsInstallerPath: WINDOWS_INSTALLER_PATH,
  windowsInstallerUrl: WINDOWS_INSTALLER_URL,
  appUrl: APP_URL,
  platforms: [
    {
      id: 'windows',
      label: 'Windows',
      status: 'available' as const,
      url: WINDOWS_INSTALLER_URL,
      fileName: 'Chronocal_0.1.0_x64-setup.exe',
      fileSize: '~38 MB',
      requirements: 'Windows 10 or later · Local-first beta — no account required',
      tagline: 'Install Chronocal on your PC. Your calendar stays on your device.',
      sha256: WINDOWS_INSTALLER_SHA256 || undefined,
      installSteps: [
        'Download the installer (.exe).',
        'Run it and follow the prompts (Windows may show an unsigned-app warning — expected for v0.1).',
        'Open Chronocal and start with an empty calendar or sample data.',
      ],
    },
    {
      id: 'macos',
      label: 'macOS',
      status: 'coming_soon' as const,
      requirements: 'Requires macOS 13 or later',
      installSteps: [
        'Open the .dmg file.',
        `Drag Chronocal to Applications.`,
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
      tagline: 'Try in your browser — sign-in optional for v0.1.',
      installSteps: [
        'Open the web app in your browser.',
        'Use it locally without an account, or sign in later for cloud features.',
        'Install as a PWA from your browser menu if you want an app icon.',
      ],
    },
  ] satisfies PlatformDownload[],
} as const;

export function getPlatformDownload(id: string): PlatformDownload | undefined {
  return downloadsManifest.platforms.find((p) => p.id === id);
}
