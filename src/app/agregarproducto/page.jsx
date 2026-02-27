'use client'
import { useState } from "react";

import "./AdminInventario.css";

function AdminInventario() {
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    unite_price: "",
    quantity: "",
    url_img: ""
  })

  const onChangeInp = (event) => {
    const inpName = event.target.getAttribute("name")
    const value = event.target.value
    setProduct((prevValue) => {
      const newValue = {
      [inpName]:  value
      }
      return {...prevValue, ...newValue}
    })
  }

  const handlerSubmit = () => {
    console.log(product)
    const fetchData = async() => {
      try {
      const res = await fetch("http://localhost:4000/api/product", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      })
      const resJson = await res.json()
      if(resJson.status == 200){
        setMostrarPopup(true)
      }
    } catch (error) {
      console.log(error)
    }
    }
    fetchData()
  }

  return (
  <div>

      <h1>Administrador de Inventario</h1>

      <div>

        <p>Título del artículo</p>
        <input type="text" name="name" onChange={onChangeInp} value={product.name}/>

        <p>Descripción</p>
        <input type="text" name="description" onChange={onChangeInp} value={product.description}/>

        <p>Precio</p>
        <input type="text" name="price" onChange={onChangeInp} value={product.price}/>

        <p>Precio Unitario</p>
        <input type="text" name="unite_price" onChange={onChangeInp} value={product.unite_price}/>

        <p>Cantidad</p>
        <input type="number" name="quantity" onChange={onChangeInp} value={product.quantity}/>

        <p>URL de la Imagen</p>
        <input type="text" name="url_img" onChange={onChangeInp} value={product.url_img}/>

        <br /><br />

        <button onClick={handlerSubmit}>Agregar Producto</button>

      
      </div>
        {mostrarPopup && (
        <div className="popup">
          <div className="popup-contenido">
            <p>Producto agregado correctamente </p>
            <button onClick={() => {
              setMostrarPopup(false)
            }}>
              Cerrar
            </button>
          </div>
        </div>
      )}

  </div>
  );
}

export default AdminInventario;