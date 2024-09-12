import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const logout = async (navigation) => {
  try {
    // Supprimer les données de l'utilisateur
    await AsyncStorage.removeItem('user');
    
    // Afficher une alerte ou une notification si nécessaire
    Alert.alert('Déconnexion', 'Vous avez été déconnecté avec succès.');

    // Naviguer vers l'écran de connexion ou d'accueil
    navigation.navigate('AuthPage');

  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    Alert.alert('Erreur', 'Une erreur est survenue lors de la déconnexion.');
  }
};

// Fonction pour mettre à jour les données de l'utilisateur
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
      console.log(updatedUser)
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