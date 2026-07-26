/**
 * Resource article registry. Every published article must have an entry here.
 * Articles are MDX files in src/content/articles/<slug>.mdx.
 *
 * EDITORIAL GATE: Connor is listed as author only after he reviews the final
 * article. Draft status keeps an article out of the index and sitemap.
 * The remaining planned titles from the editorial plan are tracked in
 * assets-needed.md.
 */
export type ArticleCategory =
  | 'Getting Started'
  | 'Strength After 40'
  | 'Nutrition Habits'
  | 'Meal Prep and Cooking'
  | 'Training at The Gym Phoenix';

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  /** Displayed author. 'CK2717 Fitness (pending Connor’s review)' until approved. */
  author: string;
  publishDate: string; // ISO date
  updatedDate: string; // ISO date
  status: 'published' | 'draft';
};

export const articles: ArticleMeta[] = [
  {
    slug: 'how-to-start-working-out-again-after-40',
    title: 'How to Start Working Out Again After 40',
    description:
      'A calm, practical guide to restarting exercise after years away: what to do first, what to skip, and how to make it stick.',
    category: 'Getting Started',
    author: 'CK2717 Fitness (pending Connor’s review)',
    publishDate: '2026-07-24',
    updatedDate: '2026-07-24',
    status: 'published',
  },
  {
    slug: 'first-personal-training-session',
    title: 'What Happens During Your First Personal-Training Session?',
    description:
      'Exactly what to expect at a first session with Connor, from meeting at the door to your written next steps. No surprises, no tests.',
    category: 'Getting Started',
    author: 'CK2717 Fitness (pending Connor’s review)',
    publishDate: '2026-07-24',
    updatedDate: '2026-07-24',
    status: 'published',
  },
  {
    slug: 'gym-anxiety-one-on-one-training',
    title: 'Gym Anxiety: How One-on-One Training Makes Starting Easier',
    description:
      'Feeling watched, lost among the machines, or embarrassed to start? Here is how private coaching removes each of those barriers.',
    category: 'Strength After 40',
    author: 'CK2717 Fitness (pending Connor’s review)',
    publishDate: '2026-07-24',
    updatedDate: '2026-07-24',
    status: 'published',
  },
  {
    slug: 'simple-sunday-meal-prep-routine',
    title: 'A Simple Sunday Meal-Prep Routine',
    description:
      'A repeatable 90-minute Sunday routine (plan, shop, batch-cook, portion, and store) that keeps weekday eating on track.',
    category: 'Meal Prep and Cooking',
    author: 'CK2717 Fitness (pending Connor’s review)',
    publishDate: '2026-07-24',
    updatedDate: '2026-07-24',
    status: 'published',
  },
];

export function publishedArticles(): ArticleMeta[] {
  return articles.filter((a) => a.status === 'published');
}

export function getArticle(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug && a.status === 'published');
}
