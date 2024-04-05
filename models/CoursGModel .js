// coursPModel.js
const db = require('../config/db');
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const createcours = async (coursData) => {
    try {
        const { titre, description,  contenu } = coursData;
        const query = 'INSERT INTO courgratuits (titre, description, contenu) VALUES (?, ?,?)';
        const result = await db.query(query, [titre	, description, contenu]);
        return result;
    } catch (error) {
        throw new Error('Erreur lors de la création de la cours dans la base de données');
    }
};
const getcoursById = async (id_cg) => {
    try {
        const query = 'SELECT * FROM courgratuits WHERE id_cg = ?';
        const [rows] = await db.query(query, [id_cg]);

        if (!rows || rows.length === 0) {
            return null; // Aucune cours trouvée pour cet ID
        } 

        return rows[0]; // Retourne le premier objet résultat
    } catch (error) {
        throw error; // Propage l'erreur pour être gérée dans le contrôleur
    }
};




const getAllcourss = () => {
    const query = 'SELECT * FROM courgratuits';
    return db.query(query);
};

const updatecours = (id_cg, titre, description, contenu) => {
    const query = 'UPDATE courgratuits SET titre = ?, description = ?, contenu = ? WHERE id_cg = ?';
    return db.query(query, [titre, description, contenu, id_cg]);
};


const deletecours = (id_cg) => {
    const query = 'DELETE FROM courgratuits WHERE id_cg= ?';
    return db.query(query, [id_cg]);
};

const searchcourssByTitre = (titre) => {
    const query = 'SELECT * FROM courgratuits WHERE titre LIKE ?';
    const searchPattern = `%${titre}%`;
    return db.query(query, [searchPattern]);
};

module.exports = {
    createcours,
    getAllcourss,
    updatecours,
    deletecours,
    searchcourssByTitre,
    getcoursById
};
