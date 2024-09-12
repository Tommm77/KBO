import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Icon } from '@rneui/themed';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction pour gérer les changements dans la barre de recherche
  const handleChange = (query) => {
    setSearchQuery(query);
  };

  // Fonction pour détecter automatiquement le type de recherche
  const detectSearchType = (query) => {
    // Vérifier si c'est un numéro d'entreprise (format: "xxxx.xxx.xxx")
    const isEnterpriseNumber = /^\d{4}\.\d{3}\.\d{3}$/.test(query);
    if (isEnterpriseNumber) {
      return 'id';
    }

    // Vérifier si c'est un code NACE (par exemple: "84130") ou une activité similaire
    const isNaceCode = /^\d{4,5}$/.test(query);
    if (isNaceCode) {
      return 'activity';
    }

    // Sinon, on suppose que c'est un nom d'entreprise
    return 'name';
  };

  // Fonction pour lancer la recherche
  const handleSearch = () => {
    const detectedType = detectSearchType(searchQuery); // Détecte automatiquement le type de recherche
    onSearch([searchQuery, detectedType]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBar}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    alignItems: 'center',
    flex: 1,
  },
  containerBar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
  },
  input: {
    flex: 2,
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
});

export default SearchBar;
