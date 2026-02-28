const buscarProductos = (texto, productos) => {
  const regex = new RegExp(texto, "gi");

  return productos
    .map(({name, id, price}) => {
      const coincidencias = name.match(regex);
      return {
        name,
        score: coincidencias ? coincidencias.length : 0,
        id,
        price
      };
    })
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score);
}

module.exports = buscarProductos