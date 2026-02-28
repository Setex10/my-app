'use client'
import React, { useEffect, useState } from "react";
import "./product.css";

export default function DetalleProducto({params}) {
  const {id} = React.use(params)
  const [product, setProduct] = useState()

  useEffect(() => {
    try {
        const fetchData = async() => {
          const res = await fetch(`http://localhost:4000/api/product/${id}`,{
                          credentials: "include"
                        })
          const resJson = await res.json()
          setProduct(resJson[0])
        }
        fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])
  return <>
  {product ? <div className="detalle">

      <div className="imagenProducto">
        <img
          src={product.img_url}
          alt={product.name}
        />
      </div>

      <div className="infoProducto">
      <label>
        nombre
        <input type="text" value={product.name}/>
      </label>
       <label>
        Precio
        <input type="text" value={product.price}/>
       </label>
      <label>
        descripcion
        <input type="text" value={product.price}/>
      </label>
       
      <label>
        <strong>
          disponible
          <input type="text" value={product.quantity}/>
        </strong>
      </label>
       

      

        <button>Editar</button>
        <button>Eliminar</button>

      </div>

    </div> : <h2>No se encontró</h2>}
  </>
}