import "./RegistroV.css";
export default function RegistroV() {
    return (
        <div classname="contenedor">
            <h1>
                <strong>
                    VENTAS REGISTRADAS
                </strong>
                
            </h1>
            <p> Aqui se mostraran todas las ventas</p>
        <div className="tabla-container">
        <table border="1">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
              <th>Método de Pago</th>
              <th>Fecha</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Palomitas</td>
              <td>2</td>
              <td>$80</td>
              <td>$160</td>
              <td>Efectivo</td>
              <td>22/02/2026</td>
            </tr>

            <tr>
              <td>Refresco</td>
              <td>1</td>
              <td>$50</td>
              <td>$50</td>
              <td>Tarjeta</td>
              <td>22/02/2026</td>
            </tr>
          </tbody>

        </table>
      </div>

    </div>
    );
}