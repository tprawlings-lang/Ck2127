import 'server-only';

/**
 * Email provider abstraction. The provider is chosen through environment
 * variables so the business is never locked to one vendor:
 *
 *   EMAIL_PROVIDER=resend  + RESEND_API_KEY=...   → send via Resend API
 *   EMAIL_PROVIDER=log (default)                  → log to server console
 *
 * LEAD_NOTIFY_EMAIL is where Connor receives lead notifications.
 * EMAIL_FROM is the verified sending address.
 */
export type OutboundEmail = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendEmail(email: OutboundEmail): Promise<{ ok: boolean; error?: string }> {
  const provider = process.env.EMAIL_PROVIDER ?? 'log';

  if (provider === 'resend') {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;
    if (!apiKey || !from) {
      return { ok: false, error: 'Email provider is not fully configured (RESEND_API_KEY / EMAIL_FROM).' };
    }
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [email.to],
          subject: email.subject,
          text: email.text,
          reply_to: email.replyTo,
        }),
      });
      if (!res.ok) {
        return { ok: false, error: `Email provider responded ${res.status}` };
      }
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Unknown email error' };
    }
  }

  // Development default: log only. Never silently drop in production —
  // deployment.md requires configuring a real provider before launch.
  console.info('[email:log-provider]', JSON.stringify(email, null, 2));
  return { ok: true };
}
