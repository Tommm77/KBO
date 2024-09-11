import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recherche')}>
        <Icon name="search" size={24} color="#fff" />
        <Text style={styles.buttonText}>Recherche</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profil')}>
        <Icon name="user" size={24} color="#fff" />
        <Text style={styles.buttonText}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
  },
});

export default Footer;
