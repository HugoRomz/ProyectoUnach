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

function insertarActividad(req, res) {
    const data = {
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        descripcion: req.body.descripcion,
        prog_academico: req.body.prog_academico
    };

    actividadesModel.insertarActividad(data, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al insertar el artículo.' });
        } else {
            res.json(results);
        }
    });
}

module.exports = {obtenerActividades, insertarActividad}