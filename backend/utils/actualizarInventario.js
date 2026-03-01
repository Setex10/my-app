const InventarioModel = require("../models/InventarioModel");

async function descontarInventario(pedido, enterprise) {

  const inventario = await InventarioModel.findOne({ enterprise });
  console.log(inventario)
  if (!inventario) {
    throw new Error("Inventario no encontrado");
  }

  for (const item of pedido) {

    const product = inventario.product_list.id(item.idProduct);

    if (!product) {
      throw new Error(`Producto no encontrado`);
    }

    if (product.quantity < item.quantity) {
      throw new Error(`Stock insuficiente para ${product.name}`);
    }

    product.quantity -= item.quantity;
  }

  await inventario.save();
}

module.exports = descontarInventario