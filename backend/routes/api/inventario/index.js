const express = require("express")
const route = express.Router()
const InventarioModel = require("../../../models/InventarioModel.js")
const jwt = require("jsonwebtoken")
const {checkRoleInventory} = require("../../../middleware/checkRole.js")

route.get("/api/inventario", checkRoleInventory, async (req,res) =>{
    const {token} = req.cookies
    const {enterprise} = jwt.decode(token, process.env.SECRET_KEY)
    const {name} = req.query
    const doc = await InventarioModel.findOne({enterprise})
    try {
        if(!!name && name.length > 0){
            regex = new RegExp(name, "i"),
            results = doc.product_list.filter(product => regex.test(product.name));
            console.log(results)
            return  res.json({product_list: results})
        }
        const {product_list} = doc
        res.json({product_list})
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Existe un erorr", error})
    }
})


module.exports = route
