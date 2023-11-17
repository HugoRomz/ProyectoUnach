const secretariaModel = require("../models/secretariaModel");

const multer = require("multer");

const fs = require("fs");
const path = require("path");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/evidenciasSecretaria");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop();
    const actividadId = req.body.idSecretaria;
    const currentDate = new Date().toISOString().slice(0, 10);
    const uuidv4 = require("uuid").v4; // Asegúrate de instalar la librería UUID si no la tienes

    cb(
      null,
      `Evi-Sec-${actividadId}-${currentDate}-${uuidv4()}.${fileExtension}`
    );
  },
});

const upload = multer({ storage: storage }).single("evidencias");

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
      res.status(500).json({ error: "Error al insertar la actividad." });
    } else {
      res.json(resultado);
    }
  });
}

function editarDocente(req, res) {

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

function getTipo(req, res) {

  secretariaModel.getTipo((error, rows) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener el data." });
    } else {
      res.json(rows);
    }
  });
}

function obtenerDocumentos(req, res) {
  const idSecretaria = req.params.id;
  secretariaModel.obtenerDocumentos(idSecretaria, (error, rows) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener las actividades." });
    } else {
      res.json(rows);
    }
  });
}

function insertarDocumentos(req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const { originalname, filename } = req.file;

    const urlArchivo = "/public/evidenciasSecretaria/" + filename;

    const { idSecretaria, nombreDoc, fecha,idTipoDocumento } = req.body;

    const data = {
      idSecretaria: idSecretaria,
      idTipoDocumento: idTipoDocumento,
      urlDocumento: urlArchivo,
      fecha,
      nombreDoc,
    };
    secretariaModel.insertarDocumentos(data, (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error al insertar el registro." });
      } else {
        res.json(results);
      }
    });
  });
}
const actualizarDocumentos = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { idDocumento, nombreDoc, fecha,idTipoDocumento } = req.body;

    const data = {
      idTipoDocumento: idTipoDocumento,
      fecha,
      nombreDoc,
    };

    if (req.file) {
      const { filename } = req.file;
      const urlArchivo = "/public/evidenciasSecretaria/" + filename;
      data.urlDocumento = urlArchivo;
    }
    // Primero obtenemos la información del archivo antiguo.
    secretariaModel.obtenerDocumentosPorId(idDocumento, (err, prevEvi) => {
      if (err || !prevEvi || prevEvi.length === 0) {
        console.error(
          "Error obteniendo la evidencia previa:",
          err || "No hay datos previos."
        );
        return res
          .status(500)
          .json({ error: "Error al obtener las evidencias previas." });
      }

      const oldFilePath = prevEvi[0].urlDocumento;

      // Luego actualizamos la información en la base de datos.
      secretariaModel.actualizarDocumentos(
        idDocumento,
        data,
        (error, results) => {
          if (error) {
            if (data.urlDocumento) {
              fs.unlink(
                path.join(__dirname, "..", data.urlDocumento),
                (unlinkError) => {
                  if (unlinkError) {
                    console.error(
                      "Error eliminando el nuevo archivo después de un error de base de datos:",
                      unlinkError
                    );
                  }
                }
              );
            }
            return res
              .status(500)
              .json({ error: "Error al actualizar las evidencias." });
          } else {
            // Si se actualizó correctamente y hemos subido un nuevo archivo, eliminamos el antiguo.
            if (data.urlDocumento && oldFilePath !== data.urlDocumento) {
              fs.unlink(
                path.join(__dirname, "..", oldFilePath),
                (unlinkError) => {
                  if (unlinkError) {
                    console.error(
                      "Error eliminando el archivo antiguo:",
                      unlinkError
                    );
                  }
                }
              );
            }
            res.json({
              message: "Evidencia actualizada correctamente",
              data: results,
            });
          }
        }
      );
    });
  });
};

function eliminarDocumentos(req, res) {
  const id = req.params.id;

  secretariaModel.obtenerDocumentosPorId(id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener la Documento." });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "Documento no encontrada." });
    }

    const filePath = results[0].urlDocumento;

    fs.unlink(path.join(__dirname, "..", filePath), (error) => {
      if (error) {
        return res.status(500).json({ error: "Error al eliminar el archivo." });
      }

      secretariaModel.eliminarDocumentos(id, (error, results) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Error al eliminar la Documento." });
        }
        res.json(results);
      });
    });
  });
}




module.exports = {
  showAll,
  insertarDocente,
  editarDocente,
  eliminarDocente,

  getTipo,
  obtenerDocumentos,
  insertarDocumentos,
  actualizarDocumentos,
  eliminarDocumentos

};
