// ressourcePModel.js
const db = require('../config/db');
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const createressource = async (ressourceData) => {
    try {
        const { titre, description,  contenu } = ressourceData;
        const query = 'INSERT INTO ressource_pedagogique (titre, description, contenu) VALUES (?, ?,?)';
        const result = await db.query(query, [titre	, description, contenu]);
        return result;
    } catch (error) {
        throw new Error('Erreur lors de la création de la ressource dans la base de données');
    }
};
const getressourceById = async (id_fp) => {
    try {
      const query = 'SELECT * FROM ressource_pedagogique WHERE id_fp = ?';
      const [rows] = await db.query(query, [id_fp]);
  
      if (rows.length === 0) {
        return null; // Aucune ressource trouvée pour cet ID
      }
  
      return rows[0]; // Retourne le premier élément du tableau (la ressource correspondante)
    } catch (error) {
      throw error; // Propage l'erreur pour être gérée dans le contrôleur
    }
  };


const getAllressources = () => {
    const query = 'SELECT * FROM ressource_pedagogique';
    return db.query(query);
};

const updateressource = (id, titre, description, contenu) => {
    const query = 'UPDATE ressource_pedagogique SET titre = ?, description = ?, contenu = ? WHERE id_fp = ?';
    return db.query(query, [titre, description, contenu, id]);
};

const deleteressource = (id) => {
    const query = 'DELETE FROM ressource_pedagogique WHERE id_fp = ?';
    return db.query(query, [id]);
};

const searchressourcesByTitre = (titre) => {
    const query = 'SELECT * FROM ressource_pedagogique WHERE titre LIKE ?';
    const searchPattern = `%${titre}%`;
    return db.query(query, [searchPattern]);
};

module.exports = {
    createressource,
    getAllressources,
    updateressource,
    deleteressource,
    searchressourcesByTitre,
    getressourceById
};
