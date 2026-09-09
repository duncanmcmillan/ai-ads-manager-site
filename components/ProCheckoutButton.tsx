'use client';

/**
 * @fileoverview Pro plan checkout button.
 * Fires a Meta Pixel InitiateCheckout event when the user clicks through
 * to the LemonSqueezy checkout page.
 */

interface ProCheckoutButtonProps {
  /** LemonSqueezy checkout URL. */
  href: string;
}

/** Opens the LemonSqueezy checkout and fires an InitiateCheckout pixel event. */
export default function ProCheckoutButton({ href }: ProCheckoutButtonProps) {
  function handleClick() {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: 40,
        currency: 'GBP',
        num_items: 1,
        content_name: 'pro_annual',
      });
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
    >
      Get Pro — £40/yr
    </a>
  );
}
