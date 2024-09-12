import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import SearchBar from '../component/SearchBar';
import { Icon } from '@rneui/themed';
import EnterpriseList from '../component/enterpriseList';

const HomePage = ({ navigation }) => {

  const [searchTerm, setSearchTerm] = useState('');
  
    // Fonction pour gérer la recherche
    const handleSearch = (query) => {
        setSearchTerm(query);
        // Vous pouvez également faire quelque chose avec le terme de recherche ici
        console.log('Recherche:', query);
    };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <SearchBar onSearch={handleSearch} />
        </View>
      </ScrollView>
      

      {searchTerm ? (
          <EnterpriseList search={searchTerm} />
        ) :(
            null
        )}

      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Profil'); }}>
        <Icon name="person" color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginBottom: 10
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 120
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 100,
    marginBottom: 50,
  },
  button: {
    position: 'absolute',
    bottom: 20, // Ajustez cette valeur pour l'espacement depuis le bas
    right: 20, // Ajustez cette valeur pour l'espacement depuis la droite
    backgroundColor: '#6200EE', // Couleur personnalisée du bouton
    paddingVertical: 20, // Augmentez cette valeur pour un bouton plus haut
    paddingHorizontal: 20, // Augmentez cette valeur pour un bouton plus large
    borderRadius: 10, // Augmentez cette valeur pour des coins plus arrondis
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6, // Augmentez l'ombre pour correspondre à la taille du bouton
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomePage;
