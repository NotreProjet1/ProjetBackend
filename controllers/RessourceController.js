const RessourceModel = require('../models/RessourceModel');
const db = require('../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const { authenticateToken } = require('../middleware/authMiddleware');

const errorHandler = (res, message) => {
    console.error(message);
    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
};

const createRessource = async (req, res) => {
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
  
    //   Créer la Ressource dans la base de données
    const contenu = req.Fnameup;
      const RessourceData = { titre, description, contenu };
      const result = await RessourceModel.createRessource(RessourceData);
      const RessourceId = result.insertId;
      req.Fnameup = undefined;
      res.status(201).json({ 
        success: true,
        message: 'Ressource créée avec succès.',
        RessourceId: RessourceId
      });
    } catch (error) {
      console.error('Error in createRessource:', error);
      res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
  };
  
const updateRessource = async (id_r, titre, description) => {
    const updateQuery = `
        UPDATE ressource_pedagogique
        SET titre = ?, description = ?, contenu = ?
        WHERE id_r = ?
    `;

    await db.query(updateQuery, [titre, description, id_r]);

    // Sélectionnez la Ressource mise à jour après la mise à jour
    const selectQuery = 'SELECT * FROM ressource_pedagogique WHERE id_r = ?';
    const [updatedRessource] = await db.query(selectQuery, [id_r]);

    return updatedRessource;
};



const getAllRessources = async (req, res) => {
    try {
        const results = await query('SELECT * FROM ressource_pedagogique');
        
        // Convertir les résultats en une structure de données simple
        const Ressources = results.map(result => ({ ...result }));

        return res.status(200).json({ success: true, liste: Ressources });
    } catch (err) {
        return errorHandler(res, err);
    }
};




const deleteRessource = async (req, res) => {
    try {
        const { id_r } = req.params;
        const result = await RessourceModel.deleteRessource(id_r);

        res.status(200).json({ success: true, message: 'Ressource supprimée avec succès.', result });
    } catch (error) {
        console.error('Error in deleteRessource:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};


const searchRessourcesByTitre = async (req, res) => {
    try {
        const { titre } = req.query;
        // Utilisez LIKE pour rechercher les correspondances partielles dans la base de données
        const results = await query('SELECT * FROM ressource_pedagogique WHERE titre LIKE ?', [`%${titre}%`]);

        // Convertissez les résultats en une structure de données simple
        const courss = results.map(result => ({ ...result }));

        res.status(200).json({ success: true, courss });
    } catch (error) {
        console.error('Error in searchcourssByTitre:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const getRessourceById = async (req, res) => {
    try {
        const { id } = req.params;
        const id_r=id;
        const RessourceModel1 = await RessourceModel.getRessourceById(id_r);
        if (RessourceModel1) {
            res.status(200).json({ success: true, Ressource: RessourceModel1 });
        } else {
            res.status(404).json({ success: false, message: 'Instructeur non trouvé.' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du formation par ID:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la récupération du formation.' });
    }
};


module.exports = {
    createRessource,
    getAllRessources,
    updateRessource,
    deleteRessource,
    searchRessourcesByTitre,
    getRessourceById
};
