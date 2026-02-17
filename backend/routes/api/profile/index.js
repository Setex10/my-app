require("dotenv").config()
const express = require("express"),
route = express.Router(),
UserModel = require("../../../models/UserModel.js"),
jwt = require("jsonwebtoken")

route.get("/api/profile/id/:id", async(req, res) => {
    const {id} = req.params
    try {
        const {name, favoriteGames} = await UserModel.findById(id)
        const games = await fetch("https://www.freetogame.com/api/games")
        const gamesJson = await games.json()
        const favoriteGamesInfo = gamesJson.filter((game) => favoriteGames.includes(game.id))
        res.json({name, favoriteGamesInfo})
    } catch (error){
        res.status(400).json({
            message: "No work"
        })
    }
})

route.get("/api/profile/id", async(req, res) => {
    const {token} = req.cookies
    try { 
        const decoded = jwt.decode(token, process.env.SECRET_KEY)
        const doc = await UserModel.findById(decoded.id)
        res.json({id: doc.id})
    } catch (error) {
        res.status(400).json({
            message: "No work"
        })
    }
})

module.exports = route