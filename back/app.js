// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/kbo_final_db');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/entreprise/id/:id', async (req, res) => {
    const EnterpriseNumber = req.params.id;
    console.log(`Fetching entreprise with EnterpriseNumber: ${EnterpriseNumber}`);
    try {
        const entreprise = await db.collection('entreprise').findOne({ EnterpriseNumber: EnterpriseNumber });
        if (!entreprise) {
            return res.status(404).json({ message: 'Entreprise not found' });
        }
        res.json(entreprise);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching entreprise', error });
    }
});

app.get('/entreprise/name/:name', async (req, res) => {
    const name = req.params.name;
    console.log(`Fetching entreprise with Denomination starting with: ${name}`);

    try {
        const regex = new RegExp(`^${name}`, 'i');

        const entreprises = await db.collection('entreprise').find({
            'Denominations.Denomination': {
                $regex: regex
            }
        }).toArray();

        if (!entreprises.length) {
            return res.status(404).json({ message: 'Entreprise not found' });
        }

        res.json(entreprises);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching entreprise', error });
    }
});

app.get('/entreprise/activity/', async (req, res) => {
    const activityGroup = req.query.ActivityGroup;
    const naceCode = req.query.NaceCode;


    try {
        const entreprises = await db.collection('entreprise').find({
            "Activity": {
                "$elemMatch": {
                    "ActivityGroup": activityGroup,
                    "NaceCode": naceCode
                }
            }
        }).toArray();

        console.log('Résultats trouvés :', entreprises);

        if (!entreprises.length) {
            return res.status(404).json({ message: 'Entreprise not found' });
        }

        res.json(entreprises);
    } catch (error) {
        console.error('Error fetching entreprise:', error);
        res.status(500).json({ message: 'Error fetching entreprise', error });
    }
});

app.get('/entreprise/zipcode/:zipcode', async (req, res) => {
    const zipcode = req.params.zipcode;
    console.log(`Fetching entreprise with ZipCode: ${zipcode}`);

    try {
        const entreprises = await db.collection('entreprise').find({ 'Zipcode': zipcode }).toArray();

        if (!entreprises.length) {
            return res.status(404).json({ message: 'Entreprise not found' });
        }

        res.json(entreprises);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching entreprise', error });
    }

});

app.get('/entreprise/city/:city', async (req, res) => {
    const MunicipalityFR = req.params.city;
    console.log(`Fetching entreprise with MunicipalityFR: ${MunicipalityFR}`);

    try {
        const entreprises = await db.collection('entreprise').find({ 'MunicipalityFR': MunicipalityFR }).toArray();

        if (!entreprises.length) {
            return res.status(404).json({ message: 'Entreprise not found' });
        }

        res.json(entreprises);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching entreprise', error });
    }
});

app.get('/user/:name', async (req, res) => {

    const name = req.params.name;
    try {
        const user = await db.collection('user').findOne({name: name});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message: 'Error fetching user', error});
    }
});

app.post('/user', async (req, res) => {
    const user = req.body;
    try {
        await db.collection('user').insertOne(user);
        res.json(user);
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error});
    }
});

app.patch('/user/:name', async (req, res) => {
    const name = req.params.name;
    const user = req.body;
    try {
        await db.collection('user').updateOne({ name: name }, { $set: user });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});