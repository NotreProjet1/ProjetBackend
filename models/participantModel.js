// participantModel.js
const bcrypt = require('bcrypt');
const util = require('util');
const dbConnection = require('../config/db');

const saltRounds = 10;
const query = util.promisify(dbConnection.query).bind(dbConnection);

const participant = {
  register: async (participantData) => {
    try {
      if (!participantData.mots_de_passeP) {
        throw new Error('Le mot de passe est requis pour l\'inscription.');
      }

      const hashedmots_de_passeP = await bcrypt.hash(participantData.mots_de_passeP, saltRounds);
      const result = await query(
        'INSERT INTO participant (avatr,nom, prenom, emailP, mots_de_passeP, categorie, domaine, role) VALUES (?, ?,?, ?, ?, ?, ?, ?)',
        [participantData.avatr,participantData.nom, participantData.prenom, participantData.emailP, hashedmots_de_passeP, participantData.categorie, participantData.domaine, participantData.role]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  getParticipantByEmail: async (emailP) => {
    try {
      const results = await query('SELECT * FROM participant WHERE emailP = ?', [emailP]);
      console.log('Results:', results);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      throw error;
    }
  },

  login: async (emailP, mots_de_passeP) => {
    try {
      const participantData = await participant.getParticipantByEmail(emailP);

      if (participantData) {
        console.log('Mot de passe haché en base de données:', participantData.mots_de_passeP);

        // Utilisez participantData.mots_de_passeP au lieu de results.mots_de_passeP
        const mots_de_passeMatch = await bcrypt.compare(mots_de_passeP, participantData.mots_de_passeP);

        console.log('Mot de passe fourni pour la comparaison:', mots_de_passeP);
        console.log('Mot de passe match:', mots_de_passeMatch);

        return mots_de_passeMatch ? participantData : null;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = participant;
