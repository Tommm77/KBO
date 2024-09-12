import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { data_enterprise } from '../data/enterprise';
import EnterpriseCard from './EnterpriseCard'


const EnterpriseList = ({search}) => {
  const [loading, setLoading] = useState(true);  // Gérer l'état de chargement
  const [enterprises, setEnterprises] = useState([]);  // Gérer les données d'entreprises

  useEffect(() => {
    // Simuler un fetch (remplacez par un vrai fetch si nécessaire)
    setTimeout(() => {
      setEnterprises(data_enterprise);
      setLoading(false);  // Arrêter le chargement
    }, 2000);
  }, []);

  // Si en cours de chargement, afficher un spinner
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Chargement des entreprises...</Text>
      </View>
    );
  }

  // Rendu de la liste des entreprises une fois les données chargées
  return (
    <FlatList
      data={enterprises}
      keyExtractor={item => item.EnterpriseNumber}
      renderItem={({ item }) => <EnterpriseCard enterprise={item} />}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6200EE',
  },
  card: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f8f9fa', // Couleur de fond claire pour le contraste
  },
  cardContent: {
    flexDirection: 'column',
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


export default EnterpriseList;