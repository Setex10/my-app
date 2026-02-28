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

        <h2>{product.name}</h2>

        <p><strong>Precio:</strong> ${product.price}</p>

        <p>
          {product.description}
        </p>

        <p><strong>Disponibles:</strong> {product.quantity} piezas</p>

        <button>Comprar</button>

      </div>

    </div> : <h2>No se encontró</h2>}
  </>
}