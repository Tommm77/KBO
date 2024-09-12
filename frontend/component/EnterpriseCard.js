import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Pour accéder à la fonction de navigation

const EnterpriseCard = ({ enterprise }) => {
  const navigation = useNavigation(); // Hook de navigation

  const handlePress = () => {
    // Naviguer vers la page de détails avec l'objet entreprise passé en paramètre
    //console.log(enterprise)
    navigation.navigate('Détail', { enterprise });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Text style={styles.title}>{enterprise.Denomination}</Text>
      <Text style={styles.subtitle}>Numéro: {enterprise.EnterpriseNumber}</Text>
      <Text style={styles.subtitle}>Activité: {enterprise.Activity.map(activity => activity.NaceCode).join(', ')}</Text>
      {/* Ajoutez d'autres détails de l'entreprise ici */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#f8f9fa', // Couleur de fond claire pour le contraste
    borderColor: '#6200EE', // Couleur de la bordure
    borderWidth: 1, // Épaisseur de la bordure
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
});

export default EnterpriseCard;
