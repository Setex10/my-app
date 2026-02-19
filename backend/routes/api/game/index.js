const express = require("express"),
route = express.Router()

route.get("/api/gameName/:gameName", async(req, res) => {
    const {gameName} = req.params
    try {
        const data = await fetch("https://www.freetogame.com/api/games", {
            method: "GET"
        })
        const jsonData = await data.json(),
        regex = new RegExp(gameName, "i"),
        results = jsonData.filter(game => regex.test(game.title));
        res.json(results.slice(0, 10))
    } catch (error){
        res.json([])
    }
})

module.exports = route