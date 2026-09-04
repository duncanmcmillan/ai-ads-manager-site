import DownloadButton from './DownloadButton';

const FREE_FEATURES = [
  'Campaign, Ad Set & Ad builder — up to 3 campaigns',
  'Ad creative management',
  'Performance monitoring — last 7 days',
  'Local encrypted storage',
  'macOS & Windows',
];

const PRO_FEATURES = [
  'Everything in Free',
  'Unlimited campaigns',
  'AI brief → campaign generation',
  'Ad optimisation with verdict scoring',
  'Full monitoring — all date ranges',
  'CSV export',
  'Priority email support',
];

function Tick({ dim }: { dim?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      fill="none"
      className={`shrink-0 mt-0.5 ${dim ? 'text-gray-400' : 'text-orange-500'}`}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-500 text-lg">
            Download free. Upgrade when AI features matter.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 items-stretch">

          {/* Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
            <div className="mb-8">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Free</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-bold text-gray-900">£0</span>
              </div>
              <p className="text-sm text-gray-400">Forever</p>
            </div>

            <ul className="space-y-3.5 flex-1 mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <Tick dim />
                  {f}
                </li>
              ))}
            </ul>

            <DownloadButton className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition-colors text-sm cursor-pointer">
              Download Free
            </DownloadButton>
          </div>

          {/* Pro */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-5 right-5 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
              PRO
            </div>

            <div className="mb-8">
              <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">Pro</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-bold text-white">£40</span>
                <span className="text-gray-400 mb-2 text-sm">/yr</span>
              </div>
              <p className="text-sm text-gray-500">Billed annually &nbsp;·&nbsp; cancel any time</p>
            </div>

            <ul className="space-y-3.5 flex-1 mb-8">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <Tick />
                  {f}
                </li>
              ))}
            </ul>

            {/* TODO: replace with live LemonSqueezy checkout URL */}
            <a
              href="https://aiads.lemonsqueezy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Get Pro — £40/yr
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
