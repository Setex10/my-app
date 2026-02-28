const { checkRoleAdmin } = require("../../../middleware/checkRole.js");
const { getDecodedJwt } = require("../../../utils/getDecodedJwt.js")

require("dotenv").config()
const express = require("express"),
route = express.Router(),
UserModel = require("../../../models/UserModel.js");

route.get("/api/user", checkRoleAdmin, async(req, res) => {
    const {token} = req.cookies
    const {enterprise} = getDecodedJwt(token)
    const {id} = req.query
    try {
        const doc = await UserModel.find({enterprise})
        const list_users = doc.map(({name, email, role, id}) => {
            return {
                name, email, role, id
            }
        })
        if(id && id.length > 0){
            const user = list_users.filter((user) => user.id == id)
            return res.status(200).json({
                user: user[0]
            })
        }
        res.status(200).json({
            list_users
        })
        
    } catch (error){
        console.log(error)
        res.status(400).json({
            message: "No work"
        })
    }
})

route.post("/api/user", checkRoleAdmin, async(req, res) => {
    const {token} = req.cookies
    const {enterprise} = getDecodedJwt(token)
    const {name, role, email, password} = req.body
    try {
        const doc = new UserModel({
            name, role, email, password, enterprise
        })
        await doc.save()
        res.status(200).json({
            message: "Se creo el usuario"
        })
    } catch (error) {
        if(error.name == "ValidationError"){
            const mensajes = Object.values(error.errors).map(el => el.message);
            return res.status(400).json({ error: "Datos inválidos", detalles: mensajes });
        }
        if (error.code === 11000) {
            return res.status(400).json({ error: "El correo ya está registrado", detalles: [
                "Correo Ya existe"
            ]});
        }
        console.log(error)
        res.status(400).json({
            message: "Algo malo pasó"
        })
    }
})

route.delete("/api/user/:id", checkRoleAdmin, async(req, res) => {
    const {id} = req.params
    try {
        const doc = await UserModel.findByIdAndDelete(id)
        if(doc){
            res.status(200).json({
                message:"Se elimino el usuario"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "hubo un error"
        })
    }
})

route.put("/api/user/:id", checkRoleAdmin, async(req, res) => {
    const {id} = req.params
    const valuesToUpdate = req.body
    try {
        const doc = await UserModel.findById(id)
        console.log(doc)
        Object.keys(valuesToUpdate).map((key) => {
            doc[key] = valuesToUpdate[key]
        })
        await doc.save()
        res.status(200).json({
            message: "Se modifico el usuario"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Algo malo pasó"
        })
    }
})
module.exports = route