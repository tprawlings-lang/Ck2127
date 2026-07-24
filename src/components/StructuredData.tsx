import { site } from '@/config/site';

/**
 * Approved structured data only: Organization, Person, Service.
 * Deliberately excluded per the build spec:
 * - LocalBusiness/ProfessionalService: only after address eligibility and gym
 *   approval are confirmed (legal-review.md).
 * - FAQPage: Google no longer shows FAQ rich results broadly.
 * - Review/AggregateRating: never self-serving or fake ratings.
 */
export function StructuredData() {
  const services = [
    { name: 'Personal Training', path: '/personal-training' },
    { name: 'Nutrition Coaching', path: '/nutrition-coaching' },
    { name: 'Healthy Cooking Coaching', path: '/healthy-cooking-coaching' },
  ];

  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.brandName,
      url: site.url,
      ...(site.phoneConfirmed ? { telephone: site.phoneE164 } : {}),
      ...(site.emailActive ? { email: site.email } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.ownerName,
      jobTitle: 'Personal Trainer',
      worksFor: { '@type': 'Organization', name: site.brandName, url: site.url },
      alumniOf: 'Purdue Global',
    },
    ...services.map((s) => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.name,
      provider: { '@type': 'Organization', name: site.brandName, url: site.url },
      areaServed: 'Phoenix, Arizona',
      url: `${site.url}${s.path}`,
    })),
  ];

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
