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
      "TU_SECRETO_AQUI",
      { expiresIn: "1h" }
    );
    res.send({ token, usuario });
  } catch (error) {
    // Maneja errores
    res.status(500).send("Error del servidor");
  }
};


exports.getPermisos = async (req, res) => {
  const { rfc } = req.params;

  try {
      const permisos = await Usuario.findPermisosByRFC(rfc);
      if (!permisos) {
          return res.status(400).send("Permisos no encontrados");
      }
      res.send({ permisos });
  } catch (error) {
      // Maneja errores
      res.status(500).send("Error del servidor");
  }
};
