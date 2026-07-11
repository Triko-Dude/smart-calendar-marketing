import { APP_URL_DEFAULT, SITE_URL_DEFAULT } from '@/lib/brand';

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

const WINDOWS_INSTALLER_FILE = 'Chronocal_0.1.1_x64-setup.exe';

/** Prefer GitHub Releases over hosting binaries in this repo. */
const WINDOWS_INSTALLER_URL =
  process.env.NEXT_PUBLIC_WINDOWS_INSTALLER_URL ??
  `https://github.com/Triko-Dude/smart-calendar/releases/latest/download/${WINDOWS_INSTALLER_FILE}`;

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? APP_URL_DEFAULT;

/** Filled after build — update when shipping a new installer. */
const WINDOWS_INSTALLER_SHA256 =
  process.env.NEXT_PUBLIC_WINDOWS_INSTALLER_SHA256 ??
  '792464C555078490E2F788896D3DA4BDF093357D1CDADF1EDDA7031ECEEFCDB1';

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
      fileSize: '~35 MB',
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
    },
    {
      id: 'android',
      label: 'Android',
      status: 'coming_soon' as const,
    },
    {
      id: 'web',
      label: 'Web App',
      status: 'coming_soon' as const,
      tagline: 'Hosted web planner coming later — desktop is the primary experience today.',
      installSteps: [
        'Download the Windows desktop app for the full Chronocal experience.',
        'A hosted web planner may ship later as a secondary surface.',
      ],
    },
  ] satisfies PlatformDownload[],
} as const;

export function getPlatformDownload(id: string): PlatformDownload | undefined {
  return downloadsManifest.platforms.find((p) => p.id === id);
}
