const db = require("../config/db.config");

function showAll(callback) {
  const query =
    "SELECT * FROM secretariaAc";
  db.query(query, (error, rows) => {
    if (error) {
      callback(error, null);
      console.log("error");
    } else {
      callback(null, rows);
    }
  });
}


module.exports = {
  showAll,
};
