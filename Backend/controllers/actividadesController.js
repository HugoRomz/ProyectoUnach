const actividadesModel = require("../models/actividadesModel");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/evidenciasTutoria')
  },
  filename: function (req, file, cb) {
      const fileExtension = file.originalname.split('.').pop(); // Obtiene la extensión del archivo
      const actividadId = req.body.idActTutorias;  // Suponiendo que el ID de la actividad se envía en el cuerpo de la solicitud

      // Obtiene la fecha actual en formato YYYY-MM-DD
      const currentDate = new Date().toISOString().slice(0, 10);
      
      cb(null, `Evidencia-Tutoria-${actividadId}-${currentDate}.${fileExtension}`);
  },
});

const upload = multer({ storage: storage }).single('evidencias');


function insertarActividad(req, res) {
  const formData = {
    nombreActTutorias: req.body.nombreActTutorias,
    descripcionActTutorias: req.body.descripcionActTutorias,
    fechaActTutorias: req.body.fechaActTutorias,
    prog_academico: req.body.prog_academico,
  };

  actividadesModel.insertarActividad(formData, (error, resultado) => {
    if (error) {
      console.log("Error al insertar en la base de datos:", error);
      res.status(500).json({ error: "Error al insertar la actividad." });
    } else {
      res.json(resultado);
    }
  });
}

function obtenerActividades(req, res) {
  actividadesModel.obtenerActividades((error, rows) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener las actividades." });
    } else {
      res.json(rows);
    }
  });
}

function buscarProgAcademico(req, res) {
  actividadesModel.buscarProgAcademico((error, rows) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener las actividades." });
    } else {
      res.json(rows);
    }
  });
}

function buscarActividad(req, res) {
  const id = req.params.id;
  actividadesModel.buscarActividad(id, (error, rows) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener la actividad." });
    } else {
      res.json(rows);
    }
  });
}

function editarActividad(req, res) {
  const id = req.body.idActTutorias;
  const formData = {
    nombreActTutorias: req.body.nombreActTutorias,
    descripcionActTutorias: req.body.descripcionActTutorias,
    fechaActTutorias: req.body.fechaActTutorias,
    prog_academico: req.body.prog_academico,
  };

  actividadesModel.editarActividad(id, formData, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al editar la actividad." });
    } else {
      res.json(results);
    }
  });
}

function eliminarActividad(req, res) {
  const id = req.params.id;
  actividadesModel.eliminarActividad(id, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al eliminar la actividad." });
    } else {
      res.json(results);
    }
  });
}

function obtenerEvidencias(req, res) {
  const idEvidencia = req.params.idEvidencia;

  actividadesModel.obtenerEvidencias(idEvidencia, (error, rows) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener las actividades." });
    } else {
      res.json(rows);
    }
  });
}


function cargarEvidencia(req, res) {
    
  upload(req, res, function (err) {
      if (err){
          return res.status(500).json({ error: err.message });
      }
      const {originalname, filename} = req.file;

      const urlArchivo = '/public/evidenciasTutoria/' + filename;

      const {idActTutorias, nombreEvi,  descripcionEvi} = req.body;

      const data = {
          nombreEvi,
          descripcionEvi,
          urlEvi: urlArchivo,
          idActividad: idActTutorias,
      };

      actividadesModel.insertarEvidencias(data, (error, results) => {
          if (error) {
              res.status(500).json({ error: 'Error al insertar las actividades.' });
          } else {
              res.json(results);
          }
      });
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
  cargarEvidencia
};
