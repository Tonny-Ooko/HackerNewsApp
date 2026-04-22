import React from 'react';
import { View, Text, Button } from 'react-native';

export const ErrorState = ({ message, onRetry }: { message: string, onRetry: () => void }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{message}</Text>
    <Button title="Retry" onPress={onRetry} /> 
  </View>
); // Requirement: Handle error state gracefully [cite: 85]
