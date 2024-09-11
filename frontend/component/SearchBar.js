import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction pour gérer les changements dans la barre de recherche
  const handleChange = (query) => {
    setSearchQuery(query);
  };

  // Fonction pour lancer la recherche
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher une entreprise"
        value={searchQuery}
        onChangeText={handleChange}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Icon name="search" color="white" />
      </TouchableOpacity>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25, // Bord arrondi
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    fontSize: 14,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#6200EE', // Couleur personnalisée du bouton
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Bouton arrondi
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Ajout de l'ombre
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SearchBar;
