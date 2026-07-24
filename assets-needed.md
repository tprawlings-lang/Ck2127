# Assets and Approvals Still Needed

Every item below blocks either final design or public launch. Placeholders in
the site are deliberately unmistakable (dashed borders labeled "PHOTO
PLACEHOLDER" or "[PLACEHOLDER: …]").

## Decisions awaiting sign-off

| Item | Owner | Notes |
| --- | --- | --- |
| **Brand name sign-off** | Travis + Connor | "CK2717 Fitness" recommended — see BRAND_IDENTITY.md and brand-board.html |
| Booking platform + URL | Connor | Set `NEXT_PUBLIC_BOOKING_URL`; buttons fall back to the contact form until then |
| Response-time promise | Connor | Contact page currently says "within one business day" — confirm or change |
| Pricing final approval | Connor + Travis | Values implemented exactly per handoff v1.0 |

## Contact and accounts

| Item | Owner | Launch gate |
| --- | --- | --- |
| Phone 602-803-3020 confirmation | Connor | `NEXT_PUBLIC_PHONE_CONFIRMED=true` |
| hello@ck2717.com mailbox active | Connor | `NEXT_PUBLIC_EMAIL_ACTIVE=true` |
| Email delivery provider + API key | Connor/Travis | `EMAIL_PROVIDER`, `RESEND_API_KEY`, `EMAIL_FROM`, `LEAD_NOTIFY_EMAIL` |
| Cloudflare Turnstile keys | Travis | Optional but recommended before launch |
| GA4 property / Search Console / Bing verification | Travis | See analytics.md |
| Social profiles | Connor | `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL` |

## Credentials (display gates)

| Item | Env var to flip when verified |
| --- | --- |
| NASM-CPT active + verification link | `NEXT_PUBLIC_NASM_CPT_STATUS=active` (+ verifyUrl in site.ts) |
| CPR/AED active | `NEXT_PUBLIC_CPR_AED_STATUS=active` |
| NASM Certified Nutrition Coach | `NEXT_PUBLIC_NASM_CNC_STATUS=active` — gates full Nutrition Coaching launch |
| Food-handler certificate | Required before cooking launch (legal-review.md) |

## The Gym Phoenix (all require written permission)

- Written permission for gym name in marketing, photos, and any listing use
- Trainer profile + backlink on the gym site
- Confirmed lower-traffic hours (only display after confirmation)
- Trainer rules and insurance requirements on file
- Approved membership price (until then the site links to the gym's official
  membership page and never states an amount)

## Photography (all need signed releases; no stock before/afters, no AI fakes)

- Hero: Connor inside The Gym Phoenix, smiling, professional training clothes
- Connor coaching a man ~45–60 (manageable strength exercise)
- Connor coaching a woman ~45–60 (calm instruction)
- Consultation photo (listening at a table/quiet area)
- Equipment instruction photo
- Cooking photo in a real home kitchen
- Meal-prep photo (ingredients, containers, grocery list)
- Gym exterior/entrance/parking (with written permission)
- Professional headshot + full-body portrait
- Export as WebP/AVIF with responsive sizes and alt text

## Logo production files

- The CK monogram is implemented in code (`src/components/Logo.tsx`).
- Still needed: exported SVG + PNG set in `public/brand/` (horizontal,
  stacked, monogram, favicon, white, dark) for social profiles and email —
  generate after brand sign-off.

## Content

- Final About copy approved by Connor (page carries a DRAFT marker)
- Connor's review of the 4 seed articles (bylines say "pending Connor's review")
- Remaining 12 planned articles from the editorial plan (section 10.1):
  Personal Training for Beginners in Phoenix · Strength Training After 50 ·
  How Many Days a Week Should a Beginner Strength Train? · How to Choose a
  Personal Trainer in Phoenix · Training at The Gym Phoenix: What New Clients
  Should Know · How to Eat More Protein Without Complicated Recipes · What to
  Eat When You Are Too Busy to Cook · How to Build a Grocery List You Will
  Actually Use · Five Basic Cooking Skills · How to Store and Reheat Meal-Prep
  Food Safely · Personal Training for Couples in Phoenix · Staying Active
  During Extreme Phoenix Heat
- Downloadables: First Session Checklist, Sample Grocery Framework, Kitchen
  Readiness Checklist, Sunday Meal-Prep Worksheet, Questions to Ask a
  Personal Trainer

## Legal / business (details in legal-review.md)

- Attorney-approved agreements, waivers, disclaimers, SMS/privacy language
- Insurance policies (general + professional liability, in-home cooking)
- Arizona tax setup (accountant) — required before any checkout is enabled
- Maricopa County written guidance on the in-home cooking instruction model
- Business entity + Arizona registrations
