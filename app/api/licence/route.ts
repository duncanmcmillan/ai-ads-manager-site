/**
 * @fileoverview Paddle licence validation endpoint.
 *
 * The Electron desktop app calls this endpoint to verify that a Paddle
 * transaction ID represents a valid, completed Pro purchase.
 * The Paddle API key stays server-side and is never shipped with the app.
 *
 * GET /api/licence?txn=txn_01abc…
 * Returns: { valid: boolean, tier: "pro" | "free", expiresAt: string | null }
 */

/** Minimal Paddle transaction response shape. */
interface PaddleTransaction {
  data: {
    /** Transaction status, e.g. "completed". */
    status: string;
    details: {
      line_items: Array<{
        /** Paddle price ID, e.g. "pri_01abc…". */
        price_id: string;
      }>;
    };
  };
}

/**
 * GET /api/licence
 * Validates a Paddle transaction ID and returns the licence tier.
 *
 * @param request - Incoming request with `?txn=<transaction_id>` query param.
 * @returns JSON `{ valid, tier, expiresAt }` — never throws.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const txnId = searchParams.get('txn');

  if (!txnId || !txnId.startsWith('txn_')) {
    return Response.json({ valid: false, error: 'Invalid transaction ID format' }, { status: 400 });
  }

  const apiKey  = process.env.PADDLE_API_KEY;
  const priceId = process.env.PADDLE_PRICE_ID;

  if (!apiKey) {
    return Response.json({ valid: false, error: 'Licence service not configured' }, { status: 503 });
  }

  let res: Response;
  try {
    res = await fetch(`https://api.paddle.com/transactions/${txnId}`, {
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    });
  } catch {
    return Response.json({ valid: false, error: 'Network error — try again later' }, { status: 503 });
  }

  if (res.status === 404) {
    return Response.json({ valid: false, error: 'Transaction not found' }, { status: 404 });
  }
  if (!res.ok) {
    return Response.json({ valid: false, error: 'Paddle API error' }, { status: 502 });
  }

  const json = await res.json() as PaddleTransaction;
  const { status, details } = json.data;

  if (status !== 'completed') {
    return Response.json({ valid: false, error: 'Transaction not completed' });
  }

  // If PADDLE_PRICE_ID is set, verify this transaction is for the Pro plan.
  if (priceId && !details.line_items.some(item => item.price_id === priceId)) {
    return Response.json({ valid: false, error: 'Transaction is not for the Pro plan' });
  }

  return Response.json({ valid: true, tier: 'pro', expiresAt: null });
}
