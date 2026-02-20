const { default: mongoose } = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String, 
        require: true,
    }, 
    description: {
        type: String,
        require: true
    },
    img_url: {
        type: String,
        require: true
    },
    quantity: {
        type: Number, 
        require: true
    },
    unite_price: {
        type: Number, 
        require: true
    },
    price: {
        type: Number, 
        require: true
    }
})

module.exports = ProductSchema