const InvestigacionModel = require("../models/InvestigacionModel");

function insertarProyecto(req, res) {
  const formData = {
    nombre: req.body.nombreProyecto,
    ciclo_escolar: req.body.cicloEscolar,
    fecha_inicio: req.body.fechaInicio,
    fecha_final: req.body.fechaFin,
    linea_investigacion: req.body.lineaInvestigacion,
    lider_de_proyecto: req.body.liderProyecto,
    estatus: req.body.status,
    recursos_utilizados: req.body.recursosUtilizados,
    tipo_de_recurso: req.body.tipoRecurso,
  };

  InvestigacionModel.insertarProyecto(formData, (error, resultado) => {
    if (error) {
      console.log("Error al insertar en la base de datos:", error);
      res.status(500).json({ error: "Error al insertar el proyecto." });
    } else {
      res.json(resultado);
    }
  });
}

function obtenerProyectos(req, res) {
  InvestigacionModel.obtenerProyectos((error, rows) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener los proyectos." });
    } else {
      res.json(rows);
    }
  });
}

module.exports = {
    insertarProyecto,
    obtenerProyectos
}