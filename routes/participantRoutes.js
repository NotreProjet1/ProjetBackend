// participantRoutes.js

const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

// Assurez-vous que votre route POST est correctement définie
router.post('/register', participantController.register);
router.post('/login', participantController.login);

router.put('/modifier/:id_p', participantController.modifierParticipant);
router.post('/lister', participantController.listerParticipant);
router.post('/supprimer', participantController.supprimerParticipant);
router.put('/modifierMotDePasse/:id_p', participantController.updatePassword);

module.exports = router;
