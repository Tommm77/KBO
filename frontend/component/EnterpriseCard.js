import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const EnterpriseCard = ({ search }) => {
  const [data, setData] = useState('hello');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!search) return; // Ne pas faire de requête si la recherche est vide

      setLoading(true);
      setData(search);
      setLoading(false);
    };

    fetchData();
  }, [search]); // Refaire la requête lorsque le terme de recherche change

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucune donnée disponible</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.description}>{ search[0] }</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default EnterpriseCard;
