import { createHash, createHmac, timingSafeEqual } from 'crypto';

/**
 * @fileoverview LemonSqueezy webhook handler.
 *
 * Listens for `order_created` events from LemonSqueezy and forwards a
 * Meta Conversions API `Purchase` event to the Facebook Graph API.
 *
 * Setup in LemonSqueezy dashboard:
 *   Store Settings → Webhooks → Add webhook
 *   URL: https://ai-social-media-ads.online/api/lemonsqueezy-webhook
 *   Events: order_created
 *   Copy the signing secret → LEMONSQUEEZY_WEBHOOK_SECRET env var
 */

/** Minimal shape of the LemonSqueezy order_created webhook payload. */
interface LemonSqueezyWebhookPayload {
  meta: {
    /** Event name, e.g. "order_created". */
    event_name: string;
  };
  data: {
    attributes: {
      /** Customer email address. */
      user_email?: string;
      /** Order total in the smallest currency unit (pence for GBP). */
      total: number;
      /** ISO 4217 currency code, e.g. "GBP". */
      currency: string;
    };
  };
}

/** SHA-256 hashes a plain-text string for CAPI user data fields. */
function sha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

/**
 * POST /api/lemonsqueezy-webhook
 * Verifies the HMAC-SHA256 signature and forwards a Purchase event to CAPI.
 */
export async function POST(request: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    // Webhook secret not configured — accept silently so deploys without it don't error.
    return Response.json({ status: 'not_configured' });
  }

  const rawBody  = await request.text();
  const signature = request.headers.get('x-signature') ?? '';

  // Verify HMAC-SHA256 signature.
  const expected   = createHmac('sha256', secret).update(rawBody).digest('hex');
  const sigBuf     = Buffer.from(signature, 'hex');
  const expectedBuf = Buffer.from(expected, 'hex');
  const isValid    = sigBuf.length === expectedBuf.length && timingSafeEqual(sigBuf, expectedBuf);

  if (!isValid) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as LemonSqueezyWebhookPayload;

  if (event.meta.event_name !== 'order_created') {
    return Response.json({ status: 'ignored' });
  }

  const pixelId     = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return Response.json({ status: 'capi_not_configured' });
  }

  const { user_email, total, currency } = event.data.attributes;

  const hashedUserData: Record<string, string> = {};
  if (user_email) hashedUserData['em'] = sha256(user_email);

  const payload = {
    data: [{
      event_name:       'Purchase',
      event_time:       Math.floor(Date.now() / 1000),
      action_source:    'website',
      event_source_url: 'https://ai-social-media-ads.online/#pricing',
      user_data:        hashedUserData,
      custom_data: {
        value:    total / 100, // LemonSqueezy sends amounts in smallest currency unit
        currency: currency ?? 'GBP',
      },
    }],
  };

  const res = await fetch(
    `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    }
  );

  const data = await res.json() as unknown;
  return Response.json(data, { status: res.ok ? 200 : 400 });
}
