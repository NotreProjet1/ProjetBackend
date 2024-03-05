const express = require('express');
const router = express.Router();
const ResssourceController = require('../controllers/RessourceController');


router.post('/ajouter', ResssourceController.createResssource);
router.get('/lister', ResssourceController.getAllResssources);
router.put('/modifier/:id', ResssourceController.updateResssource);
router.delete('/supprimer/:id', ResssourceController.deleteResssource);
router.get('/rechercher', ResssourceController.searchResssources);

module.exports = router;