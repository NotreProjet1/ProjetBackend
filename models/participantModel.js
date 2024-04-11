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
        'INSERT INTO participant (avatar,nom, prenom, emailP, mots_de_passeP, categorie, domaine, role, tel) VALUES (?, ?,?, ?, ?, ?, ?, ?,? )',
        [participantData.avatar,participantData.nom, participantData.prenom, participantData.emailP, hashedmots_de_passeP, participantData.categorie, participantData.domaine, participantData.role , participantData.tel]
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
        const results = await query('SELECT * FROM participant WHERE emailP = ?', [emailP]);

        if (results.length > 0) {
            const mots_de_passeMatchP = await bcrypt.compare(mots_de_passeP, results[0].mots_de_passeP);

            if (mots_de_passeMatchP) {
                // Les identifiants sont corrects, renvoyer l'utilisateur
                return results[0];
            } else {
                console.log("Mot de passe incorrect");
                return null;
            }
        } else {
            console.log("Aucun utilisateur trouvé avec cet email");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        throw error; // Renvoyer l'erreur pour le traitement ultérieur
    }
},

  

updateparticipant: async (id_p, participantData) => {
      try {
        const { id } = req.params;
        const { avatar ,nom, prenom, emailP, domaine, categorie, mots_de_passeP, role , tel } = req.body;
          // Validation
          if (!id || !validateFields(req, res)) {
            return res.status(400).json({ message: 'ID et tous les champs sont requis pour modifier un Participant.' });
        }

        const hashedmots_de_passeP = await bcrypt.hash(mots_de_passeP, saltRounds);

        const updateQuery = `
            UPDATE Participant
            SET avatar = ?, nom = ?, prenom = ?, emailP = ?, domaine = ?, categorie = ?, mots_de_passeP = ?, role = ? , tel = ? 
            WHERE id_p = ?
        `;
        const result = await query(updateQuery, [avatar,nom, prenom, emailP, domaine, categorie, hashedmots_de_passeP, role,  tel ,id]);

        return res.status(200).json({
            message: 'Instructeur modifié avec succès.',
            instructeur: result
        });
      } catch (error) {
        console.error('Error updating participant:', err);
        return res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du participant.' }); 
    }
  },
  updatePassword: async (id_p, nouveauMotDePasse) => {
    try {
        // Hasher le nouveau mot de passe
        const hashedNouveauMotDePasse = await bcrypt.hash(nouveauMotDePasse, saltRounds);

        // Mettre à jour le mot de passe dans la base de données
        const updateQuery = 'UPDATE participant SET mots_de_passeP = ? WHERE id_p = ?';
        const result = await query(updateQuery, [hashedNouveauMotDePasse, id_p]);
        return result;
    } catch (error) {
        throw error;
    }
},


  deleteInstructeur: async (id) => {
      try {
          const deleteQuery = 'DELETE FROM participant WHERE id = ?';
          const result = await query(deleteQuery, [id]);
          return result;
      } catch (error) {
          throw error;
      }
  },
  generateResetCode: async (emailP) => {
    try {
        // Générer un code de réinitialisation
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Enregistrer le code de réinitialisation dans la base de données avec une date d'expiration
        const expirationDate = new Date(Date.now() + 3600000); // 1 heure
        const updateQuery = 'UPDATE participant SET reset_code = ?, reset_code_expires = ? WHERE emailP = ?';
        await query(updateQuery, [resetCode, expirationDate, emailP]);

        return resetCode;
    } catch (error) {
        throw error;
    }
},

validateResetCode: async (emailP, resetCode) => {
    try {
        // Vérifier si le code de réinitialisation est valide
        const results = await query('SELECT * FROM participant WHERE emailP = ?', [emailP]);

        if (results.length > 0) {
            const user = results[0];
            if (user.reset_code === resetCode && user.reset_code_expires > new Date()) {
                return true; // Code valide
            }
        }

        return false; // Code invalide ou expiré
    } catch (error) {
        throw error;
    }
},

resetPassword: async (emailP, nouveauMotDePasse) => {
    try {
        // Hasher le nouveau mot de passe
        const hashedNouveauMotDePasse = await bcrypt.hash(nouveauMotDePasse, saltRounds);

        // Mettre à jour le mot de passe dans la base de données et supprimer le code de réinitialisation
        const updateQuery = 'UPDATE participant SET mots_de_passeP = ?, reset_code = NULL, reset_code_expires = NULL WHERE emailP = ?';
        const result = await query(updateQuery, [hashedNouveauMotDePasse, emailP]);

        return result;
    } catch (error) {
        throw error;
    }
},

};


module.exports = participant;
