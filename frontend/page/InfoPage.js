import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const InfoPage = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fonctionnalités Principales</Text>
        <View style={styles.feature}>
          <Text style={styles.featureTitle}>🔍 Recherche Avancée</Text>
          <Text style={styles.featureDescription}>
            Recherchez des entreprises par numéro, nom, activité ou adresse.
          </Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureTitle}>📄 Consultation de Documents</Text>
          <Text style={styles.featureDescription}>
            Accédez aux comptes annuels, documents juridiques et publications officielles.
          </Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureTitle}>📊 Analyse de Données</Text>
          <Text style={styles.featureDescription}>
            Visualisez des données et obtenez des insights grâce à des graphiques interactifs.
          </Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureTitle}>👤 Gestion des Profils</Text>
          <Text style={styles.featureDescription}>
            Créez et gérez votre profil, sauvegardez des entreprises dans votre liste de souhaits.
          </Text>
        </View>
      </View>

      <View style={styles.analytics}>
        <Text style={styles.analyticsTitle}>Analyse des Tendances Financières</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [
              {
                data: [50, 45, 60, 70, 65],
              },
            ],
          }}
          width={screenWidth - 30}
          height={220}
          yAxisLabel="€"
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#f0f0f0',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feature: {
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  featureDescription: {
    fontSize: 16,
    color: '#333',
  },
  analytics: {
    marginBottom: 20,
    alignItems: 'center',
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default InfoPage;
