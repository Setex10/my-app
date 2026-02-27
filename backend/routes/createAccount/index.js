require("dotenv").config()
const express = require("express")
const route = express.Router()
const path = require("path")
const secretKey = process.env.SECRET_KEY
const jwt = require("jsonwebtoken")
const UserModel = require("../../models/UserModel.js")
const InventarioModel = require("../../models/InventarioModel.js")
const EnterpriseModel = require("../../models/EnterpriseModel.js")

route.get("/createAccount", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/login/createAccount.html"))
})

route.post("/createAccount", async (req, res) => {
    const {email, name, password, role, enterprise} = req.body

    try {
        const userExist = await UserModel.findOne({email})
        if(!!userExist) return res.status(400).json({
            message: "email is alredy exist"
        })

        if(role !== "admin"){
            //Aquí tendría que pasar el id, el cual el "admin" le tendría que pasar
            const enterpriseDoc = await EnterpriseModel.find({id: enterprise})
            if(enterpriseDoc.length == 0){
                return res.status(404).json({
                message: "No se encontró la empresa"
                })
            }
            const doc = new UserModel({email, name, password, role, enterprise})
            const inventario = new InventarioModel({user: doc._id})
            await doc.save()
            await inventario.save()
        }

        const enterpriseDoc = new EnterpriseModel({
            name
        })
        const doc = new UserModel({email, name, password, role, enterprise: enterpriseDoc._id})
        enterpriseDoc.users = [
            doc._id
        ]
        const inventario = new InventarioModel({enterprise: enterpriseDoc._id})
        await enterpriseDoc.save()
        await doc.save()
        await inventario.save()
        
        const token = jwt.sign({
            id: doc.id,
            email, name, role
        }, secretKey)
        res.cookie("token", token, {
            secure: false,
            sameSite: "lax"
        })
        res.status(201).json({
            message: "work",
            status: 201,
            token
        })
    } catch (error) {
        if(error.name == "ValidationError"){
            const mensajes = Object.values(error.errors).map(el => el.message);
            return res.status(400).json({ error: "Datos inválidos", detalles: mensajes });
        }
        if (error.code === 11000) {
            return res.status(400).json({ error: "El correo ya está registrado" });
        }
        console.log(error)
        res.status(500).json({ error: "Error interno en el servidor" , error})
    }
})


module.exports = route