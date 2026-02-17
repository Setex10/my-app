const express = require("express"),
route = express.Router(),
path = require("path")

route.get("/profile/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/profile/index.html"))
})


module.exports = route