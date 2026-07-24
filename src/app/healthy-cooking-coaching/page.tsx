import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/config/site';
import { pricing } from '@/config/pricing';
import { formatCents } from '@/lib/money';
import { Hero } from '@/components/Hero';
import { LegalNotice } from '@/components/LegalNotice';
import { SitePhoto } from '@/components/SitePhoto';

export const metadata: Metadata = {
  title: { absolute: `Private Healthy Cooking Lessons Phoenix | ${site.brandName}` },
  description:
    'Private healthy cooking and meal-prep coaching in your own Phoenix kitchen. Learn to shop, prep, cook, portion, store, and reheat simple meals you can repeat.',
  alternates: { canonical: '/healthy-cooking-coaching' },
};

const lessonPaths = [
  {
    title: 'For kitchen beginners',
    text: 'Knife safety, reading recipes, basic proteins and vegetables, seasoning, and a few reliable meals you can make without stress.',
  },
  {
    title: 'For meal-prep clients',
    text: 'A repeatable weekly routine: plan, shop, batch-cook two or three recipes, portion, store, and reheat safely.',
  },
  {
    title: 'For couples and households',
    text: 'A shared plan that fits different goals — split tasks, agree on staple meals, and build a kitchen system the whole household can keep.',
  },
];

export default function HealthyCookingPage() {
  return (
    <>
      <Hero
        title="Private Healthy Cooking and Meal-Prep Coaching in Phoenix"
        subhead="Connor teaches in your kitchen and you do the cooking with him — so the skills, recipes, and prep routine stay with you long after the lesson."
        primaryCta={{ href: '/contact', label: 'Talk With Connor About a Cooking Session' }}
        secondaryCta={{ href: '/pricing', label: site.cta.secondaryBuild }}
        reassurance="This is instruction, not meal delivery, catering, or prepared-food sales."
      />

      <section className="container-site py-14">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl">How the lessons work</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Sessions take place in your kitchen, and you participate in every step.</li>
              <li>You buy the groceries, or reimburse Connor at exact receipt cost — no markup.</li>
              <li>Recipes and the grocery list are approved together before the session.</li>
              <li>Every lesson covers food-safety basics, kitchen organization, portioning, storage, and reheating.</li>
              <li>Allergies and kitchen readiness are confirmed in advance with a short checklist.</li>
            </ul>
          </div>
          <SitePhoto slot="cookingInstruction" />
        </div>
      </section>

      <section className="bg-soft-white py-14">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl">Sessions and pricing</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {pricing.buildYourOwn.cooking.map((item) => (
              <div key={item.id} className="card">
                <h3 className="text-lg">{item.label}</h3>
                <p className="mt-2">{item.includes}</p>
                <p className="price-number mt-4 font-heading text-2xl font-extrabold text-slate-deep">
                  {formatCents(item.cents)}
                  <span className="text-sm font-semibold text-muted"> + groceries</span>
                </p>
                <p className="text-sm text-muted">{item.expiration}</p>
              </div>
            ))}
          </div>
          <div className="card mt-6 max-w-xl">
            <h3 className="text-lg">Monthly Healthy Cooking Coaching</h3>
            <p className="mt-2">
              One private two-hour lesson each month, with planning, grocery list, recipes, storage and reheating
              guidance.
            </p>
            <p className="price-number mt-4 font-heading text-2xl font-extrabold text-slate-deep">
              {formatCents(pricing.monthly.standalone.cooking)}/month
            </p>
            <p className="text-sm text-muted">
              Or {formatCents(pricing.monthly.addOnsWithPT.cooking)}/month added to any Personal Training plan.
              Groceries separate.
            </p>
          </div>
          <div className="mt-6 max-w-3xl">
            <LegalNotice kinds={['groceries', 'travel']} />
            <p className="mt-3 text-sm text-muted">
              Additional adult participants can join a lesson for a small per-person fee (maximum four total
              participants unless Connor gives a custom quote). See the pricing page for details.
            </p>
          </div>
        </div>
      </section>

      <section className="container-site py-14">
        <h2 className="text-2xl md:text-3xl">Sample lesson paths</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {lessonPaths.map((p) => (
            <div key={p.title} className="card">
              <h3 className="text-lg">{p.title}</h3>
              <p className="mt-2">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="card mt-8 max-w-2xl">
          <h3 className="text-lg">Free downloads</h3>
          <p className="mt-2 text-sm text-muted">
            A sample grocery list and kitchen-prep checklist will be available here.
            <span className="font-semibold"> [PLACEHOLDER: downloads pending Connor&apos;s content approval — tracked in assets-needed.md]</span>
          </p>
        </div>
      </section>

      <section className="bg-terracotta/10 py-14 text-center">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl">Curious whether this would work in your kitchen?</h2>
          <Link href="/contact" className="btn-primary mt-6" data-analytics="hero_cta_click">
            Talk With Connor About a Cooking Session
          </Link>
        </div>
      </section>
    </>
  );
}
