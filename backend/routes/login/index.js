require("dotenv").config()
const express = require("express")
const route = express.Router()
const path = require("path")
const jwt = require("jsonwebtoken")
const UserModel = require("../../models/UserModel.js")


route.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/login/index.html"))
})

route.post("/login", async(req, res) => {
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        const esValida = await user.comparePassword(password);

        if (!esValida) return res.status(401).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign({
            "email": user.email, "name": user.name, id: user.id
        }, process.env.SECRET_KEY)

        res.cookie("token", token)
        res.status(201).json({
            message: "work",
            status: 201
        })
    } catch (error) {
        res.send("Algo salio mal")
    }
})


module.exports = route