const FormationModel = require('../models/FormationPModel');
const db = require('../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const { authenticateToken } = require('../middleware/authMiddleware');

const errorHandler = (res, message) => {
    console.error(message);
    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
};



// const createFormation = async (req, res) => {
//     try {
//         const { titre, description, prix, certeficat, domaine, niveaux } = req.body;

//         if (!titre || !description || !domaine || !prix || !certeficat || !niveaux) {
//             return res.status(400).json({ success: false, message: 'Veuillez fournir toutes les données requises.' });
//         }

//         const plant = req.Fnameup;

//         const formationData = { titre, description, domaine, plant, prix, certeficat, niveaux };
//         const result = await FormationModel.createFormation(formationData);
//         const formationId = result.insertId;
//         req.Fnameup = undefined;

//         res.status(201).json({
//             success: true,
//             message: 'Formation créée avec succès.',
//             formationId: formationId
//         });
//     } catch (error) {
//         console.error('Error in createFormation:', error);
//         res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
//     }
// };
// const createFormation = async (req, res) => {
//     try {
//         // Utiliser authenticateToken pour vérifier le token
//         // authenticateToken
//         (req, res, async () => {
//             // Vérifier si le token est correctement attaché à la requête
//             // if (!req.user || !req.user.id) {
//             //     return res.status(401).json({ success: false, message: 'Token invalide. Authentifiez-vous pour accéder à cette ressource.' });
//             // }

//             // Récupérer l'ID de l'utilisateur à partir du token
//             const instructeurfp_id = req.user.id;

//             // Récupérer les données de la requête
//             const { titre, description, prix, certeficat, domaine, niveaux } = req.body;

//             // Vérifier si tous les champs requis sont présents

//             // Vérifier si tous les champs requis sont présents
//             if (!titre || !description || !domaine || !prix || !certeficat || !niveaux) {
//                 return res.status(400).json({ success: false, message: 'Veuillez fournir toutes les données requises.' });
//             }

//             // Récupérer le contenu du cours depuis req.Fnameup
//             const contenu = req.Fnameup;

//             const plant = req.Fnameup;
//             const formationData = { titre, description, domaine, plant, prix, certeficat, niveaux, instructeur_id: instructeurfp_id };
//             const result = await FormationModel.createFormation(formationData);
//             const formationId = result.insertId;
//             req.Fnameup = undefined;

//             res.status(201).json({
//                 success: true,
//                 message: 'Formation créée avec succès.',
//                 formationId: formationId
//             });
//         });
//     } catch (error) {
//         console.error('Error in createFormation:', error);
//         res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
//     }
// };

// const createFormation = async (req, res, ) => {
//     try {
//         // Utilisez le token token d'authentification pour obtenir l'ID de l'instructeur
//         // const instructeurId = req.user.id;

//         // Insérer ici le code pour créer la formation...
//         const { titre, description, prix, certeficat, domaine, niveaux } = req.body;

//         // Vérifier si tous les champs requis sont présents
//         if (!titre || !description || !domaine || !prix || !certeficat || !niveaux) {
//             return res.status(400).json({ success: false, message: 'Veuillez fournir toutes les données requises.' });
//         }

//         // Créer la formation dans la base de donnéesinstructeurId , instructeur_id:
//         const plant = req.Fnameup;
//         const formationData = { titre, description, domaine, plant, prix, certeficat, niveaux  };
//         const result = await FormationModel.createFormation(formationData);
//         const formationId = result.insertId;
//         req.Fnameup = undefined;
//         res.status(201).json({
//             success: true,
//             message: 'Formation créée avec succès.',
//             formationId: formationId
//         });
//     } catch (error) {
//         console.error('Error in createFormation:', error);
//         res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
//     }
// };
// const createFormation = async (req, res) => {
//     try {
//       const { titre, description, prix, certeficat, domaine,niveaux } = req.body;
     
      
//       // Vérifier si tous les champs requis sont présents
//       if (!titre || !description || !domaine || !prix || !certeficat || !niveaux ) {
//         return res.status(400).json({ success: false, message: 'Veuillez fournir toutes les données requises.' });
//       }

//       // Traiter le fichier s'il est téléchargé
//       // let plant = null;
//       // if (req.file) {
//       //   plant = req.file.buffer; // Utilisez req.file.buffer pour obtenir les données binaires du fichier
//       // } else {
//       //   return res.status(400).json({ success: false, message: 'Veuillez fournir un fichier.' });
//       // }
  
//     //   Créer la formation dans la base de données
//     const plant = req.Fnameup;
//       const formationData = { titre, description, domaine, plant, prix, certeficat, niveaux };
//       const result = await FormationModel.createFormation(formationData);
//       const formationId = result.insertId;
//       req.Fnameup = undefined;
//       res.status(201).json({ 
//         success: true,
//         message: 'Formation créée avec succès.',
//         formationId: formationId
//       });
//     } catch (error) {
//       console.error('Error in createFormation:', error);
//       res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
//     }
//   };
const createFormation = async (req, res) => {
    try {
        const { titre, description, domaine, niveaux, prix, certeficat } = req.body;
        const { id_coursp } = req.body; // Tableau d'identifiants de cours
        
        // Vérifiez si tous les champs requis sont présents
        if (!titre || !description || !domaine || !niveaux || !prix || !certeficat) {
            return res.status(400).json({ success: false, message: 'Veuillez fournir toutes les données requises.' });
        }

        // Créez la formation dans la base de données
        const plant = req.Fnameup;
        const formationData = { titre, description, domaine, plant, niveaux, prix, certeficat };
        const result = await FormationModel.createFormation(formationData, id_coursp); // Passez les identifiants de cours
        
        const formationId = result.insertId;
        req.Fnameup = undefined;
        
        res.status(201).json({ 
            success: true,
            message: 'Formation créée avec succès.',
            formationId: formationId
        });
    } catch (error) {
        console.error('Erreur lors de la création de la formation :', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};
const searchFormationsByDomaine = async (req, res) => {
    try {
        const { domaine } = req.query;
        const results = await FormationModel.searchFormationsByDomaine(domaine);

        res.status(200).json({ success: true, formations: results });
    } catch (error) {
        console.error('Error in searchFormationsByDomaine:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};


const updateFormation = async (id_fp, titre, description, contenu, domaine, plant, prix, certeficat) => {
    const updateQuery = `
        UPDATE formation_p
        SET titre = ?, description = ?, contenu = ?, domaine = ?, plant = ?, prix = ?, certeficat = ?
        WHERE id_fp = ?
    `;

    await db.query(updateQuery, [titre, description, contenu, domaine, plant, prix, certeficat, id_fp]);

    // Sélectionnez la formation mise à jour après la mise à jour
    const selectQuery = 'SELECT * FROM formation_p WHERE id_fp = ?';
    const [updatedFormation] = await db.query(selectQuery, [id_fp]);

    return updatedFormation;
};



const getAllFormations = async (req, res) => {
    try {
        const results = await query('SELECT * FROM formation_p');

        // Convertir les résultats en une structure de données simple
        const formations = results.map(result => ({ ...result }));

        return res.status(200).json({ success: true, liste: formations });
    } catch (err) {
        return errorHandler(res, err);
    }
};




const deleteFormation = async (req, res) => {
    try {
        const { id_fp } = req.params;
        const result = await FormationModel.deleteFormation(id_fp);

        res.status(200).json({ success: true, message: 'Formation supprimée avec succès.', result });
    } catch (error) {
        console.error('Error in deleteFormation:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const searchFormationsByTitre = async (req, res) => {
    try {
        const { titre } = req.query;
        const results = await FormationModel.searchFormationsByTitre(titre);

        res.status(200).json({ success: true, formations: results });
    } catch (error) {
        console.error('Error in searchFormationsByTitre:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};
// const getFormationById = async (req, res) => {
//     try {
//         const { id_fp } = req.params;
//         const formation = await FormationModel.getFormationById(id_fp);

//         if (!formation) {
//             return res.status(404).json({ success: false, message: 'Formation non trouvée.' });
//         }

//         res.status(200).json({ success: true, formation });
//     } catch (error) {
//         console.error('Error in getFormationById:', error);
//         res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
//     }
// };
const getFormationById = async (req, res) => {
    try {
        const { id } = req.params;
        const id_fp=id;
        const FormationModel1 = await FormationModel.getFormationById(id_fp);
        if (FormationModel1) {
            res.status(200).json({ success: true, formation: FormationModel1 });
        } else {
            res.status(404).json({ success: false, message: 'Instructeur non trouvé.' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du formation par ID:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la récupération du formation.' });
    }
};

module.exports = {
    createFormation,
    getAllFormations,
    updateFormation,
    deleteFormation,
    searchFormationsByTitre,
    getFormationById ,
    searchFormationsByDomaine
};
