import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/config/site';
import { LocationBlock } from '@/components/LocationBlock';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';

export const metadata: Metadata = {
  title: { absolute: `Personal Trainer at The Gym Phoenix | ${site.brandName}` },
  description:
    'Meet Connor for one-on-one personal training at The Gym Phoenix, 3901 E. Thunderbird Road, Phoenix 85032. Directions, parking, what to bring, and how your first visit works.',
  alternates: { canonical: '/training-location' },
};

export default function TrainingLocationPage() {
  return (
    <>
      <section className="bg-soft-white">
        <div className="container-site py-14">
          <h1 className="text-3xl md:text-4xl">Personal Training at The Gym Phoenix</h1>
          <p className="mt-4 max-w-2xl">
            {site.gym.facilityStatement} The address is {site.gym.address}, near {site.gym.crossStreets}.
          </p>
        </div>
      </section>

      <section className="container-site grid gap-8 py-14 md:grid-cols-2">
        <LocationBlock showMap />
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl">Your first visit, step by step</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Park in the lot at the suite address above.</li>
              <li>Connor meets you at the entrance — you never have to walk in alone.</li>
              <li>He guides the entire visit: check-in, warm-up, every exercise, and the wrap-up.</li>
              <li>You leave with a clear next step and your next appointment time.</li>
            </ol>
            <p className="mt-3 text-sm text-muted">
              [PLACEHOLDER: entrance photo, parking notes, and arrival details pending gym permission — tracked in
              assets-needed.md]
            </p>
          </div>
          <div className="card">
            <h2 className="text-xl">What to bring</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Comfortable clothes you can move in — nothing special required.</li>
              <li>Closed-toe athletic shoes.</li>
              <li>A water bottle.</li>
              <li>Any questions you have. Asking is encouraged.</li>
            </ul>
          </div>
          <ImagePlaceholder label="Gym exterior and entrance (pending written gym permission)" />
        </div>
      </section>

      <section className="bg-terracotta/10 py-14 text-center">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl">Want Connor to walk you through it first?</h2>
          <Link href="/contact" className="btn-primary mt-6" data-analytics="hero_cta_click">
            {site.cta.primary}
          </Link>
        </div>
      </section>
    </>
  );
}
