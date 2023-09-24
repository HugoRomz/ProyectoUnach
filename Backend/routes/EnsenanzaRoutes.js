const express = require('express');
const router = express.Router();

const EnsenanzaController = require('../controllers/EnsenanzaController');

router.get('/showall/:id', EnsenanzaController.obtenerActividades);


module.exports = router;