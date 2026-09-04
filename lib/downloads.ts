const BASE = 'https://github.com/duncanmcmillan/ai-social-media-ads/releases/download/v1.0.0';

export const DOWNLOADS = {
  mac:      `${BASE}/ai-social-media-ads-darwin-arm64-1.0.0.zip`,
  win:      `${BASE}/ai-social-media-ads-1.0.0.Setup.exe`,
  linuxDeb: `${BASE}/ai-social-media-ads_1.0.0_amd64.deb`,
  linuxRpm: `${BASE}/ai-social-media-ads-1.0.0-1.x86_64.rpm`,
} as const;

/** Returns the most appropriate download URL for the current browser OS. */
export function detectedDownloadUrl(): string {
  if (typeof navigator === 'undefined') return DOWNLOADS.mac;
  const ua = navigator.userAgent;
  if (/Win/i.test(ua)) return DOWNLOADS.win;
  if (/Linux/i.test(ua)) return DOWNLOADS.linuxDeb;
  return DOWNLOADS.mac; // macOS / unknown
}
