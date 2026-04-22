import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewsScreen } from '../features/news/screens/NewsScreen';
import { ArticleDetailScreen } from '../features/news/screens/ArticleDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={NewsScreen} 
          options={{ title: 'Hacker News' }} 
        />
        <Stack.Screen 
          name="Detail" 
          component={ArticleDetailScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
