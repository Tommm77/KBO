// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const cors = require('cors'); // Importation du module CORS

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(cors());

// Configuration Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Entreprises',
            version: '1.0.0',
            description: 'API pour gérer les entreprises et les utilisateurs',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./app.js'], // Path to the API docs (this file)
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect('mongodb://localhost:27017/kbo_final_db');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/**
 * @swagger
 * /entreprise/id/{id}:
 *   get:
 *     summary: Récupérer une entreprise par son numéro d'entreprise
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numéro d'entreprise
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entreprise trouvée
 *       404:
 *         description: Entreprise non trouvée
 */
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

/**
 * @swagger
 * /entreprise/name/{name}:
 *   get:
 *     summary: Récupérer une entreprise par le début de son nom
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Début de la dénomination de l'entreprise
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des entreprises trouvées
 *       404:
 *         description: Entreprise non trouvée
 */
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
        console.log('data send');
        res.json(entreprises);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching entreprise', error });
    }
});

/**
 * @swagger
 * /entreprise/activity:
 *   get:
 *     summary: Récupérer des entreprises par activité et NaceCode
 *     parameters:
 *       - in: query
 *         name: ActivityGroup
 *         required: true
 *         description: Groupe d'activité de l'entreprise
 *         schema:
 *           type: string
 *       - in: query
 *         name: NaceCode
 *         required: true
 *         description: Code NACE de l'activité
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des entreprises trouvées
 *       404:
 *         description: Entreprise non trouvée
 */
app.get('/entreprise/activity/', async (req, res) => {
    const activityGroup = req.query.ActivityGroup;
    let naceCode = req.query.NaceCode;

    // Vérification si le naceCode a au moins 3 caractères
    if (naceCode.length >= 3) {
        naceCode = new RegExp(`^${naceCode}`, 'i'); // Recherche par expression régulière
    } else {
        return res.status(400).json({ message: 'Le NaceCode doit contenir au moins 3 caractères.' });
    }

    console.log(`Fetching entreprise with ActivityGroup: ${activityGroup} and NaceCode: ${naceCode}`);

    try {
        const entreprises = await db.collection('entreprise').find({
            "Activity": {
                "$elemMatch": {
                    "NaceCode": naceCode,
                    "ActivityGroup": activityGroup
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

/**
 * @swagger
 * /entreprise/zipcode/{zipcode}:
 *   get:
 *     summary: Récupérer une entreprise par code postal
 *     parameters:
 *       - in: path
 *         name: zipcode
 *         required: true
 *         description: Code postal de l'entreprise
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des entreprises trouvées
 *       404:
 *         description: Entreprise non trouvée
 */
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

/**
 * @swagger
 * /entreprise/city/{city}:
 *   get:
 *     summary: Récupérer une entreprise par ville
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         description: Nom de la ville (MunicipalityFR)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des entreprises trouvées
 *       404:
 *         description: Entreprise non trouvée
 */
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

/**
 * @swagger
 * /user/{email}:
 *   get:
 *     summary: Récupérer un utilisateur par email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Adresse e-mail de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
app.get('/user/:email', async (req, res) => {

    const email = req.params.email;
    try {
        const user = await db.collection('user').findOne({email: email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message: 'Error fetching user', error});
    }
});

app.use(express.json());

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Utilisateur créé avec succès
 *       500:
 *         description: Erreur lors de la création de l'utilisateur
 */
app.post('/user', async (req, res) => {
    const user = req.body;
    console.log('Creating user:', req.body);
    try {
        await db.collection('user').insertOne(user);
        res.json(user);
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error});
    }
});

/**
 * @swagger
 * /user/{name}:
 *   patch:
 *     summary: Mettre à jour un utilisateur par nom
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nom de l'utilisateur
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       500:
 *         description: Erreur lors de la mise à jour de l'utilisateur
 */
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