const CoursModel = require('../models/CoursPModel');
const db = require('../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const { authenticateToken } = require('../middleware/authMiddleware');
const upload = require("../middleware/fileapp")

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
  const updatecours = async (req, res) => {
    try {
        const { id_cp } = req.params;
        const { titre, description } = req.body;
        const contenu = req.Fnameup; // Utiliser req.Fnameup pour récupérer le contenu

        // Mettre à jour le cours dans la base de données
        await CoursModel.updatecours(id_cp, titre, description, contenu);

        res.status(200).json({ success: true, message: 'Cours modifié avec succès.' });
    } catch (error) {
        console.error('Error in updatecours:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
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
        const { id_cp } = req.params;
        const result = await CoursModel.deletecours(id_cp);

        // Extraire les informations nécessaires de l'objet result
        const rowsAffected = result.affectedRows;

        res.status(200).json({ success: true, message: 'cours supprimée avec succès.', rowsAffected });
    } catch (error) {
        console.error('Error in deletecours:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const searchcourssByTitre = async (req, res) => {
    try {
        const { titre } = req.query;
        // Utilisez LIKE pour rechercher les correspondances partielles dans la base de données
        const results = await query('SELECT * FROM courpayant WHERE titre LIKE ?', [`%${titre}%`]);

        // Convertissez les résultats en une structure de données simple
        const courss = results.map(result => ({ ...result }));

        res.status(200).json({ success: true, courss });
    } catch (error) {
        console.error('Error in searchcourssByTitre:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};



const getcoursById = async (req, res) => {
    try {
        const { id_cp } = req.params;
        const cours = await CoursModel.getcoursById(id_cp);

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
