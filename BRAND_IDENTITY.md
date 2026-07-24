# CK2717 Brand Identity — Proposal for Sign-Off

**Status: AWAITING SIGN-OFF from Travis Rawlings and Connor Kearns.**
The site is built against the recommended option below; changing the approved
name is a one-line edit in `src/config/site.ts` (`brandName`).

## Context

The original handoff specified the business name **Connor Kearns Fitness** with
preferred domain connorkearnsfitness.com. The chosen domain is now
**ck2717.com**, so the brand identity has been rebuilt around it. Connor's name
stays visually prominent everywhere (a handoff hard rule), and everything else
approved in the handoff — taglines, CTAs, colors, typography, voice — is kept.

## Recommended: Option A — "CK2717 Fitness"

- **Public business name:** CK2717 Fitness
- **Descriptor lockup:** CK2717 · Connor Kearns · Fitness + Nutrition + Cooking
- **Why:** matches the domain exactly (one consistent name across Google,
  directories, insurance, social, and invoices — a handoff requirement), stays
  short and memorable, and keeps "CK" as Connor Kearns' initials so the
  personal connection survives. "2717" reads as a distinctive plate-number-style
  mark that ages well.
- **Email:** hello@ck2717.com
- **Logo direction (implemented):** original CK monogram in two geometric
  strokes — an open "C" frame in Deep Slate with a "K" stroke in Terracotta
  that rises like a step/forward path. No dumbbells, flexed arms, heartbeat
  lines, shields, or flames. Horizontal, stacked, monogram, favicon, white,
  and dark variants derive from the same mark (`src/components/Logo.tsx`,
  `public/brand/`).

## Alternatives considered

- **Option B — "Connor Kearns Fitness" at ck2717.com:** keeps the original
  handoff name; the domain becomes a short alias. Downside: name and domain
  never match, which weakens local-citation consistency (the handoff requires
  the same business name + website everywhere).
- **Option C — "CK2717 · Kearns Strength & Kitchen":** more descriptive but
  longer, and pushes "cooking" branding ahead of the training-first positioning.

## Unchanged brand system (from the approved handoff)

| Element | Value |
| --- | --- |
| Primary tagline | Start where you are. Build strength that lasts. |
| Secondary tagline | Simple training. Better habits. Lasting progress. |
| Main SEO headline | Personal Training for Adults 40+ in Phoenix |
| Primary CTA | Talk With Connor |
| Consultation | Free Start Strong Call |
| Assessment | Start Strong Assessment |
| Founding program | Founding Client Rate |

### Colors

| Color | Hex | Use |
| --- | --- | --- |
| Deep Slate | #233036 | Headings, footer, dark backgrounds, logo |
| Warm Sand | #F4EFE7 | Page background, calm panels |
| Desert Sage | #74877E | Secondary headings, icons, borders |
| Terracotta | #C66F4E | Primary buttons, selected states (action color only — never full-page) |
| Soft White | #FCFBF8 | Cards and clean content areas |
| Body Text | #31383C | Paragraph text |
| Muted Text | #687277 | Secondary information |
| Border | #D8D5CF | Inputs, cards, tables, dividers |
| Success | #557660 | Confirmations and completed steps |

### Typography

- **Headings:** Manrope (strong, clean; no oversized aggressive headings)
- **Body:** Source Sans 3 — minimum 17px desktop / 16px mobile
- **Pricing:** Manrope with tabular numerals
- **Fallback:** system sans-serif stack

## What sign-off covers

1. The public business name (Option A recommended).
2. The CK2717 monogram direction (see `brand-board.html` for the visual board).
3. The email address hello@ck2717.com.

Once signed off, update: `src/config/site.ts` if the name changes, Google/
directory listings, insurance, and invoices to the identical name.
