const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtConfig = {
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    expiresIn: '1h',
}

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).send({message: 'Token no encontrado!'});
    }
    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'No autorizado!'});
        }

        req.userId = decoded.id;
        next();
    });
}

const validateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return next();
    }

    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) {
            return next();
        }
        req.userId = decoded.id;
        next();
    });

}

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username
    };

    return jwt.sign(payload, jwtConfig.secret, {
        algorithm: jwtConfig.algorithms[0],
        expiresIn: jwtConfig.expiresIn
    });
}

const destroyToken = (req, res) => {
    res.clearCookie('token');
    res.send({ message: 'Sesión cerrada' });
}

module.exports = {
    verifyToken,
    validateToken,
    generateToken,
    destroyToken,
}