import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Accessibility commitment for the CK2717 Fitness website.',
  alternates: { canonical: '/accessibility' },
};

export default function AccessibilityPage() {
  return (
    <LegalPageShell
      title="Accessibility Statement"
      intro="This site is designed for adults who may have reduced vision or limited comfort with technology, and aims to meet WCAG 2.1 AA."
      sections={[
        {
          heading: 'What we build for',
          body: 'Readable text sizes (at least 16px on mobile, 17px on desktop), WCAG AA color contrast, full keyboard navigation with visible focus, a skip-to-content link, semantic landmarks, descriptive labels and error messages, large tap targets, reduced-motion support, and no autoplay media or intrusive popups.',
        },
        {
          heading: 'Known limitations',
          body: 'The embedded map is provided by a third party and may have its own accessibility limitations; the address and directions are always available as text.',
        },
        {
          heading: 'Feedback',
          body: 'If any part of this site is difficult to use, please tell us through the contact page — accessibility reports are prioritized and fixed.',
        },
      ]}
    />
  );
}
