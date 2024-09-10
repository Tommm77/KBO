// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../page/HomePage';
import InfoPage from '../page/InfoPage';
import AuthPage from '../page/AuthPage';
import Header from '../component/header';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthPage"
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#6200EE' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'Accueil', headerShown: false }}
        />
        <Stack.Screen
          name="InfoPage"
          component={InfoPage}
          options={{ title: 'Information' }}
        />
         <Stack.Screen
          name="AuthPage"
          component={AuthPage}
          options={{ title: 'AuthPage', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
