const express = require('express');
const router = express.Router();
const coursController = require('../controllers/CoursPController');
const upload = require("../middleware/fileapp")



router.post('/ajouter', upload.any('contenu'), coursController.createcours);
router.get('/lister', coursController.getAllcourss);
router.put('/modifier/:id', coursController.updatecours);
router.delete('/supprimer/:id', coursController.deletecours);
router.get('/rechercher', coursController.searchcourssByTitre);
router.get('/getcoursById/:id_fp', coursController.getcoursById);

module.exports = router;
