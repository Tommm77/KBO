import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const EnterpriseDetail = ({ enterprise }) => {
  if (!enterprise) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Aucune information disponible</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{enterprise.Denomination}</Text>
      <Text style={styles.subHeader}>Numéro d'Entreprise: {enterprise.EnterpriseNumber}</Text>
      <Text style={styles.text}>Statut: {enterprise.Status}</Text>
      <Text style={styles.text}>Situation Juridique: {enterprise.JuridicalSituation}</Text>
      <Text style={styles.text}>Type d'Entreprise: {enterprise.TypeOfEnterprise}</Text>
      <Text style={styles.text}>Forme Juridique: {enterprise.JuridicalForm}</Text>
      <Text style={styles.text}>Date de Création: {enterprise.StartDate}</Text>
      <Text style={styles.text}>Code Postal: {enterprise.Zipcode}</Text>
      <Text style={styles.text}>Municipalité: {enterprise.MunicipalityFR}</Text>
      <Text style={styles.text}>Rue: {enterprise.StreetFR} {enterprise.HouseNumber}</Text>

      {enterprise.Activity && enterprise.Activity.length > 0 && (
        <>
          <Text style={styles.subHeader}>Activités:</Text>
          {enterprise.Activity.map((activity, index) => (
            <View key={index} style={styles.activityContainer}>
              <Text style={styles.text}>Groupe d'Activité: {activity.ActivityGroup}</Text>
              <Text style={styles.text}>Code NACE: {activity.NaceCode}</Text>
              <Text style={styles.text}>Version NACE: {activity.NaceVersion}</Text>
              <Text style={styles.text}>Classification: {activity.Classification}</Text>
            </View>
          ))}
        </>
      )}

      {/* Afficher d'autres informations si nécessaire */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#555',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  activityContainer: {
    marginBottom: 15,
  },
});

export default EnterpriseDetail;