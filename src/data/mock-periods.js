import { mockArticles } from './mock-articles';

// Group articles by week
export const mockPeriods = [
  {
    id: '2024-03-w2',
    title: '2024年第11周',
    publishedAt: '2024-03-15',
    articles: mockArticles.slice(0, 3),
  },
  {
    id: '2024-03-w1',
    title: '2024年第10周',
    publishedAt: '2024-03-08',
    articles: mockArticles.slice(1, 4),
  },
  {
    id: '2024-02-w4',
    title: '2024年第9周',
    publishedAt: '2024-03-01',
    articles: mockArticles.slice(2),
  },
];