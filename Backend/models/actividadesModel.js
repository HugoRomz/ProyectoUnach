const db = require("../config/db.config");

function obtenerActividades(callback) {
  const query =
    "SELECT actT.idActTutorias, actT.nombreActTutorias, actT.descripcionActTutorias, actT.fechaActTutorias, actT.prog_academico, prog.nombreProg FROM actividadesTutorias as actT, prog_academicos as prog WHERE actT.prog_academico = prog.idprog_academicos;";
  db.query(query, (error, rows) => {
    if (error) {
      callback(error, null);
      console.log("error");
    } else {
      callback(null, rows);
    }
  });
}

function buscarProgAcademico(callback) {
  const query = "SELECT * FROM prog_academicos;";
  db.query(query, (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function buscarActividad(id, callback) {
  const query = "SELECT * FROM actividadesTutorias WHERE idActTutorias = ?";
  db.query(query, [id], (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function insertarActividad(data, callback) {
  const query = "INSERT INTO actividadesTutorias SET ?";
  db.query(query, data, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function editarActividad(id, newData, callback) {
  const query = "UPDATE actividadesTutorias SET ? WHERE idActTutorias = ?";
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
  const query = "DELETE FROM actividadesTutorias WHERE idActTutorias = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function obtenerEvidencias(idActividad, callback) {
  const query =
    "select ev.idevidenciasT,ev.nombreEvi, ev.descripcionEvi, ev.urlEvi, ev.idActividad, act.nombreActTutorias from evidenciasTutorias as ev, actividadesTutorias as act WHERE ev.idActividad = ? and ev.idActividad = act.idActTutorias";
  db.query(query, [idActividad], (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function insertarEvidencias(data, callback) {
  const query = "INSERT INTO evidenciasTutorias SET ?";
  db.query(query, data, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  obtenerActividades,
  insertarActividad,
  editarActividad,
  eliminarActividad,
  buscarActividad,
  buscarProgAcademico,
  obtenerEvidencias,
  insertarEvidencias
};
