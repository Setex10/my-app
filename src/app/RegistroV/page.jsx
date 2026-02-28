
import "./RegistroV.css";
import MostrarVentas from "../components/MostrarVentas.jsx"
import Menu from "../components/Menu";
export default function RegistroV() {
  
    return (
    <>
    <Menu />
        <div className="contenedor">
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
    </>
    );
}