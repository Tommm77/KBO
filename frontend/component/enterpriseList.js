import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from "axios";
import EnterpriseCard from './EnterpriseCard';
import { data_enterprise } from '../data/enterprise';

const EnterpriseList = ({ search }) => {
  const [loading, setLoading] = useState(true);  // Gérer l'état de chargement
  const [enterprises, setEnterprises] = useState([]);  // Gérer les données d'entreprises
  const [error, setError] = useState(null);  // Gérer les erreurs de chargement

  useEffect(() => {
    const fetchEnterprises = async () => {
      setLoading(true);
      setError(null);  // Réinitialiser l'erreur
      url = `http://localhost:3000/entreprise/${search.searchType}/${search.searchQuery}`;

      if (search.searchType === 'activité') {
        url = `http://localhost:3000/entreprise/name/uber`; //temporaire
      }

      try {
        const response = await axios.get(url);
        setEnterprises(response.data);
        console.log('Résultats trouvés :', response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
        
    };
    fetchEnterprises();
    /*
    setTimeout(() => {
      setEnterprises(data_enterprise);
      setLoading(false);  // Arrêter le chargement
    }, 2000);
  */
  }, [search.searchType, search.searchQuery]);  // Dépendances pour déclencher l'effet

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
          <Text style={styles.loadingText}>Chargement des entreprises...</Text>
        </View>
    );
  }

  if (error) {
    return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Erreur: {error}</Text>
        </View>
    );
  }

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
    backgroundColor: '#f8f9fa',
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
