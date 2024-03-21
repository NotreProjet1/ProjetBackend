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
        'INSERT INTO participant (nom, prenom, domaine, categorie, emailP, mots_de_passeP, avatar, role, tel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [participantData.nom, participantData.prenom, participantData.domaine, participantData.categorie, participantData.emailP, hashedmots_de_passeP, participantData.avatar, participantData.role, participantData.tel]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  login: async (emailP, mots_de_passeP) => {
    try {
      const results = await query('SELECT * FROM participant WHERE emailP = ?', [emailP]);
      if (results.length > 0) {
        const mots_de_passeMatchP = await bcrypt.compare(mots_de_passeP, results[0].mots_de_passeP);
        return mots_de_passeMatchP ? results[0] : null;
      } else {
        return null; 
      }
    } catch (error) {
      throw error;
    }
  },
   getById : async (id_p) => {
    try {
        const queryResult = await query('SELECT * FROM Participant WHERE id_p = ?', [id_p]);
        return queryResult.length > 0 ? queryResult[0] : null;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des détails du participant par ID: ' + error.message);
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

//   login: async (emailP, mots_de_passeP) => {
//     try {
//         const results = await query('SELECT * FROM participant WHERE emailP = ?', [emailP]);
//         if (results.length > 0) {
//             const mots_de_passeMatchP = await bcrypt.compare(mots_de_passeP, results[0].mots_de_passeP);
//             return mots_de_passeMatchP ? results[0] : null;
//         } else {
//             return null; 
//         }
//     } catch (error) {
//         throw error;
//     }
// }
// ,

// login: async (emailP, mots_de_passeP) => {
//   try {
//       const results = await query('SELECT * FROM participant WHERE emailP = ?', [emailP]);
//       if (results.length > 0) {
//           const mots_de_passeMatch = await bcrypt.compare(mots_de_passeP, results[0].mots_de_passeP);
//           return mots_de_passeMatch ? results[0] : null;
//       } else {
//           return null;  
//       }
//   } catch (error) {
//       throw error;
//   }
// }
// ,
  

updateparticipant: async (id, participantData) => {
      try {
          const { nom, prenom, emailP, domaine, categorie, mots_de_passeP,role, tel } = participantData;

          // Validation
          if (!nom || !prenom || !emailP || !domaine || !categorie || !mots_de_passeP || !role || !tel) {
              throw new Error('Tous les champs sont requis pour modifier un instructeur.');
          }

          const hashedmots_de_passeP = await bcrypt.hash(mots_de_passeP, saltRounds);

          const updateQuery = `
              UPDATE participant
              SET nom = ?, prenom = ?, emailP= ?, domaine = ?, categorie = ?, mots_de_passeP = ?,role = ? ,tel = ?
              WHERE id = ?
          `;

          const result = await query(updateQuery, [nom, prenom, emailP, domaine, categorie, hashedmots_de_passeP,role,tel , id]);
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
};

module.exports = participant;
