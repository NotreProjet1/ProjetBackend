// FormationPModel.js
const db = require('../config/db');



const createFormation =(titre, description, contenu, domaine, plant, prix, certeficat) => {
    const query = 'INSERT INTO formation_p (titre, description, contenu, domaine, plant, prix, certeficat) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return db.query(query, [titre, description, contenu, domaine || "domaine" , plant, prix, certeficat]);
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
};
