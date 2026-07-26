import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Nutrition Coaching Disclaimer',
  description: 'Scope and limits of nutrition coaching at CK2717 Fitness.',
  alternates: { canonical: '/nutrition-disclaimer' },
};

export default function NutritionDisclaimerPage() {
  return (
    <LegalPageShell
      title="Nutrition Coaching Disclaimer"
      intro="Nutrition Coaching is general wellness education and behavior coaching for healthy adults."
      sections={[
        {
          heading: 'What it is not',
          body: 'Nutrition Coaching is not medical nutrition therapy, disease treatment, or a prescribed medical diet. Connor Kearns is not a registered dietitian or licensed medical nutrition provider, and does not diagnose or treat disease, deficiency, eating disorders, or medical conditions.',
        },
        {
          heading: 'Referrals',
          body: 'Medical nutrition needs, eating disorders, pregnancy-specific concerns, and complex disease management are referred to registered dietitians, physicians, or other qualified professionals.',
        },
        {
          heading: 'Your responsibility',
          body: 'Always follow the guidance of your medical providers. Nutrition coaching supplements healthy habits. It never replaces medical care.',
        },
      ]}
    />
  );
}
