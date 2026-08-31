const RELEASES_URL = 'https://github.com/duncanmcmillan/ai-social-media-ads/releases/latest';

const PLATFORMS = [
  {
    label: 'macOS',
    sub: 'M1 / M2 / M3 / M4',
    badge: 'Most Macs',
    href: RELEASES_URL,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    ),
  },
  {
    label: 'macOS',
    sub: 'Intel (pre-2021)',
    badge: null,
    href: RELEASES_URL,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    ),
  },
  {
    label: 'Windows',
    sub: 'x64',
    badge: null,
    href: RELEASES_URL,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M3 12V6.75l6-1.32v6.57H3zm17 0V5.5l-9 1.98V12h9zm0 .5l-9 .2v5.52L20 19.5V12.5zM3 12.5v5.23l6 .84v-6.07H3z"/>
      </svg>
    ),
  },
  {
    label: 'Linux',
    sub: 'deb / rpm',
    badge: null,
    href: RELEASES_URL,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-1 3v6l5 3-.87-1.5L14 13V7h-3z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="download" className="bg-gray-950 text-gray-400 border-t border-white/10 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 16 16" fill="white" width="12" height="12" aria-hidden="true">
              <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9l2.5 2.5L14 9l-2.5-2.5z"/>
            </svg>
          </div>
          <span className="text-gray-300 font-medium">AI Ads Manager</span>
          <span className="text-gray-600">&copy; {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-6 text-gray-500">
          <a href="mailto:hello@ai-social-media-ads.online" className="hover:text-gray-300 transition-colors">
            Contact
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
          <a
            href="https://ai-social-media-ads.online"
            className="hover:text-gray-300 transition-colors"
          >
            ai-social-media-ads.online
          </a>
        </div>

      </div>

      {/* Download section */}
      <div className="max-w-5xl mx-auto mt-10 pt-8 border-t border-white/5 text-center">
        <p className="text-sm text-gray-400 mb-2">Free to download. No subscription required to try it.</p>
        <p className="text-xs text-gray-600 mb-6">
          Native desktop app for macOS, Windows, and Linux &mdash; no browser, no cloud sync.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {PLATFORMS.map(p => (
            <a
              key={`${p.label}-${p.sub}`}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 text-gray-300 transition-all text-sm"
            >
              {p.badge && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
                  {p.badge}
                </span>
              )}
              {p.icon}
              <span>
                <span className="font-medium">{p.label}</span>
                <span className="text-gray-500 ml-1 text-xs">{p.sub}</span>
              </span>
            </a>
          ))}
        </div>

        <p className="mt-5 text-xs text-gray-600">
          Not sure which Mac download?{' '}
          <span className="text-gray-500">Apple menu &rarr; About This Mac &rarr; look for M1/M2/M3/M4 or Intel.</span>
        </p>

        <p className="mt-2 text-xs text-gray-600">
          All releases on{' '}
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-300 underline underline-offset-2 transition-colors"
          >
            GitHub Releases
          </a>
        </p>

        {/* First-launch instructions */}
        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3 text-left max-w-2xl mx-auto">
          <div className="flex-1 bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3">
            <p className="text-xs font-medium text-gray-400 mb-1">macOS — first launch only</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              macOS will warn the app can&apos;t be verified. <strong className="text-gray-500">Right-click the app &rarr; Open &rarr; Open</strong> to approve it. Alternatively go to <strong className="text-gray-500">System Settings &rarr; Privacy &amp; Security &rarr; Open Anyway</strong>.
            </p>
          </div>
          <div className="flex-1 bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3">
            <p className="text-xs font-medium text-gray-400 mb-1">Windows — first launch only</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Windows SmartScreen may block the installer. Click <strong className="text-gray-500">More info &rarr; Run anyway</strong> to proceed. You only need to do this once.
            </p>
          </div>
        </div>
      </div>

      {/* Contact / enquiry section */}
      <div className="max-w-5xl mx-auto mt-10 pt-8 border-t border-white/5 text-center">
        <p className="text-sm text-gray-400 mb-1">Have a question or want to know more?</p>
        <p className="text-xs text-gray-600 mb-5">Drop your email and we&apos;ll get back to you.</p>
        <form
          className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-sm mx-auto"
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-orange-500 transition-colors"
          />
          <a
            href="mailto:hello@ai-social-media-ads.online"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap text-center"
          >
            Get in touch
          </a>
        </form>
      </div>

    </footer>
  );
}
