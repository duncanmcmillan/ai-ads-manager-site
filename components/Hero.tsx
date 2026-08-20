'use client';

import { useCallback } from 'react';

/** Fires a Meta Pixel + CAPI download event then navigates to the download URL. */
async function trackDownload() {
  // Client-side Pixel event
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', { content_name: 'download_cta' });
  }

  // Server-side CAPI mirror
  try {
    await fetch('/api/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'Lead',
        event_source_url: window.location.href,
      }),
    });
  } catch {
    // Best-effort — don't block the download
  }
}

export default function Hero() {
  const handleDownload = useCallback(async () => {
    await trackDownload();
    // TODO: replace with GitHub Releases URL when the packaged installer is published
    window.location.href = '#download';
  }, []);

  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto text-center">

        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-1 text-sm text-orange-700 font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
          Free to download — Pro unlocks AI features
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
          Facebook Ads,<br />
          <span className="text-orange-500">Powered by AI</span>
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Build campaigns from a plain-English brief. Monitor performance. Optimise creatives.
          A desktop app built for freelancers and small teams — your data never leaves your machine.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-lg transition-colors text-base"
          >
            Download Free
          </button>
          <a
            href="#features"
            className="w-full sm:w-auto border border-gray-200 hover:border-gray-300 text-gray-700 font-medium px-8 py-3 rounded-lg transition-colors text-base text-center"
          >
            See Features
          </a>
        </div>

        <p className="mt-4 text-sm text-gray-400">macOS &amp; Windows &nbsp;·&nbsp; No account required</p>

      </div>
    </section>
  );
}
