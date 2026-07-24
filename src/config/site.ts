/**
 * Single source of truth for business identity, contact details, and launch gates.
 * No page component may hard-code any of these values.
 *
 * BRAND NAME STATUS: "CK2717 Fitness" is the recommended brand identity built
 * around the ck2717.com domain. It is PENDING sign-off from Travis and Connor.
 * See BRAND_IDENTITY.md for the full proposal and alternatives. Changing the
 * name here updates the entire site.
 */

export const site = {
  /** Public brand name shown across the site. Pending sign-off. */
  brandName: 'CK2717 Fitness',
  /** The person behind the brand. Always keep Connor's name prominent. */
  ownerName: 'Connor Kearns',
  /** Long descriptor used in lockups and metadata. */
  descriptor: 'Personal Training + Nutrition + Healthy Cooking Coaching',
  /** Short descriptor for tight spaces. */
  shortDescriptor: 'Fitness + Nutrition + Cooking',
  /** Primary tagline. */
  tagline: 'Start where you are. Build strength that lasts.',
  /** Secondary tagline. */
  taglineSecondary: 'Simple training. Better habits. Lasting progress.',
  /** Main SEO headline (homepage H1). */
  seoHeadline: 'Personal Training for Adults 40+ in Phoenix',

  domain: 'ck2717.com',
  url: 'https://ck2717.com',

  /**
   * LAUNCH GATE: phone must be confirmed by Connor before display.
   * Set NEXT_PUBLIC_PHONE_CONFIRMED=true once confirmed.
   */
  phone: '602-803-3020',
  phoneE164: '+16028033020',
  phoneConfirmed: process.env.NEXT_PUBLIC_PHONE_CONFIRMED === 'true',

  /**
   * LAUNCH GATE: use only after the ck2717.com mailbox is active.
   * Do not publish a personal Gmail address once this works.
   */
  email: 'hello@ck2717.com',
  emailActive: process.env.NEXT_PUBLIC_EMAIL_ACTIVE === 'true',

  /** External booking URL, provider-agnostic. Empty string disables booking buttons. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? '',

  /** Primary CTA labels — approved wording. */
  cta: {
    primary: 'Talk With Connor',
    booking: 'Book Your Free Start Strong Call',
    secondaryHow: 'See How It Works',
    secondaryBuild: 'Build Your Plan',
    call: 'Call Connor',
    text: 'Text Connor',
    location: 'View the Training Location',
  },
  consultationName: 'Free Start Strong Call',
  assessmentName: 'Start Strong Assessment',
  foundingProgramName: 'Founding Client Rate',

  gym: {
    name: 'The Gym Phoenix',
    address: '3901 E. Thunderbird Road, Suites 101-103, Phoenix, Arizona 85032',
    shortAddress: '3901 E. Thunderbird Road, Suites 101-103, Phoenix, AZ 85032',
    crossStreets: '40th Street and Thunderbird Road',
    website: 'https://tgthegymphoenix.com/',
    membershipPage: 'https://tgthegymphoenix.com/faq',
    /**
     * LAUNCH GATE: never publish a membership dollar amount unless the gym
     * supplies a current approved price in writing. Keep null until then.
     */
    approvedMembershipPrice: null as string | null,
    /** Required wording — reuse everywhere the gym is mentioned. */
    independenceStatement:
      `CK2717 Fitness is an independent business and operates independently from The Gym Phoenix.`,
    membershipStatement:
      `Connor's coaching fees and gym membership are purchased separately. Both Connor and each in-person training client must maintain the membership required by the gym.`,
    facilityStatement:
      'In-person Personal Training takes place by appointment at The Gym Phoenix.',
  },

  serviceArea:
    'North Phoenix, 85032, 85028, Paradise Valley, Scottsdale, and the 85254 area',

  /** Required footer disclaimer — approved wording, adapted to the CK2717 brand name. */
  footerDisclaimer:
    'CK2717 Fitness is an independent business owned by Connor Kearns. In-person Personal Training is provided by appointment at The Gym Phoenix. Gym membership is purchased separately. Fitness and nutrition information is for general education and does not replace medical care, physical therapy, or medical nutrition therapy. Individual results vary.',

  /**
   * Credential display states. LAUNCH GATE: 'active' only after verification.
   * Allowed states: 'pending' | 'active' | 'expired' | 'hidden'
   */
  credentials: {
    nasmCpt: {
      name: 'NASM Certified Personal Trainer',
      issuer: 'National Academy of Sports Medicine',
      status: (process.env.NEXT_PUBLIC_NASM_CPT_STATUS ?? 'pending') as CredentialStatus,
      verifyUrl: '',
    },
    cprAed: {
      name: 'CPR / AED Certified',
      issuer: 'To be confirmed',
      status: (process.env.NEXT_PUBLIC_CPR_AED_STATUS ?? 'pending') as CredentialStatus,
      verifyUrl: '',
    },
    nasmCnc: {
      name: 'NASM Certified Nutrition Coach',
      issuer: 'National Academy of Sports Medicine',
      status: (process.env.NEXT_PUBLIC_NASM_CNC_STATUS ?? 'pending') as CredentialStatus,
      verifyUrl: '',
    },
    degree: {
      name: 'B.S. in Organizational Management (2021)',
      issuer: 'Purdue Global',
      status: 'active' as CredentialStatus,
      verifyUrl: '',
    },
  },

  /**
   * Founding-client remaining count. Real admin-controlled value only —
   * never fake scarcity. 0 hides all founding pricing.
   */
  foundingSpotsRemaining: Number(process.env.NEXT_PUBLIC_FOUNDING_SPOTS_REMAINING ?? '6'),

  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? '',
  },
} as const;

export type CredentialStatus = 'pending' | 'active' | 'expired' | 'hidden';

export function isFoundingAvailable(): boolean {
  return site.foundingSpotsRemaining > 0;
}
