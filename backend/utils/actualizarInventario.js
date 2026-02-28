const Inventario = require("./models/Inventario");

async function actualizarInventario(lineItems) {

  for (const item of lineItems) {

    const productId = item.price.product.metadata.productId;
    const quantityComprada = item.quantity;

    // 🔥 Buscar inventario que tenga ese producto
    const inventario = await Inventario.findOne({
      "product_list._id": productId
    });

    if (!inventario) {
      throw new Error("Inventario no encontrado");
    }

    const product = inventario.product_list.id(productId);

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    if (product.quantity < quantityComprada) {
      throw new Error("Stock insuficiente");
    }

    product.quantity -= quantityComprada;

    await inventario.save();
  }
}

module.exports = actualizarInventario