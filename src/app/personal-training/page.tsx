import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/config/site';
import { pricing } from '@/config/pricing';
import { formatCents } from '@/lib/money';
import { Hero } from '@/components/Hero';
import { LocationBlock } from '@/components/LocationBlock';
import { LegalNotice } from '@/components/LegalNotice';

export const metadata: Metadata = {
  title: { absolute: `One-on-One Personal Training in Phoenix | ${site.brandName}` },
  description:
    'Private personal training for adults 40+ at The Gym Phoenix. Patient coaching that starts at your current level, with clear monthly plans and transparent pricing.',
  alternates: { canonical: '/personal-training' },
};

const includes = [
  'Initial goal discussion and training history',
  'Basic movement and fitness starting-point assessment',
  'Individual exercise plan based on current ability and goals',
  'Exercise instruction, form coaching, and progressive strength training',
  'Exercises or activity targets for days Connor is not present',
  'Progress tracking and regular plan review',
  'Basic general healthy-eating education within the NASM-CPT role',
  'Referral or medical clearance when a condition or injury is outside Connor’s role',
];

const excludes = [
  'Physical therapy, injury diagnosis, medical rehabilitation, or treatment',
  'Guaranteed weight loss, pain relief, or disease outcomes',
  'Full food-log review and weekly nutrition coaching (available with Nutrition Coaching)',
  'Hands-on cooking lessons (available with Healthy Cooking Coaching)',
];

export default function PersonalTrainingPage() {
  const plans = pricing.monthly.personalTraining;
  return (
    <>
      <Hero
        title="One-on-One Personal Training in Phoenix for Adults 40+"
        subhead="Private, patient coaching at The Gym Phoenix for people restarting fitness, new to gyms, or ready to build strength that supports daily life."
        locationLine={site.gym.facilityStatement}
        primaryCta={{ href: '/contact', label: 'Talk With Connor About Personal Training' }}
        secondaryCta={{ href: '/pricing', label: site.cta.secondaryBuild }}
      />

      <section className="container-site py-14">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl">Who this is for — and what the first visit feels like</h2>
          <p className="mt-4">
            Most of Connor&apos;s clients are adults 40 to 65 who feel out of practice, unsure about equipment, or
            uncomfortable walking into a gym alone. Your first appointment is a conversation and a gentle
            starting-point assessment — not a test, and not a punishing workout. Connor meets you when you arrive,
            explains everything, and selects exercises and training times that fit your comfort level.
          </p>
          <p className="mt-4">
            Sessions are scheduled in one-hour calendar blocks with approximately 50 minutes of coaching, leaving
            time to arrive, settle in, and wrap up without rushing.
          </p>
        </div>
      </section>

      <section className="bg-soft-white py-14">
        <div className="container-site grid gap-8 md:grid-cols-2">
          <div className="card">
            <h2 className="text-xl">What Personal Training includes</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              {includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h2 className="text-xl">What it does not include</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              {excludes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              If a condition or injury needs medical clearance, Connor will ask you to check with your physician or a
              qualified professional first — he does not diagnose or treat injuries.
            </p>
          </div>
        </div>
      </section>

      <section className="container-site py-14">
        <h2 className="text-2xl md:text-3xl">Monthly training plans</h2>
        <p className="mt-3 max-w-2xl">
          Every plan includes program design, independent-day guidance, progress tracking, and basic general
          healthy-eating education. See the full calculator for add-ons and exact totals.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {(Object.keys(plans) as (keyof typeof plans)[]).map((key) => {
            const plan = plans[key];
            const popular = 'mostPopular' in plan && plan.mostPopular;
            return (
              <div key={key} className={`card relative ${popular ? 'border-2 border-terracotta' : ''}`}>
                {popular && (
                  <p className="absolute -top-3 left-6 rounded-full bg-terracotta px-3 py-0.5 text-xs font-bold text-white">
                    Most Popular
                  </p>
                )}
                <h3 className="text-xl">{plan.label}</h3>
                <p className="mt-1 text-muted">
                  {plan.sessions} × {plan.minutes}-minute sessions per month
                </p>
                <p className="price-number mt-4 font-heading text-3xl font-extrabold text-slate-deep">
                  {formatCents(plan.cents)}
                  <span className="text-base font-semibold text-muted">/month</span>
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link href="/pricing" className="btn-primary" data-analytics="pricing_mode_selected">
            Build your exact plan
          </Link>
          <p className="text-sm text-muted">{pricing.notices.term}</p>
        </div>
        <div className="mt-6 max-w-3xl">
          <LegalNotice kinds={['gymMembership']} />
        </div>
      </section>

      <section className="bg-soft-white py-14">
        <div className="container-site">
          <LocationBlock />
          <p className="mt-4 max-w-3xl text-sm text-muted">
            Nervous about a busy gym floor? Tell Connor on your first call — appointment times can be planned around
            your comfort level.
          </p>
        </div>
      </section>

      <section className="container-site py-14 text-center">
        <h2 className="text-2xl md:text-3xl">Ready to talk it through first?</h2>
        <p className="mx-auto mt-3 max-w-xl">
          The {site.consultationName} is 15 minutes, free, and has no workout and no obligation.
        </p>
        <Link href="/contact" className="btn-primary mt-6" data-analytics="hero_cta_click">
          Talk With Connor About Personal Training
        </Link>
      </section>
    </>
  );
}
