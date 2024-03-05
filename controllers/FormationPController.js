// controllerformation.js
const FormationModel = require('../models/FormationPModel');
const db = require('../config/db');
const util = require('util');

const query = util.promisify(db.query).bind(db);
const { authenticateToken } = require('../middleware/authMiddleware'); // Ajout de l'importation

const errorHandler = (res, message) => {
    console.error(message);
    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
};

const createFormation = async (req, res) => {
    try {
        // Vérification du token
        authenticateToken(req, res, async () => {
            const { titre, description, contenu, domaine, plant, prix, certeficat } = req.body;

            // Obtenez l'ID de l'instructeur à partir du token
            const instructeurId = req.user.id;

            const result = await FormationModel.createFormation(titre, description, contenu, domaine, plant, prix, certeficat, instructeurId);
            const formationId = result.insertId;

            res.status(201).json({
                success: true,
                message: 'Formation créée avec succès.',
                formationId: formationId
            });
        });
    } catch (error) {
        console.error('Error in createFormation:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};


const updateFormation = async (id_fp, titre, description, contenu, domaine, plant, prix, certeficat) => {
    const updateQuery = `
        UPDATE formation_p
        SET titre = ?, description = ?, contenu = ?, domaine = ?, plant = ?, prix = ?, certeficat = ?
        WHERE id_fp = ?
    `;

    await db.query(updateQuery, [titre, description, contenu, domaine, plant, prix, certeficat, id_fp]);

    // Sélectionnez la formation mise à jour après la mise à jour
    const selectQuery = 'SELECT * FROM formation_p WHERE id_fp = ?';
    const [updatedFormation] = await db.query(selectQuery, [id_fp]);

    return updatedFormation;
};



const getAllFormations = async (req, res) => {
    try {
        const results = await query('SELECT * FROM formation_p');
        
        // Convertir les résultats en une structure de données simple
        const formations = results.map(result => ({ ...result }));

        return res.status(200).json({ success: true, liste: formations });
    } catch (err) {
        return errorHandler(res, err);
    }
};




const deleteFormation = async (req, res) => {
    try {
        const { id_fp } = req.params;
        const result = await FormationModel.deleteFormation(id_fp);

        res.status(200).json({ success: true, message: 'Formation supprimée avec succès.', result });
    } catch (error) {
        console.error('Error in deleteFormation:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const searchFormationsByTitre = async (req, res) => {
    try {
        const { titre } = req.query;
        const results = await FormationModel.searchFormationsByTitre(titre);

        res.status(200).json({ success: true, formations: results });
    } catch (error) {
        console.error('Error in searchFormationsByTitre:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

module.exports = {
    createFormation,
    getAllFormations,
    updateFormation,
    deleteFormation,
    searchFormationsByTitre
};
