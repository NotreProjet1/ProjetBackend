const express = require('express');
const router = express.Router();
const PublicationController = require('../controllers/PublicationController');


router.post('/ajouter', PublicationController.createPublication);
router.get('/lister', PublicationController.getAllPublications);
router.put('/modifier/:id', PublicationController.updatePublication);
router.delete('/supprimer/:id', PublicationController.deletePublication);
router.get('/rechercher', PublicationController.searchPublications);

module.exports = router;