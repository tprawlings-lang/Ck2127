import Link from 'next/link';

type Cta = { href: string; label: string; analytics?: string };

export function Hero({
  title,
  subhead,
  locationLine,
  reassurance,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  subhead: string;
  locationLine?: string;
  reassurance?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
}) {
  return (
    <section className="bg-soft-white">
      <div className="container-site py-14 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl">{title}</h1>
          <p className="mt-5 text-lg md:text-xl">{subhead}</p>
          {locationLine && <p className="mt-4 font-semibold text-sage">{locationLine}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta && (
                <Link href={primaryCta.href} className="btn-primary" data-analytics={primaryCta.analytics ?? 'hero_cta_click'}>
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-secondary" data-analytics={secondaryCta.analytics}>
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
          {reassurance && <p className="mt-5 text-sm text-muted">{reassurance}</p>}
        </div>
      </div>
    </section>
  );
}
