const db = require("../config/db.config");

function obtenerActividades(tipoActividad,callback) {
  const query =
    "SELECT actE.idActEnsenanza,actE.nombreAct,actE.descripcionAct,tipAc.idtipoActividad ,tipAc.nombretipoAct,ma.nombreMateria,actE.cicloEscolar,actE.fecha FROM actividadesEnsenanza as actE, tipoActividad as tipAc, materia as ma WHERE actE.tipoAct = tipAc.idtipoActividad AND actE.materia = ma.idMateria AND actE.tipoAct = ?;";
  db.query(query, [tipoActividad],(error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
}

function buscarTipoActividad(callback){
    const query = "SELECT * FROM tipoActividad;";
    db.query(query,(error,rows)=>{
        if(error){
            callback(error,null);
        }else{
            callback(null,rows);
        }
    });
}

function insertarActividad(formData, callback) {
  const query = "INSERT INTO actividadesEnsenanza SET ?";
  db.query(query, formData, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}
function editarActividad(id,formData,callback){
    const query = "UPDATE actividadesEnsenanza SET ? WHERE idActEnsenanza = ?";
    db.query(query,[formData,id],(error,results)=>{
        if(error){
            callback(error,null);
        }else{
            callback(null,results);
        }
    });
}

function eliminarActividad(id,callback){
    const query = "DELETE FROM actividadesEnsenanza WHERE idActEnsenanza = ?";
    db.query(query,[id],(error,results)=>{
        if(error){
            callback(error,null);
        }else{
            callback(null,results);
        }
    });
}
module.exports = { obtenerActividades, buscarTipoActividad, insertarActividad,editarActividad, eliminarActividad };
