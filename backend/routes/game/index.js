const express = require("express")
const route = express.Router()
const path = require("path")

<<<<<<< HEAD
route.get("/inventario/producto", async(req, res) => {
=======
route.get("/game/:id", async(req, res) => {
>>>>>>> parent of 555b37c (se borraron rutas inesesarias)
    try {
        res.sendFile(path.join(__dirname, "../../public/game/index.html"))
    } catch (error) {
        res.send("no funciona")
        }
})

<<<<<<< HEAD

route.post("/inventario/producto", async(req, res) => {
    try {
        res.send("hola")
    } catch (error) {
        res.send("no funciona")
        }
})

=======
>>>>>>> parent of 555b37c (se borraron rutas inesesarias)
module.exports = route