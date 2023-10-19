const InvestigacionModel = require("../models/InvestigacionModel");
const multer = require("multer");
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/evidenciasInvestigacion");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop();
    const IdProject = req.body.idProyecto;
    const currentDate = new Date().toISOString().slice(0, 10);
    const uuidv4 = require('uuid').v4;  // Asegúrate de instalar la librería UUID si no la tienes

    cb(
      null,
      `Evi-Investigacion-${IdProject}-${currentDate}-${uuidv4()}.${fileExtension}`
    );
  },
});

const upload = multer({ storage: storage }).single("evidencias");

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

function insertarColaborador(req, res) {
  const formData = {
    nombre: req.body.nombreColaborador,
    tipo: req.body.tipoColaborador,
    id_proyecto: req.body.idProyecto
  };

  InvestigacionModel.insertarColaborador(formData, (error, resultado) => {
    if (error) {
      console.log("Error al insertar en la base de datos:", error);
      res.status(500).json({ error: "Error al registrar al colaborador." });
    } else {
      res.json(resultado);
    }
  });
}

function editarColaborador(req, res) {
  const id = req.body.idColaborador;
  const formData = {
    nombre: req.body.nombreColaborador,
    tipo: req.body.tipoColaborador,
    id_proyecto: req.body.idProyecto
  };

  InvestigacionModel.editarColaborador(id, formData, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al editar colaborador." });
    } else {
      res.json(results);
    }
  });
}

function eliminarColaborador(req, res) {
  const id = req.params.idColaborador;
  InvestigacionModel.eliminarColaborador(id, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al eliminar colaborador." });
    } else {
      res.json(results);
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

function obtenerColaboradores(req, res) {
  const idColaborador= req.params.idColaborador;

  InvestigacionModel.obtenerColaboradores(idColaborador, (error, rows) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener los colaboradores." });
    } else {
      res.json(rows);
    }
  });
}

function cargarEvidencia(req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const { originalname, filename } = req.file;

    const urlArchivo = "/public/evidenciasInvestigacion/" + filename;

    const { idProyecto, nombreEvidencia } = req.body;

    const data = {
      nombreEvi: nombreEvidencia,
      urlEvi: urlArchivo,
      id_proyecto: idProyecto,
    };

    InvestigacionModel.insertarEvidencias(data, (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error al insertar las evidencias." });
      } else {
        res.json(results);
      }
    });
  });
}

function obtenerEvidencias(req, res) {
  const idProyecto = req.params.idProyecto;

  InvestigacionModel.obtenerEvidencias(idProyecto, (error, rows) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener las evidencias." });
    } else {
      res.json(rows);
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
    cargarEvidencia,
    obtenerEvidencias
}
