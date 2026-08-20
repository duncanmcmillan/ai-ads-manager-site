export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="download" className="border-t border-gray-100 bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        <div className="text-center sm:text-left">
          <p className="font-semibold text-gray-900 mb-1">AI Ads Manager</p>
          <p className="text-sm text-gray-400">
            &copy; {year} ai-social-media-ads.online — All rights reserved
          </p>
        </div>

        <div className="flex flex-col items-center sm:items-end gap-3">
          <p className="text-sm text-gray-500">
            Download coming soon &mdash; join the waitlist
          </p>
          {/* TODO: replace with GitHub Releases links when installers are published */}
          <div className="flex gap-3">
            <a
              href="mailto:hello@ai-social-media-ads.online"
              className="text-sm text-gray-500 hover:text-orange-500 transition-colors"
            >
              Contact
            </a>
            <span className="text-gray-200">|</span>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-orange-500 transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
