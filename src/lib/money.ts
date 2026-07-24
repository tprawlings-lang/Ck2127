/** The single money formatter. Every public price must pass through here. */
export function formatCents(cents: number, opts: { showCents?: boolean } = {}): string {
  const dollars = cents / 100;
  const showCents = opts.showCents ?? cents % 100 !== 0;
  return dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  });
}
