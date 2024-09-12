const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');
const es = require('event-stream');

const langFr = require('./langFR.json');

function replaceCodes(obj, langFr) {
    const categories = [
        'ActivityGroup',
        'Classification',
        'ContactType',
        'EntityContact',
        'JuridicalForm',
        'JuridicalSituation',
        'Language',
        'Nace2003',
        'Nace2008',
        'Status',
        'TypeOfAddress',
        'TypeOfDenomination'
    ];

    function traverseAndReplace(obj) {
        if (typeof obj === 'object' && obj !== null) {
            for (const key in obj) {
                if (categories.includes(key) && langFr[key] && langFr[key][obj[key]]) {
                    obj[key] = langFr[key][obj[key]];
                }

                if (typeof obj[key] === 'object') {
                    traverseAndReplace(obj[key]);
                }
            }
        }
    }

    function replaceNaceCode(activity, langFr) {
        if (activity.NaceVersion && langFr[`Nace${activity.NaceVersion}`]) {
            const naceTranslations = langFr[`Nace${activity.NaceVersion}`];
            if (activity.NaceCode && naceTranslations[activity.NaceCode]) {
                activity.NaceCode = naceTranslations[activity.NaceCode];
            }
        }
    }

    function processActivityArray(array, langFr) {
        array.forEach(activity => {
            replaceNaceCode(activity, langFr);
            traverseAndReplace(activity);
        });
    }

    function processEstablishmentArray(array, langFr) {
        array.forEach(establishment => {
            if (Array.isArray(establishment.Activity)) {
                processActivityArray(establishment.Activity, langFr);
            }
            traverseAndReplace(establishment);
        });
    }

    if (Array.isArray(obj.Activity)) {
        processActivityArray(obj.Activity, langFr);
    }

    if (Array.isArray(obj.Establishment)) {
        processEstablishmentArray(obj.Establishment, langFr);
    }

    traverseAndReplace(obj);

    return obj;
}

const inputFilePath = path.join(__dirname, './entreprise_updated.json');
const outputFilePath = path.join(__dirname, 'entreprise_updated_translate.json');

const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });
const writeStream = fs.createWriteStream(outputFilePath, { flags: 'w' });

writeStream.write('[\n');

let isFirst = true;
let counter = 0;

console.log('Début du traitement...');

readStream
    .pipe(JSONStream.parse('*'))
    .pipe(es.mapSync((enterprise) => {
        enterprise = replaceCodes(enterprise, langFr);

        if (!isFirst) {
            writeStream.write(',\n');
        }
        isFirst = false;

        counter++;
        if (counter % 1000 === 0) {
            console.log(`${counter} entreprises traitées...`);
        }

        return JSON.stringify(enterprise, null, 2);
    }))
    .pipe(es.through(function (data) {
        this.emit('data', data);
    }))
    .pipe(writeStream);

readStream.on('end', () => {
    writeStream.write('\n]');
    writeStream.end();
    console.log('Le fichier JSON mis à jour a été généré avec succès.');
});

readStream.on('error', (err) => {
    console.error('Erreur lors de la lecture du fichier JSON:', err);
});

writeStream.on('error', (err) => {
    console.error('Erreur lors de l\'écriture du fichier JSON:', err);
});
