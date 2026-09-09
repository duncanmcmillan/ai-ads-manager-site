'use client';

/**
 * @fileoverview Pro plan checkout button using the Paddle.js overlay.
 * Fires Meta Pixel InitiateCheckout on click, then shows the Paddle
 * checkout overlay. On completion, displays the Paddle transaction ID
 * which the user enters in the desktop app as their licence key.
 */

import { useState } from 'react';

/** Paddle.js v2 event passed to the eventCallback. */
interface PaddleEvent {
  name: string;
  data?: { transaction_id?: string };
}

/** Paddle.js v2 global interface. */
interface PaddleGlobal {
  Environment: { set: (env: 'sandbox' | 'production') => void };
  Initialize: (config: {
    token: string;
    eventCallback?: (event: PaddleEvent) => void;
  }) => void;
  Checkout: {
    open: (config: {
      items: Array<{ priceId: string; quantity: number }>;
      settings?: Record<string, unknown>;
    }) => void;
  };
}

declare global {
  interface Window { Paddle?: PaddleGlobal; }
}

/** Checkout button state. */
type CheckoutState = 'idle' | 'completed';

/** Opens the Paddle checkout overlay and shows the licence key on completion. */
export default function ProCheckoutButton() {
  const [state, setState] = useState<CheckoutState>('idle');
  const [txnId, setTxnId] = useState('');

  function handleClick() {
    const paddle = window.Paddle;
    const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? '';
    const priceId     = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID ?? '';

    if (!paddle || !clientToken || !priceId) {
      // Paddle.js not yet loaded or env vars missing — open billing portal as fallback.
      window.open('https://paddle.com', '_blank');
      return;
    }

    // Use sandbox when token starts with "test_".
    if (clientToken.startsWith('test_')) {
      paddle.Environment.set('sandbox');
    }

    paddle.Initialize({
      token: clientToken,
      eventCallback: (event: PaddleEvent) => {
        if (event.name === 'checkout.completed' && event.data?.transaction_id) {
          setTxnId(event.data.transaction_id);
          setState('completed');
        }
      },
    });

    // Browser pixel InitiateCheckout event.
    if ((window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq(
        'track', 'InitiateCheckout',
        { value: 40, currency: 'GBP', num_items: 1, content_name: 'pro_annual' }
      );
    }

    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      settings: { displayMode: 'overlay', theme: 'dark' },
    });
  }

  if (state === 'completed') {
    return (
      <div className="bg-green-900/30 border border-green-700 rounded-xl px-4 py-4 text-sm">
        <p className="font-semibold text-green-300 mb-1">Payment successful!</p>
        <p className="text-xs text-green-400 mb-2">
          Your licence key — paste this into the desktop app:
        </p>
        <code className="block bg-black/50 border border-green-800 rounded px-3 py-2 text-xs font-mono text-green-200 break-all select-all mb-2">
          {txnId}
        </code>
        <p className="text-xs text-green-500">
          Open AI-ADS → Workspace → Upgrade to Pro → enter key above.
        </p>
        <p className="text-xs text-green-600 mt-1">
          A copy has also been sent to your email by Paddle.
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm cursor-pointer"
    >
      Get Pro — £40/yr
    </button>
  );
}
