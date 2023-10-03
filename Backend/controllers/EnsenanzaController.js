const EnsenanzaModel = require('../models/EnsenanzaModel.js');

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


module.exports = { obtenerActividades,buscarTipoActividad, insertarActividad,editarActividad, eliminarActividad };