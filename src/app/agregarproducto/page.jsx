'use client'
import { useState } from "react";
// AdminInventario.jsx

import "./AdminInventario.css";

function AdminInventario() {
const [mostrarPopup, setMostrarPopup] = useState(false);

  
  return (
  <div>

      <h1>Administrador de Inventario</h1>

      <div>

        <p>Título del artículo</p>
        <input type="text" />

        <p>Descripción</p>
        <input type="text" />

        <p>Precio</p>
        <input type="text" />

        <p>Precio Unitario</p>
        <input type="text" />

        <p>Cantidad</p>
        <input type="number" />

        <p>URL de la Imagen</p>
        <input type="text" />

        <br /><br />

        <button onClick={() => setMostrarPopup(true)}>Agregar Producto</button>

      
      </div>
        {mostrarPopup && (
        <div className="popup">
          <div className="popup-contenido">
            <p>Producto agregado correctamente </p>
            <button onClick={() => setMostrarPopup(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

  </div>
  );
}

export default AdminInventario;