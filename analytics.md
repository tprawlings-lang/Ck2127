# Analytics and Measurement

## Setup

GA4 (or a privacy-conscious alternative) + Google Search Console. Set
`NEXT_PUBLIC_GA_MEASUREMENT_ID` and add the loader snippet once the property
exists; keep total third-party scripts minimal. Interactive elements already
carry `data-analytics` attributes for event wiring.

## Required events (attribute → trigger)

| Event | Trigger |
| --- | --- |
| hero_cta_click | Primary hero CTA |
| nav_cta_click | Header/mobile menu CTA |
| phone_click | Any tel: link |
| text_click | Any sms: link |
| booking_click | Any Start Strong booking link |
| pricing_mode_selected | Monthly / Build Your Own tab |
| monthly_plan_started / _completed | Monthly builder start / total reached |
| build_your_own_started / _completed | One-time selections start / total reached |
| service_selected | PT, Nutrition, or Cooking selected |
| contact_form_started / _submitted | First interaction / successful submit |
| gym_site_click / gym_membership_click | Official gym links |
| resource_cta_click | Article CTA |
| download_click | Checklist or worksheet (when downloads ship) |

## Required dimensions

Page path/type · pricing mode · selected service categories · selected PT
plan/pack · displayed service total **range** (never exact client data) ·
founding rate shown or not · lead source/campaign · device type.

## Monthly report

Qualified leads · booked calls · call-to-client conversion · lead source ·
service interest · audience response (optional age range) · monthly vs
one-time interest · revenue by service · retention past 12 weeks · review
growth / local visibility.

## 90-day decision rules

- Don't narrow to one gender before 90 days of qualified-lead data.
- Don't remove Build Your Own on preference alone — compare conversion AND retention.
- Review pricing at 70–80% of preferred capacity or a sustained waitlist;
  raise standard prices before overfilling, never active founding rates.
- Use search queries and call notes to pick the next article/partner page.

## Privacy notes

No sensitive client data in analytics. No exact lead totals as event values —
use ranges. Honor consent settings before loading analytics scripts.
