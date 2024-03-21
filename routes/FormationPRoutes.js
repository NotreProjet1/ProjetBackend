const express = require('express');
const router = express.Router();
const formationController = require('../controllers/FormationPController');
const { authenticateToken, generateToken } = require("../middleware/authMiddleware");

router.post('/ajouter',formationController.createFormation);

router.get('/lister', formationController.getAllFormations);
router.put('/modifier/:id', formationController.updateFormation);
router.delete('/supprimer/:id', formationController.deleteFormation);
router.get('/rechercher', formationController.searchFormationsByTitre);
router.get('/getFormationById/:id_fp', formationController.getFormationById);

module.exports = router;
