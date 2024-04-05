const express = require('express');
const router = express.Router();
const ressourceController = require('../controllers/RessourceController');
const upload = require("../middleware/fileapp");


router.post('/ajouter', upload.any('contenu'), ressourceController.createRessource);
router.get('/lister', ressourceController.getAllRessources);
router.put('/modifier/:id', ressourceController.updateRessource);
router.delete('/supprimer/:id', ressourceController.deleteRessource);
router.get('/rechercherByTitre', ressourceController.searchRessourcesByTitre);
router.get('/getressourceById/:id', ressourceController.getRessourceById);

module.exports = router;
