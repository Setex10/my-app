const express = require("express"),
route = express.Router()

route.get("/api/allGames", async(req, res) => {
    try {
        const data = await fetch("https://www.freetogame.com/api/games", {
            method: "GET"
        })
        const jsonData = await data.json()
        res.json(jsonData.slice(0, 10))
    } catch (error){
        console.log(error)
    }
})

module.exports = route