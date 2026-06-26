export type PlatformStatus = 'available' | 'coming_soon';

export interface PlatformDownload {
  id: string;
  label: string;
  status: PlatformStatus;
  url?: string;
  fileSize?: string;
  requirements?: string;
  installSteps?: string[];
  sha256?: string;
}

const GITHUB_RELEASES =
  process.env.NEXT_PUBLIC_GITHUB_RELEASES_URL ??
  'https://github.com/smart-calendar/smart-calendar/releases/latest';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.smartcalendar.app';

export const downloadsManifest = {
  githubRepo: 'smart-calendar/smart-calendar',
  releasesUrl: GITHUB_RELEASES,
  appUrl: APP_URL,
  platforms: [
    {
      id: 'windows',
      label: 'Windows',
      status: 'available' as const,
      url: GITHUB_RELEASES,
      fileSize: '~38 MB',
      requirements: 'Requires Windows 10 or later',
      installSteps: [
        'Download the .msi or .exe installer.',
        'Run the installer and follow the prompts.',
        'Open Smart Calendar and choose empty calendar or sample data.',
      ],
    },
    {
      id: 'macos',
      label: 'macOS',
      status: 'coming_soon' as const,
      requirements: 'Requires macOS 13 or later',
      installSteps: [
        'Open the .dmg file.',
        'Drag Smart Calendar to Applications.',
        'Open it and sign in.',
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
      installSteps: ['Open in your browser.', 'Install as PWA from the browser menu if desired.'],
    },
  ] satisfies PlatformDownload[],
} as const;

export function getPlatformDownload(id: string): PlatformDownload | undefined {
  return downloadsManifest.platforms.find((p) => p.id === id);
}
