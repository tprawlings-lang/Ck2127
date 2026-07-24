# Photo Kit — Shot Map and Integration Plan

A 21-shot photo kit was provided (July 24, 2026) to build the site's visual
identity. The contact sheet and sliced reference tiles live in
`reference/photo-kit/` (repo reference only — NOT served on the site).

## Status: LIVE as launch-vehicle images (July 24, 2026)

Per Travis's direction, caption-cropped versions of shots 1, 2, 3, 8, 12, 13,
and 14 are live on the site (`public/images/`, mapped in
`src/config/images.ts`). These were cut from the 1536×1024 contact sheet, so
each is only ~300px wide — soft at large sizes but serviceable for launch.

**Upgrade path:** drop the full-resolution, caption-free file over the same
filename in `public/images/` — no code changes needed. Still request from
the kit source: individual files at original resolution (ideally ≥2000px
long edge), no caption overlays, keeping the kit numbering.

## Shot → site placement map

| # | Shot | Placement | Notes |
| - | --- | --- | --- |
| 1 | Website hero | Homepage hero background/side image | Highest priority |
| 2 | Professional headshot | About page opening portrait | |
| 3 | Smiling headshot | Homepage "Meet Connor" + social/OG image | Highest priority |
| 4 | Full body portrait | About page | |
| 5 | Side profile | Layout variety / article headers | |
| 6 | Coaching a client (male) | Personal Training page | See caveat A |
| 7 | Coaching a client (female) | Personal Training page | See caveat A |
| 8 | Exercise demonstration | Personal Training page | |
| 9 | Program planning | Personal Training / About | |
| 10 | Consultation | Contact page + homepage "How it works" | See caveat A |
| 11 | Nutrition coaching | Nutrition Coaching page | See caveat A |
| 12 | Grocery shopping | Nutrition page / grocery lesson extra | |
| 13 | Meal prep setup | Homepage nutrition section + meal-prep article | Highest priority |
| 14 | Cooking instruction | Healthy Cooking page | See caveat A |
| 15 | Finished healthy meal | Cooking page / articles | |
| 16 | Gym equipment | — hold | See caveat B |
| 17 | Weight training scene | — hold | See caveat B |
| 18 | Active lifestyle (hiking) | About page / Phoenix-heat article | |
| 19 | Hydration & recovery | Articles | |
| 20 | Phoenix sunset | Resources/local content accents | |
| 21 | Brand logo graphic | **Not used** | Shows "Connor Kearns Fitness" CK mark — superseded by the approved CK2717 Fitness brand (BRAND_IDENTITY.md) |

## Caveats to resolve before launch (not blockers for staging)

**A. "Client" imagery.** The handoff's hard rules require authentic
photography: every recognizable client/model needs a signed release, and fake
client imagery is prohibited. If shots 6, 7, 10, 11, 14 are AI-generated or
use models, they must not be presented as real clients. Safe uses until real
client photography exists: Connor-only shots (1–5, 8, 9, 12, 13, 15, 18–20)
everywhere, and treat client-interaction shots as clearly illustrative or
replace them at the planned photo session with released clients.

**B. Gym interiors.** Shots 1, 6–8, 16, 17 show a gym. The spec prohibits
implying The Gym Phoenix's facilities without written permission. If these
interiors are not actually The Gym Phoenix, do not use them on the
training-location page or anywhere the copy names the gym. Generic
training-context use (hero, service pages) is lower risk but should be part
of the gym-permission conversation (legal-review.md).

## Delivery specs for the full-res files

- JPEG/PNG at original resolution (ideally ≥2000px long edge), no captions
- Naming: keep the kit numbers (e.g. `01-hero.jpg`)
- The site converts to WebP/AVIF with responsive sizes automatically via
  `next/image` — no pre-processing needed
