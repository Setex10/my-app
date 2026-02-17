require("dotenv").config()
const express = require("express")
const route = express.Router()
const jwt = require("jsonwebtoken")
const UserModel = require("../../models/UserModel.js")

route.delete("/delete", async(req, res) => {
    const {token} = req.cookies
    try {
        const {id} = jwt.decode(token, process.env.SECRET_KEY)
        await UserModel.findByIdAndDelete(id);
        res.clearCookie("token").status(201).json({
            message: "work",
            status: 201
        })

    } catch (error) {
        res.status(400).json({
            message: "Dont work", 
            error
        })
    }
})


module.exports = route