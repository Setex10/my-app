'use client'
import { useEffect, useState } from "react"

const MostrarVentas = () => {
  const [data, setData] = useState({lista_pedidos: []})
  const [loadData, setLoadData] = useState(false)
  useEffect(() => {
    const fetchFunction = async() => {
        try {
            const dataRes = await fetch("https://my-app-7usk.onrender.com/api/pedidos", {
                method: "GET",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
            })
            const dataJson = await dataRes.json()
            setData(dataJson)
            setLoadData(true)
        } catch (error) {
          console.log(error)
        }
    }
    fetchFunction()
  }, [])
  return <>
  {loadData ? <>
            {data.lista_pedidos && data.lista_pedidos.length > 0 ? data.lista_pedidos.map((pedidos, index) => {
              console.log(pedidos)
                return <div key={index}>
                    <h2>{`pedido ${index}`}</h2>
                    <table>
                        <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Total</th>
                                    <th>Método de Pago</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidos.list_compra.map((compra, index) => {
                                return <tr key={index}>
                                    <td>{compra.name}</td>
                                    <td>{compra.quantity}</td>
                                    <td>{compra.price}</td>
                                    <td>{compra.price * compra.quantity}</td>
                                    <td>Efectivo</td>
                                    <td>22/02/2026</td>
                                </tr>
                                })}
                            </tbody>
                    </table>
                </div>
            }) : <><h2>No se encontraron Ventas</h2></>}
            </>
        :<h2>Algo salio mal</h2>}
        </>
}

export default MostrarVentas