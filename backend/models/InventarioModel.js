const { default: mongoose } = require("mongoose");
const ProductSchema = require("./ProductSchema");

const InventarioSchema = mongoose.Schema({
    product_list: [ProductSchema],
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

const InventarioModel = mongoose.model("Inventario", InventarioSchema)

module.exports = InventarioModel