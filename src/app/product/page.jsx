import React from "react";
import "./DetalleProducto.css";

export default function DetalleProducto() {
  return (
    <div className="detalle">

      <div className="imagenProducto">
        <img
          src="https://via.placeholder.com/450"
          alt="Producto"
        />
      </div>

      <div className="infoProducto">

        <h2>Producto de Ejemplo</h2>

        <p><strong>Precio:</strong> $1,500 MXN</p>

        <p>
          Este artículo es un ejemplo para mostrar cómo se vería la
          información detallada de un producto dentro del sistema.
        </p>

        <p><strong>Disponibles:</strong> 8 piezas</p>

        <button>Comprar</button>

      </div>

    </div>
  );
}