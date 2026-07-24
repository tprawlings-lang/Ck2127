import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'SMS Consent Terms',
  description: 'Text messaging terms for CK2717 Fitness.',
  alternates: { canonical: '/sms-terms' },
};

export default function SmsTermsPage() {
  return (
    <LegalPageShell
      title="SMS Consent Terms"
      intro="Text messages are sent only with your consent, given through a separate unchecked checkbox on our forms or by texting us first."
      sections={[
        {
          heading: 'What you may receive',
          body: 'Replies to your inquiry, scheduling coordination, and appointment reminders. Marketing texts are sent only with separate, specific consent.',
        },
        {
          heading: 'Opting out',
          body: 'Reply STOP to any message to opt out at any time. Reply HELP for help. Message and data rates may apply. Message frequency varies.',
        },
        {
          heading: 'Privacy',
          body: 'Phone numbers collected for SMS are used only as described here and in the Privacy Policy, and are never sold.',
        },
      ]}
    />
  );
}
