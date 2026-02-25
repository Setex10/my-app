const e = require("express");
const { Schema, Model } = require("mongoose");

const CompraSchema = new Schema({
    list_compra : [{
        producto: {
            type: String,
            ref: "User"
        },
        name: String,
        price: Number, 
        quantity: Number,
    }]
})

const PedidosSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    lista_pedidos : [CompraSchema]
})

const PedidosModel = new Model("Pedidos", PedidosSchema)
module.exports = PedidosModel