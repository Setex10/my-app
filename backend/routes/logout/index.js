require("dotenv").config()
const express = require("express")
const route = express.Router()

route.get("/logout", (req, res) => {
    res.clearCookie("token").status(200).json({
        message: "Se cerró sesion"
    })
})


module.exports = route