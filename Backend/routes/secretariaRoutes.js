const express = require("express");
const router = express.Router();
const secretariaController = require("../controllers/secretariaController");

router.get("/", (req, res) => {
  res.send("Ruta Inicio");
});

router.get("/showAll", secretariaController.showAll);



module.exports = router;
