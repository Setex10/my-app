import "./inventario.css"
export default function  Inventario(){

    const productos = [
        { id: 1, nombre: "Laptop HP", categoria: "Electrónica", stock: 15, precio: 12500 },
        { id: 2, nombre: "Mouse Logitech", categoria: "Accesorios", stock: 40, precio: 350 },
        { id: 3, nombre: "Teclado Mecánico", categoria: "Accesorios", stock: 22, precio: 950 },
        { id: 4, nombre: "Monitor Samsung", categoria: "Electrónica", stock: 8, precio: 4200 },
        { id: 5, nombre: "Impresora Epson", categoria: "Oficina", stock: 6, precio: 3800 }
    ]
     return <div className="contenedor">
   <h1 className="titulo">Inventario General</h1>
   <div className  ="tabla-contenedor">
   <table className="tabla"> 
     <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{producto.stock}</td>
                <td>${producto.precio}</td>
              </tr>
            ))}
          </tbody>
   </table>
   </div>


   </div>
}