import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const logout = async (navigation) => {
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

export default logout;
