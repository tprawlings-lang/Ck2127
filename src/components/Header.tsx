'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/config/site';
import { LogoHorizontal } from './Logo';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/personal-training', label: 'Personal Training' },
  { href: '/nutrition-coaching', label: 'Nutrition Coaching' },
  { href: '/healthy-cooking-coaching', label: 'Healthy Cooking' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About Connor' },
  { href: '/training-location', label: 'Training Location' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-soft-white/95 backdrop-blur">
      <div className="container-site flex items-center justify-between gap-4 py-3">
        <Link href="/" className="no-underline" aria-label={`${site.brandName} home`}>
          <LogoHorizontal />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:flex">
          {navItems.slice(1, 8).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={`rounded px-2.5 py-2 text-[0.95rem] font-semibold no-underline transition-colors ${
                pathname === item.href ? 'text-terracotta' : 'text-slate-deep hover:text-terracotta'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary ml-2 !min-h-10 !px-4 !py-2 text-sm" data-analytics="nav_cta_click">
            {site.cta.primary}
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-slate-deep xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="border-t border-line bg-soft-white xl:hidden">
          <ul className="container-site flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={`block rounded px-2 py-3 text-lg font-semibold no-underline ${
                    pathname === item.href ? 'text-terracotta' : 'text-slate-deep'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-full" data-analytics="nav_cta_click">
                {site.cta.primary}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
