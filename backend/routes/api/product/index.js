const express = require("express")
const route = express.Router()
const {getInventario} = require("../../../utils/getInventario.js")

route.get("/api/product/:id",async (req,res) =>{
    const {id} = req.params
    const {token} = req.cookies
    try {
        const doc = await getInventario(token)
        const {product_list} = doc
        const product = product_list.filter((item) => item.id = id) 
        res.send(product)
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Existe un erorr", error})
    }
})

route.post("/api/product/", async(req, res) => {
    const {token} = req.cookies
    const {name, description, quantity, price, img_url, unit_price} = req.body
})

module.exports = route
