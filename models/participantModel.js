const db = require('../config/db');
const bcrypt = require('bcrypt');

const saltRounds = 10; // Nombre de rounds de salage pour bcrypt

const Participant = {
  register: (participantData, callback) => {
    const trimmedPassword = participantData.password.trim(); // Trim whitespace

    bcrypt.hash(trimmedPassword, saltRounds, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      }  
  
      db.query(
        'INSERT INTO user (nom, prenom, email, password, categorie, domaine) VALUES (?, ?, ?, ?, ?, ?)',
        [
          participantData.nom,
          participantData.prenom,
          participantData.email,
          hashedPassword,
          participantData.categorie,
          participantData.domaine,
        ],
        (error, result) => {
          if (error) {
            return callback(error);
          }
          return callback(null, result);
        }
      );
    });
  },

  login: (email, password, callback) => {
    const trimmedPassword = password.trim(); // Trim whitespace
  
    db.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        const storedHashedPassword = results[0].password;
  
        console.log('Provided Password:', trimmedPassword);
        console.log('Stored Hashed Password (from DB):', storedHashedPassword);
  
        bcrypt.compare(trimmedPassword, storedHashedPassword, (err, passwordMatch) => {
          if (err) {
            console.error('bcrypt.compare Error:', err);
            return callback(err);
          }
          console.log('Password Match:', passwordMatch);
  
          if (passwordMatch) {
            // Passwords match, return the user
            return callback(null, results[0]);
          } else {
            // Incorrect password
            return callback(null, null);
          }
        });
      } else {
        // User not found
        return callback(null, null);
      }
    });
  },
  
};

module.exports = Participant;

