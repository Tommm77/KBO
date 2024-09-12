import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { data_profils } from '../data/profils'; // Assurez-vous que le chemin est correct
import { useNavigation } from '@react-navigation/native'; // Pour accéder à la fonction de navigation


const AuthPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // État pour alterner entre connexion et inscription

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const navigation = useNavigation(); // Hook de navigation
      try {
        const user = await AsyncStorage.getItem('user');
        if (user !== null) {
          // Les données sont présentes, l'utilisateur est connecté
          console.log('Utilisateur connecté:', JSON.parse(user));
          navigation.navigate('Home');
        } else {
          // Les données ne sont pas présentes, l'utilisateur n'est pas connecté
          console.log('Aucun utilisateur connecté');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la connexion utilisateur:', error);
      }
    };

    checkUserLoggedIn();
  }, []);


  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse e-mail et mot de passe.');
      return;
    }

    if (isLogin) {
      // Logique de connexion
      const user = data_profils.find(profile => profile.email === email && profile.password === password);
      console.log(user)
      if (user) {
        // Stocker les informations de l'utilisateur dans AsyncStorage
        try {
          await AsyncStorage.setItem('user', JSON.stringify(user));
          navigation.navigate('Home'); // Connexion réussie
        } catch (error) {
          Alert.alert('Erreur', 'Impossible de sauvegarder les informations utilisateur.');
        }
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
