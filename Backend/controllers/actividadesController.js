const multer = require('multer');

const actividadesModel = require('../models/actividadesModel');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/evidenciasTutoria')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) 
    },
});

const upload = multer({ storage: storage }).single('evidencias');

function cargarEvidencia(req, res) {
    
    upload(req, res, function (err) {
        if (err){
            return res.status(500).json({ error: err.message });
        }
        const {originalname, filename} = req.file;

        const urlArchivo = '/public/evidenciasTutoria/' + filename;

        const {nombre, fecha, descripcion, prog_academico} = req.body;

        const data = {
            nombre,
            fecha,
            descripcion,
            prog_academico,
            evidencias: urlArchivo,
        };

        actividadesModel.insertarActividad(data, (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Error al insertar las actividades.' });
            } else {
                res.json(results);
            }
        });
    });
}



function obtenerActividades(req, res) {
    actividadesModel.obtenerActividades((error, rows) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener las actividades.' });
        } else {
            res.json(rows);
        }
    });
}        

function buscarActividad(req, res) {
    const id = req.params.id;
    actividadesModel.buscarActividad(id, (error, rows) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener la actividad.' });
        } else {
            res.json(rows);
        }
    });
}



function editarActividad(req, res) {
    const {nombre, fecha, descripcion, prog_academico} = req.body;
    console.log(req.body);

    // actividadesModel.editarActividad(id, newData, (error, results) => {
    //     if (error) {
    //         res.status(500).json({ error: 'Error al editar la actividad.' });
    //     } else {
    //         res.json(results);
    //     }
    // });
}

function eliminarActividad(req, res) {
    const id = req.params.id;
    actividadesModel.eliminarActividad(id, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al eliminar la actividad.' });
        } else {
            res.json(results);
        }
    });
}

module.exports = {obtenerActividades, cargarEvidencia, editarActividad, eliminarActividad, buscarActividad}