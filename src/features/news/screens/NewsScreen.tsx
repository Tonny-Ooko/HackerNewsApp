import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ArticleList } from '../components/ArticleList';

export const NewsScreen = () => {
  return (
    <View style={styles.container}>
      <ArticleList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6ef',
  },
});
