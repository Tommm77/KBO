// screens/AuthPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AuthPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // État pour alterner entre connexion et inscription

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse e-mail et mot de passe.');
      return;
    }

    // Ajoutez ici la logique pour se connecter ou s'inscrire
    if (isLogin) {
      // Logique de connexion
      navigation.navigate('Home');
    } else {
      // Logique d'inscription
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
      
      <Button
        title={isLogin ? 'Se connecter' : 'S\'inscrire'}
        onPress={handleSubmit}
        color="#6200EE"
      />

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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  switchText: {
    textAlign: 'center',
    color: '#6200EE',
    marginTop: 20,
  },
});

export default AuthPage;
