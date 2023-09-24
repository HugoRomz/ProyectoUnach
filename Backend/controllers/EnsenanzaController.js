const EnsenanzaModel = require('../models/EnsenanzaModel.js');

function obtenerActividades(req, res) {
    const tipoActividad = req.params.id;
    EnsenanzaModel.obtenerActividades(tipoActividad,(error, rows) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener las actividades.' });
        } else {
            res.json(rows);
        }
    });
}

module.exports = { obtenerActividades };