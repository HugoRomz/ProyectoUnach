const actividadesModel = require('../models/actividadesModel');

function obtenerActividades(req, res) {
    actividadesModel.obtenerActividades((error, rows) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener los artículos.' });
        } else {
            res.json(rows);
        }
    });
}

module.exports = {obtenerActividades}