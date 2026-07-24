import { site } from '@/config/site';

/**
 * CK2717 monogram: two geometric strokes forming rising steps — a path of
 * steady forward movement. Original mark; no dumbbells, flames, or shields.
 * PENDING brand sign-off — see BRAND_IDENTITY.md.
 */
export function LogoMark({
  className = 'h-9 w-9',
  color = '#233036',
  accent = '#C66F4E',
}: {
  className?: string;
  color?: string;
  accent?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      {/* C stroke: an open path that steps upward */}
      <path
        d="M34 12 H18 a2 2 0 0 0 -2 2 v20 a2 2 0 0 0 2 2 h16"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* K stroke: rising step suggesting forward movement */}
      <path
        d="M26 24 L37 13 M26 24 L37 35"
        fill="none"
        stroke={accent}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Horizontal lockup: mark left, CONNOR KEARNS over the descriptor right. */
export function LogoHorizontal({ dark = false }: { dark?: boolean }) {
  const nameColor = dark ? 'text-soft-white' : 'text-slate-deep';
  return (
    <span className="flex items-center gap-3">
      <LogoMark color={dark ? '#FCFBF8' : '#233036'} />
      <span className="flex flex-col leading-tight">
        <span className={`font-heading text-lg font-extrabold tracking-wide ${nameColor}`}>
          CK<span className="text-terracotta">2717</span>
        </span>
        <span className={`text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-sand' : 'text-sage'}`}>
          {site.ownerName} · Fitness + Nutrition + Cooking
        </span>
      </span>
    </span>
  );
}
