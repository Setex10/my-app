require("dotenv").config()
const jwt = require("jsonwebtoken"),
    { unless } = require('express-unless'),
    path = require("path")
const checkTokenJWT = (req, res, next) => {
    const token = req.cookies.token;
    console.log(req.path)
    if (!token) {
        if (req.path.startsWith('/api')) {
            return res.status(401).json({ mensaje: "No autorizado. Token inexistente." });
        }
        return res.status(401).sendFile(path.join(__dirname, "../public2/errors/noLogin/index.html"))
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'tu_clave_secreta_aqui');
        
        req.user = decoded;
        
        next();
    } catch (error) {
        res.clearCookie('token');
        
        if (req.path.startsWith('/api')) {
            return res.status(401).json({ mensaje: "Sesión expirada o token inválido." });
        }
        return res.redirect('/login');
    }
}

checkTokenJWT.unless = unless

module.exports = checkTokenJWT