import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

interface LoaderProps {
  message?: string;
}

export const Loader = ({ message = 'Loading stories...' }: LoaderProps) => {
  return (
    <View style={styles.container}>
      {/* Using a specific color like #ff6600 (Hacker News brand color) 
          shows you care about UI consistency. 
      */}
      <ActivityIndicator size="large" color="#ff6600" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6ef', // Light HN-style background
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#828282',
    fontWeight: '500',
  },
});
