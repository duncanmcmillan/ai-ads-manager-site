'use client';

import { useState } from 'react';
import Image from 'next/image';

const TABS = [
  {
    key: 'campaign',
    label: 'AI Campaign Builder',
    description: 'Describe your goal in plain English — AI generates the full campaign structure, targeting, and copy in seconds.',
    src: '/screenshots/campaign.png',
  },
  {
    key: 'fast-campaign',
    label: 'AI Auto Mode',
    description: 'One click, full campaign. AI Auto Mode fills every field from a single brief — review, tweak, and publish.',
    src: '/screenshots/fast-campaign.png',
  },
  {
    key: 'dashboard',
    label: 'Dashboard & Charts',
    description: 'Spend, CTR, CPC, and CPM visualised with timeline charts. Filter by date range and export to CSV in one click.',
    src: '/screenshots/dashboard.png',
  },
  {
    key: 'meta-setup',
    label: 'Meta Setup Wizard',
    description: 'Step-by-step setup with screenshots for every Meta configuration step — from Business Portfolio to Dataset.',
    src: '/screenshots/meta-setup.png',
  },
  {
    key: 'optimisation',
    label: 'Ad Optimisation',
    description: 'Every creative evaluated against your learning rules — winners, low CTR, and high CPC flagged automatically.',
    src: '/screenshots/optimisation.png',
  },
];

export default function Screenshots() {
  const [active, setActive] = useState(TABS[0].key);
  const tab = TABS.find(t => t.key === active)!;

  return (
    <section id="screenshots" className="py-24 px-6 bg-gray-950">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            See it in action
          </h2>
          <p className="text-gray-400 text-lg">
            A native desktop app — no browser, no lag, no cloud sync required.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                active === t.key
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/15 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Screenshot frame */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900">

          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="flex-1 text-center text-xs text-gray-500 font-medium">AI Ads Manager</span>
          </div>

          {/* Screenshot */}
          <div className="relative w-full aspect-[16/9] bg-gray-900">
            <Image
              src={tab.src}
              alt={tab.label}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

        </div>

        {/* Caption */}
        <p className="text-center text-gray-400 text-sm mt-5">{tab.description}</p>

      </div>
    </section>
  );
}
