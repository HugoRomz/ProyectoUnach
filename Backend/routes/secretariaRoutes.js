const express = require("express");
const router = express.Router();
const secretariaController = require("../controllers/secretariaController");

router.get("/", (req, res) => {
  res.send("Ruta Inicio");
});

router.get("/showAll", secretariaController.showAll);
router.post("/insertarDocente", secretariaController.insertarDocente);
router.put("/editarDocente/:id", secretariaController.editarDocente);
router.delete("/eliminarDocente/:id", secretariaController.eliminarDocente);


// router.get("/Documentos/:id", secretariaController.obtenerDocumentos);
// router.post("/insertarDocumentos", secretariaController.insertarDocumentos);
// router.put(
//   "/actualizarDocumentos/:id",
//   secretariaController.actualizarDocumentos
// );
// router.delete("/eliminarDocumentos/:id", secretariaController.eliminarDocumentos);

module.exports = router;
