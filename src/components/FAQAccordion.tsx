export type Faq = { question: string; answer: string };

/**
 * Accessible, always-visible FAQ using native disclosure elements.
 * Note: intentionally NO FAQPage structured data — Google no longer shows
 * FAQ rich results broadly (see handoff section 8.6).
 */
export function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="card group !p-0">
          <summary className="cursor-pointer list-none px-6 py-4 font-heading font-semibold text-slate-deep [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-4">
              {faq.question}
              <span aria-hidden="true" className="text-sage transition-transform group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="px-6 pb-5">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
