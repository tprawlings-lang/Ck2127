import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { publishedArticles } from '@/content/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/personal-training',
    '/nutrition-coaching',
    '/healthy-cooking-coaching',
    '/pricing',
    '/about',
    '/training-location',
    '/resources',
    '/contact',
    '/privacy',
    '/terms',
    '/fitness-disclaimer',
    '/nutrition-disclaimer',
    '/cooking-safety',
    '/sms-terms',
    '/accessibility',
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : path.startsWith('/privacy') ? 0.2 : 0.7,
  }));

  const articleRoutes = publishedArticles().map((a) => ({
    url: `${site.url}/resources/${a.slug}`,
    lastModified: a.updatedDate,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...articleRoutes];
}
