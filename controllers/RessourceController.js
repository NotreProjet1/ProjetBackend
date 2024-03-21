const ressourceModel = require('../models/RessourceModel');
const db = require('../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const { authenticateToken , generateToken } = require('../middleware/authMiddleware');

const errorHandler = (res, message) => {
    console.error(message);
    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
};

const createressource = async (req, res) => {
    try {
        // Utiliser authenticateToken pour vérifier le token
        (req, res, async () => {
            // Vérifier si le token est correctement attaché à la requête
         

            // Récupérer l'ID de l'utilisateur à partir du token
            const userId = req.user.id;

            // Récupérer les données de la requête
            const { titre, description } = req.body;

            // Vérifier si tous les champs requis sont présents
            if (!titre || !description || !req.Fnameup) {
                return res.status(400).json({ success: false, message: 'Veuillez fournir toutes les données requises.' });
            }

            // Récupérer le contenu du cours depuis req.Fnameup
            const contenu = req.Fnameup;

            // Créer la ressource dans la base de données avec l'ID de l'utilisateur
            const ressourceData = { titre, description, contenu, userId };
            const result = await ressourceModel.createressource(ressourceData);
            const ressourceId = result.insertId;

            res.status(201).json({
                success: true,
                message: 'Ressource créée avec succès.',
                ressourceId: ressourceId
            });
        });
    } catch (error) {
        console.error('Error in createressource:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const updateressource = async (id_r, titre, description) => {
    const updateQuery = `
        UPDATE ressource_pedagogique
        SET titre = ?, description = ?, contenu = ?
        WHERE id_r = ?
    `;

    await db.query(updateQuery, [titre, description, id_r]);

    // Sélectionnez la ressource mise à jour après la mise à jour
    const selectQuery = 'SELECT * FROM ressource_pedagogique WHERE id_r = ?';
    const [updatedressource] = await db.query(selectQuery, [id_r]);

    return updatedressource;
};


const getAllressources = async (req, res) => {
    try {
        const results = await query('SELECT * FROM ressource_pedagogique');
        
        // Convertir les résultats en une structure de données simple
        const ressources = results.map(result => ({
            id: result.id,
            titre: result.titre,
            description: result.description,
            plantFile: result.plantFile // Envoyer juste le nom du fichier
        }));

        return res.status(200).json({ success: true, liste: ressources });
    } catch (err) {
        return errorHandler(res, err);
    }
};






const deleteressource = async (req, res) => {
    try {
        const { id_r } = req.params;
        const result = await ressourceModel.deleteressource(id_r);

        res.status(200).json({ success: true, message: 'ressource supprimée avec succès.', result });
    } catch (error) {
        console.error('Error in deleteressource:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const searchressourcesByTitre = async (req, res) => {
    try {
        const { titre } = req.query;
        const results = await ressourceModel.searchressourcesByTitre(titre);

        res.status(200).json({ success: true, ressources: results });
    } catch (error) {
        console.error('Error in searchressourcesByTitre:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};
const getressourceById = async (req, res) => {
    try {
        const { id_r } = req.params;
        const ressource = await ressourceModel.getressourceById(id_r);

        if (!ressource) {
            return res.status(404).json({ success: false, message: 'ressource non trouvée.' });
        }

        res.status(200).json({ success: true, ressource });
    } catch (error) {
        console.error('Error in getressourceById:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

module.exports = {
    createressource,
    getAllressources,
    updateressource,
    deleteressource,
    searchressourcesByTitre,
    getressourceById
};
