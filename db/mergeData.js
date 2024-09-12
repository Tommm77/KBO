const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

async function indexData(filePath, key) {
    console.log(`Début de l'indexation des données depuis ${filePath}`);
    const dataMap = new Map();
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
        const parser = JSONStream.parse('*');

        let lineNumber = 0;

        readStream.pipe(parser);

        parser.on('data', (item) => {
            lineNumber++;
            const keyValue = item[key];
            if (!dataMap.has(keyValue)) {
                dataMap.set(keyValue, []);
            }
            dataMap.get(keyValue).push(item);
        });

        parser.on('end', () => {
            console.log(`Indexation terminée pour ${filePath}`);
            resolve(dataMap);
        });

        parser.on('error', (error) => {
            console.error(`Erreur lors de l'indexation des données depuis ${filePath}:`, error);
            console.error(`Erreur à la ligne ${lineNumber}`);
            reject(error);
        });
    });
}

async function mergeData() {
    try {
        const enterprisePath = path.join(__dirname, 'entreprises.json');
        const establishmentsPath = path.join(__dirname, 'establishment.json');
        const branchesPath = path.join(__dirname, 'branch.json');
        const updatedEnterprisePath = path.join(__dirname, 'entreprise_updated.json');

        console.log('Début de la fusion des données');

        const establishmentMap = await indexData(establishmentsPath, 'EnterpriseNumber');
        const branchMap = await indexData(branchesPath, 'EnterpriseNumber');

        const writeStream = fs.createWriteStream(updatedEnterprisePath, { flags: 'w' });
        writeStream.write('[\n');

        let first = true;

        console.log(`Traitement des données de ${enterprisePath}`);
        const readStream = fs.createReadStream(enterprisePath, { encoding: 'utf8' });
        const parser = JSONStream.parse('*');

        let lineNumber = 0;

        readStream.pipe(parser);

        parser.on('data', (enterprise) => {
            lineNumber++;
            if (!first) {
                writeStream.write(',\n');
            }
            first = false;

            const { EnterpriseNumber } = enterprise;
            console.log(`Ajout des données pour l'entreprise ${EnterpriseNumber}`);
            enterprise.Establishment = establishmentMap.get(EnterpriseNumber) || [];
            enterprise.Branch = branchMap.get(EnterpriseNumber) || [];

            writeStream.write(JSON.stringify(enterprise, null, 2));
        });

        parser.on('end', () => {
            writeStream.write('\n]');
            writeStream.end();
            console.log('Fichier entreprise_updated.json généré.');
        });

        parser.on('error', (error) => {
            console.error('Erreur lors de la lecture des données:', error);
            console.error(`Erreur à la ligne ${lineNumber}`);
        });

        writeStream.on('error', (error) => {
            console.error('Erreur lors de l\'écriture du fichier:', error);
        });

    } catch (error) {
        console.error('Erreur lors de la fusion des données:', error);
    }
}

mergeData();
