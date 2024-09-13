import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const EnterpriseDetail = () => {
  const route = useRoute();
  const { enterprise } = route.params;
  const [isFavorite, setIsFavorite] = useState(false); 

  const enterprise_idfit = enterprise.EnterpriseNumber.replace(/\./g, '');

  useEffect(() => {
    // Vérifier si l'entreprise est déjà marquée comme favorite
    const checkIfFavorite = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites'); // Récupérer les favoris
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        const isFavorite = favorites.some(fav => fav.EnterpriseNumber === enterprise.EnterpriseNumber);
        setIsFavorite(isFavorite);
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
      }
    };

    checkIfFavorite();
  }, [enterprise]);

  // Fonction pour basculer l'état favori
  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (isFavorite) {
        // Si l'entreprise est déjà favorite, on la retire des favoris
        const updatedFavorites = favorites.filter(fav => fav.EnterpriseNumber !== enterprise.EnterpriseNumber);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        // Sinon, on l'ajoute aux favoris
        const updatedFavorites = [...favorites, enterprise];
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }

      setIsFavorite(!isFavorite); // Met à jour l'état local
    } catch (error) {
      console.error('Erreur lors de la mise à jour des favoris:', error);
    }
  };

  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  if (!enterprise) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Aucune information disponible</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{enterprise.Denominations?.[0]?.Denomination || 'Nom non disponible'}</Text>
            {/* Ajouter le bouton étoile favori */}
            <TouchableOpacity onPress={toggleFavorite}>
            <Icon 
              name={isFavorite ? 'star' : 'star-outline'} 
              size={30} 
              color={isFavorite ? 'yellow' : 'gray'} 
              style={styles.favoriteIcon} 
            />
          </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Text style={styles.subHeader}>Informations Générales</Text>
        </View>

        <View style={styles.infoContainer}>
          <Icon name="briefcase" size={20} color="#555" />
          <Text style={styles.text}>Numéro d'Entreprise: {enterprise.EnterpriseNumber}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="alert-circle" size={20} color="#555" />
          <Text style={styles.text}>Statut: {enterprise.Status}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="account" size={20} color="#555" />
          <Text style={styles.text}>Situation Juridique: {enterprise.JuridicalSituation}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="city" size={20} color="#555" />
          <Text style={styles.text}>Type d'Entreprise: {enterprise.TypeOfEnterprise}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="format-list-bulleted" size={20} color="#555" />
          <Text style={styles.text}>Forme Juridique: {enterprise.JuridicalForm}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="calendar" size={20} color="#555" />
          <Text style={styles.text}>Date de Création: {enterprise.StartDate}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="map-marker" size={20} color="#555" />
          <Text style={styles.text}>Code Postal: {enterprise.Zipcode}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="city-variant" size={20} color="#555" />
          <Text style={styles.text}>Municipalité: {enterprise.MunicipalityFR}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="map" size={20} color="#555" />
          <Text style={styles.text}>Rue: {enterprise.StreetFR} {enterprise.HouseNumber}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <TouchableOpacity onPress={() => openURL(`https://statuts.notaire.be/stapor_v1/enterprise/${enterprise_idfit}/statutes?enterpriseNumber=${enterprise_idfit}&statuteStart=0&statuteCount=5`)} style={styles.button}>
          <Text style={styles.buttonText}>Voir les Statuts Notariés</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openURL(`https://www.ejustice.just.fgov.be/cgi_tsv/list.pl?language=fr&btw=${enterprise_idfit}&page=1&view_numac=${enterprise_idfit}`)} style={styles.button}>
          <Text style={styles.buttonText}>Voir le Registre E-Justice</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openURL(`https://consult.cbso.nbb.be/consult-enterprise/${enterprise_idfit}`)} style={styles.button}>
          <Text style={styles.buttonText}>Voir le Registre NBB</Text>
        </TouchableOpacity>
      </View>

      {/* Affichage des activités générales si disponibles */}
      {enterprise.Activity && enterprise.Activity.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.subHeader}>Activités</Text>
          {enterprise.Activity.map((activity, index) => (
            <View key={index} style={styles.activityContainer}>
              <View style={styles.separator} />
              <Text style={styles.activityHeader}>Activité {index + 1}</Text>
              <Text style={styles.text}>Groupe d'Activité: {activity.ActivityGroup}</Text>
              <Text style={styles.text}>Code NACE: {activity.NaceCode}</Text>
              <Text style={styles.text}>Version NACE: {activity.NaceVersion}</Text>
              <Text style={styles.text}>Classification: {activity.Classification}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Autres sections comme les établissements */}
      {enterprise.Establishment && enterprise.Establishment.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.subHeader}>Établissements</Text>
          {enterprise.Establishment.map((establishment, index) => (
            <View key={index} style={styles.activityContainer}>
              <View style={styles.separator} />
              <Text style={styles.activityHeader}>Établissement {index + 1}</Text>
              <Text style={styles.text}>Numéro d'Établissement: {establishment.EstablishmentNumber}</Text>
              <Text style={styles.text}>Date de Création: {establishment.StartDate}</Text>
              {establishment.Activity && establishment.Activity.length > 0 && (
                <View>
                  <Text style={styles.subHeader}>Activités</Text>
                  {establishment.Activity.map((activity, index) => (
                    <View key={index} style={styles.activityContainer}>
                      <Text style={styles.text}>Groupe d'Activité: {activity.ActivityGroup}</Text>
                      <Text style={styles.text}>Code NACE: {activity.NaceCode}</Text>
                      <Text style={styles.text}>Version NACE: {activity.NaceVersion}</Text>
                      <Text style={styles.text}>Classification: {activity.Classification}</Text>
                    </View>
                  ))}
                </View>
              )}
              {establishment.Contact && establishment.Contact.length > 0 && (
                <View>
                  <Text style={styles.subHeader}>Contacts</Text>
                  {establishment.Contact.map((contact, index) => (
                    <View key={index} style={styles.activityContainer}>
                      <Text style={styles.text}>Nom: {contact.ContactName}</Text>
                      <Text style={styles.text}>Email: {contact.ContactEmail}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row', // Alignement horizontal
    alignItems: 'center', // Alignement vertical
    justifyContent: 'space-between', // Espace entre le titre et le bouton favori
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1, // Permet au titre de prendre tout l'espace disponible
  },
  favoriteIcon: {
    marginLeft: 10, // Espacement entre le titre et le bouton étoile
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  activityContainer: {
    marginBottom: 15,
    paddingTop: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  activityHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row', // Alignement horizontal
    alignItems: 'center', // Alignement vertical
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EnterpriseDetail;
