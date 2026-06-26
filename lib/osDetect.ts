export type PlatformId =
  | 'macos'
  | 'windows'
  | 'linux'
  | 'ios'
  | 'android'
  | 'web'
  | 'unknown';

export function detectPlatformFromUserAgent(ua: string): PlatformId {
  const lower = ua.toLowerCase();

  if (/iphone|ipad|ipod/.test(lower)) return 'ios';
  if (/android/.test(lower)) return 'android';
  if (/macintosh|mac os x/.test(lower)) return 'macos';
  if (/windows/.test(lower)) return 'windows';
  if (/linux/.test(lower)) return 'linux';

  return 'unknown';
}

export const PLATFORM_LABELS: Record<PlatformId, string> = {
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
  ios: 'iOS',
  android: 'Android',
  web: 'Web',
  unknown: 'your platform',
};
