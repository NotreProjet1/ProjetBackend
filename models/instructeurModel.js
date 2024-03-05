const bcrypt = require('bcrypt');
const util = require('util');
const dbConnection = require('../config/db');

const saltRounds = 10;
const query = util.promisify(dbConnection.query).bind(dbConnection);

const Instructeur = {
  register: async (instructeurData) => {
    try {
        const hashedmots_de_passe = await bcrypt.hash(instructeurData.mots_de_passe, saltRounds);
        const result = await query(
            'INSERT INTO instructeur (nom, prenom, email, mots_de_passe, tel, specialite,role) VALUES (?,?, ?, ?, ?, ?, ?)',
            [
                instructeurData.nom,
                instructeurData.prenom,
                instructeurData.email,
                hashedmots_de_passe,
                instructeurData.tel,
                instructeurData.specialite,
                instructeurData.role
            ]
        );
        return result;
    } catch (error) {
        throw error;
    }
},
login: async (email, mots_de_passe) => {
  try {
      const results = await query('SELECT * FROM instructeur WHERE email = ?', [email]);
      if (results.length > 0) {
          const mots_de_passeMatch = await bcrypt.compare(mots_de_passe, results[0].mots_de_passe);
          return mots_de_passeMatch ? results[0] : null;
      } else {
          return null; 
      }
  } catch (error) {
      throw error;
  }
},

getInstructeurById: async (id) => {
    try {
        const results = await query('SELECT * FROM instructeur WHERE id = ?', [id]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        throw error;
    }
},
   
updateInstructeur: async (id, instructeurData) => {
      try {
          const { nom, prenom, email, tel, specialite, mots_de_passe,role } = instructeurData;

          // Validation
          if (!nom || !prenom || !email || !tel || !specialite || !mots_de_passe || !role) {
              throw new Error('Tous les champs sont requis pour modifier un instructeur.');
          }

          const hashedmots_de_passe = await bcrypt.hash(mots_de_passe, saltRounds);

          const updateQuery = `
              UPDATE instructeur
              SET nom = ?, prenom = ?, email = ?, tel = ?, specialite = ?, mots_de_passe = ?,role = ?
              WHERE id = ?
          `;

          const result = await query(updateQuery, [nom, prenom, email, tel, specialite, hashedmots_de_passe,,role, id]);
          return result;
      } catch (error) {
          throw error;
      }
  },

  deleteInstructeur: async (id) => {
      try {
          const deleteQuery = 'DELETE FROM instructeur WHERE id = ?';
          const result = await query(deleteQuery, [id]);
          return result;
      } catch (error) {
          throw error;
      }
  },

  };

  module.exports = Instructeur;