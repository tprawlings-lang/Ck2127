import Image from 'next/image';
import { siteImages, type SiteImageSlot } from '@/config/images';

/**
 * Renders a photo slot from the central image config. The aspect frame with
 * object-cover means a higher-resolution replacement file simply looks
 * sharper — no layout change needed.
 */
export function SitePhoto({
  slot,
  className = 'aspect-[4/3]',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: {
  slot: SiteImageSlot;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const img = siteImages[slot];
  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-line bg-sand ${className}`}>
      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes={sizes} priority={priority} />
    </div>
  );
}
