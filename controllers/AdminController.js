const Admin = require('../models/AdminModel');
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
    const {  email, mots_de_passe } = req.body;
    if ( !email  || !mots_de_passe) {
        return res.status(400).json({ message: 'Tous les champs sont requis pour ajouter un Admin.' });
    }
    return true;
};

const register = async (req, res) => {
    const AdminData = req.body;

    try {
        const result = await Admin.register(AdminData);
        res.status(201).json({ success: true, message: 'Inscription réussie.', result });
    } catch (error) {
        errorHandler(res, 'Erreur lors de l\'inscription: ' + error.message);
    }
};

const login = async (req, res) => {
    const { email, mots_de_passe } = req.body;

    try {
        const user = await Admin.login(email, mots_de_passe);

        if (user) {
            const token = generateToken(user.id); // Utilisez la fonction importée d'authMiddleware
            res.status(200).json({ success: true, message: 'Connexion réussie.', user, token });
        } else {
            res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
        }
    } catch (error) {
        errorHandler(res, 'Erreur lors de la connexion: ' + error.message);
    }
};



module.exports = {
   
    register,
    login
};
