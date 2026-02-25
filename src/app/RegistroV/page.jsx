
import "./RegistroV.css";
import MostrarVentas from "../components/MostrarVentas.jsx"
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
        <MostrarVentas />
      </div>

    </div>
    );
}