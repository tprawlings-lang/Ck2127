import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/config/site';
import { publishedArticles, type ArticleCategory } from '@/content/articles';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Practical guides for adults 40+ in Phoenix: getting started with strength training, nutrition habits, meal prep, and training at The Gym Phoenix.',
  alternates: { canonical: '/resources' },
};

const categories: ArticleCategory[] = [
  'Getting Started',
  'Strength After 40',
  'Nutrition Habits',
  'Meal Prep and Cooking',
  'Training at The Gym Phoenix',
];

export default function ResourcesPage() {
  const articles = publishedArticles();
  return (
    <>
      <section className="bg-soft-white">
        <div className="container-site py-14">
          <h1 className="text-3xl md:text-4xl">Resources</h1>
          <p className="mt-4 max-w-2xl">
            Plain-language answers to the questions Connor hears most — no hype, no jargon, and no pressure.
          </p>
        </div>
      </section>

      <section className="container-site py-14">
        {categories.map((category) => {
          const items = articles.filter((a) => a.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category} className="mb-12">
              <h2 className="text-2xl">{category}</h2>
              <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((article) => (
                  <article key={article.slug} className="card flex flex-col">
                    <h3 className="text-lg">
                      <Link href={`/resources/${article.slug}`} className="text-slate-deep no-underline hover:text-terracotta">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm">{article.description}</p>
                    <p className="mt-3 text-xs text-muted">
                      Published {article.publishDate}
                      {article.updatedDate !== article.publishDate && ` · Updated ${article.updatedDate}`}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
        <p className="text-sm text-muted">
          More guides are on the way — including strength after 50, grocery-list building, and training safely in
          Phoenix heat.
        </p>
      </section>

      <section className="bg-terracotta/10 py-14 text-center">
        <div className="container-site">
          <h2 className="text-2xl">Have a question these don&apos;t answer?</h2>
          <Link href="/contact" className="btn-primary mt-6" data-analytics="resource_cta_click">
            {site.cta.primary}
          </Link>
        </div>
      </section>
    </>
  );
}
