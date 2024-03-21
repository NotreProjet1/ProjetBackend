const Instructeur = require('../models/instructeurModel');
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
    const { nom, prenom, email, tel, specialite, mots_de_passe } = req.body;
    if (!nom || !prenom || !email || !tel || !specialite || !mots_de_passe) {
        return res.status(400).json({ message: 'Tous les champs sont requis pour ajouter un instructeur.' });
    }
    return true;
};

const listerInstructeurs = async (req, res) => {
    try {
        const results = await query('SELECT * FROM instructeur');
        return res.status(200).json({ success: true, liste: results });
    } catch (err) {
        return errorHandler(res, err);
    }
};



const modifierInstructeur = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, email, tel, specialite, mots_de_passe, role } = req.body;

        // Check for the presence of the authorization header
        authenticateToken(req, res, async () => {
            // Now you can access the user information from req.user
            const userId = req.user.id;
            const userRole = req.user.role;  // Assuming you have the role in the user object

            // Ensure the user has the required role
            if (userRole !== 'instructeur' ) {
                return res.status(403).json({ message: 'Permission denied. Insufficient role.' });
            }

            if (!id || !validateFields(req, res)) {
                return res.status(400).json({ message: 'ID et tous les champs sont requis pour modifier un instructeur.' });
            }

            const hashedmots_de_passe = await bcrypt.hash(mots_de_passe, saltRounds);

            const updateQuery = `
                UPDATE instructeur
                SET nom = ?, prenom = ?, email = ?, tel = ?, specialite = ?, mots_de_passe = ?, role = ?
                WHERE id = ?
            `;

            const result = await query(updateQuery, [nom, prenom, email, tel, specialite, hashedmots_de_passe, role, id]);

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
    const instructeurData = req.body;

    try {
        const result = await Instructeur.register(instructeurData);
        res.status(201).json({ success: true, message: 'Inscription réussie.', result });
    } catch (error) {
        errorHandler(res, 'Erreur lors de l\'inscription: ' + error.message);
    }
};

const login = async (req, res) => {
    const { email, mots_de_passe } = req.body;

    try {
        const user = await Instructeur.login(email, mots_de_passe);
       
        if (user) {
            const token = generateToken(user.id); // Utilisez la fonction importée d'authMiddleware
            
            // Envoyez le token JWT dans l'en-tête de la réponse HTTP
            res.header('Authorization', `Bearer ${token}`);

            res.status(200).json({ success: true, message: 'Connexion réussie.', user, token });
        } else {
            res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
        }
    } catch (error) {
        errorHandler(res, 'Erreur lors de la connexion: ' + error.message);
    }
};

const supprimerInstructeur = async (req, res) => {
    try {
        const { id } = req.params;

        authenticateToken(req, res, async () => {
            const userRole = req.user.role;  

            // Ensure the user has the required role
            if (userRole !== 'instructeur') {
                return res.status(403).json({ message: 'Permission denied. Insufficient role.' });
            }

            if (!id) {
                return res.status(400).json({ message: 'ID requis pour supprimer un instructeur.' });
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
    listerInstructeurs,
    modifierInstructeur,
    supprimerInstructeur,
    register,
    login
};
