import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/config/site';
import { pricing } from '@/config/pricing';
import { formatCents } from '@/lib/money';
import { Hero } from '@/components/Hero';
import { CredentialCard } from '@/components/CredentialCard';
import { SitePhoto } from '@/components/SitePhoto';

export const metadata: Metadata = {
  title: { absolute: `Nutrition Coaching and Meal-Prep Support Phoenix | ${site.brandName}` },
  description:
    'Practical nutrition coaching in Phoenix: habit education, grocery planning, meal-prep structure, and weekly accountability for adults 40+. Not medical nutrition therapy.',
  alternates: { canonical: '/nutrition-coaching' },
};

const topics = [
  'Protein, produce, fiber, and hydration basics',
  'Portion awareness without weighing every meal',
  'Food-log review with honest, judgment-free feedback',
  'A grocery framework you will actually use',
  'Meal-prep scheduling for busy weeks',
  'Restaurant, travel, and busy-day strategies',
];

export default function NutritionCoachingPage() {
  return (
    <>
      <Hero
        title="Practical Nutrition Coaching in Phoenix"
        subhead="Education, habits, accountability, grocery planning, and meal-prep structure, built from what you already eat rather than a diet handed down from above."
        primaryCta={{ href: '/contact', label: 'Talk With Connor About Nutrition Coaching' }}
        secondaryCta={{ href: '/pricing', label: site.cta.secondaryBuild }}
      />

      <section className="container-site py-14">
        <SitePhoto slot="groceryShopping" className="aspect-[5/2] mb-10" sizes="(max-width: 1152px) 100vw, 1152px" />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="card">
            <h2 className="text-xl">What nutrition coaching is</h2>
            <p className="mt-3">
              General nutrition education and behavior coaching for healthy adults. Connor reviews your current
              habits and barriers, then helps you build meal structure, grocery routines, and steady accountability,
              with weekly check-ins and agreed action steps.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              {topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h2 className="text-xl">What it is not</h2>
            <p className="mt-3">
              Nutrition coaching is not medical nutrition therapy, disease treatment, or a prescribed medical diet.
              Connor does not diagnose or treat disease, deficiencies, eating disorders, or medical conditions, and
              he is not a registered dietitian.
            </p>
            <p className="mt-3">
              When a need is medical, including eating disorders or pregnancy-specific concerns, Connor refers you
              to a registered dietitian, physician, or other qualified professional.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-soft-white py-14">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl">Ways to work together</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="card">
              <h3 className="text-lg">Monthly Nutrition Coaching</h3>
              <p className="mt-2">
                Weekly digital check-in, food-log review, a monthly 30-minute call, grocery and meal-prep framework,
                and messaging support.
              </p>
              <p className="price-number mt-4 font-heading text-2xl font-extrabold text-slate-deep">
                {formatCents(pricing.monthly.standalone.nutrition)}/month
              </p>
              <p className="text-sm text-muted">
                Or {formatCents(pricing.monthly.addOnsWithPT.nutrition)}/month added to any Personal Training plan.
              </p>
            </div>
            {pricing.buildYourOwn.nutrition.map((item) => (
              <div key={item.id} className="card">
                <h3 className="text-lg">{item.label}</h3>
                <p className="mt-2">{item.includes}</p>
                <p className="price-number mt-4 font-heading text-2xl font-extrabold text-slate-deep">
                  {formatCents(item.cents)}
                </p>
                <p className="text-sm text-muted">{item.expiration}</p>
              </div>
            ))}
          </div>
          <Link href="/pricing" className="btn-primary mt-8" data-analytics="pricing_mode_selected">
            See exact combined pricing
          </Link>
        </div>
      </section>

      <section className="container-site py-14">
        <h2 className="text-2xl">Credential note</h2>
        <p className="mt-3 max-w-3xl">
          Full Nutrition Coaching launches once Connor&apos;s NASM Certified Nutrition Coach credential is active and
          verified. Until then, training clients receive basic general healthy-eating education within the certified
          personal trainer role.
        </p>
        <div className="mt-5 max-w-md">
          <CredentialCard {...site.credentials.nasmCnc} />
        </div>
      </section>

      <section className="bg-terracotta/10 py-14 text-center">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl">Not sure which option fits?</h2>
          <p className="mx-auto mt-3 max-w-xl">Ask questions first. The 15-minute call is free and has no obligation.</p>
          <Link href="/contact" className="btn-primary mt-6" data-analytics="hero_cta_click">
            Talk With Connor About Nutrition Coaching
          </Link>
        </div>
      </section>
    </>
  );
}
