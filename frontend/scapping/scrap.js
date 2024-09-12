const axios = require('axios');
const cheerio = require('cheerio');

// Fonction pour scraper les données
export const scrapeData = async () => {
  const url = 'https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?lang=fr&ondernemingsnummer=787277635'; // Remplace par l'URL cible
  try {
    // Récupérer le contenu HTML de la page
    const { data } = await axios.get(url);
    
    // Charger le HTML dans cheerio
    const $ = cheerio.load(data);
    
    // Initialiser les variables pour extraire les bonnes sections
    let isInFunctionsSection = false;
    let results = [];

    // Sélectionner toutes les balises <tr> pour parcourir chaque ligne
    $('tr').each((index, element) => {
      // Sélectionner tous les <td> de la ligne actuelle
      const tds = $(element).find('td');
      if (tds.length > 0) {
        // Récupérer le texte de chaque <td>
        const rowContent = tds.map((i, td) => $(td).text().replace(/\s+/g, ' ').trim()).get();
        
        // Filtrer pour éviter les valeurs vides ou espaces inutiles
        const filteredContent = rowContent.filter(text => text !== '' && text !== '&nbsp;');

        // Si la ligne contient "Fonctions", commencer la capture
        if (filteredContent.join(' ').includes('Fonctions')) {
          isInFunctionsSection = true;
          return;  // Ignorer le titre "Fonctions"
        }

        // Si la ligne contient "Capacités entrepreneuriales", arrêter la capture
        if (filteredContent.join(' ').includes('Capacités entrepreneuriales')) {
          isInFunctionsSection = false;
        }

        // Ajouter la ligne à la capture si on est dans la section "Fonctions"
        if (isInFunctionsSection && filteredContent.length > 0) {
          // Récupérer les informations dans le bon format
          const [fonction, name, date] = filteredContent; // On suppose ici que les 3 colonnes existent dans cet ordre
          results.push({ fonction, name, date });
        }
      }
    });

    // Retourner la variable contenant les informations dans le bon format
    return results;

  } catch (error) {
    console.error('Erreur lors du scraping :', error);
    return [];
  }
};