const db = require('../config/db');

const createResssource = (titre, contenu, description ,type) => {
    const query = 'INSERT INTO ressource_pedagogique (titre, contenu, description , type) VALUES (?, ?, ?, ?)';
    return db.query(query, [titre, contenu, description , type]);
};

const getAllResssources = () => {
    const query = 'SELECT * FROM ressource_pedagogique';
    return db.query(query);
};

const getResssourceById = (ResssourceId) => {
    const query = 'SELECT * FROM ressource_pedagogique WHERE id = ?';
    return db.query(query, [ResssourceId]);
};

const updateResssource = (ResssourceId, titre, contenu, description , type) => {
    const query = 'UPDATE ressource_pedagogique SET titre = ?, contenu = ?, description = ?  , type=? WHERE id = ?';
    return db.query(query, [titre, contenu, description,type, ResssourceId]);
};

const deleteResssource = (ResssourceId) => {
    const query = 'DELETE FROM ressource_pedagogique WHERE id = ?';
    return db.query(query, [ResssourceId]);
};

const searchResssources = (searchTerm) => {
    const query = `
        SELECT *
        FROM ressource_pedagogique
        WHERE titre LIKE ? OR contenu LIKE ? OR description LIKE ?
    `;
    const searchPattern = `%${searchTerm}%`;
    return db.query(query, [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern]);
};

module.exports = {
    createResssource,
    getAllResssources,
    getResssourceById,
    updateResssource,
    deleteResssource,
    searchResssources,
};
