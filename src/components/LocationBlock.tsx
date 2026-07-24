import Link from 'next/link';
import { site } from '@/config/site';

/** Map, address, gym links, and the required independence + membership notices. */
export function LocationBlock({ showMap = true }: { showMap?: boolean }) {
  return (
    <div className="card">
      <h3 className="text-xl">Training location</h3>
      <p className="mt-2">
        {site.gym.facilityStatement} {site.gym.name} is at {site.gym.shortAddress}, near {site.gym.crossStreets}.
      </p>
      {showMap && (
        <div className="mt-4 overflow-hidden rounded-lg border border-line">
          <iframe
            title={`Map of ${site.gym.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.gym.address)}&output=embed`}
            className="h-64 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
      <div className="mt-4 rounded-lg border border-line bg-sand p-4 text-sm">
        <p>{site.gym.independenceStatement}</p>
        <p className="mt-2">{site.gym.membershipStatement}</p>
        {site.gym.approvedMembershipPrice === null && (
          <p className="mt-2 text-muted">
            Current membership pricing is set by the gym — please check the gym&apos;s official membership page for
            current rates.
          </p>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
        <a href={site.gym.website} target="_blank" rel="noopener noreferrer" className="text-terracotta" data-analytics="gym_site_click">
          Official gym website
        </a>
        <a href={site.gym.membershipPage} target="_blank" rel="noopener noreferrer" className="text-terracotta" data-analytics="gym_membership_click">
          Gym membership information
        </a>
        <Link href="/training-location" className="text-terracotta">
          {site.cta.location}
        </Link>
      </div>
    </div>
  );
}
