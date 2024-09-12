const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');

const entityRegex = /^[0-9]{4}\.[0-9]{3}\.[0-9]{3}$/;

let isFirstWrite = true;
const writeStream = fs.createWriteStream(path.join(__dirname, 'entreprises.json'), { flags: 'w' });


let entreprises = {};

async function processCSV(file, onData) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
            .pipe(csvParser())
            .on('data', (row) => {
                onData(row);
            })
            .on('end', () => {
                console.log(`${file} traité.`);
                resolve();
            })
            .on('error', reject);
    });
}

async function savePartialJSON(data) {
    if (isFirstWrite) {
        writeStream.write('[');
        isFirstWrite = false;
    } else {
        writeStream.write(',');
    }

    writeStream.write(JSON.stringify(data, null, 2));
}

async function finalizeJSON() {
    writeStream.write(']');
    writeStream.end();
    console.log('Fichier entreprises.json généré.');
}

async function processFiles() {
    // Traitement des entreprises
    await processCSV('../csv/enterprise.csv', (row) => {
        const enterpriseNumber = row.EnterpriseNumber;
        if (entityRegex.test(enterpriseNumber)) {
            entreprises[enterpriseNumber] = {
                EnterpriseNumber: enterpriseNumber,
                Status: row.Status,
                JuridicalSituation: row.JuridicalSituation,
                TypeOfEnterprise: row.TypeOfEnterprise,
                JuridicalForm: row.JuridicalForm,
                JuridicalFormCAC: row.JuridicalFormCAC || null,
                StartDate: row.StartDate,
                Establishment: [],
                Branch: [],
                Activity: [], // Initialisation du tableau pour les activités
                Contact: [] // Initialisation du tableau pour les contacts
            };
        }
    });

    // Traitement des autres fichiers CSV
    await Promise.all([
        processCSV('../csv/activity.csv', (row) => {
            const entityNumber = row.EntityNumber;
            if (entreprises[entityNumber]) {
                entreprises[entityNumber].Activity.push({
                    ActivityGroup: row.ActivityGroup,
                    NaceVersion: row.NaceVersion,
                    NaceCode: row.NaceCode,
                    Classification: row.Classification
                });
            }
        }),
        processCSV('../csv/address.csv', (row) => {
            const entityNumber = row.EntityNumber;
            if (entreprises[entityNumber]) {
                entreprises[entityNumber].TypeOfAddress = row.TypeOfAddress;
                entreprises[entityNumber].CountryNL = row.CountryNL;
                entreprises[entityNumber].CountryFR = row.CountryFR;
                entreprises[entityNumber].Zipcode = row.Zipcode;
                entreprises[entityNumber].MunicipalityNL = row.MunicipalityNL;
                entreprises[entityNumber].MunicipalityFR = row.MunicipalityFR;
                entreprises[entityNumber].StreetNL = row.StreetNL;
                entreprises[entityNumber].StreetFR = row.StreetFR;
                entreprises[entityNumber].HouseNumber = row.HouseNumber;
                entreprises[entityNumber].Box = row.Box;
                entreprises[entityNumber].ExtraAddressInfo = row.ExtraAddressInfo;
                entreprises[entityNumber].DateStrikingOff = row.DateStrikingOff;
            }
        }),
        processCSV('../csv/denomination.csv', (row) => {
            const entityNumber = row.EntityNumber;
            if (entreprises[entityNumber]) {
                if (!entreprises[entityNumber].Denominations) {
                    entreprises[entityNumber].Denominations = [];
                }

                entreprises[entityNumber].Denominations.push({
                    Language: row.Language,
                    TypeOfDenomination: row.TypeOfDenomination,
                    Denomination: row.Denomination
                });
            }
        }),
        processCSV('../csv/contact.csv', (row) => {
            const entityNumber = row.EntityNumber;
            if (entreprises[entityNumber]) {
                entreprises[entityNumber].Contact.push({
                    EntityContact: row.EntityContact,
                    ContactType: row.ContactType,
                    Value: row.Value
                });
            }
        })
    ]);

    for (const [key, value] of Object.entries(entreprises)) {
        await savePartialJSON(value);
    }

    await finalizeJSON();
}

processFiles().catch(err => console.error('Erreur lors du traitement des fichiers:', err));
