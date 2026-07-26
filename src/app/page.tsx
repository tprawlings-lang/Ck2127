import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/config/site';
import { Hero } from '@/components/Hero';
import { ServiceCard } from '@/components/ServiceCard';
import { FAQAccordion } from '@/components/FAQAccordion';
import { LocationBlock } from '@/components/LocationBlock';
import { CredentialList } from '@/components/CredentialCard';
import { SitePhoto } from '@/components/SitePhoto';

export const metadata: Metadata = {
  title: { absolute: `Personal Trainer in Phoenix | ${site.brandName}` },
  description:
    'Patient one-on-one personal training, nutrition coaching, and healthy cooking instruction in Phoenix. Free 15-minute call. Transparent pricing.',
  alternates: { canonical: '/' },
};

const faqs = [
  {
    question: 'I am really out of shape. Can I still start?',
    answer:
      'Yes. Your first session is a starting point, not a test. Connor adjusts every exercise to your present ability, and you never need to get in shape before you begin.',
  },
  {
    question: 'The gym looks intimidating. What is the first visit like?',
    answer:
      'Connor meets you when you arrive and guides every part of the session: equipment, pacing, everything. Lower-traffic appointment times may be available.',
  },
  {
    question: 'Do I need a gym membership too?',
    answer:
      'Yes. Coaching fees and gym membership are separate. Both Connor and each in-person training client must maintain the membership required by The Gym Phoenix.',
  },
  {
    question: 'Will I be put on a strict diet?',
    answer:
      'No. Nutrition coaching starts with your current habits and builds practical changes, with no crash diets or punishment plans. Medical or prescribed diets are outside Connor’s service and are referred to qualified professionals.',
  },
  {
    question: 'What if I cannot cook?',
    answer:
      'Cooking sessions begin with basic skills, a small number of recipes, and a repeatable prep routine, taught in your own kitchen so you can repeat it without Connor.',
  },
  {
    question: 'Am I locked into a long contract?',
    answer:
      'Monthly plans start with a 12-week initial term, then continue month to month with 30 days notice. Build Your Own options are available with no recurring billing at all.',
  },
  {
    question: 'Can I ask questions before paying anything?',
    answer:
      'Yes. That is the whole point of the Free Start Strong Call. Fifteen minutes, no workout, no sales pressure, no obligation.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        title={site.seoHeadline}
        subhead="Build strength, lose weight steadily, improve food habits, and learn practical cooking skills with patient coaching designed around your current level."
        locationLine={`In-person training at ${site.gym.name} near ${site.gym.crossStreets}.`}
        primaryCta={{ href: '/contact', label: site.cta.primary }}
        secondaryCta={{ href: '#how-it-works', label: site.cta.secondaryHow }}
        reassurance="You do not need to get in shape before contacting Connor."
      />

      {/* Hero photo */}
      <section aria-label="Connor Kearns" className="bg-soft-white pb-14">
        <div className="container-site">
          <SitePhoto slot="heroBanner" className="aspect-[5/2]" sizes="(max-width: 1152px) 100vw, 1152px" priority />
        </div>
      </section>

      {/* Quick reassurance strip */}
      <section aria-label="Quick reassurance" className="border-y border-line bg-sand">
        <ul className="container-site flex flex-wrap justify-center gap-x-8 gap-y-2 py-4 text-sm font-semibold text-sage">
          <li>Beginner-friendly</li>
          <li>Everyone welcome</li>
          <li>Training starts at your level</li>
          <li>Nutrition without crash diets</li>
          <li>Cooking skills you can repeat</li>
        </ul>
      </section>

      {/* Problem recognition */}
      <section className="container-site py-14">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl">You know you need to make a change. Starting is the hard part.</h2>
          <p className="mt-4">
            Walking into a gym can feel intimidating. Diets come and go, accountability fades, and cooking healthy
            meals can seem out of reach. If you have started and stopped before, you are not alone. This coaching
            was built for exactly that.
          </p>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-soft-white py-14">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl">What steady coaching builds</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Steady weight-loss support',
              'Practical strength for daily life',
              'More energy and confident movement',
              'Knowing your way around the equipment',
              'A food structure that fits your lifestyle',
              'Confidence in your own kitchen',
              'Accountability that keeps you going',
              'A routine you can actually repeat',
            ].map((item) => (
              <li key={item} className="card !p-4 font-semibold text-slate-deep">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">Individual results vary.</p>
        </div>
      </section>

      {/* Three service pillars */}
      <section className="container-site py-14">
        <h2 className="text-2xl md:text-3xl">Three ways to get support, together or on their own</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <ServiceCard
            title="Personal Training"
            description="Private one-on-one sessions at The Gym Phoenix, built around your current ability, with progressive strength training and guidance for the days Connor is not there."
            href="/personal-training"
          />
          <ServiceCard
            title="Nutrition Coaching"
            description="Practical education, habit coaching, grocery planning, and weekly accountability. Never crash diets or prescribed medical plans."
            href="/nutrition-coaching"
          />
          <ServiceCard
            title="Healthy Cooking Coaching"
            description="Hands-on lessons in your own kitchen. Learn to shop, prep, cook, portion, store, and reheat simple meals you can repeat without Connor."
            href="/healthy-cooking-coaching"
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-slate-deep py-14 text-sand">
        <div className="container-site">
          <h2 className="text-2xl text-soft-white md:text-3xl">How it works</h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              {
                step: '1. Talk',
                text: `Book the ${site.consultationName}: 15 minutes about your goals, concerns, and schedule. No workout, no pressure, no obligation.`,
              },
              {
                step: '2. Start at your level',
                text: 'Your first assessment meets you exactly where you are. Connor builds a plan around your present ability, not an ideal one.',
              },
              {
                step: '3. Build your routine',
                text: 'Regular sessions, honest check-ins, and steady progressions turn showing up into a routine that lasts.',
              },
            ].map((item) => (
              <li key={item.step}>
                <h3 className="font-heading text-xl font-bold text-terracotta">{item.step}</h3>
                <p className="mt-2 text-sand/90">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Monthly or flexible */}
      <section className="container-site py-14">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="card">
            <h2 className="text-2xl">Monthly Coaching</h2>
            <p className="mt-3">
              The best effective price with ongoing accountability. Plans start with a 12-week term, then continue
              month to month with 30 days notice. The first six founding clients receive reduced founding rates.
            </p>
          </div>
          <div className="card">
            <h2 className="text-2xl">Build Your Own</h2>
            <p className="mt-3">
              One-time sessions and prepaid packs with no automatic renewal. Combine service categories and bundle
              discounts apply automatically, with the exact total shown before you ever talk to Connor.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Link href="/pricing" className="btn-primary" data-analytics="hero_cta_click">
            {site.cta.secondaryBuild}
          </Link>
        </div>
      </section>

      {/* Meet Connor */}
      <section className="bg-soft-white py-14">
        <div className="container-site grid items-start gap-8 md:grid-cols-[1fr_1.5fr]">
          <SitePhoto slot="meetConnor" className="aspect-[3/4]" sizes="(max-width: 768px) 100vw, 40vw" />
          <div>
            <h2 className="text-2xl md:text-3xl">Meet Connor Kearns</h2>
            <p className="mt-4">
              Connor came to coaching from years in restaurants, hospitality, and consulting: real-world experience
              with food, routines, and helping people under pressure. He also worked as an emergency dispatcher, which
              shaped a calm, organized, attentive style. He holds a B.S. in Organizational Management from Purdue
              Global, and his coaching approach is simple: start where you are, and build strength that lasts.
            </p>
            <div className="mt-6">
              <CredentialList />
            </div>
            <Link href="/about" className="mt-6 inline-block font-heading font-semibold text-terracotta">
              More about Connor →
            </Link>
          </div>
        </div>
      </section>

      {/* Training location */}
      <section className="container-site py-14">
        <LocationBlock />
      </section>

      {/* Nutrition and cooking */}
      <section className="bg-soft-white py-14">
        <div className="container-site grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl">Better eating has to fit real life</h2>
            <p className="mt-4">
              No crash diets and no prescriptions. Just a grocery framework, a weekly prep plan, and simple cooking
              skills taught in your own kitchen. The goal is a food routine you can keep on a busy week, not a perfect
              one.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link href="/nutrition-coaching" className="font-heading font-semibold text-terracotta">
                Nutrition Coaching →
              </Link>
              <Link href="/healthy-cooking-coaching" className="font-heading font-semibold text-terracotta">
                Healthy Cooking Coaching →
              </Link>
            </div>
          </div>
          <SitePhoto slot="mealPrep" />
        </div>
      </section>

      {/* FAQ */}
      <section className="container-site py-14">
        <h2 className="text-2xl md:text-3xl">Common questions</h2>
        <div className="mt-6 max-w-3xl">
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Final invitation */}
      <section className="bg-terracotta/10 py-16">
        <div className="container-site text-center">
          <h2 className="text-2xl md:text-3xl">You do not have to figure this out alone.</h2>
          <p className="mx-auto mt-3 max-w-xl">
            Start with a free 15-minute conversation. No workout, no pressure, just honest answers about where to
            begin.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary" data-analytics="booking_click">
              Book Your Free Call
            </Link>
            {site.phoneConfirmed && (
              <a href={`tel:${site.phoneE164}`} className="btn-secondary" data-analytics="phone_click">
                {site.cta.call}
              </a>
            )}
            {site.phoneConfirmed && (
              <a href={`sms:${site.phoneE164}`} className="btn-secondary" data-analytics="text_click">
                {site.cta.text}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
