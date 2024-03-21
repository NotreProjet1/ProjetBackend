// participantRoutes.js

const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

// Assurez-vous que votre route POST est correctement définie
router.get('/:id', participantController.getParticipantById);

router.post('/register', participantController.register);
router.post('/login', participantController.login);
router.post('/modifier', participantController.modifierParticipant);
router.post('/lister', participantController.listerParticipant);
router.post('/supprimer', participantController.supprimerParticipant);

module.exports = router;
