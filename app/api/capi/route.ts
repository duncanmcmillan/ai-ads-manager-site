import { createHash } from 'crypto';

/** Hash a plain-text value with SHA-256 for CAPI user data fields. */
function sha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

/**
 * POST /api/capi
 * Forwards a browser event to the Meta Conversions API (server-side).
 * Must be paired with the client-side Pixel for deduplication.
 *
 * Body: { event_name, event_source_url, user_data? }
 * user_data fields (email, phone) are hashed before transmission.
 */
export async function POST(request: Request) {
  const pixelId     = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    // CAPI not configured — silently succeed so the client isn't blocked.
    return Response.json({ status: 'not_configured' });
  }

  const body = await request.json() as {
    event_name: string;
    event_source_url?: string;
    user_data?: { email?: string; phone?: string };
  };

  const ip          = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
  const userAgent   = request.headers.get('user-agent') ?? '';
  const eventTime   = Math.floor(Date.now() / 1000);

  // Hash PII fields if provided.
  const hashedUserData: Record<string, string> = {
    client_ip_address: ip,
    client_user_agent: userAgent,
  };
  if (body.user_data?.email) hashedUserData['em'] = sha256(body.user_data.email);
  if (body.user_data?.phone) hashedUserData['ph'] = sha256(body.user_data.phone);

  const payload = {
    data: [{
      event_name:        body.event_name,
      event_time:        eventTime,
      event_source_url:  body.event_source_url ?? '',
      action_source:     'website',
      user_data:         hashedUserData,
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

  const data = await res.json();
  return Response.json(data, { status: res.ok ? 200 : 400 });
}
