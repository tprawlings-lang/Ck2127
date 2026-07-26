import type { Metadata } from 'next';
import { site } from '@/config/site';
import { pricing } from '@/config/pricing';
import { formatCents } from '@/lib/money';
import { PricingTabs } from '@/components/PricingTabs';
import { FoundingSpotBadge } from '@/components/FoundingSpotBadge';

export const metadata: Metadata = {
  title: { absolute: `Personal Training, Nutrition, and Cooking Prices | ${site.brandName}` },
  description:
    'Transparent Phoenix pricing for personal training, nutrition coaching, and healthy cooking lessons. Build your exact plan and see the total before you ever commit.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <>
      <section className="bg-soft-white">
        <div className="container-site py-14">
          <h1 className="text-3xl md:text-4xl">Clear pricing, before you ever commit</h1>
          <p className="mt-4 max-w-2xl">
            Choose Monthly Coaching for the best effective price and ongoing accountability, or Build Your Own for
            one-time services without automatic renewal. Every path ends in a conversation with Connor, never an
            instant checkout.
          </p>
          <div className="mt-5">
            <FoundingSpotBadge />
          </div>
        </div>
      </section>

      <section className="container-site py-10">
        <PricingTabs />
      </section>

      <section className="bg-soft-white py-14">
        <div className="container-site">
          <h2 className="text-2xl">Entry offers</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="card">
              <h3 className="text-lg">{pricing.freeCall.name}: free</h3>
              <p className="mt-2">
                A {pricing.freeCall.minutes}-minute phone or video conversation about goals, barriers, schedule,
                concerns, and fit. No workout, no sales pressure, no obligation.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg">
                {pricing.assessment.name}: {formatCents(pricing.assessment.standardCents)}
              </h3>
              <p className="mt-2">
                A {pricing.assessment.minutes}-minute goal discussion, history, basic movement assessment,
                beginner-friendly session, and written next-step summary. The full {formatCents(pricing.assessment.standardCents)}{' '}
                is credited to your first monthly invoice when you join within {pricing.assessment.creditWindowDays} days,
                and it is waived entirely for founding clients.
              </p>
            </div>
          </div>

          <h2 className="mt-12 text-2xl">Monthly subscriber extras</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-slate-deep">
                  <th scope="col" className="py-2 pr-4 font-heading">Extra</th>
                  <th scope="col" className="py-2 pr-4 font-heading">Subscriber price</th>
                  <th scope="col" className="py-2 font-heading">Notes</th>
                </tr>
              </thead>
              <tbody>
                {pricing.subscriberExtras.map((extra) => (
                  <tr key={extra.label} className="border-b border-line align-top">
                    <td className="py-2.5 pr-4">{extra.label}</td>
                    <td className="price-number py-2.5 pr-4 font-semibold">{formatCents(extra.cents)}</td>
                    <td className="py-2.5 text-sm text-muted">{extra.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-12 text-2xl">Billing and cancellation, in plain language</h2>
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5">
            <li>Monthly plans bill in advance on the same calendar day each month, with clear written consent.</li>
            <li>{pricing.notices.term}</li>
            <li>
              Personal Training sessions need {pricing.policies.ptCancellationHours} hours notice. Late cancellations
              and no-shows count as used sessions, with one courtesy late cancellation every{' '}
              {pricing.policies.courtesyLateCancelEveryDays} days.
            </li>
            <li>
              Cooking lessons need {pricing.policies.cookingCancellationHours} hours notice; if groceries were already
              purchased, the grocery cost remains due.
            </li>
            <li>One unused training session may roll into the next billing month and expires at the end of it.</li>
            <li>One account hold of up to {pricing.policies.accountHoldMaxDays} days is available every six months with written approval.</li>
            <li>If Connor reschedules, your session balance is never reduced.</li>
          </ul>

          <div className="mt-8 max-w-3xl rounded-lg border border-line bg-sand p-4 text-sm">
            <p>{pricing.notices.gymMembership}</p>
            <p className="mt-2">{pricing.notices.groceries}</p>
            <p className="mt-2">{pricing.notices.travel}</p>
            <p className="mt-2">
              Taxes and payment fees, if applicable, are confirmed before any payment is collected.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
