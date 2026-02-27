const { getDecodedJwt } = require("../utils/getDecodedJwt")

const checkRoleInventory = async (req, res, next) => {
    const {token} = req.cookies
    const {role} = await getDecodedJwt(token)
    console.log(role)
    if(role === "admin" || role === "inventario"){
        next()
    } else {
        res.status(401).json({
            message: "No tienes permiso"
        })
    }
}

const checkRoleVentas = async(req, res, next) => {
    const {token} = req.cookies
    const {role} = await getDecodedJwt(token)
    console.log(role)
    if(role === "admin" || role === "ventas"){
        next()
    } else {
        res.status(401).json({
            message: "No tienes permiso"
        })
    }
}

module.exports = {checkRoleInventory, checkRoleVentas}