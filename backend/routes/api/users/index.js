const { getDecodedJwt } = require("../../../utils/getDecodedJwt.js")

require("dotenv").config()
const express = require("express"),
route = express.Router(),
UserModel = require("../../../models/UserModel.js");

route.get("/api/user", async(req, res) => {
    const {token} = req.cookies
    const {enterprise} = getDecodedJwt(token)
    try {
        const doc = await UserModel.find({enterprise})
        const list_users = doc.map(({name, email, role}) => {
            return {
                name, email, role
            }
        })

        res.status(200).json({
            list_users
        })
        
    } catch (error){
        console.log(error)
        res.status(400).json({
            message: "No work"
        })
    }
})

route.post("/api/user", async(req, res) => {
    const {token} = req.cookies
    const {enterprise} = getDecodedJwt(token)
    const {name, role, email, password} = req.body
    try {
        new UserModel({
            name, role, email, password, enterprise
        })
        res.status(200).json({
            message: "Se creo el usuario"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Algo malo pasó"
        })
    }
})

module.exports = route