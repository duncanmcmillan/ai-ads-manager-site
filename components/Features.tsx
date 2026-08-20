const FEATURES = [
  {
    icon: '✦',
    title: 'AI Campaign Builder',
    description:
      'Describe your goal in plain English. AI Ads Manager generates a complete Facebook campaign structure — objective, ad sets, and targeting — in seconds.',
  },
  {
    icon: '◎',
    title: 'Performance Monitoring',
    description:
      'Track spend, impressions, CTR, CPC, and CPM across all campaigns in one view. Filter by date range and export to CSV.',
  },
  {
    icon: '⟳',
    title: 'Ad Optimisation',
    description:
      'Evaluate every creative against your own learning rules. Spot winners, flag low-CTR ads, and identify high-CPC waste — without switching tabs.',
  },
  {
    icon: '▣',
    title: 'Your Data, Your Machine',
    description:
      'A native desktop app for macOS and Windows. Your Meta credentials and campaign data are encrypted locally — nothing is stored on a third-party server.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Everything you need to run better Facebook ads
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Built for freelancers and small teams who manage Facebook ad accounts directly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="border border-gray-100 rounded-xl p-8 hover:border-orange-100 hover:bg-orange-50/30 transition-colors"
            >
              <div className="text-2xl text-orange-500 mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{f.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
