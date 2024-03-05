// participantRoutes.js

const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

// Assurez-vous que votre route POST est correctement définie
router.post('/register', participantController.register);
router.post('/login', participantController.login);

module.exports = router;
