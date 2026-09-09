import DownloadButton from './DownloadButton';

export default function NavBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="" width={36} height={36} aria-hidden="true" />
          <span className="font-semibold text-gray-900 text-sm">
            AI<span className="font-light text-cyan-500">-ADS</span>
          </span>
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
