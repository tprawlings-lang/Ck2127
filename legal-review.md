# Legal, Safety, and Risk Review Checklist

This build is a business/website plan, not legal or medical advice. Every item
below needs review by the named qualified professional before public launch.

## Attorney (Arizona)

- [ ] All 7 legal pages (each currently ships with a visible "DRAFT FOR
      ATTORNEY REVIEW" banner): /privacy, /terms, /fitness-disclaimer,
      /nutrition-disclaimer, /cooking-safety, /sms-terms, /accessibility
- [ ] Client service agreement, exercise informed-consent + liability waiver
- [ ] Nutrition scope acknowledgment; cooking instruction agreement; allergy
      and food-safety acknowledgment
- [ ] Recurring payment authorization + collection/cure language
- [ ] Cancellation/refund policy wording vs. Arizona law
- [ ] SMS consent flow (checkbox text + /sms-terms)
- [ ] Photo/testimonial release template
- [ ] Nutrition Coaching public scope if launched before the NASM CNC
      credential (site currently gates it behind the credential)

## Accountant (Arizona)

- [ ] Transaction privilege tax treatment per service
- [ ] Any retail-food activity implications of grocery reimbursement
- [ ] Tax/fee configuration before any checkout is ever enabled (v1 has none)

## Insurance

- [ ] General liability; professional liability (PT + nutrition)
- [ ] In-home cooking instruction, property damage, food-related claims
- [ ] Business-use auto for travel to client kitchens
- [ ] Cyber/data coverage decision for stored lead data

## The Gym Phoenix (written, on file)

- [ ] Permission for name use in marketing/photos/listings
- [ ] Trainer + client membership requirements confirmed
- [ ] Rules for outside trainers, filming, solicitation, waivers, insurance
- [ ] Approved membership price before any dollar amount appears
- [ ] Google Business Profile eligibility for the gym address (do NOT verify a
      profile at the gym address without both Google eligibility and gym approval)

## Maricopa County / food safety

- [ ] Food-handler certificate from an ANSI-accredited provider
- [ ] Written county guidance that the in-home instruction model is
      permit-exempt (keep on file)
- [ ] No meal sales/transport/delivery until separately permitted and insured

## Credential gates (site enforces via env vars)

- [ ] NASM-CPT verified → `NEXT_PUBLIC_NASM_CPT_STATUS=active`
- [ ] CPR/AED current → `NEXT_PUBLIC_CPR_AED_STATUS=active`
- [ ] NASM CNC verified → `NEXT_PUBLIC_NASM_CNC_STATUS=active`
- [ ] No medical titles or treatment claims anywhere (content-guide.md)

## Data practices

- [ ] Lead retention/deletion policy documented and followed
- [ ] Lead form never collects medical records/diagnoses/medications (enforced
      by the form design — keep it that way)
