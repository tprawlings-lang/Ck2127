'use client';

import Link from 'next/link';
import { useState } from 'react';
import { pricing, type MonthlyPTPlanKey } from '@/config/pricing';
import { site, isFoundingAvailable } from '@/config/site';
import { calculateMonthly } from '@/lib/pricing-engine';
import { formatCents } from '@/lib/money';
import { PriceBreakdown } from './PriceBreakdown';
import { FoundingSpotBadge } from './FoundingSpotBadge';

type Step = 'wantsPT' | 'ptPlan' | 'nutrition' | 'cooking' | 'result';

/**
 * Monthly Coaching builder. One primary question per screen, large controls,
 * clear selected states. Founding total appears only when a real spot remains.
 */
export function MonthlyPlanBuilder() {
  const [step, setStep] = useState<Step>('wantsPT');
  const [wantsPT, setWantsPT] = useState<boolean | null>(null);
  const [ptPlan, setPtPlan] = useState<MonthlyPTPlanKey | null>(null);
  const [nutrition, setNutrition] = useState(false);
  const [cooking, setCooking] = useState(false);

  const result = calculateMonthly({ ptPlan, nutrition, cooking });
  const founding = isFoundingAvailable();

  const optionBtn = (selected: boolean) =>
    `w-full rounded-lg border-2 px-5 py-4 text-left font-heading font-semibold transition-colors ${
      selected
        ? 'border-terracotta bg-terracotta/10 text-slate-deep'
        : 'border-line bg-soft-white text-slate-deep hover:border-sage'
    }`;

  const contactHref = `/contact?mode=monthly&pt=${ptPlan ?? ''}&nutrition=${nutrition ? '1' : ''}&cooking=${cooking ? '1' : ''}`;

  return (
    <div className="space-y-6" data-analytics="monthly_plan_started">
      {step === 'wantsPT' && (
        <fieldset>
          <legend className="font-heading text-xl font-bold text-slate-deep">
            Do you want in-person Personal Training?
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className={optionBtn(wantsPT === true)}
              aria-pressed={wantsPT === true}
              onClick={() => {
                setWantsPT(true);
                setStep('ptPlan');
              }}
            >
              Yes, train with Connor at The Gym Phoenix
            </button>
            <button
              type="button"
              className={optionBtn(wantsPT === false)}
              aria-pressed={wantsPT === false}
              onClick={() => {
                setWantsPT(false);
                setPtPlan(null);
                setStep('nutrition');
              }}
            >
              No, nutrition and/or cooking coaching only
            </button>
          </div>
        </fieldset>
      )}

      {step === 'ptPlan' && (
        <fieldset>
          <legend className="font-heading text-xl font-bold text-slate-deep">
            Which training plan fits your schedule?
          </legend>
          <div className="mt-4 grid gap-3">
            {(Object.keys(pricing.monthly.personalTraining) as MonthlyPTPlanKey[]).map((key) => {
              const plan = pricing.monthly.personalTraining[key];
              return (
                <button
                  key={key}
                  type="button"
                  className={optionBtn(ptPlan === key)}
                  aria-pressed={ptPlan === key}
                  onClick={() => {
                    setPtPlan(key);
                    setStep('nutrition');
                  }}
                >
                  <span className="flex flex-wrap items-baseline justify-between gap-2">
                    <span>
                      {plan.label}: {plan.sessions} × {plan.minutes}-minute sessions per month
                      {'mostPopular' in plan && plan.mostPopular && (
                        <span className="ml-2 rounded-full bg-terracotta px-2 py-0.5 text-xs font-bold text-white">
                          Most Popular
                        </span>
                      )}
                    </span>
                    <span className="price-number">{formatCents(plan.cents)}/mo</span>
                  </span>
                </button>
              );
            })}
          </div>
          <BackButton onClick={() => setStep('wantsPT')} />
        </fieldset>
      )}

      {step === 'nutrition' && (
        <fieldset>
          <legend className="font-heading text-xl font-bold text-slate-deep">
            Add monthly Nutrition Coaching?
          </legend>
          <p className="mt-1 text-sm text-muted">
            Weekly digital check-in, food-log review, monthly 30-minute call, grocery and meal-prep framework, and
            messaging support.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className={optionBtn(nutrition)}
              aria-pressed={nutrition}
              onClick={() => {
                setNutrition(true);
                setStep('cooking');
              }}
            >
              Yes, add Nutrition Coaching (
              {formatCents(ptPlan ? pricing.monthly.addOnsWithPT.nutrition : pricing.monthly.standalone.nutrition)}/mo)
            </button>
            <button
              type="button"
              className={optionBtn(!nutrition && step === 'nutrition' && false)}
              onClick={() => {
                setNutrition(false);
                setStep('cooking');
              }}
            >
              No thanks
            </button>
          </div>
          <BackButton onClick={() => setStep(wantsPT ? 'ptPlan' : 'wantsPT')} />
        </fieldset>
      )}

      {step === 'cooking' && (
        <fieldset>
          <legend className="font-heading text-xl font-bold text-slate-deep">
            Add monthly Healthy Cooking Coaching?
          </legend>
          <p className="mt-1 text-sm text-muted">
            One private two-hour lesson each month in your kitchen, with planning, grocery list, recipes, storage, and
            reheating guidance. Groceries separate.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className={optionBtn(cooking)}
              aria-pressed={cooking}
              onClick={() => {
                setCooking(true);
                setStep('result');
              }}
            >
              Yes, add Healthy Cooking (
              {formatCents(ptPlan ? pricing.monthly.addOnsWithPT.cooking : pricing.monthly.standalone.cooking)}/mo)
            </button>
            <button
              type="button"
              className={optionBtn(false)}
              onClick={() => {
                setCooking(false);
                setStep('result');
              }}
            >
              No thanks
            </button>
          </div>
          <BackButton onClick={() => setStep('nutrition')} />
        </fieldset>
      )}

      {step === 'result' && result.valid && (
        <div className="space-y-4" data-analytics="monthly_plan_completed">
          <FoundingSpotBadge />
          <PriceBreakdown
            lineItems={result.lineItems}
            totalCents={result.standardCents}
            totalLabel="Your monthly total"
            noticeKinds={
              cooking
                ? ['term', 'gymMembership', 'groceries', 'travel']
                : ptPlan
                  ? ['term', 'gymMembership']
                  : ['term']
            }
            extraNotes={
              founding
                ? [
                    `${site.foundingProgramName}: ${formatCents(result.foundingCents)}/month for your first six billing months as one of the first six founding clients.`,
                  ]
                : undefined
            }
          />
          <div className="flex flex-wrap gap-3">
            <Link href={contactHref} className="btn-primary" data-analytics="contact_form_started">
              Talk With Connor About This Plan
            </Link>
            <button type="button" className="btn-secondary" onClick={() => setStep('wantsPT')}>
              Start over
            </button>
          </div>
        </div>
      )}

      {step === 'result' && !result.valid && (
        <div className="card">
          <p>Select at least one service to see a monthly total.</p>
          <button type="button" className="btn-secondary mt-4" onClick={() => setStep('wantsPT')}>
            Start over
          </button>
        </div>
      )}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mt-4 text-sm font-semibold text-sage underline">
      ← Back
    </button>
  );
}
