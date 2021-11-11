const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/authCtrl');

// S'inscrire
router.post('/auth/signup', userCtrl.signup);
// Se connecter
router.post('/auth/login', userCtrl.login);

module.exports = router;