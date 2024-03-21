const bcrypt = require('bcrypt');
const util = require('util');
const dbConnection = require('../config/db');

const saltRounds = 10;
const query = util.promisify(dbConnection.query).bind(dbConnection);

const Instructeur = {
    register: async (InstructeurData) => {
        try {
          // Assurez-vous que participantData.mots_de_passeP a une valeur définie.
          if (!InstructeurData.mots_de_passe) {
            throw new Error('Le mot de passe est requis pour l\'inscription.');
          }
    
          const hashedmots_de_passe= await bcrypt.hash(InstructeurData.mots_de_passe, saltRounds);
          const result = await query(
            'INSERT INTO instructeur (avatar , nom, prenom, email, mots_de_passe, tel, specialite, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [InstructeurData.avatar,InstructeurData.nom, InstructeurData.prenom, InstructeurData.email, hashedmots_de_passe, InstructeurData.tel, InstructeurData.specialite, InstructeurData.role]
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
          const {avatar , nom, prenom, email, tel, specialite, mots_de_passe,role } = instructeurData;

          // Validation
          if (!avatar || !nom || !prenom || !email || !tel || !specialite || !mots_de_passe || !role) {
              throw new Error('Tous les champs sont requis pour modifier un instructeur.');
          }

          const hashedmots_de_passe = await bcrypt.hash(mots_de_passe, saltRounds);

          const updateQuery = `
              UPDATE instructeur
              SET avatar = ?,  nom = ?, prenom = ?, email= ?, tel = ?, specialite = ?, mots_de_passe = ?,role = ?
              WHERE id = ?
          `;

          const result = await query(updateQuery, [avatar ,nom, prenom, email, tel, specialite, hashedmots_de_passe,role, id]);
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