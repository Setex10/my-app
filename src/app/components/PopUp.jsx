import "./PopUp.css"

const PopUp = ({text, closePopUp}) => {
    const setMostrarFalse = () => {
        closePopUp(false)
    }
    return  <div className="popup">
          <div className="popup-contenido">
            <p>{text}</p>
            <button onClick={setMostrarFalse}>
              Cerrar
        </button>
        </div>
    </div>
}

export default PopUp