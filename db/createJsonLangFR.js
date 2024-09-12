const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

const inputFilePath = path.join(__dirname, '../csv/code.csv');
const outputFilePath = path.join(__dirname, 'langFR.json');

const result = {};

async function processCSV() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(inputFilePath)
            .pipe(csvParser())
            .on('data', (row) => {
                if (row.Language === 'FR') {
                    const category = row.Category;
                    const code = row.Code;
                    const description = row.Description;

                    if (!result[category]) {
                        result[category] = {};
                    }
                    result[category][code] = description;
                }
            })
            .on('end', () => {
                fs.writeFile(outputFilePath, JSON.stringify(result, null, 2), (err) => {
                    if (err) return reject(err);
                    console.log(`Fichier JSON filtré et structuré créé à ${outputFilePath}`);
                    resolve();
                });
            })
            .on('error', reject);
    });
}

processCSV().catch(err => console.error('Erreur lors du filtrage du fichier CSV:', err));
