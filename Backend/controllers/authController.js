const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Docente = require("../models/authModel.js");

exports.login = async (req, res) => {
  const { rfc, password } = req.body;

  try {
    const docente = await Docente.findByRFC(rfc);

    if (!docente) {
      return res.status(400).send("Docente no encontrado");
    }

    const validPassword = await bcrypt.compare(password, docente.password);

    if (!password) {
      return res.status(400).send("Contraseña incorrecta");
    }

    const token = jwt.sign(
      { id: docente.id, rfc: docente.rfc },
      "TU_SECRETO_AQUI",
      { expiresIn: "1h" }
    );
    res.send({ token, docente });
  } catch (error) {
    // Maneja errores
    res.status(500).send("Error del servidor");
  }
};
