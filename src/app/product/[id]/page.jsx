'use client'
import React, { useEffect, useState } from "react";
import "./product.css";
import PopUp from "@/app/components/PopUp";
import Menu from "@/app/components/Menu";

export default function DetalleProducto({params}) {
  const {id} = React.use(params)
  const [product, setProduct] = useState({
    name: "",
    img_url: "",
    price: "",
    unite_price: "",
    quantity: "", 
    description: ""
  })
  const [showPopUp, setShowPopUp] = useState(false)
  const [message, setMessage] = useState("")

  const closePopUp = (bool) => {
    setShowPopUp(bool)
  }


  const onChangeInp = (event) => {
    const name = event.target.getAttribute("name")
    const value = event.target.value

    setProduct((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    })
  }

  const editProduct = () => {
    try {
        const fetchData = async() => {
          const res = await fetch(`https://my-app-7usk.onrender.com/api/product/${id}`,{
                          credentials: "include",
                          method: "PUT",
                          headers: {
                          "Content-Type": "application/json",
                          }, 
                          body: JSON.stringify(product)
                        })
          const resJson = await res.json()
          setMessage(resJson.message)
          setShowPopUp(true)
        }
        fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProduct = () => {
    try {
        const fetchData = async() => {
          const res = await fetch(`https://my-app-7usk.onrender.com/api/product/${id}`,{
                          credentials: "include",
                          method: "DELETE",
                          headers: {
                          "Content-Type": "application/json",
                          }
                        })
          const resJson = await res.json()
          setMessage(resJson.message)
          setShowPopUp(true)
        }
        fetchData()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    try {
        const fetchData = async() => {
          const res = await fetch(`https://my-app-7usk.onrender.com/api/product/${id}`,{
                          credentials: "include"
                        })
          const resJson = await res.json()
          console.log(resJson)
          setProduct(resJson[0])
        }
        fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])
  return <>
  <Menu />
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
        <input onChange={onChangeInp} name="name" type="text" value={product.name}/>
      </label>
       <label>
        Precio
        <input onChange={onChangeInp} name="price" type="number" value={product.price}/>
       </label>
      <label>
        descripcion
        <input onChange={onChangeInp} name="description" type="text" value={product.description}/>
      </label>

      <label>
        Precio Unitario
        <input onChange={onChangeInp} name="unite_price" type="text" value={product.unite_price}/>
      </label>
       
      <label>
        <strong>
          disponible
          <input onChange={onChangeInp} name="quantity" type="number" value={product.quantity}/>
        </strong>
      </label>
       

      

        <button onClick={editProduct}>Editar</button>
        <button onClick={deleteProduct}>Eliminar</button>

      </div>

    </div> : <h2>No se encontró</h2>}
    {showPopUp && <PopUp closePopUp={closePopUp} text={message} />}
  </>
}