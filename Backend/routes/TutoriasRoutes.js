const express = require("express");
const router = express.Router();
const actividadesController = require("../controllers/actividadesController");

router.get("/", (req, res) => {
  res.send("Ruta Inicio");
});

router.get("/tutorias", actividadesController.obtenerActividades);

router.get("/buscarProgAcademico", actividadesController.buscarProgAcademico);

router.post("/tutorias", actividadesController.insertarActividad);

router.get("/buscartutorias/:id", actividadesController.buscarActividad);

router.put("/tutorias/:id", actividadesController.editarActividad);

router.delete("/tutorias/:id", actividadesController.eliminarActividad);


router.get("/evidencias/:idEvidencia", actividadesController.obtenerEvidencias);
router.post("/insertarEvidencias", actividadesController.cargarEvidencia);
router.put('/actualizarEvidencias/:id', actividadesController.actualizarEvidencias);
router.delete('/eliminarEvidencias/:id', actividadesController.eliminarEvidencia);


module.exports = router;
