import { site, isFoundingAvailable } from '@/config/site';

/**
 * Shows remaining founding spots ONLY when the real admin-controlled count
 * is above zero. Never fake scarcity — the count comes from configuration.
 */
export function FoundingSpotBadge() {
  if (!isFoundingAvailable()) return null;
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-1.5 text-sm font-semibold text-success">
      {site.foundingProgramName}: {site.foundingSpotsRemaining} of 6 founding spots remaining
    </p>
  );
}
