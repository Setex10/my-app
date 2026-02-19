const express = require("express")
const route = express.Router()
const path = require("path")

route.get("/inventario/producto",(req,res) =>{
    try {
        res.send("FUNCIONA")
    } catch (error) {
        res.status(400).send("existe un error",error)
    }
})
route.post("/inventario/producto",async (req,res)=>{
    try {
        res.send("FUNCIONA")
    } catch (error) {
        res.status(400).send("existe un error",error)
    }

})

module.exports = route