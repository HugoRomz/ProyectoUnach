const actividadesModel = require('../models/actividadesModel');

function obtenerActividades(req, res) {
    actividadesModel.obtenerActividades((error, rows) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener las actividades.' });
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
            res.status(500).json({ error: 'Error al insertar las actividades.' });
        } else {
            res.json(results);
        }
    });
}

function editarActividad(req, res) {
    const id = req.params.id;
    const newData = {
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        descripcion: req.body.descripcion,
        prog_academico: req.body.prog_academico
    };

    actividadesModel.editarActividad(id, newData, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al editar la actividad.' });
        } else {
            res.json(results);
        }
    });
}

module.exports = {obtenerActividades, insertarActividad, editarActividad}