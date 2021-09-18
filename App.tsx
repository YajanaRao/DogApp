import * as React from 'react';
import Constants from 'expo-constants';
import { store, persistor } from './src/store';
import { Provider } from 'react-redux';
import { Card } from 'react-native-paper';
import BreedList from './src/dogs/BreedList';
import BreedDetails from './src/dogs/BreedDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ title: "Dogs" }} component={BreedList} />
          <Stack.Screen name="Details" component={BreedDetails} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
