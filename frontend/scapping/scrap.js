const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?lang=fr&ondernemingsnummer=787277635';
// Fonction pour scrapper les données d'une URL
async function scrapeData(url) {
    try {
      // Envoyer une requête GET à l'URL
      const { data } = await axios.get(url, {
        headers: {
          'Accept-Language': 'fr' // Demander la page en français
        }
      });
  
      // Charger le HTML reçu dans cheerio pour l'exploiter comme jQuery
      const $ = cheerio.load(data);
  
      // Sélectionner les éléments à scrapper (par exemple, les titres d'article dans un blog)
      const articles = [];
  
      $('td').each((index, element) => {
        // Extraire le titre et l'URL de chaque article
        const title = $(element).text();
        const link = $(element).attr('href');
  
        // Ajouter les données à la liste
        articles.push({ title, link });
      });
  
      // Afficher les résultats
      console.log(articles);
    } catch (error) {
      console.error(`Erreur lors du scraping de ${url}:`, error.message);
    }
  }
  
  scrapeData(url);