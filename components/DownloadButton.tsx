'use client';

import { useCallback } from 'react';
import { detectedDownloadUrl } from '../lib/downloads';

async function trackDownload() {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', { content_name: 'download_cta' });
  }
  try {
    await fetch('/api/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_name: 'Lead', event_source_url: window.location.href }),
    });
  } catch { /* best-effort */ }
}

interface DownloadButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function DownloadButton({ className, children }: DownloadButtonProps) {
  const handleClick = useCallback(async () => {
    await trackDownload();
    window.location.href = detectedDownloadUrl();
  }, []);

  return (
    <button onClick={handleClick} className={className}>
      {children ?? 'Download Free'}
    </button>
  );
}
