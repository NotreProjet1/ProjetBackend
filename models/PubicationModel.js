const db = require('../config/db');

const createPublication = (titre, contenu, description,id_instructeur ) => {
    const query = 'INSERT INTO publication (titre, contenu, description,id_instructeur ) VALUES (?,?, ?, ?)';
    return db.query(query, [titre, contenu, description,id_instructeur]);
};

const getAllPublications = () => {
    const query = 'SELECT * FROM publication';
    return db.query(query);
};

const getPublicationById = (PublicationId) => {
    const query = 'SELECT * FROM publication WHERE id = ?';
    return db.query(query, [PublicationId]);
};

const updatePublication = (PublicationId, titre, contenu, description) => {
    const query = 'UPDATE publication SET titre = ?, contenu = ?, description = ? WHERE id = ?';
    return db.query(query, [titre, contenu, description, PublicationId]);
};

const deletePublication = (PublicationId) => {
    const query = 'DELETE FROM courpayant WHERE id = ?';
    return db.query(query, [PublicationId]);
};

const searchPublications = (searchTerm) => {
    const query = `
        SELECT *
        FROM publication
        WHERE titre LIKE ? OR contenu LIKE ? OR description LIKE ?
    `;
    const searchPattern = `%${searchTerm}%`;
    return db.query(query, [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern]);
};

module.exports = {
    createPublication,
    getAllPublications,
    getPublicationById,
    updatePublication,
    deletePublication,
    searchPublications,
};
