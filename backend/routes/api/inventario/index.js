const express = require("express")
const route = express.Router()
const InventarioModel = require("../../../models/InventarioModel.js")
const jwt = require("jsonwebtoken")

route.get("/api/inventario",async (req,res) =>{
    const {token} = req.cookies
    const decoded = await jwt.decode(token, process.env.SECRET_KEY)
    try {
        const doc = await InventarioModel.findOne({user: decoded.id})
        const {product_list} = doc
        res.send({product_list})
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Existe un erorr", error})
    }
})

module.exports = route
