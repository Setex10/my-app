require("dotenv").config()
const express = require("express")
const route = express.Router()
const path = require("path")
const secretKey = process.env.SECRET_KEY
const jwt = require("jsonwebtoken")
const UserModel = require("../../models/UserModel.js")

route.get("/createAccount", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/login/createAccount.html"))
})

route.post("/createAccount", async (req, res) => {
    const {email, name, password} = req.body

    try {
        const userExist = await UserModel.findOne({email})
        if(!!userExist) return res.status(400).json({
            message: "email is alredy exist"
        })
        const doc = new UserModel({email, name, password})
        await doc.save()
        const token = jwt.sign({
            id: doc.id,
            email, name
        }, secretKey)
        res.cookie("token", token)
        res.status(201).json({
            message: "work",
            status: 201
        })
    } catch (error) {
        if(error.name == "ValidationError"){
            const mensajes = Object.values(error.errors).map(el => el.message);
            return res.status(400).json({ error: "Datos inválidos", detalles: mensajes });
        }
        if (error.code === 11000) {
            return res.status(400).json({ error: "El correo ya está registrado" });
        }
        res.status(500).json({ error: "Error interno en el servidor" })
    }
})


module.exports = route