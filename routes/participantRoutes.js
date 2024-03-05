// routes/participantRoutes.js
const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

router.post('/register', participantController.register);
router.post('/login', participantController.login);

module.exports = router;
