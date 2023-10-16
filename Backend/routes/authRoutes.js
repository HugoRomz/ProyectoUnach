const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authenticateJWT = require('../middlewares/authenticateJWT');

// Ruta para iniciar sesión
router.post('/login', AuthController.login);

// Ejemplo de ruta protegida (esto era solo un ejemplo para mostrarte cómo usar el middleware)
router.get('/rutaProtegida', authenticateJWT, (req, res) => {
    res.send('Esta es una ruta protegida');
});

module.exports = router;
