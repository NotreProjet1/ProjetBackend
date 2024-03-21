const CoursModel = require('../models/CoursPModel');
const db = require('../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const { authenticateToken } = require('../middleware/authMiddleware');

const errorHandler = (res, message) => {
    console.error(message);
    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
};

const createcours = async (req, res) => {
    try {
      const { titre, description } = req.body;
     
      
      // Vérifier si tous les champs requis sont présents
      if (!titre || !description  ) {
        return res.status(400).json({ success: false, message: 'Veuillez fournir toutes les données requises.' });
      }

      // Traiter le fichier s'il est téléchargé
      // let contenu = null;
      // if (req.file) {
      //   contenu = req.file.buffer; // Utilisez req.file.buffer pour obtenir les données binaires du fichier
      // } else {
      //   return res.status(400).json({ success: false, message: 'Veuillez fournir un fichier.' });
      // }
  
    //   Créer la cours dans la base de données
    const contenu = req.Fnameup;
      const coursData = { titre, description, contenu };
      const result = await CoursModel.createcours(coursData);
      const coursId = result.insertId;
      req.Fnameup = undefined;
      res.status(201).json({ 
        success: true,
        message: 'cours créée avec succès.',
        coursId: coursId
      });
    } catch (error) {
      console.error('Error in createcours:', error);
      res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
  };
  
const updatecours = async (id_fp, titre, description) => {
    const updateQuery = `
        UPDATE courpayant
        SET titre = ?, description = ?, contenu = ?
        WHERE id_fp = ?
    `;

    await db.query(updateQuery, [titre, description, id_fp]);

    // Sélectionnez la cours mise à jour après la mise à jour
    const selectQuery = 'SELECT * FROM courpayant WHERE id_fp = ?';
    const [updatedcours] = await db.query(selectQuery, [id_fp]);

    return updatedcours;
};



const getAllcourss = async (req, res) => {
    try {
        const results = await query('SELECT * FROM courpayant');
        
        // Convertir les résultats en une structure de données simple
        const courss = results.map(result => ({ ...result }));

        return res.status(200).json({ success: true, liste: courss });
    } catch (err) {
        return errorHandler(res, err);
    }
};




const deletecours = async (req, res) => {
    try {
        const { id_fp } = req.params;
        const result = await CoursModel.deletecours(id_fp);

        res.status(200).json({ success: true, message: 'cours supprimée avec succès.', result });
    } catch (error) {
        console.error('Error in deletecours:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const searchcourssByTitre = async (req, res) => {
    try {
        const { titre } = req.query;
        const results = await CoursModel.searchcourssByTitre(titre);

        res.status(200).json({ success: true, courss: results });
    } catch (error) {
        console.error('Error in searchcourssByTitre:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};
const getcoursById = async (req, res) => {
    try {
        const { id_fp } = req.params;
        const cours = await CoursModel.getcoursById(id_fp);

        if (!cours) {
            return res.status(404).json({ success: false, message: 'cours non trouvée.' });
        }

        res.status(200).json({ success: true, cours });
    } catch (error) {
        console.error('Error in getcoursById:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

module.exports = {
    createcours,
    getAllcourss,
    updatecours,
    deletecours,
    searchcourssByTitre,
    getcoursById
};
