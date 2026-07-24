import { pricing } from '@/config/pricing';

export type NoticeKind = 'gymMembership' | 'groceries' | 'travel' | 'term' | 'resultsVary';

/** Reusable required notices so the same approved wording appears everywhere. */
export function LegalNotice({ kinds }: { kinds: NoticeKind[] }) {
  return (
    <div className="rounded-lg border border-line bg-sand p-4 text-sm text-body">
      <ul className="space-y-2">
        {kinds.map((k) => (
          <li key={k}>{pricing.notices[k]}</li>
        ))}
      </ul>
    </div>
  );
}
