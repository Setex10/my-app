const express = require("express")
const route = express.Router()
const jwt = require("jsonwebtoken")
const PedidosModel = require("../../../models/PedidosModel.js")
const { getDecodedJwt } = require("../../../utils/getDecodedJwt.js")
const { default: mongoose } = require("mongoose")
const { checkRoleVentas } = require("../../../middleware/checkRole.js")

route.get("/api/pedidos", checkRoleVentas, async (req,res) =>{
    const {token} = req.cookies
    const {enterprise} = await getDecodedJwt(token)
    try {
        const doc = await PedidosModel.find({enterprise})
        res.json(doc)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Mal error"
        })
    }
})

route.post("/api/pedidos", checkRoleVentas, async(req, res) => {
    const pedido  = req.body.pedido
    const {token} = req.cookies
    const decoded = await getDecodedJwt(token)
    if(pedido.length == 0){
        return res.status(400).json({
            message: "Faltan datos",
            status: 400
        })
    }
    try {
        await PedidosModel.findOneAndUpdate({user: decoded.id},  {
            $setOnInsert: {
            user: decoded.id
            },
            $push: {
                id_compra: new mongoose.Types.ObjectId(),
                lista_pedidos: {
                    list_compra: pedido
                }
            }
        },
        { 
            upsert: true, new: true 
        })
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
