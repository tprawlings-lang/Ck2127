import { describe, expect, it } from 'vitest';
import { calculateBuildYourOwn, calculateMonthly } from './pricing-engine';

describe('calculateBuildYourOwn — required approved test cases', () => {
  it('case 1: single Personal Training session → $110', () => {
    const r = calculateBuildYourOwn({ ptCents: 11000 });
    expect(r.discountedCents).toBe(11000);
    expect(r.displayTotalCents).toBe(11000);
  });

  it('case 2: four-session pack + Nutrition Strategy Session → $534.10 raw, $535 displayed', () => {
    const r = calculateBuildYourOwn({ ptCents: 40000, nutritionCents: 14900 });
    expect(r.discountedCents).toBe(53410);
    expect(r.displayTotalCents).toBe(53500);
  });

  it('case 3: four-session pack + Four-Week Nutrition Reset → $624.10 raw, $625 displayed', () => {
    const r = calculateBuildYourOwn({ ptCents: 40000, nutritionCents: 24900 });
    expect(r.discountedCents).toBe(62410);
    expect(r.displayTotalCents).toBe(62500);
  });

  it('case 4: Four-Week Nutrition Reset + Meal Prep Lab → $448.20 raw, $450 displayed', () => {
    const r = calculateBuildYourOwn({ nutritionCents: 24900, cookingCents: 24900 });
    expect(r.discountedCents).toBe(44820);
    expect(r.displayTotalCents).toBe(45000);
  });

  it('case 5: four-session pack + Reset + Meal Prep Lab → $823.30 raw, $825 displayed', () => {
    const r = calculateBuildYourOwn({ ptCents: 40000, nutritionCents: 24900, cookingCents: 24900 });
    expect(r.discountedCents).toBe(82330);
    expect(r.displayTotalCents).toBe(82500);
  });

  it('case 6: eight-session pack + Strategy + Kitchen Skills → $1,038.80 raw, $1,040 displayed', () => {
    const r = calculateBuildYourOwn({ ptCents: 76000, nutritionCents: 14900, cookingCents: 17900 });
    expect(r.discountedCents).toBe(103880);
    expect(r.displayTotalCents).toBe(104000);
  });

  it('case 7: twelve-session pack + Three-Session Cooking Series → $1,664.10 raw, $1,665 displayed', () => {
    const r = calculateBuildYourOwn({ ptCents: 108000, cookingCents: 64900 });
    expect(r.discountedCents).toBe(166410);
    expect(r.displayTotalCents).toBe(166500);
  });

  it('case 8: Strategy + Kitchen Skills without PT → $295.20 raw, $300 displayed', () => {
    const r = calculateBuildYourOwn({ nutritionCents: 14900, cookingCents: 17900 });
    expect(r.discountedCents).toBe(29520);
    expect(r.displayTotalCents).toBe(30000);
  });

  it('single non-PT category gets no discount', () => {
    const r = calculateBuildYourOwn({ cookingCents: 24900 });
    expect(r.discountedCents).toBe(24900);
    expect(r.displayTotalCents).toBe(25000); // rounds up to next $5
  });
});

describe('calculateMonthly — all 15 approved combinations', () => {
  const cases: [string, Parameters<typeof calculateMonthly>[0], number, number][] = [
    ['Nutrition only', { ptPlan: null, nutrition: true, cooking: false }, 17900, 15400],
    ['Healthy Cooking only', { ptPlan: null, nutrition: false, cooking: true }, 24900, 22400],
    ['Nutrition + Healthy Cooking', { ptPlan: null, nutrition: true, cooking: true }, 37900, 32900],
    ['Foundation only', { ptPlan: 'foundation', nutrition: false, cooking: false }, 34900, 29900],
    ['Foundation + Nutrition', { ptPlan: 'foundation', nutrition: true, cooking: false }, 47800, 42800],
    ['Foundation + Healthy Cooking', { ptPlan: 'foundation', nutrition: false, cooking: true }, 54800, 49800],
    ['Foundation + Nutrition + Healthy Cooking', { ptPlan: 'foundation', nutrition: true, cooking: true }, 64800, 59800],
    ['Progress only', { ptPlan: 'progress', nutrition: false, cooking: false }, 59900, 54900],
    ['Progress + Nutrition', { ptPlan: 'progress', nutrition: true, cooking: false }, 72800, 67800],
    ['Progress + Healthy Cooking', { ptPlan: 'progress', nutrition: false, cooking: true }, 79800, 74800],
    ['Progress + Nutrition + Healthy Cooking', { ptPlan: 'progress', nutrition: true, cooking: true }, 89800, 84800],
    ['Momentum only', { ptPlan: 'momentum', nutrition: false, cooking: false }, 84900, 79900],
    ['Momentum + Nutrition', { ptPlan: 'momentum', nutrition: true, cooking: false }, 97800, 92800],
    ['Momentum + Healthy Cooking', { ptPlan: 'momentum', nutrition: false, cooking: true }, 104800, 99800],
    ['Momentum + Nutrition + Healthy Cooking', { ptPlan: 'momentum', nutrition: true, cooking: true }, 114800, 109800],
  ];

  it.each(cases)('%s → standard %i, founding %i', (_label, selection, standard, founding) => {
    const r = calculateMonthly(selection);
    expect(r.valid).toBe(true);
    expect(r.standardCents).toBe(standard);
    expect(r.foundingCents).toBe(founding);
  });

  it('empty selection is invalid', () => {
    expect(calculateMonthly({ ptPlan: null, nutrition: false, cooking: false }).valid).toBe(false);
  });
});
