import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Assurez-vous d'installer react-native-vector-icons

const EnterpriseDetail = () => {
  const route = useRoute();
  const { enterprise } = route.params;

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
        {/* Ajouter la gestion des logos si disponible */}
        {enterprise.Logo && (
          <Image source={{ uri: enterprise.Logo }} style={styles.logo} />
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.subHeader}>Informations Générales</Text>
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
        {/* Ajout des informations d'adresse supplémentaire si disponibles */}
        {enterprise.ExtraAddressInfo && (
          <View style={styles.infoContainer}>
            <Icon name="information-outline" size={20} color="#555" />
            <Text style={styles.text}>Adresse Complémentaire: {enterprise.ExtraAddressInfo}</Text>
          </View>
        )}
        {/* Ajout des informations de boîte si disponibles */}
        {enterprise.Box && (
          <View style={styles.infoContainer}>
            <Icon name="postage-stamp" size={20} color="#555" />
            <Text style={styles.text}>Boîte: {enterprise.Box}</Text>
          </View>
        )}
      </View>

      {/* Affichage des établissements si disponibles */}
      {enterprise.Establishment && enterprise.Establishment.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.subHeader}>Établissements</Text>
          {enterprise.Establishment.map((establishment, index) => (
            <View key={index} style={styles.activityContainer}>
              <Text style={styles.text}>Numéro d'Établissement: {establishment.EstablishmentNumber}</Text>
              <Text style={styles.text}>Date de Création: {establishment.StartDate}</Text>
              {/* Afficher les informations de chaque activité d'établissement */}
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
              {/* Afficher les contacts s'ils existent */}
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

      {/* Affichage des activités générales si disponibles */}
      {enterprise.Activity && enterprise.Activity.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.subHeader}>Activités</Text>
          {enterprise.Activity.map((activity, index) => (
            <View key={index} style={styles.activityContainer}>
              <Text style={styles.text}>Groupe d'Activité: {activity.ActivityGroup}</Text>
              <Text style={styles.text}>Code NACE: {activity.NaceCode}</Text>
              <Text style={styles.text}>Version NACE: {activity.NaceVersion}</Text>
              <Text style={styles.text}>Classification: {activity.Classification}</Text>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3, // Ajoute une ombre pour les plateformes Android
    shadowColor: '#000', // Ombre pour iOS
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
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default EnterpriseDetail;
