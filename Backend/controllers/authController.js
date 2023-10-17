const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/authModel.js");

exports.login = async (req, res) => {
  const { rfc, password } = req.body;

  try {
    const usuario = await Usuario.findByRFC(rfc);

    if (!usuario) {
      return res.status(400).send("Usuario no encontrado");
    }

    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
      return res.status(400).send("Contraseña incorrecta");
    }

    const token = jwt.sign(
      { id: usuario.id, rfc: usuario.rfc },
      "1234",
      { expiresIn: "1h" }
    );
    res.send({ token, usuario });
  } catch (error) {
    // Maneja errores
    res.status(500).send("Error del servidor");
  }
};
