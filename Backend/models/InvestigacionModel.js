const db = require("../config/db.config");

function insertarProyecto(data, callback) {
  const query = "INSERT INTO proyectos_investigacion SET ?";
  db.query(query, data, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function obtenerProyectos(callback) {
  const query =
    "SELECT id, nombre, fecha_inicio, fecha_final, linea_investigacion, lider_de_proyecto, estatus FROM proyectos_investigacion;";
  db.query(query, (error, rows) => {
    if (error) {
      callback(error, null);
      console.log("error");
    } else {
      callback(null, rows);
    }
  });
}

module.exports = {
  insertarProyecto,
  obtenerProyectos
};
