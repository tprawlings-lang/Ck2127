'use client';

import Link from 'next/link';
import { site } from '@/config/site';

/**
 * Sticky mobile action bar: Call, Text, Book. Hidden on desktop.
 * Call/Text render only after the phone number is confirmed (launch gate).
 * Never covers form controls thanks to the body bottom padding in globals.css.
 */
export function MobileContactBar() {
  const bookHref = site.bookingUrl || '/contact';
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-px border-t border-line bg-line md:hidden"
      role="navigation"
      aria-label="Quick contact"
    >
      {site.phoneConfirmed ? (
        <a
          href={`tel:${site.phoneE164}`}
          className="flex min-h-14 items-center justify-center bg-soft-white font-heading text-sm font-bold text-slate-deep no-underline"
          data-analytics="phone_click"
        >
          Call
        </a>
      ) : (
        <Link href="/contact" className="flex min-h-14 items-center justify-center bg-soft-white font-heading text-sm font-bold text-slate-deep no-underline">
          Contact
        </Link>
      )}
      {site.phoneConfirmed ? (
        <a
          href={`sms:${site.phoneE164}`}
          className="flex min-h-14 items-center justify-center bg-soft-white font-heading text-sm font-bold text-slate-deep no-underline"
          data-analytics="text_click"
        >
          Text
        </a>
      ) : (
        <Link href="/pricing" className="flex min-h-14 items-center justify-center bg-soft-white font-heading text-sm font-bold text-slate-deep no-underline">
          Pricing
        </Link>
      )}
      <Link
        href={bookHref}
        className="flex min-h-14 items-center justify-center bg-terracotta font-heading text-sm font-bold text-white no-underline"
        data-analytics="booking_click"
      >
        Book
      </Link>
    </div>
  );
}
