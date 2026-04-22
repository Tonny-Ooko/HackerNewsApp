import axios from 'axios';
import { Story } from '../types/hn.types';

const api = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
  timeout: 10000, 
});

export const fetchTopStories = async (): Promise<Story[]> => {
  try {
    const { data: ids } = await api.get<number[]>('topstories.json');
    
    // Defense against empty or null responses
    if (!ids) return [];

    const first20 = ids.slice(0, 20);
    
    //  Explicitly type 'id' as number
    const storyPromises = first20.map(async (id: number) => {
      const { data } = await api.get<Story>(`item/${id}.json`);
      return data;
    });

    const results = await Promise.all(storyPromises);
    
    // Explicitly type 'item' and use a Type Guard
    return results.filter(
      (item: Story | null | undefined): item is Story => 
        item !== null && item !== undefined && item.type === 'story' && !!item.url
    );
  } catch (error) {
    //  Error normalization
    const message = axios.isAxiosError(error) 
      ? error.response?.data?.message || error.message 
      : 'An unexpected error occurred';
      
    console.error('HN_API_ERROR:', message);
    throw new Error('Could not reach Hacker News servers');
  }
};