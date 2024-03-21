// FormationPModel.js
const db = require('../config/db');
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const createFormation = async (formationData) => {
    try {
        const { titre, description, domaine, plant, prix, certeficat, niveaux, instructeurfp_id } = formationData;
        const insertQuery = `
            INSERT INTO formation_p (titre, description, domaine, plant, prix, certeficat, niveaux, instructeurfp_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const result = await db.query(insertQuery, [titre, description, domaine, plant, prix, certeficat, niveaux, instructeurfp_id]);
        return result;
    } catch (error) {
        throw error;
    }
};

const getFormationById = async (id_fp) => {
    try {
        const query = 'SELECT * FROM formation_p WHERE id_fp = ?';
        const [rows] = await db.query(query, [id_fp]);

        if (rows.length === 0) {
            return null; // Aucune formation trouvée pour cet ID
        }

        return rows[0]; // Retourne le premier élément du tableau (la formation correspondante)
    } catch (error) {
        throw error; // Propage l'erreur pour être gérée dans le contrôleur
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

module.exports = {
    createFormation,
    getAllFormations,
    updateFormation,
    deleteFormation,
    searchFormationsByTitre,
    getFormationById
};
