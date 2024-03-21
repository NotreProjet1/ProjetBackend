const participant = require('../models/participantModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const dbConnection = require('../config/db');
const { generateToken, authenticateToken } = require('../middleware/authMiddleware'); // Ajout des importations
const saltRounds = 10;
const query = util.promisify(dbConnection.query).bind(dbConnection);

const errorHandler = (res, message) => {
    console.error(message);
    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
};

const validateFields = (req, res) => {
    const {avatar, nom, prenom, emailP, domaine, categorie, mots_de_passeP , tel} = req.body;
    if (  !avatar ||!nom || !nom || !prenom || !emailP || !domaine || !categorie || !mots_de_passeP || !tel)  {
        return res.status(400).json({ message: 'Tous les champs sont requis pour ajouter un Participant.' });
    }
    return true;
};

const listerParticipant = async (req, res) => {
    try {
        const results = await query('SELECT * FROM Participant');
        return res.status(200).json({ success: true, liste: results });
    } catch (err) {
        return errorHandler(res, err);
    }
};

const getParticipantById = async (req, res) => {
    try {
        const { id } = req.params;
        const id_p = id ;
        const participantData = await participant.getById(id_p);
        if (participantData) {
            res.status(200).json({ success: true, participant: participantData });
        } else {
            res.status(404).json({ success: false, message: 'Participant non trouvé.' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du participant par ID:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la récupération du participant.' });
    }
};

const modifierParticipant = async (req, res) => {
    try {
        const { id } = req.params;
        const { avatar ,nom, prenom, emailP, domaine, categorie, mots_de_passeP, role , tel } = req.body;

        // Check for the presence of the authorization header
        authenticateToken(req, res, async () => {
            // Now you can access the user information from req.user
            const userId = req.user.id;
            const userRole = req.user.role;  // Assuming you have the role in the user object

            // Ensure the user has the required role
            if (userRole !== 'Participant' ) {
                return res.status(403).json({ message: 'Permission denied. Insufficient role.' });
            }

            if (!id || !validateFields(req, res)) {
                return res.status(400).json({ message: 'ID et tous les champs sont requis pour modifier un Participant.' });
            }

            const hashedmots_de_passeP = await bcrypt.hash(mots_de_passeP, saltRounds);

            const updateQuery = `
                UPDATE Participant
                SET avatar = ?, nom = ?, prenom = ?, emailP = ?, domaine = ?, categorie = ?, mots_de_passeP = ?, role = ? , tel = ? 
                WHERE id = ?
            `;

            const result = await query(updateQuery, [avatar,nom, prenom, emailP, domaine, categorie, hashedmots_de_passeP, role,  tel ,id]);

            return res.status(200).json({
                message: 'Instructeur modifié avec succès.',
                instructeur: result
            });
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};
const register = async (req, res) => {
    const participantData = req.body;

    try {
        const result = await participant.register(participantData);
        res.status(201).json({ success: true, message: 'Inscription réussie.', result });
    } catch (error) {
        errorHandler(res, 'Erreur lors de l\'inscription: ' + error.message);
    }
};

// const login = async (req, res) => {
//     const { emailP, mots_de_passeP} = req.body; 

//     try {
//         const user = await participant.login(emailP, mots_de_passeP);

//         if (user) {
//             const token = generateToken(user.id); // Utilisez la fonction importée d'authMiddleware
//             res.status(200).json({ success: true, message: 'Connexion réussie.', user, token });
//         } else {
//             res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
//         }
//     } catch (error) {
//         errorHandler(res, 'Erreur lors de la connexion: ' + error.message);
//     }
// };
const login = async (req, res) => {
    const { email, mots_de_passe } = req.body;
const emailP = email;
const mots_de_passeP =mots_de_passe;
    try {
        const user = await participant.login(emailP, mots_de_passeP);
       
        if (user) {
            const token = generateToken(user.id); // Utilisez la fonction importée d'authMiddleware
            
            // Envoyez le token JWT dans l'en-tête de la réponse HTTP
            res.header('Authorization', `Bearer ${token}`);

            res.status(200).json({ success: true, message: 'Connexion réussie.', user, token });
        } else {
            res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect. participant ' });
        }
    } catch (error) {
        errorHandler(res, 'Erreur lors de la connexion: ' + error.message);
    }
};

const supprimerParticipant = async (req, res) => {
    try {
        const { id } = req.params;

        authenticateToken(req, res, async () => {
            const userRole = req.user.role;  

            // Ensure the user has the required role
            if (userRole !== 'Participant') {
                return res.status(403).json({ message: 'Permission denied. Insufficient role.' });
            }

            if (!id) {
                return res.status(400).json({ message: 'ID requis pour supprimer un Participant.' });
            }

            const deleteQuery = 'DELETE FROM instructeur WHERE id = ?';

            const result = await query(deleteQuery, [id]);

            return res.status(200).json({ message: 'Instructeur supprimé avec succès.', result });
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

module.exports = {
    listerParticipant,
    modifierParticipant,
    supprimerParticipant,
    register,
    login,
    getParticipantById
};
