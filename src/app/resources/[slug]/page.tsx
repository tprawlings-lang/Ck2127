import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site } from '@/config/site';
import { getArticle, publishedArticles } from '@/content/articles';

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/resources/${article.slug}` },
    openGraph: { type: 'article', publishedTime: article.publishDate, modifiedTime: article.updatedDate },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { default: Content } = await import(`@/content/articles/${slug}.mdx`);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.publishDate,
    dateModified: article.updatedDate,
    author: { '@type': 'Organization', name: site.brandName },
    publisher: { '@type': 'Organization', name: site.brandName, url: site.url },
    mainEntityOfPage: `${site.url}/resources/${article.slug}`,
  };

  return (
    <article className="container-site py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/resources" className="text-sage">
          Resources
        </Link>{' '}
        / {article.category}
      </nav>
      <div className="mt-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl">{article.title}</h1>
        <p className="mt-3 text-sm text-muted">
          By {article.author} · Published {article.publishDate}
          {article.updatedDate !== article.publishDate && ` · Updated ${article.updatedDate}`}
        </p>
        <div className="mt-6">
          <Content />
        </div>
      </div>
    </article>
  );
}
