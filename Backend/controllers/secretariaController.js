const secretariaModel = require("../models/secretariaModel");


function showAll(req, res) {
    secretariaModel.showAll((error, rows) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener las actividades." });
    } else {
      res.json(rows);
    }
  });
}



module.exports = {
  showAll,
};
