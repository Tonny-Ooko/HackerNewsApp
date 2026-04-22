import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SortOrder } from '../types/hn.types';

//  Using a dedicated interface for the Store
interface NewsState {
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  // Clear method is helpful for testing and "Reset Settings" features
  resetStore: () => void;
}

export const useNewsStore = create<NewsState>()(
  persist(
    (set) => ({
      bookmarks: [],
      sortOrder: 'score',

      //  Immutability is strictly handled via filter/spread
      toggleBookmark: (id: number) => 
        set((state) => ({
          bookmarks: state.bookmarks.includes(id)
            ? state.bookmarks.filter((b) => b !== id)
            : [...state.bookmarks, id],
        })),

      setSortOrder: (sortOrder: SortOrder) => set({ sortOrder }),

      resetStore: () => set({ bookmarks: [], sortOrder: 'score' }),
    }),
    {
      name: 'news-storage', // Key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
      //  Versioning helps handle data migration if the schema changes
      version: 1,
    }
  )
);