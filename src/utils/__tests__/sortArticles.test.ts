import { sortArticles } from '../sortArticles';
import { Story } from '../../types/hn.types';

describe('sortArticles utility', () => {
  const mockStories: Partial<Story>[] = [
    { id: 1, score: 10, time: 1000 },
    { id: 2, score: 50, time: 500 },
  ];

  test('should sort articles by score in descending order', () => {
    const result = sortArticles(mockStories as Story[], 'score');
    expect(result[0].score).toBe(50);
    expect(result[1].score).toBe(10);
  });

  test('should sort articles by time in descending order', () => {
    const result = sortArticles(mockStories as Story[], 'time');
    expect(result[0].time).toBe(1000);
    expect(result[1].time).toBe(500);
  });

  test('should return a new array and not mutate the original', () => {
    const original = [...mockStories] as Story[];
    const result = sortArticles(original, 'score');
    expect(result).not.toBe(original);
  });
});