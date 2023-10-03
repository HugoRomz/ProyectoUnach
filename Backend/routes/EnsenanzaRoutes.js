const express = require("express");
const router = express.Router();

const EnsenanzaController = require("../controllers/EnsenanzaController");

router.post("/insertarActividad", EnsenanzaController.insertarActividad);
router.get("/showall/:id", EnsenanzaController.obtenerActividades);
router.get("/buscarTipoActividad", EnsenanzaController.buscarTipoActividad);
router.put("/editarActividad/:id", EnsenanzaController.editarActividad);
router.delete("/eliminarActividad/:id", EnsenanzaController.eliminarActividad);

module.exports = router;
