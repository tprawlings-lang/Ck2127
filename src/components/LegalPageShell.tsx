import { site } from '@/config/site';

/**
 * Shared shell for legal pages. Every legal page ships as a clearly-marked
 * placeholder until Arizona counsel approves final language (legal-review.md).
 */
export function LegalPageShell({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <section className="container-site py-14">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl">{title}</h1>
        <p className="mt-4 rounded-lg border-2 border-dashed border-terracotta bg-terracotta/5 p-4 text-sm font-semibold text-terracotta-dark">
          PLACEHOLDER — DRAFT FOR ATTORNEY REVIEW. This page outlines intended policy in plain language. Final legal
          wording must be approved by qualified Arizona counsel before public launch (see legal-review.md).
        </p>
        <p className="mt-6">{intro}</p>
        {sections.map((s) => (
          <div key={s.heading} className="mt-8">
            <h2 className="text-xl">{s.heading}</h2>
            <p className="mt-3 whitespace-pre-line">{s.body}</p>
          </div>
        ))}
        <p className="mt-10 text-sm text-muted">
          Questions about these policies? Contact {site.brandName}
          {site.emailActive ? ` at ${site.email}` : ' through the contact page'}.
        </p>
      </div>
    </section>
  );
}
