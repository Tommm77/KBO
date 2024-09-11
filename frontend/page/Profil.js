import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [editable, setEditable] = useState(false);
  const [favorites, setFavorites] = useState([
    { id: 1, name: 'Entreprise A', description: 'Description A' },
    { id: 2, name: 'Entreprise B', description: 'Description B' },
    { id: 3, name: 'Entreprise C', description: 'Description C' },
  ]);

  const handleSave = () => {
    Alert.alert('Profil modifié', 'Vos informations ont été mises à jour.');
    setEditable(false);
  };

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Vous avez été déconnecté.');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nom"
          editable={editable}
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          editable={editable}
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Téléphone"
          keyboardType="phone-pad"
          editable={editable}
        />

        {/* Conteneur pour les boutons Modifier et Déconnexion */}
        <View style={styles.buttonRow}>
          {editable ? (
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Sauvegarder</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => setEditable(true)}>
              <Text style={styles.buttonText}>Modifier</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>

        {/* Section pour les entreprises favorites */}
        <View style={styles.favoritesSection}>
          <Text style={styles.sectionTitle}>Entreprises mises en favoris</Text>
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <View key={favorite.id} style={styles.card}>
                <Text style={styles.cardTitle}>{favorite.name}</Text>
                <Text style={styles.cardDescription}>{favorite.description}</Text>
              </View>
            ))
          ) : (
            <Text>Aucune entreprise mise en favoris.</Text>
          )}
        </View>
      </ScrollView>
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
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20, // Coins arrondis
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row', // Aligne les boutons sur une seule ligne
    justifyContent: 'space-between', // Espace entre les boutons
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200EE', // Couleur du bouton
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // Coins arrondis
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    flex: 1, // Prend toute la largeur
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // Coins arrondis
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // Prend toute la largeur
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoritesSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default Profile;
