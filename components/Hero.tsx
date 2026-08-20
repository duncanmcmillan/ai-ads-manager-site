'use client';

import { useCallback } from 'react';

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

export default function Hero() {
  const handleDownload = useCallback(async () => {
    await trackDownload();
    // TODO: replace with GitHub Releases URL when installer is published
    window.location.href = '#download';
  }, []);

  return (
    <section className="pt-40 pb-28 px-6 bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto text-center">

        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-gray-300 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
          Free download — Pro unlocks AI features
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          Facebook Ads,<br />
          <span className="text-orange-400">Powered by AI</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Build campaigns from a plain-English brief. Monitor performance. Optimise creatives.
          A desktop app built for freelancers and small teams — your data never leaves your machine.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
          >
            Download Free
          </button>
          <a
            href="#features"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-8 py-3.5 rounded-xl transition-colors text-base text-center"
          >
            See Features
          </a>
        </div>

        <p className="text-sm text-gray-500">macOS &amp; Windows &nbsp;&middot;&nbsp; No account required to install</p>

      </div>
    </section>
  );
}
