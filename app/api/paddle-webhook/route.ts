import { createHash, createHmac, timingSafeEqual } from 'crypto';

/**
 * @fileoverview Paddle webhook handler.
 *
 * Listens for `transaction.completed` events from Paddle and forwards a
 * Meta Conversions API `Purchase` event to the Facebook Graph API.
 *
 * Setup in Paddle dashboard:
 *   Developer Tools → Notifications → New notification
 *   URL: https://ai-social-media-ads.online/api/paddle-webhook
 *   Events: transaction.completed
 *   Copy the signing secret → PADDLE_WEBHOOK_SECRET env var
 */

/** Minimal shape of a Paddle transaction.completed webhook payload. */
interface PaddleTransactionEvent {
  /** Paddle event type, e.g. "transaction.completed". */
  event_type: string;
  data: {
    /** Paddle transaction ID, e.g. "txn_01abc…". */
    id: string;
    customer?: {
      /** Customer email address. */
      email?: string;
    };
  };
}

/** SHA-256 hashes a plain-text string for CAPI user_data fields. */
function sha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

/**
 * POST /api/paddle-webhook
 * Verifies the Paddle HMAC-SHA256 signature and forwards a Purchase event to Meta CAPI.
 *
 * Paddle signature header format: "ts=<timestamp>;h1=<hmac-hex>"
 * Signed payload: "<timestamp>:<raw-body>"
 */
export async function POST(request: Request) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) return Response.json({ status: 'not_configured' });

  const rawBody = await request.text();

  // Parse "ts=xxx;h1=yyy" header.
  const sigHeader = request.headers.get('Paddle-Signature') ?? '';
  const parts = Object.fromEntries(
    sigHeader.split(';').map(p => p.split('=') as [string, string])
  );
  const ts = parts['ts'] ?? '';
  const h1 = parts['h1'] ?? '';

  const expected    = createHmac('sha256', secret).update(`${ts}:${rawBody}`).digest('hex');
  const h1Buf       = Buffer.from(h1, 'hex');
  const expectedBuf = Buffer.from(expected, 'hex');
  const isValid     = h1Buf.length === expectedBuf.length && timingSafeEqual(h1Buf, expectedBuf);

  if (!isValid) return Response.json({ error: 'Invalid signature' }, { status: 401 });

  const event = JSON.parse(rawBody) as PaddleTransactionEvent;

  if (event.event_type !== 'transaction.completed') {
    return Response.json({ status: 'ignored' });
  }

  const pixelId     = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) return Response.json({ status: 'capi_not_configured' });

  const hashedUserData: Record<string, string> = {};
  const customerEmail = event.data.customer?.email;
  if (customerEmail) hashedUserData['em'] = sha256(customerEmail);

  const payload = {
    data: [{
      event_name:       'Purchase',
      event_time:       Math.floor(Date.now() / 1000),
      action_source:    'website',
      event_source_url: 'https://ai-social-media-ads.online/#pricing',
      user_data:        hashedUserData,
      custom_data:      { value: 40, currency: 'GBP' },
    }],
  };

  const res = await fetch(
    `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
  );

  const data = await res.json() as unknown;
  return Response.json(data, { status: res.ok ? 200 : 400 });
}
