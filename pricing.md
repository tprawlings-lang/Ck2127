# Pricing Model — Plain Language

All prices live in `src/config/pricing.ts` (integer cents). The calculation
logic lives in `src/lib/pricing-engine.ts`. Nothing else may define a price.

## Monthly Coaching

Best effective price + accountability. 12-week initial term, then month to
month with 30 days notice.

**Personal Training plans:** Foundation 4×50min $349 · Progress 8×50min $599
(Most Popular) · Momentum 12×50min $849.

**Add-ons with any PT plan:** Nutrition $129 · Cooking $199 · Both $299.
**Standalone (no PT):** Nutrition $179 · Cooking $249 · Both $379.

### Founding Client Rate (first 6 monthly clients business-wide)

- With PT: −$50/month. One standalone service: −$25. Two standalones: −$50.
- Protected for 6 consecutive billing months; normal 12-week initial term.
- Ends on cancellation, uncured payment default, or moving off monthly.
- Not transferable, not combinable, no discount on gym membership, groceries,
  travel, taxes, or one-time extras.
- Displayed only while `NEXT_PUBLIC_FOUNDING_SPOTS_REMAINING` > 0 (real count).

All 15 combinations are enumerated and asserted in
`src/lib/pricing-engine.test.ts`.

## Build Your Own (one-time, no auto-renewal)

Pick at most one item per category:

- **PT:** single $110 · 4-pack $400 · 8-pack $760 · 12-pack $1,080
- **Nutrition:** Strategy Session $149 · Four-Week Reset $249
- **Cooking (+groceries):** Kitchen Skills 90min $179 · Meal Prep Lab 2hr $249 · Three-Session Series $649

### Discount algorithm (exact)

1. 2 categories incl. PT → PT full price; other item ×0.90
2. 2 categories, no PT → both items ×0.90
3. All 3 categories → PT full price; nutrition + cooking ×0.85 each
4. Compute in cents, then round the final service total **up** to the next $5.
5. Groceries, travel, gym membership, tax, fees stay outside the calculation.

### Required test cases (all pass in `npm test`)

| # | Selection | Raw | Displayed |
| - | --- | --- | --- |
| 1 | Single PT session | $110.00 | $110 |
| 2 | 4-pack + Strategy | $534.10 | $535 |
| 3 | 4-pack + Reset | $624.10 | $625 |
| 4 | Reset + Meal Prep Lab | $448.20 | $450 |
| 5 | 4-pack + Reset + Lab | $823.30 | $825 |
| 6 | 8-pack + Strategy + Kitchen Skills | $1,038.80 | $1,040 |
| 7 | 12-pack + Cooking Series | $1,664.10 | $1,665 |
| 8 | Strategy + Kitchen Skills | $295.20 | $300 |

## Entry offers

- Free Start Strong Call: $0, 15 min, no workout, no obligation.
- Start Strong Assessment: $79, credited in full to the first monthly invoice
  if joining within 7 days; waived for founding clients.

## Extras, travel, outside costs

Subscriber extras: extra PT session $90 · extra nutrition call $59 ·
grocery-shopping lesson $99 · extra cooking lesson $199+groceries ·
added cooking adult $40 first / $25 each after (max 4 participants).

Cooking travel: ≤10 mi of The Gym Phoenix included · 10–20 mi +$25 ·
20–30 mi +$50 · beyond 30 mi custom quote.

Gym membership: separate, never priced on our site until the gym approves an
amount in writing. Groceries: at exact receipt cost, no markup. Tax/fees:
configurable, decided by the accountant before checkout is ever enabled.

## Updating prices

1. Edit `src/config/pricing.ts` only.
2. Update expected values in `src/lib/pricing-engine.test.ts` if amounts changed.
3. `npm test && npm run build`.
4. Do not change active founding rates during a client's protected period.
