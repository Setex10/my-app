import "./ventas.css";
export default function ventas ( ) {
    return (
        <div classname="contenedor">
            <h1> VENTAS DIARIAS</h1> 

            <div classname= "formulario">
                <p>
                <strong>Registrar nueva venta</strong> 
                </p>
                <input type="text" placeholder="Nombre del producto" />
                <br />

                <input type="number" placeholder="Cantidad" />
                <br />

                <input type="number" placeholder="Precio" />
                <br />
                <button> guardar venta </button>

    </div>
    <div className="lista">
        <h2>Lista de ventas</h2>

        <table border="1">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ejemplo</td>
              <td>2</td>
              <td>$200</td>
            </tr>
          </tbody>
        </table>

      </div>
        </div>
    )
    
}