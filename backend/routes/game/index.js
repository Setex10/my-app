const express = require("express")
const route = express.Router()
const path = require("path")

route.get("/game/:id", async(req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../../public/game/index.html"))
    } catch (error) {
        res.send("no funciona")
        }
})

module.exports = route