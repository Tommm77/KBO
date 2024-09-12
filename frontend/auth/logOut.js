import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const logout = async (navigation) => {
  try {
    // Supprimer les données de l'utilisateur
    await AsyncStorage.removeItem('user');
    
    // Afficher une alerte ou une notification si nécessaire
    Alert.alert('Déconnexion', 'Vous avez été déconnecté avec succès.');

    // Naviguer vers l'écran de connexion ou d'accueil
    navigation.navigate('AuthPage'); // Remplacez 'Auth' par le nom de votre écran de connexion

  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    Alert.alert('Erreur', 'Une erreur est survenue lors de la déconnexion.');
  }
};

export const UpdateStorage = async (user) => {
  try {
    // Mettre à jour les données de l'utilisateur
    await AsyncStorage.setItem('user', JSON.stringify(user));
    Alert.alert('Succès', 'Les données utilisateur ont été mises à jour.');
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données utilisateur:', error);
    Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour des données utilisateur.');
  }
};
