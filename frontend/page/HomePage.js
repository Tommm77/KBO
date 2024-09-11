import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import SearchBar from '../component/SearchBar';
import { Icon } from '@rneui/themed';

const screenWidth = Dimensions.get('window').width;

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Recherche d'Entreprises Belges</Text>

          <SearchBar />
        </View>
      </ScrollView>

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
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
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
    borderRadius: 30, // Augmentez cette valeur pour des coins plus arrondis
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
