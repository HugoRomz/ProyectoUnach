const express = require("express");
const router = express.Router();

const EnsenanzaController = require("../controllers/EnsenanzaController");

router.post("/insertarActividad", EnsenanzaController.insertarActividad);
router.get("/showall/:id", EnsenanzaController.obtenerActividades);
router.get("/buscarTipoActividad", EnsenanzaController.buscarTipoActividad);
router.put("/editarActividad/:id", EnsenanzaController.editarActividad);
router.delete("/eliminarActividad/:id", EnsenanzaController.eliminarActividad);


router.get("/evidencias/:idEvidencia", EnsenanzaController.obtenerEvidencias);
router.post('/insertarEvidencias', EnsenanzaController.cargarEvidencia);
router.put('/actualizarEvidencias/:id', EnsenanzaController.actualizarEvidencias);
router.delete('/eliminarEvidencias/:id', EnsenanzaController.eliminarEvidencia);


router.get('/getUsuarios', EnsenanzaController.getUsuarios);
router.get('/getMaterias', EnsenanzaController.getMaterias);
router.get('/getDetalleD', EnsenanzaController.getDetalleD);
router.post('/asignarMateriaDocente', EnsenanzaController.asignarMateriaDocente)
router.put('/editarMateriaDocente/:id',EnsenanzaController.editarMateriaDocente)
router.delete('/eliminarDetalleDocente/:id', EnsenanzaController.eliminarDetalleDocente);



module.exports = router;
