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
        const query = 'INSERT INTO courpayant (titre, description, contenu) VALUES (?, ?,?)';
        const result = await db.query(query, [titre	, description, contenu]);
        return result;
    } catch (error) {
        throw new Error('Erreur lors de la création de la cours dans la base de données');
    }
};
const getcoursById = async (id_fp) => {
    try {
      const query = 'SELECT * FROM courpayant WHERE id_fp = ?';
      const [rows] = await db.query(query, [id_fp]);
  
      if (rows.length === 0) {
        return null; // Aucune cours trouvée pour cet ID
      }
  
      return rows[0]; // Retourne le premier élément du tableau (la cours correspondante)
    } catch (error) {
      throw error; // Propage l'erreur pour être gérée dans le contrôleur
    }
  };


const getAllcourss = () => {
    const query = 'SELECT * FROM courpayant';
    return db.query(query);
};

const updatecours = (id, titre, description, contenu) => {
    const query = 'UPDATE courpayant SET titre = ?, description = ?, contenu = ? WHERE id_fp = ?';
    return db.query(query, [titre, description, contenu, id]);
};

const deletecours = (id) => {
    const query = 'DELETE FROM courpayant WHERE id_fp = ?';
    return db.query(query, [id]);
};

const searchcourssByTitre = (titre) => {
    const query = 'SELECT * FROM courpayant WHERE titre LIKE ?';
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
