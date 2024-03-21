const express = require('express');
const router = express.Router();
const ressourceController = require('../controllers/RessourceController');
const upload = require("../middleware/fileapp");


router.post('/ajouter', upload.any('contenu'), ressourceController.createressource);
router.get('/lister', ressourceController.getAllressources);
router.put('/modifier/:id', ressourceController.updateressource);
router.delete('/supprimer/:id', ressourceController.deleteressource);
router.get('/rechercher', ressourceController.searchressourcesByTitre);
router.get('/getressourceById/:id_r', ressourceController.getressourceById);

module.exports = router;
