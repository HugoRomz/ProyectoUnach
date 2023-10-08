const EnsenanzaModel = require('../models/EnsenanzaModel.js');

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/evidenciasEnsenanza')
    },
    filename: function (req, file, cb) {
        const fileExtension = file.originalname.split('.').pop(); // Obtiene la extensión del archivo
        const actividadId = req.body.idActEnsenanza;  // Suponiendo que el ID de la actividad se envía en el cuerpo de la solicitud

        // Obtiene la fecha actual en formato YYYY-MM-DD
        const currentDate = new Date().toISOString().slice(0, 10);
        
        cb(null, `Evidencia-${actividadId}-${currentDate}.${fileExtension}`);
    },
});

const upload = multer({ storage: storage }).single('evidencias');


function obtenerActividades(req, res) {
    const tipoActividad = req.params.id;
    EnsenanzaModel.obtenerActividades(tipoActividad,(error, rows) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener las actividades.' });
        } else {
            res.json(rows);
        }
    });
}
function buscarTipoActividad(req,res){
    EnsenanzaModel.buscarTipoActividad((error,rows)=>{
        if(error){
            res.status(500).json({error:'Error al obtener los tipos de actividades.'});
        }else{
            res.json(rows);
        }
    });
}

function insertarActividad(req, res) {

    const formData = {
        nombreAct: req.body.nombreAct,
        descripcionAct: req.body.descripcionAct,
        tipoAct: req.body.tipoAct,
        materia: 5,
        cicloEscolar: "2020-2021",
        fecha: req.body.fecha
    };

    EnsenanzaModel.insertarActividad(formData, (error, resultado) => {
        if (error) {
            console.log("Error al insertar en la base de datos:", error);
            res.status(500).json({ error: 'Error al insertar la actividad.' });
        } else {
            res.json(resultado);
        }
    });
}
function editarActividad(req,res){
    const id = req.params.id;
    const formData = {
        nombreAct: req.body.nombreAct,
        descripcionAct: req.body.descripcionAct,
        tipoAct: req.body.tipoAct,
        materia: 5,
        cicloEscolar: "2020-2021",
        fecha: req.body.fecha
    };
    EnsenanzaModel.editarActividad(id,formData,(error,resultado)=>{
        if(error){
            console.log("Error al editar en la base de datos:", error);
            res.status(500).json({ error: 'Error al editar la actividad.' });
        }else{
            res.json(resultado);
        }
    });
}
function eliminarActividad(req,res){
    const id = req.params.id;
    EnsenanzaModel.eliminarActividad(id,(error,resultado)=>{
        if(error){
            console.log("Error al eliminar en la base de datos:", error);
            res.status(500).json({ error: 'Error al eliminar la actividad.' });
        }else{
            res.json(resultado);
        }
    });
}

function obtenerEvidencias(req, res) {
    const idEvidencia = req.params.idEvidencia;

    EnsenanzaModel.obtenerEvidencias(idEvidencia,(error, rows) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener las actividades.' });
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

        const urlArchivo = '/public/evidenciasEnsenanza/' + filename;

        const {idActEnsenanza, nombreEvi,  descripcionEvi} = req.body;

        const data = {
            nombreEvi,
            descripcionEvi,
            urlEvi: urlArchivo,
            idActividad: idActEnsenanza,
        };

        EnsenanzaModel.insertarEvidencias(data, (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Error al insertar las actividades.' });
            } else {
                res.json(results);
            }
        });
    });
}


module.exports = { obtenerActividades,buscarTipoActividad, insertarActividad,editarActividad, eliminarActividad, obtenerEvidencias, cargarEvidencia };