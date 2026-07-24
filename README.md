# CK2717 — ck2717.com

Website for **CK2717 Fitness** (approved brand identity — see
`BRAND_IDENTITY.md`): Connor Kearns' personal training, nutrition coaching,
and healthy cooking coaching business for adults 40–65 in Phoenix.

Built from the "Connor Kearns Fitness — Website and Business Build
Specification" handoff (v1.0, July 23, 2026), adapted to the ck2717.com
domain.

## Stack

- Next.js 15 (App Router) + strict TypeScript
- Tailwind CSS (brand tokens in `tailwind.config.ts`)
- MDX resource articles (`src/content/articles/`)
- Server actions + Zod validation for the lead form (honeypot, rate limiting,
  optional Cloudflare Turnstile)
- Vitest for pricing-engine unit tests
- Deployed on Render (`render.yaml`)

## Local setup

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript strict check |
| `npm test` | Pricing-engine tests (all 15 monthly combos + 8 approved Build Your Own cases) |

## Architecture

```
src/
  config/site.ts        ← business identity, contact, launch gates (single source of truth)
  config/pricing.ts     ← every price, discount, policy (single source of truth)
  lib/pricing-engine.ts ← exact approved discount + round-up-to-$5 algorithm
  lib/money.ts          ← the one money formatter
  lib/lead.ts           ← lead form schema (Zod)
  lib/email.ts          ← provider-agnostic email (EMAIL_PROVIDER env)
  components/           ← Header, Footer, calculators, form, notices, etc.
  app/                  ← all routes per the spec (18 routes + articles)
  content/articles/     ← MDX resource articles + registry (articles.ts)
```

**No price is hard-coded in any page component.** Calculators, cards, contact
summaries, and notifications all read `src/config/pricing.ts`.

## Launch gates (do not skip)

All controlled via environment variables — see `.env.example`:

- `NEXT_PUBLIC_NASM_CPT_STATUS` etc. — credentials display as certified only
  when set to `active` after real verification.
- `NEXT_PUBLIC_PHONE_CONFIRMED` / `NEXT_PUBLIC_EMAIL_ACTIVE` — contact details
  render only once confirmed.
- `NEXT_PUBLIC_FOUNDING_SPOTS_REMAINING` — real admin-controlled count; `0`
  hides all founding pricing. Never fake scarcity.
- Gym membership price is intentionally never displayed
  (`site.gym.approvedMembershipPrice` stays `null` until written gym approval).

The full outstanding list is in `assets-needed.md`; legal review items are in
`legal-review.md`.

## Forms

The consultation form posts to a server action (`src/app/contact/actions.ts`):
server-side Zod validation, honeypot, per-IP rate limiting, optional Turnstile,
sanitized notification email to Connor plus a confirmation email to the
prospect, then redirect to `/thank-you`. No medical details are collected.

To test delivery locally: leave `EMAIL_PROVIDER=log` and watch the dev-server
console; submissions print both emails.

## Documentation

- `BRAND_IDENTITY.md` — approved brand identity (+ `brand-board.html`)
- `assets-needed.md` — every missing asset/approval
- `pricing.md` — pricing model in plain language + test cases
- `content-guide.md` — voice, prohibited claims, article standards
- `analytics.md` — events, dimensions, reporting
- `legal-review.md` — items requiring attorney/accountant/insurer/gym/county review
- `deployment.md` — Render + domain setup, env vars, rollback

## Deployment

See `deployment.md`. Short version: Render web service, `npm ci && npm run build`,
`npm run start`, custom domain ck2717.com with automatic SSL.
