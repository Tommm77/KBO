const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');

const establishmentRegex = /^2\.[0-9]{3}\.[0-9]{3}\.[0-9]{3}$/;
const writeStreamPath = path.join(__dirname, 'establishment.json');

const writeStream = fs.createWriteStream(writeStreamPath, { flags: 'w' });
let isFirstWrite = true;

let establishments = {};

async function processCSV(file, onData) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
            .pipe(csvParser())
            .on('data', onData)
            .on('end', () => {
                console.log(`${file} traité.`);
                resolve();
            })
            .on('error', reject);
    });
}

async function savePartialJSON(data) {
    return new Promise((resolve, reject) => {
        if (isFirstWrite) {
            writeStream.write('[', (err) => {
                if (err) return reject(err);
                isFirstWrite = false;
                writeStream.write(JSON.stringify(data, null, 2), resolve);
            });
        } else {
            writeStream.write(',', (err) => {
                if (err) return reject(err);
                writeStream.write(JSON.stringify(data, null, 2), resolve);
            });
        }
    });
}

async function finalizeJSON() {
    return new Promise((resolve, reject) => {
        writeStream.write(']', (err) => {
            if (err) return reject(err);
            writeStream.end(resolve);
        });
    });
}

async function processFiles() {
    try {
        await processCSV('../csv/establishment.csv', (row) => {
            const establishmentNumber = row.EstablishmentNumber;
            if (establishmentRegex.test(establishmentNumber)) {
                establishments[establishmentNumber] = {
                    EstablishmentNumber: establishmentNumber,
                    StartDate: row.StartDate,
                    EnterpriseNumber: row.EnterpriseNumber,
                    Activity: [],
                    Contact: []
                };
                console.log(`Establishment ajouté: ${establishmentNumber}`);
            }
        });

        await Promise.all([
            processCSV('../csv/activity.csv', (row) => {
                const establishmentNumber = row.EntityNumber;
                if (establishments[establishmentNumber]) {
                    establishments[establishmentNumber].Activity.push({
                        ActivityGroup: row.ActivityGroup,
                        NaceVersion: row.NaceVersion,
                        NaceCode: row.NaceCode,
                        Classification: row.Classification
                    });
                    console.log(`Activité ajoutée pour: ${establishmentNumber}`);
                }
            }),
            processCSV('../csv/address.csv', (row) => {
                const establishmentNumber = row.EntityNumber;
                if (establishments[establishmentNumber]) {
                    Object.assign(establishments[establishmentNumber], {
                        TypeOfAddress: row.TypeOfAddress,
                        CountryNL: row.CountryNL,
                        CountryFR: row.CountryFR,
                        Zipcode: row.Zipcode,
                        MunicipalityNL: row.MunicipalityNL,
                        MunicipalityFR: row.MunicipalityFR,
                        StreetNL: row.StreetNL,
                        StreetFR: row.StreetFR,
                        HouseNumber: row.HouseNumber,
                        Box: row.Box,
                        ExtraAddressInfo: row.ExtraAddressInfo,
                        DateStrikingOff: row.DateStrikingOff
                    });
                }
            }),
            processCSV('../csv/denomination.csv', (row) => {
                const establishmentNumber = row.EntityNumber;
                if (establishments[establishmentNumber]) {
                    if (!establishments[establishmentNumber].Denominations) {
                        establishments[establishmentNumber].Denominations = [];
                    }

                    establishments[establishmentNumber].Denominations.push({
                        Language: row.Language,
                        TypeOfDenomination: row.TypeOfDenomination,
                        Denomination: row.Denomination
                    });
                }
            }),
            processCSV('../csv/contact.csv', (row) => {
                const establishmentNumber = row.EntityNumber;
                if (establishments[establishmentNumber]) {
                    establishments[establishmentNumber].Contact.push({
                        EntityContact: row.EntityContact,
                        ContactType: row.ContactType,
                        Value: row.Value
                    });
                    console.log(`Contact ajouté pour: ${establishmentNumber}`);
                }
            })
        ]);

        for (const [key, value] of Object.entries(establishments)) {
            await savePartialJSON(value);
        }

        await finalizeJSON();
        console.log('Fichier establishment.json généré.');
    } catch (err) {
        console.error('Erreur lors du traitement des fichiers:', err);
    } finally {
        writeStream.end(); // Assure que le flux est toujours fermé
    }
}

processFiles();
