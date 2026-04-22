import { renderHook, act } from '@testing-library/react-native';
import { useNewsStore } from '../useNewsStore';

describe('useNewsStore', () => {
  // Clear the store before each test to ensure a clean state
  beforeEach(() => {
    act(() => {
      // You can manually reset state if needed
    });
  });

  test('should toggle bookmarks', () => {
    const { result } = renderHook(() => useNewsStore());
    
    act(() => {
      result.current.toggleBookmark(1);
    });
    expect(result.current.bookmarks).toContain(1);
    
    act(() => {
      result.current.toggleBookmark(1);
    });
    expect(result.current.bookmarks).not.toContain(1);
  });
});