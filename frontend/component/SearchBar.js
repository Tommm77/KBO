import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { Icon } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import { data_activity } from '../data/enterprise';

// Définition d'un composant simple RadioButton
const RadioButton = ({ selected }) => {
  return (
    <View style={[styles.radioCircle, selected && styles.radioSelected]} />
  );
};

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('name/id');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (query) => {
    setSearchQuery(query);
  };

  const detectSearchType = (query) => {
    if (selectedOption === 'name/id') {
      const isEnterpriseNumber = /^\d{4}\.\d{3}\.\d{3}$/.test(query);
      if (isEnterpriseNumber) {
        return 'id';
      }
      return 'name';
    }
    return selectedOption;
  };

  const handleSearch = () => {
    const detectedType = detectSearchType(searchQuery);
    const searchParams = {
      searchQuery,
      searchType: detectedType,
      selectedActivity: selectedOption === 'activité' ? selectedActivity : null,
      selectedAddress: selectedOption === 'adresse' ? selectedAddress : null,
    };
    onSearch(searchParams);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBar}>
        {selectedOption === 'name/id' ? (
          <TextInput
            style={styles.input}
            placeholder="Rechercher une entreprise par nom ou ID"
            value={searchQuery}
            onChangeText={handleChange}
          />
        ) : selectedOption === 'activité' ? (
          <View style={styles.row}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data_activity}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Activité"
              searchPlaceholder="Search..."
              value={selectedActivity}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSelectedActivity(item.value);
                setIsFocus(false);
              }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Détail de l'activité"
              value={searchQuery}
              onChangeText={handleChange}
            />
          </View>
        ) : selectedOption === 'adresse' ? (
          <View style={styles.row}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data_activity}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Adresse"
              searchPlaceholder="Search..."
              value={selectedAddress}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSelectedAddress(item.value);
                setIsFocus(false);
              }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Détail de l'adresse"
              value={searchQuery}
              onChangeText={handleChange}
            />
          </View>
        ) : null}
      </View>

      {/* Section des boutons radio */}
      <View style={styles.radioContainer}>
        <View style={styles.radioGroup}>
          <TouchableOpacity onPress={() => setSelectedOption('name/id')} style={styles.radioOption}>
            <RadioButton selected={selectedOption === 'name/id'} />
            <Text style={styles.radioText}>name / id</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedOption('activité')} style={styles.radioOption}>
            <RadioButton selected={selectedOption === 'activité'} />
            <Text style={styles.radioText}>activité</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedOption('adresse')} style={styles.radioOption}>
            <RadioButton selected={selectedOption === 'adresse'} />
            <Text style={styles.radioText}>adresse</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Icon name="search" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  containerBar: {
    marginVertical: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    fontSize: 14,
    marginRight: 10,
  },
  searchInput: {
    width: 150,
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    marginLeft: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6200EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: '#6200EE',
  },
  dropdown: {
    height: 45,
    width: 120,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 25, // Coins arrondis
    paddingHorizontal: 8,
    marginRight: 10, // Espacement entre le picker et la barre de recherche
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default SearchBar;
