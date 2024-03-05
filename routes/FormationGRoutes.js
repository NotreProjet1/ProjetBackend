const express = require('express');
const router = express.Router();
const formationController = require('../controllers/FormationPController');



router.post('/ajouter', formationController.createFormation);
router.get('/lister', formationController.getAllFormations);
router.put('/modifier/:id', formationController.updateFormation);
router.delete('/supprimer/:id', formationController.deleteFormation);
router.get('/rechercher', formationController.searchFormationsByTitre);

module.exports = router;
