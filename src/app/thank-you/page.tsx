import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your request was sent. Connor will contact you personally.',
  robots: { index: false },
  alternates: { canonical: '/thank-you' },
};

export default function ThankYouPage() {
  return (
    <section className="container-site py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-2xl text-success" aria-hidden="true">
          ✓
        </p>
        <h1 className="mt-6 text-3xl">Thanks for reaching out.</h1>
        <p className="mt-4">
          Connor will contact you personally to learn more about your goals, answer your questions, and review the
          services you selected. Submitting this form does not enroll you or charge you.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/resources" className="btn-secondary">
            Browse the resource library
          </Link>
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
        </div>
        <p className="mt-6 text-sm text-muted">
          In a hurry? {site.phoneConfirmed ? `Call or text Connor at ${site.phone}.` : 'Phone contact will be available soon.'}
        </p>
      </div>
    </section>
  );
}
