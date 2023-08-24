const articuloModel = require('../models/articuloModel');

function obtenerArticulos(req, res) {
    articuloModel.obtenerArticulos((error, rows) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener los artículos.' });
        } else {
            res.json(rows);
        }
    });
}

function insertarArticulo(req, res) {
    const data = {
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock
    };

    articuloModel.insertarArticulo(data, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al insertar el artículo.' });
        } else {
            res.json(results);
        }
    });
}


function editarArticulo(req, res) {
    const id = req.params.id;
    const newData = {
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock
    };

    articuloModel.editarArticulo(id, newData, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al editar el artículo.' });
        } else {
            res.json(results);
        }
    });
}

function eliminarArticulo(req, res) {
    const id = req.params.id;

    articuloModel.eliminarArticulo(id, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al eliminar el artículo.' });
        } else {
            res.json(results);
        }
    });
}

module.exports = { obtenerArticulos, insertarArticulo, editarArticulo, eliminarArticulo };
