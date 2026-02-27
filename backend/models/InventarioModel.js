const { default: mongoose } = require("mongoose");
const ProductSchema = require("./ProductSchema");

const InventarioSchema = mongoose.Schema({
    product_list: [ProductSchema],
    enterprise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empresa"
    },
})

const InventarioModel = mongoose.model("Inventario", InventarioSchema)

module.exports = InventarioModel