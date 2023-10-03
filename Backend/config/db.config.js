const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sistema_gestion2'
});

conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log("La conexion es exitosa");
    }
});

module.exports = conexion;
