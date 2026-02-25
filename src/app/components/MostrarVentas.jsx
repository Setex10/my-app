'use client'
import { useEffect, useState } from "react"

const MostrarVentas = () => {
  const [data, setData] = useState([])
  const [loadData, setLoadData] = useState(true)
  const dataPrueba = {lista_pedidos: [
      {
        list_compra: [
          {
            producto: "prod_001",
            name: "Taladro Inalámbrico 20V",
            price: 1899,
            quantity: 1
          },
          {
            producto: "prod_002",
            name: "Juego de Brocas 15pz",
            price: 349,
            quantity: 2
          }
        ]
      },
        {
        list_compra: [
          {
            producto: "prod_001",
            name: "Taladro Inalámbrico 20V",
            price: 1899,
            quantity: 1
          },
          {
            producto: "prod_002",
            name: "Juego de Brocas 15pz",
            price: 349,
            quantity: 2
          }
        ]
      },
      {
        list_compra: [
          {
            producto: "prod_003",
            name: "Martillo de Uña 16oz",
            price: 199,
            quantity: 3
          }
        ]
      }
    ]}
  useEffect(() => {
    const fetchFunction = async() => {
        try {
            const dataRes = await fetch("http://localhost:4000/pedidos", {
                method: "GET",
                credentials: "include"
            })
            if(dataRes.status == 404){
                setLoadData(true)
            }
            setData(dataRes)
        } catch (error) {
            console.log("hola")
            console.log(data)
        }
    }
    fetchFunction()
  }, [])
  return <>
  {loadData ? <>
            {dataPrueba.lista_pedidos.map((pedidos, index) => {
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
                                {pedidos.list_compra.map((compra) => {
                                return <tr>
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
            })}
            </>
        :<h2>Algo salio mal</h2>}
        </>
}

export default MostrarVentas