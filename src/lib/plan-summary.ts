import { pricing, type MonthlyPTPlanKey } from '@/config/pricing';
import { calculateBuildYourOwn, calculateMonthly } from '@/lib/pricing-engine';
import { formatCents } from '@/lib/money';

export type PlanFromQuery = {
  pricingMode: 'monthly' | 'build-your-own' | '';
  summary: string;
};

/**
 * Decode calculator selections carried in the contact-page URL into a
 * human-readable summary shown to the visitor before submission and included
 * in Connor's notification. Recomputes prices from configuration — never
 * trusts totals from the URL.
 */
export function planFromSearchParams(params: Record<string, string | string[] | undefined>): PlanFromQuery {
  const mode = typeof params.mode === 'string' ? params.mode : '';
  const get = (key: string) => (typeof params[key] === 'string' ? (params[key] as string) : '');

  if (mode === 'monthly') {
    const ptKey = get('pt');
    const ptPlan =
      ptKey && ptKey in pricing.monthly.personalTraining ? (ptKey as MonthlyPTPlanKey) : null;
    const nutrition = get('nutrition') === '1';
    const cooking = get('cooking') === '1';
    const result = calculateMonthly({ ptPlan, nutrition, cooking });
    if (!result.valid) return { pricingMode: '', summary: '' };
    const parts = result.lineItems.map((li) => li.label);
    return {
      pricingMode: 'monthly',
      summary: `Monthly Coaching: ${parts.join(' + ')} at ${formatCents(result.standardCents)}/month standard`,
    };
  }

  if (mode === 'build-your-own') {
    const pt = pricing.buildYourOwn.personalTraining.find((i) => i.id === get('pt'));
    const nutrition = pricing.buildYourOwn.nutrition.find((i) => i.id === get('nutrition'));
    const cooking = pricing.buildYourOwn.cooking.find((i) => i.id === get('cooking'));
    const chosen = [pt, nutrition, cooking].filter(Boolean) as { label: string; cents: number }[];
    if (chosen.length === 0) return { pricingMode: '', summary: '' };
    const result = calculateBuildYourOwn({
      ptCents: pt?.cents ?? 0,
      nutritionCents: nutrition?.cents ?? 0,
      cookingCents: cooking?.cents ?? 0,
    });
    return {
      pricingMode: 'build-your-own',
      summary: `Build Your Own: ${chosen.map((c) => c.label).join(' + ')} at ${formatCents(result.displayTotalCents)} service total`,
    };
  }

  return { pricingMode: '', summary: '' };
}
