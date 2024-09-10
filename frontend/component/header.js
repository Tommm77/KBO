// components/Header.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    // Logique pour afficher le profil ou se déconnecter
    // Exemple : navigation.navigate('ProfilePage');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Text style={styles.menuText}>Menu</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Mon App</Text>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={handleProfilePress}
      >
        <Image
          source={{ uri: 'https://example.com/profile-icon.png' }} // Remplacez par l'URL de votre icône de profil
          style={styles.profileIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#6200EE',
  },
  menuButton: {
    padding: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 10,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default Header;
