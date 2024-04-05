const express = require('express');
const router = express.Router();
const CoursController = require('../controllers/CoursPController');
const upload = require("../middleware/fileapp")



router.post('/ajouter', upload.any('contenu'), CoursController.createcours);
router.get('/lister', CoursController.getAllcourss);
router.put('/modifier/:id_cp',upload.any('contenu'), CoursController.updatecours);
router.delete('/supprimer/:id_cp', CoursController.deletecours);
router.get('/rechercher', CoursController.searchcourssByTitre);
router.get('/getCoursById/:id_cp', CoursController.getcoursById);

module.exports = router;
