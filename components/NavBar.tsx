import DownloadButton from './DownloadButton';

export default function NavBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-orange-500 flex items-center justify-center">
            <svg viewBox="0 0 16 16" fill="white" width="14" height="14" aria-hidden="true">
              <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9l2.5 2.5L14 9l-2.5-2.5z"/>
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-sm">AI Ads Manager</span>
        </div>

        <nav className="hidden sm:flex items-center gap-8 text-sm text-gray-600">
          <a href="#screenshots" className="hover:text-gray-900 transition-colors">Screenshots</a>
          <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
        </nav>

        <DownloadButton className="text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition-colors cursor-pointer">
          Download Free
        </DownloadButton>
      </div>
    </header>
  );
}
