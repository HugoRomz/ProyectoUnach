const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, 'TU_SECRETO_AQUI', (err, user) => {
            if (err) {
                return res.sendStatus(403); 
            }

            req.user = user; 
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = authenticateJWT;
