const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const rateLimit = require('express-rate-limit');

const limitarLogin = rateLimit({
    windowMs: 15 * 60 * 1000,   // ventana de 15 minutos
    limit: 10,                  // máximo 10 intentos por IP en esa ventana
    message: { success: false, message: 'Demasiados intentos. Intenta de nuevo en 15 minutos.' }
});

router.post('/login', limitarLogin, authController.login);

const authenticate = require('../middlewares/authenticate');
router.get('/perfil', authenticate, authController.perfil);

module.exports = router;