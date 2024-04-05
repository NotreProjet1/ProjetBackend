const express = require('express');
const router = express.Router();
const CoursGController = require('../controllers/CoursGController');
const upload = require("../middleware/fileapp")



router.post('/ajouter', upload.any('contenu'), CoursGController.createcours);
router.get('/lister', CoursGController.getAllcourss);
router.put('/modifier/:id_cg',upload.any('contenu'), CoursGController.updatecours);
router.delete('/supprimer/:id_cg', CoursGController.deletecours);
router.get('/rechercherByTitre', CoursGController.searchcourssByTitre);
router.get('/getCoursById/:id_cg', CoursGController.getcoursById);

module.exports = router;
