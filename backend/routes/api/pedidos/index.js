const express = require("express")
const route = express.Router()
const jwt = require("jsonwebtoken")
const PedidosModel = require("../../../models/PedidosModel.js")
const { getDecodedJwt } = require("../../../utils/getDecodedJwt.js")
const { default: mongoose } = require("mongoose")
const { checkRoleVentas } = require("../../../middleware/checkRole.js")
const stripe = require("../../../stripe.js")
const descontarInventario = require("../../../utils/actualizarInventario.js")

route.get("/api/pedidos", checkRoleVentas, async (req,res) =>{
    const {token} = req.cookies
    const {enterprise} = getDecodedJwt(token)
    try {
        const doc = await PedidosModel.find({enterprise})
        console.log(doc)
        res.status(200).json({lista_pedidos: doc[0].lista_pedidos})
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Mal error"
        })
    }
})

route.post("/api/pedidos", checkRoleVentas, async(req, res) => {
    const pedido  = req.body.pedido
    const {method} = req.body
    const {token} = req.cookies
    const {enterprise} = getDecodedJwt(token)
    if(pedido.length == 0){
        return res.status(400).json({
            message: "Faltan datos",
            status: 400
        })
    }
    try {
        if(method == "tarjeta"){
            const list_items = pedido.map(({name, price, quantity, id}) => {
                return {
                    price_data: {
                        currency: "mxn",
                        product_data: {
                            name,
                            metadata: {
                            productId: id
                            }
                        },
                        unit_amount: Number(price) * 100,
                    },
                    quantity
                }
            })
              const session = await stripe.checkout.sessions.create({
                line_items: list_items,
                mode: 'payment',
                success_url: `http://localhost:4000/success`,
            });
            
            await descontarInventario(pedido, enterprise);

            return res.json({url: session.url})
        }
        if (method === "efectivo") {

           await descontarInventario(pedido, enterprise)
        }
        res.status(200).json({
            message:"Se agrego la compra", status: 200
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Algo salió mal",
            status: 400
        })
    }
})

module.exports = route
