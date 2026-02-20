const express = require("express")
const route = express.Router()
const path = require("path")

route.get("/admin",(req,res) =>{
    try {
        res.send("FUNCIONA")
    } catch (error) {
        res.status(400).send("existe un error",error)
    }
})
route.post("/admin",async (req,res)=>{
      try {
        res.send("FUNCIONA")
    } catch (error) {
        res.status(400).send("existe un error",error)
    }

})

module.exports = route