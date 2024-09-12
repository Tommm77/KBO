import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user'); // Récupérer les données de l'utilisateur depuis AsyncStorage
    if (storedUser) {
      return JSON.parse(storedUser); // Convertir les données en objet et les retourner
    }
    return null; // Si aucune donnée n'est trouvée, retourner null
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
    return null; // En cas d'erreur, retourner null
  }
};
