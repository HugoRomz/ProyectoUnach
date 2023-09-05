const db = require('../config/db.config');

function obtenerActividades(callback) {
    const query = 'SELECT * FROM act_tutorias;';
    db.query(query, (error, rows) => {
        if (error) {
            callback(error, null);
            console.log("error");
        } else {
            callback(null, rows);
        }
    });
}

function insertarActividad(data, callback) {
    const query = 'INSERT INTO act_tutorias SET ?';
    db.query(query, data, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

function editarActividad(id, newData, callback) {
    const query = 'UPDATE act_tutorias SET ? WHERE id_act = ?';
    db.query(query, [newData, id], (error, results) => {
        if (error) {
            console.error("Error al editar la actividad:", error);
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

function eliminarActividad(id, callback) {
    const query = 'DELETE FROM act_tutorias WHERE id_act = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

module.exports = {obtenerActividades, insertarActividad, editarActividad, eliminarActividad}