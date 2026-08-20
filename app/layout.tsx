import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Ads Manager — Facebook Ads, Powered by AI',
  description:
    'Build Facebook campaigns in minutes with AI. Monitor performance, optimise creatives, and manage your ad account — all in one desktop app for freelancers and small teams.',
  openGraph: {
    title: 'AI Ads Manager',
    description: 'Facebook Ads, Powered by AI',
    url: 'https://ai-social-media-ads.online',
    siteName: 'AI Ads Manager',
    type: 'website',
  },
};

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="bg-white text-gray-900 antialiased">
        {children}
        {/* Meta Pixel — Next.js Script handles placement; only injected when env var is set */}
        {PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${PIXEL_ID}');
            fbq('track','PageView');
          `}</Script>
        )}
      </body>
    </html>
  );
}
