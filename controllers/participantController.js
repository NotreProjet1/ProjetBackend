// controllers/participantController.js
const Participant = require('../models/participantModel');

exports.register = (req, res) => {
  const participantData = req.body;

  Participant.register(participantData, (err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Erreur lors de l\'inscription.' });
    } else {
      res.status(201).json({ success: true, message: 'Inscription réussie.' });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  Participant.login(email, password, (err, user) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Erreur lors de la connexion.' });
    } else {
      if (user) {
        res.status(200).json({ success: true, message: 'Connexion réussie.', user });
      } else {
        res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
      }
    }
  });
};
