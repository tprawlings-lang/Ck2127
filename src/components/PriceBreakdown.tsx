import { formatCents } from '@/lib/money';
import { LegalNotice, type NoticeKind } from './LegalNotice';

export function PriceBreakdown({
  lineItems,
  discountCents,
  totalCents,
  totalLabel,
  noticeKinds,
  extraNotes,
}: {
  lineItems: { label: string; cents: number }[];
  discountCents?: number;
  totalCents: number;
  totalLabel: string;
  noticeKinds: NoticeKind[];
  extraNotes?: string[];
}) {
  return (
    <div className="card">
      <ul className="divide-y divide-line">
        {lineItems.map((item) => (
          <li key={item.label} className="flex items-baseline justify-between gap-4 py-2.5">
            <span>{item.label}</span>
            <span className="price-number font-semibold">{formatCents(item.cents)}</span>
          </li>
        ))}
        {discountCents !== undefined && discountCents > 0 && (
          <li className="flex items-baseline justify-between gap-4 py-2.5 text-success">
            <span>Bundle savings</span>
            <span className="price-number font-semibold">−{formatCents(discountCents)}</span>
          </li>
        )}
      </ul>
      <div className="mt-3 flex items-baseline justify-between gap-4 border-t-2 border-slate-deep pt-3">
        <span className="font-heading text-lg font-bold text-slate-deep">{totalLabel}</span>
        <span className="price-number font-heading text-2xl font-extrabold text-slate-deep">
          {formatCents(totalCents)}
        </span>
      </div>
      {extraNotes && extraNotes.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-muted">
          {extraNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <LegalNotice kinds={noticeKinds} />
      </div>
    </div>
  );
}
