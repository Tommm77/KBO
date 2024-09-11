import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { data_profils } from '../data/profils'; // Assurez-vous que le chemin est correct

const AuthPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // État pour alterner entre connexion et inscription

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse e-mail et mot de passe.');
      return;
    }

    if (isLogin) {
      // Logique de connexion
      const user = data_profils.find(profile => profile.email === email && profile.password === password);
      
      if (user) {
        navigation.navigate('Home'); // Connexion réussie
      } else {
        Alert.alert('Erreur', 'Adresse e-mail ou mot de passe incorrect.');
      }
    } else {
      // Logique d'inscription (ici, nous simulerons simplement une inscription réussie)
      Alert.alert('Inscription', 'Vous êtes maintenant inscrit.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Connexion' : 'Inscription'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Bouton avec styles personnalisés */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isLogin ? 'Se connecter' : 'S\'inscrire'}</Text>
      </TouchableOpacity>

      {/* Lien pour basculer entre connexion et inscription */}
      <Text style={styles.switchText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Pas encore inscrit ? Inscrivez-vous' : 'Déjà inscrit ? Connectez-vous'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200EE', // Couleur personnalisée pour le bouton
    paddingVertical: 15,
    borderRadius: 30, // Rendre les boutons arrondis
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Ajoute une ombre pour un effet surélevé (uniquement sur Android)
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  switchText: {
    textAlign: 'center',
    color: '#6200EE',
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default AuthPage;
