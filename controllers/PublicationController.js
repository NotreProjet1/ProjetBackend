const CoursModel = require('../models/PubicationModel');
const db = require('../config/db');
const { authenticateToken } = require('../middleware/authMiddleware');
const util = require('util');

const query = util.promisify(db.query).bind(db);

const errorHandler = (res, message) => {
    console.error(message);
    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
};

const createPublication = async (req, res) => {
    try {
        authenticateToken(req, res, async () => {
            const { titre, contenu, description } = req.body;
            const id_instructeur = req.user.id;

            const result = await CoursModel.createPublication(titre, contenu, description, id_instructeur);
            const PublicationId = result.insertId;

            res.status(201).json({
                success: true,
                message: 'publication créé avec succès.',
                PublicationId: PublicationId
            });
        });
    } catch (error) {
        console.error('Error in createPublication:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};


const getAllPublications = async (req, res) => {
  try {
      const results = await query('SELECT * FROM publication');
      return res.status(200).json({ success: true, liste: results });
  } catch (err) {
      return errorHandler(res, err);
  }
};


const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, contenu, description } = req.body;

        const result = await CoursModel.updatePublication(id, titre, contenu, description);
        res.status(200).json({ success: true, message: 'Cours modifié avec succès.', result });
    } catch (error) {
        console.error('Error in updatePublication:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await CoursModel.deletePublication(id);

        res.status(200).json({ success: true, message: 'Cours supprimé avec succès.', result });
    } catch (error) {
        console.error('Error in deletePublication:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const searchPublications = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const results = await CoursModel.searchPublications(searchTerm);

        res.status(200).json({ success: true, Publications: results });
    } catch (error) {
        console.error('Error in searchPublications:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

module.exports = {
    createPublication,
    getAllPublications,
    updatePublication,
    deletePublication,
    searchPublications
};
