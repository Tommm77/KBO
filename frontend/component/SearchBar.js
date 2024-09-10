// components/SearchBar.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

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
        placeholder="Rechercher une entreprise..."
        value={searchQuery}
        onChangeText={handleChange}
      />
      <Button
        title="Rechercher"
        onPress={handleSearch}
        color="#6200EE"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default SearchBar;
