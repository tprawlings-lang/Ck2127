import Link from 'next/link';

export function ServiceCard({
  title,
  description,
  href,
  linkLabel = 'Learn more',
}: {
  title: string;
  description: string;
  href: string;
  linkLabel?: string;
}) {
  return (
    <div className="card flex flex-col">
      <h3 className="text-xl">{title}</h3>
      <p className="mt-3 flex-1">{description}</p>
      <Link href={href} className="mt-4 font-heading font-semibold text-terracotta" data-analytics="service_selected">
        {linkLabel} →
      </Link>
    </div>
  );
}
