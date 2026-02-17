require("dotenv").config()
const jwt = require("jsonwebtoken"),
    UserModel = require("../../models/UserModel.js")

const express = require("express"),
    route = express.Router();
    
    
route.put("/addFavoriteGame", async (req, res) => {
    const {idGame} = req.body
    const {token} = req.cookies
    const {email} = jwt.decode(token, process.env.SECRET_KEY)
    try {
        const doc = await UserModel.findOneAndUpdate(
        {email},
        {$addToSet: {favoriteGames: idGame}},
        {new: true}
        ).select('-password')

        if(!doc) return res.status(404).json({
            message: "User not found", status: 404
        })

        res.json({
            menssage: "User update",
            status: 200
        })
    } catch (error) {
        res.status(500).json({
            message:"Error to update", error
        })
    }
})

module.exports = route