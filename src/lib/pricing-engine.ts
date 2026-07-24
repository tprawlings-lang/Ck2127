import { pricing, type MonthlyPTPlanKey } from '@/config/pricing';

/* ------------------------------------------------------------------ */
/* Build Your Own                                                      */
/* ------------------------------------------------------------------ */

export type BuildYourOwnInput = {
  ptCents?: number;
  nutritionCents?: number;
  cookingCents?: number;
};

export type BuildYourOwnResult = {
  subtotalCents: number;
  discountedCents: number;
  /** Final service total, rounded up to the next $5, in cents. */
  displayTotalCents: number;
  savingsCents: number;
};

/**
 * Exact approved algorithm:
 * - 2 categories incl. PT: PT full price, other item -10%.
 * - 2 categories, no PT: both items -10%.
 * - 3 categories: PT full price, nutrition + cooking -15% each.
 * - Round the final service total UP to the next $5.
 * Groceries, travel, gym membership, tax, and fees stay outside this calculation.
 */
export function calculateBuildYourOwn({
  ptCents = 0,
  nutritionCents = 0,
  cookingCents = 0,
}: BuildYourOwnInput): BuildYourOwnResult {
  const selectedCount = [ptCents, nutritionCents, cookingCents].filter((v) => v > 0).length;
  const subtotalCents = ptCents + nutritionCents + cookingCents;
  let discountedCents = subtotalCents;

  if (selectedCount === 2 && ptCents > 0) {
    discountedCents = ptCents + Math.round((nutritionCents + cookingCents) * 0.9);
  } else if (selectedCount === 2 && ptCents === 0) {
    discountedCents = Math.round((nutritionCents + cookingCents) * 0.9);
  } else if (selectedCount === 3) {
    discountedCents = ptCents + Math.round((nutritionCents + cookingCents) * 0.85);
  }

  const roundedDollars = Math.ceil(discountedCents / 100 / 5) * 5;

  return {
    subtotalCents,
    discountedCents,
    displayTotalCents: roundedDollars * 100,
    savingsCents: subtotalCents - roundedDollars * 100,
  };
}

/* ------------------------------------------------------------------ */
/* Monthly Coaching                                                    */
/* ------------------------------------------------------------------ */

export type MonthlySelection = {
  ptPlan: MonthlyPTPlanKey | null;
  nutrition: boolean;
  cooking: boolean;
};

export type MonthlyResult = {
  standardCents: number;
  foundingCents: number;
  lineItems: { label: string; cents: number }[];
  valid: boolean;
};

/**
 * Monthly combination pricing. With a PT plan selected, nutrition and cooking
 * use add-on prices. Without PT, standalone prices apply (with the approved
 * bundle price when both are chosen). Founding discounts follow the approved
 * rules: -$50 with PT, -$25 for one standalone, -$50 for two standalones.
 */
export function calculateMonthly(sel: MonthlySelection): MonthlyResult {
  const { personalTraining, standalone, addOnsWithPT } = pricing.monthly;
  const { founding } = pricing;
  const lineItems: { label: string; cents: number }[] = [];
  let standardCents = 0;

  if (!sel.ptPlan && !sel.nutrition && !sel.cooking) {
    return { standardCents: 0, foundingCents: 0, lineItems: [], valid: false };
  }

  if (sel.ptPlan) {
    const plan = personalTraining[sel.ptPlan];
    standardCents += plan.cents;
    lineItems.push({
      label: `${plan.label} Personal Training (${plan.sessions} × ${plan.minutes} min)`,
      cents: plan.cents,
    });
    if (sel.nutrition && sel.cooking) {
      standardCents += addOnsWithPT.nutritionAndCooking;
      lineItems.push({ label: 'Nutrition + Healthy Cooking add-on bundle', cents: addOnsWithPT.nutritionAndCooking });
    } else if (sel.nutrition) {
      standardCents += addOnsWithPT.nutrition;
      lineItems.push({ label: 'Nutrition Coaching add-on', cents: addOnsWithPT.nutrition });
    } else if (sel.cooking) {
      standardCents += addOnsWithPT.cooking;
      lineItems.push({ label: 'Healthy Cooking Coaching add-on', cents: addOnsWithPT.cooking });
    }
  } else {
    if (sel.nutrition && sel.cooking) {
      standardCents += standalone.nutritionAndCooking;
      lineItems.push({ label: 'Nutrition + Healthy Cooking bundle', cents: standalone.nutritionAndCooking });
    } else if (sel.nutrition) {
      standardCents += standalone.nutrition;
      lineItems.push({ label: 'Nutrition Coaching', cents: standalone.nutrition });
    } else if (sel.cooking) {
      standardCents += standalone.cooking;
      lineItems.push({ label: 'Healthy Cooking Coaching', cents: standalone.cooking });
    }
  }

  let foundingDiscountCents = 0;
  if (sel.ptPlan) {
    foundingDiscountCents = founding.withPTDiscountCents;
  } else if (sel.nutrition && sel.cooking) {
    foundingDiscountCents = founding.twoStandaloneDiscountCents;
  } else {
    foundingDiscountCents = founding.oneStandaloneDiscountCents;
  }

  return {
    standardCents,
    foundingCents: standardCents - foundingDiscountCents,
    lineItems,
    valid: true,
  };
}

/** All 15 approved monthly combinations, used by tests and the pricing page. */
export function allMonthlyCombinations(): { label: string; selection: MonthlySelection }[] {
  const ptPlans: (MonthlyPTPlanKey | null)[] = [null, 'foundation', 'progress', 'momentum'];
  const combos: { label: string; selection: MonthlySelection }[] = [];
  for (const ptPlan of ptPlans) {
    for (const nutrition of [false, true]) {
      for (const cooking of [false, true]) {
        if (!ptPlan && !nutrition && !cooking) continue;
        const parts: string[] = [];
        if (ptPlan) parts.push(pricing.monthly.personalTraining[ptPlan].label);
        if (nutrition) parts.push('Nutrition');
        if (cooking) parts.push('Healthy Cooking');
        combos.push({ label: parts.join(' + '), selection: { ptPlan, nutrition, cooking } });
      }
    }
  }
  return combos;
}
