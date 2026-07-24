import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for the CK2717 Fitness website.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms of Use"
      intro="These terms govern use of this website. Service agreements for coaching are separate signed documents provided before paid service begins."
      sections={[
        {
          heading: 'Informational content',
          body: 'Website content is general education, not medical, legal, or financial advice. Individual results vary. No outcome is guaranteed.',
        },
        {
          heading: 'Pricing and availability',
          body: 'Displayed prices are current service prices and may change for new clients. A submitted form or calculator selection is a conversation request — it is not enrollment, a reservation, or a charge.',
        },
        {
          heading: 'Intellectual property',
          body: 'Site content, branding, and downloadable resources belong to CK2717 Fitness and may not be republished without permission.',
        },
        {
          heading: 'Independent business',
          body: 'CK2717 Fitness operates independently from The Gym Phoenix. Gym membership is purchased separately from coaching fees.',
        },
      ]}
    />
  );
}
