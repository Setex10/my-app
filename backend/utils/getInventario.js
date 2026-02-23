const express = require("express")
const InventarioModel = require("../models/InventarioModel.js")
const jwt = require("jsonwebtoken")

const getInventario = async(token) => {
    const decoded = await jwt.decode(token, process.env.SECRET_KEY)
    try {
        const doc = await InventarioModel.findOne({user: decoded.id})
        return doc
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

module.exports = {
    getInventario
}