// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../page/HomePage';
import AuthPage from '../page/AuthPage'
import Profile from '../page/Profil';
import EnterpriseDetail from '../page/EnterpriseDetail';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthPage"
          component={AuthPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profil"
          component={Profile}
        />
        <Stack.Screen
          name="Détail"
          component={EnterpriseDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
