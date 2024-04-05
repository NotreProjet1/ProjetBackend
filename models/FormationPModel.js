// FormationPModel.js
const db = require('../config/db');
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const util = require('util');

const query = util.promisify(db.query).bind(db);

// const createFormation = async (formationData) => {
//     try {
//         const { titre, description, domaine, plant, prix, certeficat, niveaux } = formationData;
//         const insertQuery = `
//             INSERT INTO formation_p (titre, description, domaine, plant, prix, certeficat, niveaux)
//             VALUES (?, ?, ?, ?, ?, ?,?)
//         `;
//         const result = await db.query(insertQuery, [titre, description, domaine, plant, prix, certeficat, niveaux]);
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };
// const createFormation = async (req, res) => {
//     try {
//         const { titre, description, domaine, niveaux, prix, certeficat } = req.body;
//         const { coursIds } = req.body; // Tableau d'identifiants de cours
        
//         // Vérifiez si tous les champs requis sont présents
//         if (!titre || !description || !domaine || !niveaux || !prix || !certeficat) {
//             return res.status(400).json({ success: false, message: 'Veuillez fournir toutes les données requises.' });
//         }

//         // Créez la formation dans la base de données
//         const plant = req.Fnameup;
//         const formationData = { titre, description, domaine, plant, niveaux, prix, certeficat };
//         const result = await FormationModel.createFormation(formationData, coursIds); // Passez les identifiants de cours
        
//         const formationId = result.insertId;
//         req.Fnameup = undefined;
        
//         res.status(201).json({ 
//             success: true,
//             message: 'Formation créée avec succès.',
//             formationId: formationId
//         });
//     } catch (error) {
//         console.error('Erreur lors de la création de la formation :', error);
//         res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
//     }
// };
const createFormation = async (formationData, coursIds) => {
    try {
        const { titre, description, domaine, plant, prix, certeficat, niveaux } = formationData;
        
        // Insérez la formation dans la base de données
        const insertQuery = `
            INSERT INTO formation_p (titre, description, domaine, plant, prix, certeficat, niveaux)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const result = await db.query(insertQuery, [titre, description, domaine, plant, prix, certeficat, niveaux]);
        const formationId = result.insertId;
        
        // Associez les cours à la formation
        if (coursIds && coursIds.length > 0) {
            const associationQuery = `
                INSERT INTO courpayant (formation_id, id_cp ) VALUES ?
            `;
            const values = coursIds.map(id_coursp => [formationId, id_coursp]);
            await db.query(associationQuery, [values]);
        }
        
        return result;
    } catch (error) {
        throw error;
    }
};


const getFormationById = async (id_fp) => {
    try {
        const results = await query('SELECT * FROM formation_p WHERE id_fp = ?', [id_fp]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        throw error;
    }
};



const getAllFormations = () => {
    const query = 'SELECT * FROM formation_p';
    return db.query(query);
};

const updateFormation = (id, titre, description, contenu, domaine, plant, prix, certeficat) => {
    const query = 'UPDATE formation_p SET titre = ?, description = ?, contenu = ?, domaine = ?, plant = ?, prix = ?, certeficat = ? WHERE id_fp = ?';
    return db.query(query, [titre, description, contenu, domaine, plant, prix, certeficat, id]);
};

const deleteFormation = (id) => {
    const query = 'DELETE FROM formation_p WHERE id_fp = ?';
    return db.query(query, [id]);
};

const searchFormationsByTitre = (titre) => {
    const query = 'SELECT * FROM formation_p WHERE titre LIKE ?';
    const searchPattern = `%${titre}%`;
    return db.query(query, [searchPattern]);
};
const searchFormationsByDomaine = async (domaine) => {
    try {
        const results = await query('SELECT * FROM formation_p WHERE domaine = ?', [domaine]);
        return results;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createFormation,
    getAllFormations,
    updateFormation,
    deleteFormation,
    searchFormationsByTitre,
    getFormationById ,
    searchFormationsByDomaine
};
