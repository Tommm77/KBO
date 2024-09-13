const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'kbo_final_db';

async function importJSON() {

    const client = new MongoClient(uri);
    try {
        console.log('Connexion à MongoDB...');
        await client.connect();
        console.log('Connecté à MongoDB');

        const db = client.db(dbName);

        const results = await db.collection('entreprise').aggregate([
            { $unwind: "$Activity" }, // Décompose chaque élément du tableau "Activity"
            { $group: { _id: "$Activity.ActivityGroup" } }, // Groupement par "ActivityGroup" pour obtenir les valeurs uniques
            { $sort: { _id: 1 } } // Optionnel : Tri des résultats par ordre alphabétique

        ]).toArray(); // Récupération des résultats sous forme de tableau

        console.log('Activity Groups trouvés :', results); // Affiche tous les résultats

    } catch (error) {
        console.error('Erreur lors de l\'importation des données:', error);
    } finally {
        await client.close(); // Assure la fermeture de la connexion
    }
}

importJSON();
