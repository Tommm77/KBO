import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const updateUserData = async (updates) => {
  try {
    // Récupérer les données utilisateur existantes
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      // Convertir les données en objet
      const user = JSON.parse(storedUser);

      // Mettre à jour les champs spécifiés
      const updatedUser = {
        ...user,
        ...updates
      };
      console.log(updatedUser);

      // Sauvegarder les données mises à jour dans AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

      Alert.alert('Succès', 'Les données de l\'utilisateur ont été mises à jour avec succès.');
    } else {
      Alert.alert('Erreur', 'Aucune donnée utilisateur trouvée pour mise à jour.');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données utilisateur:', error);
    Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour des données utilisateur.');
  }
};

export const checkUserLoggedIn = async (navigation) => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user !== null) {
      // L'utilisateur est connecté
      console.log('Utilisateur connecté:', JSON.parse(user));
      navigation.navigate('Home');
    } else {
      // Aucun utilisateur connecté
      console.log('Aucun utilisateur connecté');
      navigation.navigate('AuthPage'); // Naviguer vers l'écran de connexion si besoin
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de la connexion utilisateur:', error);
  }
};
