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

      <div className="max-w-5xl mx-auto mt-10 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
        Download coming soon. Enter your email below to be notified at launch.
        <form className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-orange-500 transition-colors"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap"
          >
            Notify me
          </button>
        </form>
      </div>

    </footer>
  );
}
