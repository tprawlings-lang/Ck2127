import type { Metadata } from 'next';
import { site } from '@/config/site';
import { ConsultationForm } from '@/components/ConsultationForm';
import { BookingButton } from '@/components/BookingButton';
import { planFromSearchParams } from '@/lib/plan-summary';

export const metadata: Metadata = {
  title: { absolute: `Talk With Connor | Phoenix Fitness Coaching` },
  description:
    'Book a free 15-minute Start Strong Call, or send Connor a message about personal training, nutrition coaching, or healthy cooking lessons in Phoenix.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const plan = planFromSearchParams(params);

  return (
    <>
      <section className="bg-soft-white">
        <div className="container-site py-14">
          <h1 className="text-3xl md:text-4xl">{site.cta.primary}</h1>
          <p className="mt-4 max-w-2xl">
            Three easy ways to start — and every one of them is pressure-free. Ask anything before you commit to
            anything.
          </p>
          <div className="mt-6 grid max-w-3xl gap-4 sm:grid-cols-3">
            <div className="card !p-4 text-center">
              <p className="font-heading font-bold text-slate-deep">Schedule a free call</p>
              <p className="mt-1 text-sm text-muted">{site.consultationName} — 15 minutes, no obligation.</p>
              <div className="mt-3">
                <BookingButton label="Book the call" className="btn-primary w-full !min-h-10 !px-4 !py-2 text-sm" />
              </div>
            </div>
            <div className="card !p-4 text-center">
              <p className="font-heading font-bold text-slate-deep">{site.cta.call}</p>
              {site.phoneConfirmed ? (
                <a href={`tel:${site.phoneE164}`} className="mt-2 block font-semibold text-terracotta" data-analytics="phone_click">
                  {site.phone}
                </a>
              ) : (
                <p className="mt-1 text-sm text-muted">Phone number coming soon — use the form below for now.</p>
              )}
            </div>
            <div className="card !p-4 text-center">
              <p className="font-heading font-bold text-slate-deep">{site.cta.text}</p>
              {site.phoneConfirmed ? (
                <a href={`sms:${site.phoneE164}`} className="mt-2 block font-semibold text-terracotta" data-analytics="text_click">
                  {site.phone}
                </a>
              ) : (
                <p className="mt-1 text-sm text-muted">Texting available once the number is confirmed.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl">Or send your request now</h2>
          <p className="mt-2 text-muted">
            Connor reads every message personally. No medical details needed — just tell him what you would like to
            change.
          </p>
          <div className="mt-6">
            <ConsultationForm pricingMode={plan.pricingMode} selectedPlanSummary={plan.summary} />
          </div>
        </div>
      </section>
    </>
  );
}
