const express = require("express"),
route = express.Router()

route.get("/api/idGame/:id", async(req, res) => {
    const {id} = req.params
    try {
        const data = await fetch(`https://www.freetogame.com/api/game?id=${id}`, {
            method: "GET"
        })
        const jsonData = await data.json()
        res.json(jsonData)
    } catch (error){
        res.json([])
    }
})

module.exports = route