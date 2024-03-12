const bcrypt = require('bcrypt');
const util = require('util');
const dbConnection = require('../config/db');

const saltRounds = 10;
const query = util.promisify(dbConnection.query).bind(dbConnection);

const Admin = {
    register: async (AdminData) => {
        try {
          // Assurez-vous que participantData.mots_de_passeP a une valeur définie.
          if (!AdminData.mots_de_passe) {
            throw new Error('Le mot de passe est requis pour l\'inscription.');
          }
    
          const hashedmots_de_passe= await bcrypt.hash(AdminData.mots_de_passe, saltRounds);
          const result = await query(
            'INSERT INTO admin (avatar ,email, mots_de_passe) VALUES (?, ?, ?)',
            [AdminData.avatar, AdminData.email, hashedmots_de_passe]
          );
          return result;
        } catch (error) {
          throw error;
        }
      },
login: async (email, mots_de_passe) => {
  try {
      const results = await query('SELECT * FROM admin WHERE email = ?', [email]);
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

getAdminById: async (id) => {
    try {
        const results = await query('SELECT * FROM admin WHERE id = ?', [id]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        throw error;
    }
},
   


  };

  module.exports = Admin;