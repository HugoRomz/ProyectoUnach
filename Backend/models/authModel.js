const db = require("../config/db.config");

exports.findByRFC = (rfc) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM docentes WHERE rfc = ?';
        
        db.query(query, [rfc], (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results[0]);
        });
    });
};
