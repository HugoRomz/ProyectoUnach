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

function insertarColaborador(data, callback) {
  const query = "INSERT INTO colaboradores SET ?";
  db.query(query, data, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function editarColaborador(id, newData, callback) {
  const query = "UPDATE colaboradores SET ? WHERE id_colaborador = ?";
  db.query(query, [newData, id], (error, results) => {
    if (error) {
      console.error("Error al editar colaborador:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function eliminarColaborador(id, callback) {
  const query = "DELETE FROM colaboradores WHERE id_colaborador = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function obtenerProyectos(callback) {
  const query =
    "SELECT * FROM proyectos_investigacion;";
  db.query(query, (error, rows) => {
    if (error) {
      callback(error, null);
      console.log("error");
    } else {
      callback(null, rows);
    }
  });
}

function obtenerProyectoPorId(idProyecto, callback) {
  const query = "SELECT * FROM proyectos_investigacion WHERE id = ?";
  db.query(query, [idProyecto], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function obtenerColaboradores(id_proyecto, callback) {
  const query =
    "select col.id_colaborador, col.nombre, col.tipo, col.id_proyecto from colaboradores as col WHERE col.id_proyecto = ?"
  db.query(query, [id_proyecto], (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function insertarEvidencias(data, callback) {
  const query = "INSERT INTO evidencias_investigacion SET ?";
  db.query(query, data, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function obtenerEvidencias(idProyecto, callback) {
  const query =
    "SELECT id_evidencia, nombreEvi FROM evidencias_investigacion WHERE id_proyecto = ?;";
  db.query(query, [idProyecto], (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function eliminarEvidencia(id, callback) {
  const query = "DELETE FROM evidencias_investigacion WHERE id_evidencia = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function obtenerEvidenciaPorId(id, callback) {
  const query = "SELECT * FROM evidencias_investigacion WHERE id_evidencia = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  insertarProyecto,
  obtenerProyectos,
  obtenerColaboradores,
  insertarColaborador,
  editarColaborador,
  eliminarColaborador,
  insertarEvidencias,
  obtenerEvidencias,
  eliminarEvidencia,
  obtenerEvidenciaPorId,
  obtenerProyectoPorId
};
