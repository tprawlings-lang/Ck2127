import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Healthy Cooking and Kitchen Safety Terms',
  description: 'Kitchen safety, allergy, and grocery terms for Healthy Cooking Coaching.',
  alternates: { canonical: '/cooking-safety' },
};

export default function CookingSafetyPage() {
  return (
    <LegalPageShell
      title="Healthy Cooking and Kitchen Safety Terms"
      intro="Healthy Cooking Coaching is hands-on instruction in the client's kitchen — the client participates in the cooking process. It is not meal delivery, catering, or prepared-food sales."
      sections={[
        {
          heading: 'Groceries',
          body: 'The client purchases groceries, or reimburses Connor at exact receipt cost. There is no ingredient markup.',
        },
        {
          heading: 'Allergies',
          body: 'Every cooking client completes an allergy and food-safety acknowledgment before the first session and updates it when information changes. An allergen-free environment cannot be guaranteed in a home kitchen.',
        },
        {
          heading: 'Kitchen readiness',
          body: 'Clients receive a kitchen readiness checklist before an in-home session covering workspace, basic equipment, and safety items.',
        },
        {
          heading: 'Cancellations',
          body: 'Cooking sessions require 48 hours notice to reschedule. If groceries were already purchased for the session, the grocery cost remains due.',
        },
        {
          heading: 'Food safety practices',
          body: 'Sessions follow safe time, temperature, storage, reheating, cross-contamination, and sanitation practices, and include food-safety basics as part of the instruction.',
        },
      ]}
    />
  );
}
