const ResssourceModel = require('../models/RessourceModel');
const db = require('../config/db');
const { authenticateToken } = require('../middleware/authMiddleware');
const util = require('util');

const query = util.promisify(db.query).bind(db);

const errorHandler = (res, message) => {
    console.error(message);
    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
};

const createResssource = async (req, res) => {
    try {
        authenticateToken(req, res, async () => {
            const { titre, contenu, description , type} = req.body;
            const userId = req.user.id;

            const result = await ResssourceModel.createResssource(titre, contenu, description, type , userId);
            const ResssourceId = result.insertId;

            res.status(201).json({
                success: true,
                message: 'Ressource créé avec succès.',
                ResssourceId: ResssourceId
            });
        });
    } catch (error) {
        console.error('Error in createResssource:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};


const getAllResssources = async (req, res) => {
  try {
      const results = await query('SELECT * FROM ressource_pedagogique');
      return res.status(200).json({ success: true, liste: results });
  } catch (err) {
      return errorHandler(res, err);
  }
};


const updateResssource = async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, contenu, description , type} = req.body;

        const result = await ResssourceModel.updateResssource(id, titre, contenu, description  , type);
        res.status(200).json({ success: true, message: 'ressource modifié avec succès.', result });
    } catch (error) {
        console.error('Error in updateResssource:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const deleteResssource = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ResssourceModel.deleteResssource(id);

        res.status(200).json({ success: true, message: 'ressource supprimé avec succès.', result });
    } catch (error) {
        console.error('Error in deleteResssource:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const searchResssources = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const results = await ResssourceModel.searchResssources(searchTerm);

        res.status(200).json({ success: true, Resssources: results });
    } catch (error) {
        console.error('Error in searchResssources:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

module.exports = {
    createResssource,
    getAllResssources,
    updateResssource,
    deleteResssource,
    searchResssources
};
