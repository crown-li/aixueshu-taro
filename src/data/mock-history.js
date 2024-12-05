import { mockArticles } from '@/data/mock-articles'

export const mockHistory = mockArticles.map((article, index) => ({
  ...article,
  readAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
  progress: Math.random() * 100,
}));