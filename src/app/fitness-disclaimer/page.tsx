import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Health and Fitness Disclaimer',
  description: 'Health and fitness disclaimer for CK2717 Fitness services and content.',
  alternates: { canonical: '/fitness-disclaimer' },
};

export default function FitnessDisclaimerPage() {
  return (
    <LegalPageShell
      title="Health and Fitness Disclaimer"
      intro="Personal training is general fitness coaching for adults, not medical care."
      sections={[
        {
          heading: 'Not medical advice',
          body: 'Nothing on this site — and nothing in a coaching session — is physical therapy, injury diagnosis, medical rehabilitation, or treatment. Consult your physician before beginning any new exercise program, especially with a known condition or injury.',
        },
        {
          heading: 'Readiness screening',
          body: 'Every training client completes a readiness questionnaire before starting. When screening or Connor’s professional scope requires it, medical clearance from your physician is requested before training begins or resumes.',
        },
        {
          heading: 'No guaranteed outcomes',
          body: 'No specific weight loss, pain relief, strength, or health outcome is promised. Individual results vary with consistency, health status, and many factors outside coaching.',
        },
      ]}
    />
  );
}
