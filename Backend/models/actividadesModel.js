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

module.exports = {obtenerActividades}