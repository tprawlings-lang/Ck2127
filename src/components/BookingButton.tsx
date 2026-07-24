import Link from 'next/link';
import { site } from '@/config/site';

/** Reads the booking URL from configuration; falls back to the contact form. */
export function BookingButton({ label = site.cta.booking, className = 'btn-primary' }: { label?: string; className?: string }) {
  const href = site.bookingUrl || '/contact';
  return (
    <Link href={href} className={className} data-analytics="booking_click">
      {label}
    </Link>
  );
}
