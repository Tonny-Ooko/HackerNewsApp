import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview'; 
import { Loader } from '../components/Loader';

export const ArticleDetailScreen = ({ route }: any) => {
  const { article } = route.params;

  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: article.url }}
        startInLoadingState={true}
        renderLoading={() => <Loader message="Loading Article..." />}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' }
});
