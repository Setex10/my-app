const express = require("express")
const route = express.Router()
const {getInventario} = require("../../../utils/getInventario.js")
const {getDecodedJwt} = require("../../../utils/getDecodedJwt.js")
const InventarioModel = require("../../../models/InventarioModel.js")
const { checkRoleInventory } = require("../../../middleware/checkRole.js")

route.get("/api/product/:id", checkRoleInventory, async (req,res) =>{
    const {id} = req.params
    const {token} = req.cookies
    console.log(token)
    try {
        const doc = await getInventario(token)
        const {product_list} = doc
        const product = product_list.filter((item) => item.id == id) 
        res.send(product)
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Existe un erorr", error})
    }
})

route.post("/api/product",checkRoleInventory, async(req, res) => {
    const {token} = req.cookies
    console.log(req.body)
    const {name, description, quantity, price, img_url, unite_price} = req.body
    try {
        const {enterprise} = getDecodedJwt(token)
        await InventarioModel.findOneAndUpdate(
        { enterprise },
        {
            $push: {
            product_list: {
                name, description, quantity, 
                price, img_url, unite_price
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

route.put("/api/product/:id", checkRoleInventory, async (req,res) =>{
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
        res.status(200).json({message: "Se actualizo el producto"})
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Existe un erorr", error})
    }
})

route.delete("/api/product/:id", checkRoleInventory, async (req, res) => {
    const {id} = req.params
    const {token} = req.cookies
    try {
        const doc = await getInventario(token)
        doc.product_list = doc.product_list.filter((product) => product.id !== id)
        await doc.save()
        res.status(200).json({message: "Se borro el producto"})
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Existe un erorr", error})
    }
})

module.exports = route
