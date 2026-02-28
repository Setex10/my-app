require("dotenv").config()
const jwt = require("jsonwebtoken"),
    { unless } = require('express-unless');
const UserModel = require("../models/UserModel");

const checkTokenJWT = async(req, res, next) => {
    const token = req.cookies.token;
    console.log(req.path)
    if (!token) {
        if (req.path.startsWith('/api')) {
            return res.status(401).redirect("/login");
        }
        return res.status(401).redirect("/login")
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'tu_clave_secreta_aqui');
        
        req.user = decoded;
        const user = await UserModel.findById(decoded.id);

        if (!user) {
        return res.status(401).redirect("/login");
        }
        
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