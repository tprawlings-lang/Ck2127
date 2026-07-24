/**
 * Single source of truth for every price, discount, expiration, travel fee,
 * and billing policy. No price may be hard-coded inside page components.
 * All amounts are integer cents.
 */

export const pricing = {
  assessment: {
    name: 'Start Strong Assessment',
    standardCents: 7900,
    foundingCents: 0,
    creditWindowDays: 7,
    minutes: 60,
  },

  freeCall: {
    name: 'Free Start Strong Call',
    cents: 0,
    minutes: 15,
  },

  monthly: {
    personalTraining: {
      foundation: {
        label: 'Foundation',
        sessions: 4,
        minutes: 50,
        cents: 34900,
        foundingCents: 29900,
      },
      progress: {
        label: 'Progress',
        sessions: 8,
        minutes: 50,
        cents: 59900,
        foundingCents: 54900,
        mostPopular: true,
      },
      momentum: {
        label: 'Momentum',
        sessions: 12,
        minutes: 50,
        cents: 84900,
        foundingCents: 79900,
      },
    },
    standalone: {
      nutrition: 17900,
      cooking: 24900,
      nutritionAndCooking: 37900,
    },
    addOnsWithPT: {
      nutrition: 12900,
      cooking: 19900,
      nutritionAndCooking: 29900,
    },
  },

  founding: {
    slotLimit: 6,
    monthsProtected: 6,
    withPTDiscountCents: 5000,
    oneStandaloneDiscountCents: 2500,
    twoStandaloneDiscountCents: 5000,
  },

  buildYourOwn: {
    personalTraining: [
      { id: 'pt-single', label: 'Single 50-minute session', cents: 11000, expiration: 'Use within 30 days of purchase.' },
      { id: 'pt-four', label: 'Four-session pack', cents: 40000, expiration: 'Use within 60 days of purchase.' },
      { id: 'pt-eight', label: 'Eight-session pack', cents: 76000, expiration: 'Use within 90 days of purchase.' },
      { id: 'pt-twelve', label: 'Twelve-session pack', cents: 108000, expiration: 'Use within 120 days of purchase.' },
    ],
    nutrition: [
      {
        id: 'nut-strategy',
        label: 'Nutrition Strategy Session',
        cents: 14900,
        expiration: 'Schedule within 45 days.',
        includes:
          '75-minute consultation, habit review, goal and barrier discussion, grocery and meal-prep framework, 14-day action plan, one 15-minute follow-up.',
      },
      {
        id: 'nut-reset',
        label: 'Four-Week Nutrition Reset',
        cents: 24900,
        expiration: 'Begin within 30 days and finish within 6 weeks of the start date.',
        includes:
          'Initial assessment, four weekly check-ins, food-log feedback, grocery framework, meal-prep planning, and final review.',
      },
    ],
    cooking: [
      {
        id: 'cook-skills',
        label: '90-minute Kitchen Skills Session',
        cents: 17900,
        groceriesSeparate: true,
        expiration: 'Schedule within 90 days.',
        includes:
          'Knife safety, reading recipes, basic proteins, vegetables, seasoning, simple breakfasts, or kitchen organization.',
      },
      {
        id: 'cook-lab',
        label: 'Two-hour Meal Prep Lab',
        cents: 24900,
        groceriesSeparate: true,
        expiration: 'Schedule within 90 days.',
        includes:
          'Two or three repeatable recipes, portioning, storage, reheating, and a weekly prep routine.',
      },
      {
        id: 'cook-series',
        label: 'Three-Session Cooking Series',
        cents: 64900,
        groceriesSeparate: true,
        expiration: 'Complete within 120 days.',
        includes:
          'Kitchen basics and food safety, proteins and simple sides, then weekly meal prep and reheating systems.',
      },
    ],
  },

  subscriberExtras: [
    { label: 'Additional 50-minute training session', cents: 9000, note: 'Subject to schedule and normal cancellation policy.' },
    { label: 'Additional 30-minute nutrition call', cents: 5900, note: 'Does not replace medical nutrition care.' },
    { label: '60-minute grocery-shopping lesson', cents: 9900, note: 'Travel rule applies when in person. Purchases are separate.' },
    { label: 'Additional two-hour cooking lesson', cents: 19900, note: 'Plus groceries. Travel and cooking cancellation rules apply.' },
    { label: 'One added adult cooking participant', cents: 4000, note: 'Base cooking price includes one client.' },
    { label: 'Each additional participant after the first added adult', cents: 2500, note: 'Maximum four total participants unless Connor gives a custom quote.' },
  ],

  travel: {
    includedRadiusMiles: 10,
    tiers: [
      { fromMiles: 10, toMiles: 20, feeCents: 2500 },
      { fromMiles: 20, toMiles: 30, feeCents: 5000 },
    ],
    beyondMiles: 30,
    beyondRule: 'Custom quote before booking.',
    baseLocation: 'The Gym Phoenix',
  },

  policies: {
    initialTermWeeks: 12,
    cancellationNoticeDays: 30,
    ptCancellationHours: 24,
    nutritionCancellationHours: 24,
    cookingCancellationHours: 48,
    courtesyLateCancelEveryDays: 90,
    rolloverSessions: 1,
    accountHoldMaxDays: 30,
    accountHoldEveryMonths: 6,
  },

  notices: {
    gymMembership:
      'Gym membership is purchased separately by the client. Both Connor and each in-person training client must maintain the membership required by The Gym Phoenix.',
    groceries:
      'Groceries are separate. The client purchases groceries or reimburses Connor at exact receipt cost. No markup.',
    travel:
      'Cooking travel within 10 driving miles of The Gym Phoenix is included. 10–20 miles adds $25. 20–30 miles adds $50. Beyond 30 miles is a custom quote before booking.',
    term: 'Monthly plans start with a 12-week initial term, then continue month to month with 30 days notice.',
    resultsVary: 'Individual results vary.',
  },
} as const;

export type MonthlyPTPlanKey = keyof typeof pricing.monthly.personalTraining;
export type BuildYourOwnCategory = 'personalTraining' | 'nutrition' | 'cooking';
