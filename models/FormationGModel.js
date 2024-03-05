const db = require('../config/db');

const createFormation = async (titre, description, contenu, domaine, plant, prix, certificat, id_instructeur) => {
    try {
        // Ajoutez votre logique pour obtenir l'ID de l'instructeur (supposons que cela soit obtenu via une méthode d'authentification)
        const idInstructeur = await obtenirIdInstructeur(); // Utilisez votre propre logique ici

        const query = 'INSERT INTO formation_p (titre, description, contenu, domaine, plant, prix, certificat, id_instructeur) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const result = await db.query(query, [titre, description, contenu, domaine || "domaine" , plant, prix, certificat, idInstructeur]);

        return result;
    } catch (error) {
        throw error;
    }
};


const getAllFormationsWithInstructeurInfo = () => {
    const query = `
        SELECT formation_p.*, instructeur.nom AS nom_instructeur, instructeur.prenom AS prenom_instructeur
        FROM formation_p
        INNER JOIN instructeur ON formation_p.id_instructeur = instructeur.id
    `;
    return db.query(query);
};

const updateFormation = (id, titre, description, contenu, domaine, plant, prix, certificat, id_instructeur) => {
    const query = 'UPDATE formation_p SET titre = ?, description = ?, contenu = ?, domaine = ?, plant = ?, prix = ?, certificat = ?, id_instructeur = ? WHERE id_fp = ?';
    return db.query(query, [titre, description, contenu, domaine, plant, prix, certificat, id_instructeur, id]);
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
    getAllFormationsWithInstructeurInfo,
    updateFormation,
    deleteFormation,
    searchFormationsByTitre,
};
