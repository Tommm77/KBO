import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkUserLoggedIn = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user !== null) {
      // Les données sont présentes, l'utilisateur est connecté
      console.log('Utilisateur connecté:', JSON.parse(user));
      return true;
    } else {
      // Les données ne sont pas présentes, l'utilisateur n'est pas connecté
      console.log('Aucun utilisateur connecté');
      return false;
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de la connexion utilisateur:', error);
  }
};
