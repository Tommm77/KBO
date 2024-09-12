import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import EnterpriseList from '../component/enterpriseList';
import logout,  { updateUserData } from '../auth/logOut';
import {getUserData} from "../auth/getProfil";
import axios from "axios";

const Profile = ({ navigation }) => {

  // États pour stocker les informations utilisateur
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editable, setEditable] = useState(false);
  const [nameunchanged, setNameunchanged] = useState('');

  // Fonction pour récupérer les données utilisateur
  const fetchUserLocalStorage = async () => {
    try {
      const user = await getUserData(); // Récupère les données utilisateur de l'AsyncStorage ou LocalStorage
      if (user) {
        // Si les données existent, met à jour les états
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        setNameunchanged(user.name);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error);
    }
  };

  // Utilisez useEffect pour appeler fetchUserLocalStorage au montage du composant
  useEffect(() => {
    fetchUserLocalStorage();
  }, []);

  const handleSave = () => {
    console.log('Sauvegarde des informations utilisateur...');
    console.log('Nom:', name);
    console.log('Email:', email);
    console.log('Mot de passe', password);
    axios.patch(`http://localhost:3000/user/${nameunchanged}`, { name: name, email: email, password: password })
        .then(response => {
          console.log(response.data);
          Alert.alert('Profil modifié', 'Vos informations ont été mises à jour.');
          console.log('Profil mis à jour avec succès.');
          setEditable(false); // Désactiver l'édition après la sauvegarde
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du profil :', error);
        });
    updateUserData({'name': name, 'email': email, 'password': password})
    Alert.alert('Profil modifié', 'Vos informations ont été mises à jour.');
    setEditable(false); // Désactiver l'édition après la sauvegarde
  };


  const handleLogout = () => {
    logout(navigation);
    Alert.alert('Déconnexion', 'Vous avez été déconnecté.');
  };

  return (
    <View style={styles.container}>
      
      {/* Partie Profil (sans ScrollView) */}
      <View style={styles.profileSection}>
        {/* Affichage du nom */}
        {editable ? (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nom"
            editable={editable}
          />
        ) : (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nom:</Text>
            <Text style={styles.fieldValue}>{name}</Text>
          </View>
        )}

        {/* Affichage de l'email */}
        {editable ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            editable={editable}
          />
        ) : (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email:</Text>
            <Text style={styles.fieldValue}>{email}</Text>
          </View>
        )}

        {/* Affichage du télépassword */}
        {editable ? (
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            keyboardType="password-pad"
            editable={editable}
          />
        ) : (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Mot de passe:</Text>
            <Text style={styles.fieldValue}>{password}</Text>
          </View>
        )}

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
      </View>

      {/* Section des favoris avec Scroll */}
      <View style={styles.favoritesSection}>
        <Text style={styles.sectionTitle}>Entreprises mises en favoris</Text>
        <View style={styles.favList}>
          {/* Liste des entreprises en favoris */}
          <EnterpriseList search={""} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: '#555',
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
    flex: 1,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  favList: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Profile;
