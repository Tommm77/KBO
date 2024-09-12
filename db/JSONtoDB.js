const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const JSONStream = require('JSONStream');
const es = require('event-stream');

const uri = 'mongodb://localhost:27017';
const dbName = 'kbo_final_db';
const collectionName = 'entreprise';

async function importJSON(filePath) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        console.log('Connexion à MongoDB...');
        await client.connect();
        console.log('Connecté à MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        console.log(`Lecture du fichier JSON depuis ${filePath}...`);
        const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
        const jsonStream = JSONStream.parse('*');

        let documentCount = 0;

        const esStream = es.mapSync(async (doc) => {
            try {
                console.log(`Insertion du document ${++documentCount}...`);
                await collection.insertOne(doc);
                console.log(`Document ${documentCount} inséré avec succès.`);
            } catch (error) {
                console.error(`Erreur lors de l'insertion du document ${documentCount}:`, error);
            }
        });

        readStream
            .pipe(jsonStream)
            .pipe(esStream)
            .on('end', () => {
                console.log('Toutes les données ont été insérées dans MongoDB.');
                client.close();
                console.log('Connexion à MongoDB fermée.');
            })
            .on('error', (err) => {
                console.error('Erreur dans le flux de lecture ou d\'insertion:', err);
                client.close();
            });

    } catch (error) {
        console.error('Erreur lors de l\'importation des données:', error);
    }
}

const filePath = path.join(__dirname, './entreprise_updated_translate.json');
importJSON(filePath);
