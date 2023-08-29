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

module.exports = {obtenerActividades, insertarActividad}