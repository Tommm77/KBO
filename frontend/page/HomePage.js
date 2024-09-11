import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Dimensions } from 'react-native';
import SearchBar from '../component/SearchBar';

const screenWidth = Dimensions.get('window').width;

const HomePage = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://example.com/logo.png' }} // Remplacez par le logo de votre application
          style={styles.logo}
        />
        <Text style={styles.title}>Recherche d'Entreprises Belges</Text>

        <SearchBar />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginBottom: 50
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feature: {
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  featureDescription: {
    fontSize: 16,
    color: '#333',
  },
  analytics: {
    marginBottom: 20,
    alignItems: 'center',
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default HomePage;
