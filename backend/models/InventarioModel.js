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

module.exports = InventarioSchema