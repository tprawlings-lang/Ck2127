/**
 * Deliberately unmistakable placeholder for photography that does not exist
 * yet. Every instance is tracked in assets-needed.md. Do not ship to public
 * launch with these visible.
 */
export function ImagePlaceholder({ label, className = 'aspect-[4/3]' }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`flex w-full items-center justify-center rounded-xl border-2 border-dashed border-sage bg-sage/10 p-6 text-center ${className}`}
    >
      <span className="text-sm font-semibold uppercase tracking-wide text-sage">
        PHOTO PLACEHOLDER
        <br />
        <span className="normal-case tracking-normal text-muted">{label}</span>
      </span>
    </div>
  );
}
