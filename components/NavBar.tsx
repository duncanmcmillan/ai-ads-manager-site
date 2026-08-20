export default function NavBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-semibold text-gray-900 tracking-tight">AI Ads Manager</span>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
        </nav>
        <a
          href="#download"
          className="text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md transition-colors"
        >
          Download Free
        </a>
      </div>
    </header>
  );
}
