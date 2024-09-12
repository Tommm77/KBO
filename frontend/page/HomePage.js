import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SearchBar from '../component/SearchBar';
import { Icon } from '@rneui/themed';
import EnterpriseList from '../component/enterpriseList';
import { checkUserLoggedIn } from '../auth/authSystemStorage';

const HomePage = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    checkUserLoggedIn(navigation);
  }, []);
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <SearchBar onSearch={setSearchTerm} />
        </View>
      </ScrollView>

      {searchTerm ? (
        <EnterpriseList search={searchTerm} />
      ) : null}

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
    marginBottom: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 120,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200EE',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomePage;
