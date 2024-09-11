import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Icon } from '@rneui/themed';
import { RadioButton } from 'react-native-paper';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('name'); // Par défaut, rechercher par nom

  // Fonction pour gérer les changements dans la barre de recherche
  const handleChange = (query) => {
    setSearchQuery([query, searchType]);
  };

  // Fonction pour lancer la recherche
  const handleSearch = () => {
    onSearch(searchQuery, searchType);
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
      <View style={styles.radioContainer}>
        <View style={styles.radioRow}>
          <View style={styles.radioOption}>
            <RadioButton
              value="name"
              status={searchType === 'name' ? 'checked' : 'unchecked'}
              onPress={() => setSearchType('name')}
            />
            <Text style={styles.radioLabel}>Nom de l'entreprise</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton
              value="id"
              status={searchType === 'id' ? 'checked' : 'unchecked'}
              onPress={() => setSearchType('id')}
            />
            <Text style={styles.radioLabel}>Numéro d'entreprise</Text>
          </View>
        </View>
        <View style={styles.radioRow}>
          <View style={styles.radioOption}>
            <RadioButton
              value="activity"
              status={searchType === 'activity' ? 'checked' : 'unchecked'}
              onPress={() => setSearchType('activity')}
            />
            <Text style={styles.radioLabel}>Activité</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton
              value="address"
              status={searchType === 'address' ? 'checked' : 'unchecked'}
              onPress={() => setSearchType('address')}
            />
            <Text style={styles.radioLabel}>Adresse</Text>
          </View>
        </View>
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
  radioContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%', // Ajustez la largeur pour un meilleur espacement
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
});

export default SearchBar;
