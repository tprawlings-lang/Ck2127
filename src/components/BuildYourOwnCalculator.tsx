'use client';

import Link from 'next/link';
import { useState } from 'react';
import { pricing } from '@/config/pricing';
import { calculateBuildYourOwn } from '@/lib/pricing-engine';
import { formatCents } from '@/lib/money';
import { PriceBreakdown } from './PriceBreakdown';

type Category = 'personalTraining' | 'nutrition' | 'cooking';

const categoryMeta: { key: Category; title: string; hint: string }[] = [
  { key: 'personalTraining', title: 'Personal Training', hint: 'Sessions at The Gym Phoenix. Gym membership separate.' },
  { key: 'nutrition', title: 'Nutrition Coaching', hint: 'One-time consultations and short programs.' },
  { key: 'cooking', title: 'Healthy Cooking Coaching', hint: 'Hands-on lessons in your kitchen. Groceries separate.' },
];

/**
 * Build Your Own calculator: zero or one item per category, exact approved
 * discount and round-up-to-$5 rule, full line items and outside-cost notices.
 */
export function BuildYourOwnCalculator() {
  const [selected, setSelected] = useState<Record<Category, string | null>>({
    personalTraining: null,
    nutrition: null,
    cooking: null,
  });

  const items = {
    personalTraining: pricing.buildYourOwn.personalTraining.find((i) => i.id === selected.personalTraining),
    nutrition: pricing.buildYourOwn.nutrition.find((i) => i.id === selected.nutrition),
    cooking: pricing.buildYourOwn.cooking.find((i) => i.id === selected.cooking),
  };

  const result = calculateBuildYourOwn({
    ptCents: items.personalTraining?.cents ?? 0,
    nutritionCents: items.nutrition?.cents ?? 0,
    cookingCents: items.cooking?.cents ?? 0,
  });

  const anySelected = Object.values(selected).some(Boolean);
  const lineItems = (Object.keys(items) as Category[])
    .filter((c) => items[c])
    .map((c) => ({ label: items[c]!.label, cents: items[c]!.cents }));

  const discountCents = result.subtotalCents - result.displayTotalCents;
  const expirations = (Object.keys(items) as Category[])
    .filter((c) => items[c])
    .map((c) => `${items[c]!.label}: ${items[c]!.expiration}`);

  const cookingSelected = Boolean(items.cooking);
  const contactHref = `/contact?mode=build-your-own&pt=${selected.personalTraining ?? ''}&nutrition=${selected.nutrition ?? ''}&cooking=${selected.cooking ?? ''}`;

  return (
    <div className="space-y-8" data-analytics="build_your_own_started">
      {categoryMeta.map(({ key, title, hint }) => (
        <fieldset key={key}>
          <legend className="font-heading text-xl font-bold text-slate-deep">{title}</legend>
          <p className="mt-1 text-sm text-muted">{hint} Choose one option or leave the category out.</p>
          <div className="mt-4 grid gap-3">
            {pricing.buildYourOwn[key].map((item) => {
              const isSelected = selected[key] === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isSelected}
                  data-analytics="service_selected"
                  className={`w-full rounded-lg border-2 px-5 py-4 text-left transition-colors ${
                    isSelected
                      ? 'border-terracotta bg-terracotta/10'
                      : 'border-line bg-soft-white hover:border-sage'
                  }`}
                  onClick={() =>
                    setSelected((prev) => ({ ...prev, [key]: isSelected ? null : item.id }))
                  }
                >
                  <span className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-heading font-semibold text-slate-deep">
                      {item.label}
                      {'groceriesSeparate' in item && item.groceriesSeparate ? ' (plus groceries)' : ''}
                    </span>
                    <span className="price-number font-semibold">{formatCents(item.cents)}</span>
                  </span>
                  {'includes' in item && item.includes && (
                    <span className="mt-1 block text-sm text-muted">{item.includes}</span>
                  )}
                  <span className="mt-1 block text-xs text-muted">{item.expiration}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      {anySelected ? (
        <div className="space-y-4" data-analytics="build_your_own_completed">
          <PriceBreakdown
            lineItems={lineItems}
            discountCents={discountCents > 0 ? discountCents : undefined}
            totalCents={result.displayTotalCents}
            totalLabel="Your service total"
            noticeKinds={cookingSelected ? ['gymMembership', 'groceries', 'travel'] : ['gymMembership']}
            extraNotes={expirations}
          />
          <Link href={contactHref} className="btn-primary" data-analytics="contact_form_started">
            Request Your First Appointment
          </Link>
        </div>
      ) : (
        <p className="text-muted">Select at least one service above to see your exact total.</p>
      )}
    </div>
  );
}
