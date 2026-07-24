import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How CK2717 Fitness collects, uses, and protects your information.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      intro="This policy explains what information the site collects, why, and how it is handled."
      sections={[
        {
          heading: 'What we collect',
          body: 'The consultation form collects your name, contact details, general goals, and optional scheduling preferences. The public website never asks for medical records, diagnoses, medication lists, or detailed injury history. Basic analytics data (pages visited, device type) may be collected to improve the site.',
        },
        {
          heading: 'How we use it',
          body: 'Lead information is used only to respond to your inquiry and coordinate services you request. We do not sell or rent personal information.',
        },
        {
          heading: 'Retention and deletion',
          body: 'Lead data is retained only as long as needed to serve you, and deleted on request. Email hello@ck2717.com (once active) or use the contact form to request deletion.',
        },
        {
          heading: 'Third parties',
          body: 'The site uses a small number of service providers (email delivery, spam protection, analytics, and an external booking platform). Each receives only the data required for its function.',
        },
      ]}
    />
  );
}
