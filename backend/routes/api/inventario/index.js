const express = require("express")
const route = express.Router()
const InventarioSchema = require("../../../models/InventarioModel.js")

route.get("/api/inventario",(req,res) =>{
    const {token} = req.cookies
    try {
        
    } catch (error) {
        res.status(400).send("existe un error",error)
    }
})
route.post("/inventario",async (req,res)=>{
    try {
        res.send("FUNCIONA")
    } catch (error) {
        res.status(400).send("existe un error",error)
    }

})

module.exports = route
