const express = require("express")
const route = express.Router()
const {getInventario} = require("../../../utils/getInventario.js")
const { getDecodedJwt } = require("../../../utils/getDecodedJwt.js")
const InventarioModel = require("../../../models/InventarioModel.js")

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

route.post("/api/product", async(req, res) => {
    const {token} = req.cookies
    const {name, description, quantity, price, img_url, unit_price} = req.body
    try {
        const {id} = await getDecodedJwt(token)
        await InventarioModel.findOneAndUpdate(
        { user: id },
        {
            $push: {
            product_list: {
                name, description, quantity, 
                price, img_url, unit_price
            }
            }
        },
        { new: true }
        );
        res.json({
            message: "Se agregó el producto", 
            status: 200
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Hubo un error en el servidor", 
            error
        })
    }
})

route.put("/api/product/:id",async (req,res) =>{
    const {id} = req.params
    const {token} = req.cookies
    const {...keysToModify} = req.body
    try {
        const doc = await getInventario(token)
        const {product_list} = doc
        const product = product_list.filter((item) => item.id == id)
        const newProductModify = Object.assign(product[0], keysToModify)
        doc.product_list.map((product) => {
            if(product.id == id){
                return newProductModify
            }
            return product
        })
        await doc.save()
        res.send(doc)
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Existe un erorr", error})
    }
})

route.delete("/api/product/:id", async (req, res) => {
    const {id} = req.params
    const {token} = req.cookies
    const {...keysToModify} = req.body
    try {
        const doc = await getInventario(token)
        const {product_list} = doc
        const product = product_list.filter((item) => item.id == id)
        const newProductModify = Object.assign(product[0], keysToModify)
        res.send(newProductModify)
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Existe un erorr", error})
    }
})

module.exports = route
