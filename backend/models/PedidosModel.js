const mongoose = require("mongoose");
const { Schema } = mongoose;

const CompraSchema = mongoose.Schema({
    list_compra : [{
        name: String,
        price: Number, 
        quantity: Number,
    }],
    id_compra: Schema.Types.ObjectId
})

const PedidosSchema = mongoose.Schema({
    empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa"
    },
    lista_pedidos : [CompraSchema]
})

const PedidosModel = mongoose.model("Pedidos", PedidosSchema)

module.exports = PedidosModel