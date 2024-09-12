const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');

const branchRegex = /^9\.[0-9]{3}\.[0-9]{3}\.[0-9]{3}$/s;

let branches = {};
let isFirstWrite = true;
const writeStream = fs.createWriteStream(path.join(__dirname, 'branch.json'), { flags: 'w' });

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
    console.log('Fichier branch.json généré.');
}

async function processFiles() {
    await processCSV('../csv/branch.csv', (row) => {
        const branchNumber = row.Id;
        if (branchRegex.test(branchNumber)) {
            branches[branchNumber] = {
                Id: branchNumber,
                StartDate: row.StartDate,
                EnterpriseNumber: row.EnterpriseNumber,
            };
            console.log(`Branch ajouté: ${branchNumber}`);
        }
    });

    await Promise.all([
        processCSV('../csv/address.csv', (row) => {
            const branchNumber = row.EntityNumber;
            if (branches[branchNumber]) {
                branches[branchNumber].TypeOfAddress = row.TypeOfAddress;
                branches[branchNumber].CountryNL = row.CountryNL;
                branches[branchNumber].CountryFR = row.CountryFR;
                branches[branchNumber].Zipcode = row.Zipcode;
                branches[branchNumber].MunicipalityNL = row.MunicipalityNL;
                branches[branchNumber].MunicipalityFR = row.MunicipalityFR;
                branches[branchNumber].StreetNL = row.StreetNL;
                branches[branchNumber].StreetFR = row.StreetFR;
                branches[branchNumber].HouseNumber = row.HouseNumber;
                branches[branchNumber].Box = row.Box;
                branches[branchNumber].ExtraAddressInfo = row.ExtraAddressInfo;
                branches[branchNumber].DateStrikingOff = row.DateStrikingOff;
                console.log(`Adresse ajoutée pour: ${branchNumber}`);
            }
        }),
        processCSV('../csv/denomination.csv', (row) => {
            const branchNumber = row.EntityNumber;
            if (branches[branchNumber]) {
                if (!branches[branchNumber].Denominations) {
                    branches[branchNumber].Denominations = [];
                }

                branches[branchNumber].Denominations.push({
                    Language: row.Language,
                    TypeOfDenomination: row.TypeOfDenomination,
                    Denomination: row.Denomination
                });
            }
        }),
    ]);

    for (const [key, value] of Object.entries(branches)) {
        await savePartialJSON(value);
    }

    await finalizeJSON();
}

processFiles().catch(err => console.error('Erreur lors du traitement des fichiers:', err));
