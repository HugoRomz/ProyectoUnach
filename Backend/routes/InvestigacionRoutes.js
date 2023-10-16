const express = require("express");
const router = express.Router();
const InvestigacionController = require("../controllers/InvestigacionController");

router.get("/", (req, res) => {
    res.send("Ruta Inicio");
  });

router.get("/proyectos_investigacion", InvestigacionController.obtenerProyectos);
router.post("/proyectos_investigacion", InvestigacionController.insertarProyecto);

module.exports = router;