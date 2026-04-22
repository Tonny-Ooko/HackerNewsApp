import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Story } from '../../../types/hn.types';
import { useNewsStore } from '../../../store/useNewsStore';

//  Defining a proper Navigation Type instead of 'any'
type RootStackParamList = {
  Detail: { article: Story };
};

interface Props {
  article: Story;
}

export const ArticleItem = React.memo(({ article }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { bookmarks, toggleBookmark } = useNewsStore();
  
  const isBookmarked = bookmarks.includes(article.id);

  //  Using useCallback for event handlers in list items 
  // to prevent unnecessary re-renders during scroll.
  const handlePress = useCallback(() => {
    navigation.navigate('Detail', { article });
  }, [navigation, article]);

  const handleBookmark = useCallback(() => {
    toggleBookmark(article.id);
  }, [toggleBookmark, article.id]);

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      style={styles.card}
      onPress={handlePress}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.subtitle}>
          {article.score} pts by {article.by} • {new Date(article.time * 1000).toLocaleDateString()}
        </Text>
      </View>
      
      <TouchableOpacity 
        onPress={handleBookmark}
        style={styles.bookmarkButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Easier to tap on mobile
      >
        <Text style={styles.emoji}>{isBookmarked ? '🧡' : '🤍'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  content: { flex: 1, justifyContent: 'center' },
  title: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#1a1a1a',
    lineHeight: 22 
  },
  subtitle: { 
    fontSize: 13, 
    color: '#65676b', 
    marginTop: 6 
  },
  bookmarkButton: { 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingLeft: 12 
  },
  emoji: { fontSize: 22 }
});
