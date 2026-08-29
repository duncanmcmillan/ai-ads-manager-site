'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TabImage { src: string; alt: string; }
interface Tab { key: string; label: string; description: string; images: TabImage[]; }

const TABS: Tab[] = [
  {
    key: 'workspace',
    label: 'Workspace',
    description: 'Configure your Meta defaults, targeting, creative enhancements, and learning rule thresholds — all auto-saved.',
    images: [
      { src: '/screenshots/workspace-1.png',  alt: 'Workspace settings' },
      { src: '/screenshots/workspace-2.png',  alt: 'Workspace advanced options' },
    ],
  },
  {
    key: 'new-campaign',
    label: 'New Campaign',
    description: 'Build campaigns step-by-step or use AI Auto Mode to generate everything from a single brief. Preview before publishing.',
    images: [
      { src: '/screenshots/new-campaign-1.png',          alt: 'Campaign builder' },
      { src: '/screenshots/new-campaign-2.png',          alt: 'Ad set targeting' },
      { src: '/screenshots/new-campaign-3.png',          alt: 'Creative builder' },
      { src: '/screenshots/new-campaign-fast-AI-1.png',  alt: 'AI Auto Mode' },
      { src: '/screenshots/new-campaign-preview-4.png',  alt: 'Ad preview' },
      { src: '/screenshots/new-campaign-5.png',          alt: 'Review and launch' },
    ],
  },
  {
    key: 'campaign-manager',
    label: 'Campaign & Ad Manager',
    description: 'Manage campaigns, ad sets, and ads with real-time status, performance metrics, and one-click pause or activate.',
    images: [
      { src: '/screenshots/campaign-ad-manager-1.png', alt: 'Campaign manager' },
      { src: '/screenshots/campaign-ad-manager-2.png', alt: 'Ad manager' },
    ],
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    description: 'Spend, CTR, CPC, and CPM across all campaigns. Timeline charts, gate alerts, and AI-generated recommendations.',
    images: [
      { src: '/screenshots/dashboard-1.png', alt: 'Dashboard overview' },
      { src: '/screenshots/dashboard-2.png', alt: 'Dashboard with charts' },
    ],
  },
  {
    key: 'meta-setup',
    label: 'Meta Setup',
    description: 'Step-by-step wizard with screenshot walkthroughs for Business Portfolio, Developer App, Ad Account, and Meta Dataset.',
    images: [
      { src: '/screenshots/meta-setup-1.png', alt: 'Meta setup wizard' },
      { src: '/screenshots/meta-setup-2.png', alt: 'Meta setup step 2' },
      { src: '/screenshots/meta-setup-3.png', alt: 'Meta setup step 3' },
    ],
  },
  {
    key: 'guides',
    label: 'Guides',
    description: 'AI-generated marketing guides for your app type and objective — with funnel metrics, creative advice, and key takeaways.',
    images: [
      { src: '/screenshots/guides-1.png', alt: 'Marketing guide' },
      { src: '/screenshots/guides-2.png', alt: 'Objective guide' },
      { src: '/screenshots/guides-3.png', alt: 'Key takeaways' },
    ],
  },
  {
    key: 'onboarding',
    label: 'Onboarding Videos',
    description: 'Built-in video walkthroughs for every feature — from workspace setup to campaign creation and optimisation.',
    images: [
      { src: '/screenshots/onboarding-videos-1.png', alt: 'Onboarding video player' },
    ],
  },
];

/**
 * Stagger transforms for non-active images.
 * Slot 0 = immediately behind active (most visible), higher slots = further back.
 * Alternates left / right so cards fan out on both sides.
 */
const STAGGER = [
  { transform: 'translateX(18%) rotate(3.5deg) scale(0.87)',  zIndex: 9 },
  { transform: 'translateX(-19%) rotate(-4deg) scale(0.85)',  zIndex: 8 },
  { transform: 'translateX(24%) rotate(5.5deg) scale(0.83)',  zIndex: 7 },
  { transform: 'translateX(-25%) rotate(-5deg) scale(0.81)',  zIndex: 6 },
  { transform: 'translateX(28%) rotate(7deg) scale(0.79)',    zIndex: 5 },
];

// ── Arrow button ──────────────────────────────────────────────────────────────

function NavArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Previous screenshot' : 'Next screenshot'}
      className={`
        absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center
        w-10 h-10 rounded-full border transition-all
        ${dir === 'prev' ? '-left-5' : '-right-5'}
        ${disabled
          ? 'border-white/10 bg-gray-800/50 text-white/20 cursor-not-allowed'
          : 'border-white/20 bg-gray-800 text-white hover:bg-gray-700 hover:border-white/40 cursor-pointer'}
      `}
    >
      {dir === 'prev' ? '‹' : '›'}
    </button>
  );
}

// ── Screenshot stack (one per tab) ────────────────────────────────────────────

function ScreenshotStack({ images }: { images: TabImage[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx(i => Math.max(0, i - 1));
  const next = () => setActiveIdx(i => Math.min(images.length - 1, i + 1));

  // Non-active images in array order (skipping activeIdx)
  const nonActiveOrder = images.map((_, i) => i).filter(i => i !== activeIdx);

  return (
    <div>
      {/* Stack + arrows */}
      <div className="relative px-8">
        <NavArrow dir="prev" disabled={activeIdx === 0} onClick={prev} />
        <NavArrow dir="next" disabled={activeIdx === images.length - 1} onClick={next} />

        {/* Aspect-ratio box — overflow visible so staggered cards peek out */}
        <div className="relative aspect-[16/10]" style={{ overflow: 'visible' }}>
          {images.map((img, idx) => {
            const isActive = idx === activeIdx;
            const slot = nonActiveOrder.indexOf(idx);
            const stagger = !isActive ? STAGGER[slot % STAGGER.length] : null;

            return (
              <div
                key={img.src}
                className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl"
                style={{
                  zIndex: isActive ? 10 : stagger!.zIndex,
                  transform: isActive ? 'none' : stagger!.transform,
                  transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: isActive ? 'default' : 'pointer',
                }}
                onClick={() => !isActive && setActiveIdx(idx)}
                role={isActive ? undefined : 'button'}
                tabIndex={isActive ? undefined : 0}
                onKeyDown={e => !isActive && (e.key === 'Enter' || e.key === ' ') && setActiveIdx(idx)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 900px"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Go to screenshot ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                idx === activeIdx
                  ? 'w-5 h-1.5 bg-orange-500'
                  : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function Screenshots() {
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const tab = TABS.find(t => t.key === activeTab)!;

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

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === t.key
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/15 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Window chrome */}
        <div className="rounded-t-2xl border border-b-0 border-white/10 bg-gray-800">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="flex-1 text-center text-xs text-gray-500 font-medium">
              AI Ads Manager
            </span>
          </div>
        </div>

        {/* Screenshot area — generous side padding to reveal staggered cards */}
        <div className="rounded-b-2xl border border-t-0 border-white/10 bg-gray-900 px-14 py-10">
          <ScreenshotStack key={activeTab} images={tab.images} />
        </div>

        {/* Caption */}
        <p className="text-center text-gray-400 text-sm mt-6 max-w-xl mx-auto">
          {tab.description}
        </p>

      </div>
    </section>
  );
}
