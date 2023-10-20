const db = require("../config/db.config");

exports.findByRFC = (rfc) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuarios WHERE rfc = ?';
        
        db.query(query, [rfc], (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results[0]);
        });
    });
};

exports.findPermisosByRFC = (rfc) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT u.nombre_Doce AS NombreUsuario, p.descripcion AS Permiso 
            FROM usuarios AS u 
            JOIN usuarios_permisos AS up ON u.rfc = up.idUsuario 
            JOIN permisos AS p ON up.idPermiso = p.idPermisos 
            WHERE u.rfc = ?
        `;

        db.query(query, [rfc], (error, results) => {
            if (error) {
                reject(error);
                return;
            }

            // Aquí asumimos que un usuario puede tener múltiples permisos,
            // por lo que devolvemos todos los resultados (y no solo results[0]).
            resolve(results);
        });
    });
};
