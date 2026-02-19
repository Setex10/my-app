const express = require("express")
const route = express.Router()
const path = require("path")

route.get("/inventario/producto", async(req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../../public/game/index.html"))
    } catch (error) {
        res.send("no funciona")
        }
})


route.post("/inventario/producto", async(req, res) => {
    try {
        res.send("hola")
    } catch (error) {
        res.send("no funciona")
        }
})

module.exports = route