import Link from 'next/link';
import { site } from '@/config/site';
import { LogoHorizontal } from './Logo';

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/fitness-disclaimer', label: 'Fitness Disclaimer' },
  { href: '/nutrition-disclaimer', label: 'Nutrition Disclaimer' },
  { href: '/cooking-safety', label: 'Cooking & Kitchen Safety' },
  { href: '/sms-terms', label: 'SMS Terms' },
  { href: '/accessibility', label: 'Accessibility' },
];

export function Footer() {
  return (
    <footer className="bg-slate-deep text-sand">
      <div className="container-site grid gap-10 py-12 md:grid-cols-3">
        <div>
          <LogoHorizontal dark />
          <p className="mt-4 text-sm text-sand/90">{site.tagline}</p>
        </div>

        <div>
          <h2 className="font-heading text-base font-bold text-soft-white">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {site.phoneConfirmed && (
              <li>
                <a href={`tel:${site.phoneE164}`} className="text-sand hover:text-white" data-analytics="phone_click">
                  {site.phone}
                </a>
              </li>
            )}
            {site.emailActive && (
              <li>
                <a href={`mailto:${site.email}`} className="text-sand hover:text-white">
                  {site.email}
                </a>
              </li>
            )}
            <li>
              <Link href="/contact" className="text-sand hover:text-white">
                {site.cta.primary}
              </Link>
            </li>
            <li className="pt-2 text-sand/80">
              Training location: {site.gym.name}
              <br />
              {site.gym.shortAddress}
            </li>
            <li className="text-sand/80">Serving {site.serviceArea}.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-base font-bold text-soft-white">Legal</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sand hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-sand/20">
        <div className="container-site py-6 text-xs leading-relaxed text-sand/80">
          <p>{site.footerDisclaimer}</p>
          <p className="mt-3">
            © {new Date().getFullYear()} {site.brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
