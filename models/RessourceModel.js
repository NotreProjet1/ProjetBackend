// RessourcePModel.js
const db = require('../config/db');
const express = require('express');

const app = express();
            
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const util = require('util');

const query = util.promisify(db.query).bind(db);

const createRessource = async (RessourceData) => {
    try {
        const { titre, description,  contenu } = RessourceData;
        const query = 'INSERT INTO ressource_pedagogique (titre, description, contenu) VALUES (?, ?,?)';
        const result = await db.query(query, [titre	, description, contenu]);
        return result;
    } catch (error) {
        throw new Error('Erreur lors de la création de la Ressource dans la base de données');
    }
};


const getRessourceById = async (id_r) => {
    try {
        const results = await query('SELECT * FROM ressource_pedagogique WHERE id_r = ?', [id_r]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        throw error;
    }
};


const getAllRessources = () => {
    const query = 'SELECT * FROM ressource_pedagogique';
    return db.query(query);
};

const updateRessource = (id_r, titre, description, contenu) => {
    const query = 'UPDATE ressource_pedagogique SET titre = ?, description = ?, contenu = ? WHERE id_r = ?';
    return db.query(query, [titre, description, contenu, id_r]);
};

const deleteRessource = (id) => {
    const query = 'DELETE FROM ressource_pedagogique WHERE id_r = ?';
    return db.query(query, [id_r]);
};

const searchRessourcesByTitre = (titre) => {
    const query = 'SELECT * FROM ressource_pedagogique WHERE titre LIKE ?';
    const searchPattern = `%${titre}%`;
    return db.query(query, [searchPattern]);
};


module.exports = {
    createRessource,
    getAllRessources,
    updateRessource,
    deleteRessource,
    searchRessourcesByTitre,
    getRessourceById
};
