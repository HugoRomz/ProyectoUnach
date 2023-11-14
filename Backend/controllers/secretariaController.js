const secretariaModel = require("../models/secretariaModel");

function showAll(req, res) {
  secretariaModel.showAll((error, rows) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener las actividades." });
    } else {
      res.json(rows);
    }
  });
}

function insertarDocente(req, res) {
  const formData = {
    rfc: req.body.rfc,
    nivelEstudio: req.body.nivelEstudio,
    nombreInstitucion: req.body.nombreInstitucion,
    areaEspecializacion: req.body.areaEspecializacion,
  };

  secretariaModel.insertarDocente(formData, (error, resultado) => {
    if (error) {
      console.log("Error al insertar en la base de datos:", error);
      res.status(500).json({ error: "Error al insertar la actividad." });
    } else {
      res.json(resultado);
    }
  });
}

function editarDocente(req, res) {

  console.log(req.body);

  const id = req.body.idSecretaria;
  const formData = {
    rfc: req.body.rfc,
    nivelEstudio: req.body.nivelEstudio,
    nombreInstitucion: req.body.nombreInstitucion,
    areaEspecializacion: req.body.areaEspecializacion,
  };

  secretariaModel.editarDocente(id, formData, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al editar la actividad." });
    } else {
      res.json(results);
    }
  });
}

function eliminarDocente(req, res) {
  const id = req.params.id;
  secretariaModel.eliminarDocente(id, (error, resultado) => {
    if (error) {
      console.log("Error al eliminar en la base de datos:", error);
      res.status(500).json({ error: "Error al eliminar la actividad." });
    } else {
      res.json(resultado);
    }
  });
}






function obtenerDocumentos(req, res) {
  const idEvidencia = req.params.idEvidencia;

  EnsenanzaModel.obtenerEvidencias(idEvidencia, (error, rows) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener las actividades." });
    } else {
      res.json(rows);
    }
  });
}

module.exports = {
  showAll,
  insertarDocente,
  editarDocente,
  eliminarDocente,

  obtenerDocumentos,
};
