const db = require('../config/db.config');

function obtenerArticulos(callback) {
    const query = 'SELECT * FROM articulos;';
    db.query(query, (error, rows) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, rows);
        }
    });
}

function insertarArticulo(data, callback) {
    const query = 'INSERT INTO articulos SET ?';
    db.query(query, data, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

function editarArticulo(id, newData, callback) {
    const query = 'UPDATE articulos SET ? WHERE id = ?';
    db.query(query, [newData, id], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

function eliminarArticulo(id, callback) {
    const query = 'DELETE FROM articulos WHERE id = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            callback(error, null); 
        } else {
            callback(null, results);
        }
    });
}

module.exports = { obtenerArticulos, insertarArticulo, editarArticulo, eliminarArticulo };
