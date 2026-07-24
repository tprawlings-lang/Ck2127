import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/config/site';
import { CredentialList } from '@/components/CredentialCard';
import { SitePhoto } from '@/components/SitePhoto';

export const metadata: Metadata = {
  title: { absolute: `About Connor Kearns | Phoenix Personal Trainer` },
  description:
    'Meet Connor Kearns: a patient Phoenix personal trainer helping adults 40+ restart fitness, build practical strength, and improve food habits without judgment.',
  alternates: { canonical: '/about' },
};

/**
 * NOTE: Final About copy must be approved by Connor before launch
 * (tracked in assets-needed.md). All facts below come from the approved
 * factual inventory in the build specification.
 */
export default function AboutPage() {
  return (
    <>
      <section className="bg-soft-white">
        <div className="container-site grid items-start gap-10 py-14 md:grid-cols-[1fr_1.6fr]">
          <SitePhoto slot="aboutPortrait" className="aspect-[3/4]" sizes="(max-width: 768px) 100vw, 35vw" priority />
          <div>
            <h1 className="text-3xl md:text-4xl">I work with people who are starting over — or starting for the first time.</h1>
            <p className="mt-5">
              If walking into a gym feels intimidating, if diets have never stuck, or if it has simply been years
              since exercise felt normal — you are exactly who I built this coaching for. My job is not to push you
              through someone else&apos;s workout. It is to meet you at your current level and build from there.
            </p>
            <p className="mt-4 text-sm text-muted">
              [DRAFT — final About copy pending Connor&apos;s approval before launch]
            </p>
          </div>
        </div>
      </section>

      <section className="container-site py-14">
        <div className="max-w-3xl space-y-6">
          <div>
            <h2 className="text-2xl">Why coaching, and why adults 40+</h2>
            <p className="mt-3">
              Connor spent years in restaurants, hospitality, beverage programs, and consulting — including BarStarts
              and BarSmarts education — working with food, systems, and people in real-world settings. That
              background is why his coaching extends past the gym floor into practical kitchen instruction, meal
              preparation systems, and recipe execution that fits a normal week.
            </p>
            <p className="mt-3">
              He also worked as an emergency dispatcher — experience that shaped a calm, organized, and attentive
              communication style. (That is a communication skill, not medical experience, and Connor never presents
              it as medical authority.)
            </p>
            <p className="mt-3">
              He earned a Bachelor of Science in Organizational Management from Purdue Global in 2021, and launches
              as a verified NASM Certified Personal Trainer with active CPR and AED credentials.
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Credentials</h2>
            <div className="mt-4">
              <CredentialList />
            </div>
          </div>

          <div>
            <h2 className="text-2xl">How Connor coaches</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Training:</strong> progressive strength work that begins at your current ability — no
                punishment workouts, no shame, no bodybuilding culture.
              </li>
              <li>
                <strong>Nutrition:</strong> general education and habit coaching built from what you already eat.
                Medical nutrition needs are referred to qualified professionals.
              </li>
              <li>
                <strong>Cooking:</strong> hands-on instruction in your own kitchen, so the skills stay with you. It
                is teaching, never meal delivery.
              </li>
              <li>
                <strong>Values:</strong> patience, honesty about what a busy week allows, and plans measured in
                months of steady progress rather than dramatic promises.
              </li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-xl">What you can expect from me</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>I will meet you at the door on your first visit and stay with you the whole session.</li>
              <li>I will never shame you, rush you, or compare you to anyone else.</li>
              <li>You will always know what to do next — in the gym, at the store, and in your kitchen.</li>
              <li>You will always see the full price before you commit, including the separate gym membership.</li>
              <li>If your needs are outside my role, I will say so and refer you to the right professional.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-terracotta/10 py-14 text-center">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl">Talk with Connor before you decide anything.</h2>
          <p className="mx-auto mt-3 max-w-xl">
            The {site.consultationName} is free, 15 minutes, and has no workout and no obligation.
          </p>
          <Link href="/contact" className="btn-primary mt-6" data-analytics="hero_cta_click">
            Talk With Connor Before You Decide
          </Link>
        </div>
      </section>
    </>
  );
}
