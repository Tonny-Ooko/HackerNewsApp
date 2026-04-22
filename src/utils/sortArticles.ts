import { Story, SortOrder } from '../types/hn.types';

export const sortArticles = (articles: Story[], sortOrder: SortOrder): Story[] => {
  return [...articles].sort((a, b) =>
    sortOrder === 'score' ? b.score - a.score : b.time - a.time
  );
};
