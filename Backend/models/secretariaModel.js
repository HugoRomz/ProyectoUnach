const db = require("../config/db.config");

function showAll(callback) {
  const query =
    "SELECT * FROM secretariaAc";
  db.query(query, (error, rows) => {
    if (error) {
      callback(error, null);
      console.log("error");
    } else {
      callback(null, rows);
    }
  });
}

function insertarDocente(data, callback) {
  const query = "INSERT INTO secretariaAc SET ?";
  db.query(query, data, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function editarDocente(id, newData, callback) {
  const query = "UPDATE secretariaAc SET ? WHERE idSecretaria = ?";
  db.query(query, [newData, id], (error, results) => {
    if (error) {
      console.error("Error al editar el registro:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function eliminarDocente(id, callback) {
  const query = "DELETE FROM secretariaAc WHERE idSecretaria = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}


module.exports = {
  showAll,
  insertarDocente,
  editarDocente,
  eliminarDocente,
};
