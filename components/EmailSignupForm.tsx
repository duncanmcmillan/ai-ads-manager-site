'use client';

/**
 * @fileoverview Email sign-up form in the site footer.
 * Fires a Meta Pixel Lead event (browser) and a CAPI Lead event (server)
 * on successful submission, using a shared event_id for deduplication.
 */

import { useState } from 'react';

/** State of the form submission lifecycle. */
type FormStatus = 'idle' | 'sending' | 'done' | 'error';

/** Functional email capture form with Meta Pixel + CAPI Lead event tracking. */
export default function EmailSignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setStatus('sending');

    const eventId = crypto.randomUUID();

    // Browser-side pixel event.
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', { content_name: 'email_signup' }, { eventID: eventId });
    }

    // Server-side CAPI event (deduplication via shared event_id).
    try {
      await fetch('/api/capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'Lead',
          event_id: eventId,
          event_source_url: window.location.href,
          user_data: { email: trimmed },
          custom_data: { content_name: 'email_signup' },
        }),
      });
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return <p className="text-sm text-gray-300">Thanks! We&apos;ll be in touch.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-sm mx-auto"
    >
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        disabled={status === 'sending'}
        aria-label="Your email address"
        className="flex-1 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-orange-500 transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap disabled:opacity-50 cursor-pointer"
      >
        {status === 'sending' ? 'Sending…' : 'Get in touch'}
      </button>
      {status === 'error' && (
        <p className="w-full text-xs text-red-400 text-center mt-1">
          Something went wrong — try emailing us directly at hello@ai-social-media-ads.online
        </p>
      )}
    </form>
  );
}
