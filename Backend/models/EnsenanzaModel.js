const db = require("../config/db.config");

function obtenerActividades(tipoActividad, callback) {
  const query =
    "SELECT actE.idActEnsenanza,actE.nombreAct,actE.descripcionAct,tipAc.idtipoActividad ,tipAc.nombretipoAct,ma.nombreMateria,actE.cicloEscolar,actE.fecha FROM actividadesEnsenanza as actE, tipoActividad as tipAc, materia as ma WHERE actE.tipoAct = tipAc.idtipoActividad AND actE.materia = ma.idMateria AND actE.tipoAct = ?;";
  db.query(query, [tipoActividad], (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function buscarTipoActividad(callback) {
  const query = "SELECT * FROM tipoActividad;";
  db.query(query, (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function insertarActividad(formData, callback) {
  const query = "INSERT INTO actividadesEnsenanza SET ?";
  db.query(query, formData, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}
function editarActividad(id, formData, callback) {
  const query = "UPDATE actividadesEnsenanza SET ? WHERE idActEnsenanza = ?";
  db.query(query, [formData, id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function eliminarActividad(id, callback) {
  const query = "DELETE FROM actividadesEnsenanza WHERE idActEnsenanza = ?";
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
    "select ev.idevidenciasE,ev.nombreEvi, ev.descripcionEvi, ev.urlEvi, ev.idActividad, act.nombreAct from evidenciasEnsenanza as ev, actividadesEnsenanza as act WHERE ev.idActividad = ? and ev.idActividad = act.idActEnsenanza";
  db.query(query, [idActividad], (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function insertarEvidencias(data, callback) {
  const query = "INSERT INTO evidenciasEnsenanza SET ?";
  db.query(query, data, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function actualizarEvidencias(id, data, callback) {
  const query = "UPDATE evidenciasEnsenanza SET ? WHERE idevidenciasE = ?";
  db.query(query, [data, id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function eliminarEvidencia(id, callback) {
  const query = "DELETE FROM evidenciasEnsenanza WHERE idevidenciasE = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function obtenerEvidenciaPorId(id, callback) {
  const query = "SELECT * FROM evidenciasEnsenanza WHERE idevidenciasE = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function getAllUsuarios(callback) {
  db.query("SELECT * FROM usuarios WHERE n_plaza != ''", (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function getAllMaterias(callback) {
  db.query("SELECT m.*, s.semestre as nombresemestre,s.grupo,  p.nombreProg FROM materia m JOIN semestre_grupo s ON m.semestre = s.is_SG JOIN prog_academicos p ON m.prog_academico = p.idprog_academicos;", (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function getSemestre(callback) {
  db.query("SELECT * FROM semestre_grupo;", (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function getProg(callback) {
  db.query("SELECT * FROM prog_academicos;", (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function getDetalleD(callback) {
  db.query(
    "SELECT d.id_Det_d,d.docente,d.materia, m.nombreMateria FROM detalle_docente d JOIN materia m ON d.materia = m.idMateria;",
    (error, rows) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, rows);
      }
    }
  );
}

function asignarMateriaDocente(formData, callback) {
  const query = "INSERT INTO detalle_docente SET ?";
  db.query(query, formData, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function editarMateriaDocente(id, formData, callback) {
  const query = "UPDATE detalle_docente SET ? WHERE id_Det_d = ?";
  db.query(query, [formData, id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function eliminarDetalleDocente(id, callback) {
  const query = "DELETE FROM detalle_docente WHERE id_Det_d = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function insertarMateria(formData, callback) {
  const query = "INSERT INTO materia SET ?";
  db.query(query, formData, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}
function editarMateria(id, formData, callback) {
  const query = "UPDATE materia SET ? WHERE idMateria = ?";
  db.query(query, [formData, id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function eliminarMateria(id, callback) {
  const query = "DELETE FROM materia WHERE idMateria = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}



function obtenerDocentes(idActividad, callback) {
  const query =
    "SELECT * FROM usuarios";
  db.query(query, [idActividad], (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function insertarDocente(formData, callback) {
  const query = "INSERT INTO usuarios SET ?";
  db.query(query, formData, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}
function editarDocente(id, formData, callback) {
  const query = "UPDATE materia SET ? WHERE idMateria = ?";
  db.query(query, [formData, id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function eliminarDocente(id, callback) {
  const query = "DELETE FROM materia WHERE idMateria = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}


module.exports = {
  obtenerActividades,
  buscarTipoActividad,
  insertarActividad,
  editarActividad,
  eliminarActividad,
  obtenerEvidencias,
  insertarEvidencias,
  eliminarEvidencia,
  obtenerEvidenciaPorId,
  actualizarEvidencias,
  getAllUsuarios,
  getAllMaterias,
  getDetalleD,
  asignarMateriaDocente,
  editarMateriaDocente,
  eliminarDetalleDocente,
  getSemestre,
  getProg,
  insertarMateria,
  editarMateria,
  eliminarMateria,
  obtenerDocentes,
  insertarDocente,
  editarDocente,
  eliminarDocente,
};
