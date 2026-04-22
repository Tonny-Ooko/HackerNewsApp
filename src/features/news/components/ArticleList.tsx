import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { fetchTopStories } from '../../../api/hnApi';
import { useNewsStore } from '../../../store/__tests__/useNewsStore';
import { sortArticles } from '../../../utils/sortArticles';
import { ArticleItem } from './ArticleItem';
import { Loader } from '../../../components/Loader';
import { ErrorState } from '../../../components/ErrorState';

export const ArticleList = () => {
  const { sortOrder } = useNewsStore();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchTopStories();
      setArticles(data);
    } catch (e) {
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Memoized sorting to prevent heavy UI blocking [cite: 123]
  const sortedArticles = useMemo(() => {
    return sortArticles(articles, sortOrder);
  }, [articles, sortOrder]);

  if (loading && !articles.length) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={loadData} />;

  return (
    // ... inside the ArticleList return
   <FlatList
    data={sortedArticles}
    keyExtractor={(item) => item.id.toString()}
    refreshControl={
     <RefreshControl refreshing={loading} onRefresh={loadData} tintColor="#ff6600" />
    }
    renderItem={({ item }) => <ArticleItem article={item} />}
     // Memory & Performance Optimization
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true} 
      contentContainerStyle={{ paddingBottom: 20 }}
   />
  );
};