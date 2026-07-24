import 'server-only';

/**
 * Simple in-memory rate limiter for form submissions. Suitable for a
 * single-instance Render deployment; swap for a shared store if the site
 * ever scales horizontally.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (bucket.count >= MAX_PER_WINDOW) return false;
  bucket.count += 1;
  return true;
}
