const FREE_FEATURES = [
  'Campaign, Ad Set & Ad builder',
  'Ad creative management',
  'Monitoring — last 7 days',
  'Local encrypted credential storage',
  'macOS & Windows',
];

const PRO_FEATURES = [
  'Everything in Free',
  'AI brief → campaign generation',
  'Ad optimisation with verdict scoring',
  'Monitoring — all date ranges',
  'CSV export',
  'Priority email support',
];

function Check() {
  return (
    <svg className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Simple pricing
          </h2>
          <p className="text-lg text-gray-500">
            Start free. Upgrade when AI features matter.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 items-start">

          {/* Free */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Free</div>
              <div className="text-4xl font-bold text-gray-900">£0</div>
              <div className="text-sm text-gray-400 mt-1">Forever</div>
            </div>
            <ul className="space-y-3 mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#download"
              className="block text-center border border-gray-200 hover:border-orange-300 text-gray-700 font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              Download Free
            </a>
          </div>

          {/* Pro */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 relative">
            <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Most Popular
            </div>
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-1">Pro</div>
              <div className="text-4xl font-bold text-white">£40</div>
              <div className="text-sm text-gray-500 mt-1">per year</div>
            </div>
            <ul className="space-y-3 mb-8">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            {/* TODO: replace href with live LemonSqueezy checkout URL */}
            <a
              href="https://aiads.lemonsqueezy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              Buy Pro — £40/yr
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
