'use client'
import { useEffect, useState } from "react"
import "./inventario.css"
import Link from "next/link"
import Menu from "../components/Menu"
export default function  Inventario(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchFunction = async () => {
      try {
      const res = await fetch("https://my-app-7usk.onrender.com/api/inventario", {
      method: "GET",
      credentials: "include"
      })
      const resJson = await res.json()
      console.log(resJson)
      setLoading(false)
      setData(resJson.product_list)
    } catch (error) {
      console.log(error)
    }
    }

    fetchFunction()
  }, [])
     return <>
     <Menu />
     <div className="contenedor">
      {loading ? <h2>Esta cargando</h2> : <><h2 className="titulo">Inventario General</h2>
   <div className  ="tabla-contenedor">
   <table className="tabla"> 
     <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Precio Unitario</th>
              <th>Image</th>
            </tr>
          </thead>

          <tbody>
            {data && data.length > 0 ? data.map((producto) => (
              <tr key={producto._id}>
                <td><Link href={`/product/${producto._id}`}>{producto._id}</Link></td>
                <td>{producto.name}</td>
                <td>{producto.description}</td>
                <td>{producto.quantity}</td>
                <td>${producto.price}</td>
                <td>{producto.unite_price}</td>
                <td><img src={producto.img_url} alt={producto.name} /></td>
              </tr>
            )) : <></>}
          </tbody>
   </table>
   </div>
   </>}
    </div>
      </>
}