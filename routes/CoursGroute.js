const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CoursGController');


router.post('/ajouter', courseController.createCourse);
router.get('/lister', courseController.getAllCourses);
router.put('/modifier/:id', courseController.updateCourse);
router.delete('/supprimer/:id', courseController.deleteCourse);
router.get('/rechercher', courseController.searchCourses);

module.exports = router;