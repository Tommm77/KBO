import React from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';

// Composant pour une seule entreprise (affichage compact dans une carte)
const EnterpriseCard = ({ enterprise }) => {
  // Récupérer l'activité principale
  const mainActivity = enterprise.Activity.find(activity => activity.Classification === 'MAIN');

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{enterprise.Denomination}</Text>
        <Text style={styles.subtitle}>Numéro d'entreprise: {enterprise.EnterpriseNumber}</Text>
        <Text style={styles.subtitle}>
          Adresse: {enterprise.StreetNL} {enterprise.HouseNumber}, {enterprise.Zipcode} {enterprise.MunicipalityNL}
        </Text>
        {mainActivity && (
          <Text style={styles.subtitle}>
            Activité principale: {mainActivity.NaceCode}
          </Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f8f9fa', // Couleur de fond claire pour le contraste
  },
  cardContent: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
});


export default EnterpriseCard;