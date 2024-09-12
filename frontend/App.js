import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Pour accéder à la fonction de navigation

const App = () => {
  
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const navigation = useNavigation(); // Hook de navigation
      try {
        const user = await AsyncStorage.getItem('user');
        if (user !== null) {
          // Les données sont présentes, l'utilisateur est connecté
          console.log('Utilisateur connecté:', JSON.parse(user));
          navigation.navigate('Home');
        } else {
          // Les données ne sont pas présentes, l'utilisateur n'est pas connecté
          console.log('Aucun utilisateur connecté');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la connexion utilisateur:', error);
      }
    };

    checkUserLoggedIn();
  }, []);


  return (
      <AppNavigator />
  );
};

export default App;