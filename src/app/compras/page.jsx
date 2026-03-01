'use client'
import { useEffect, useState } from "react";
import "./ventas.css";
import PopUp from "../components/PopUp";
import Menu from "../components/Menu";

export default function Ventas() {
  const [productsSugest, setProductsSugest] = useState([])
  const [inpNameProduct, setInpNameProduct] = useState({
    nameProduct: "",
    idProduct: "",
    quantity: "",
    price: ""
  })

  const [showPopUp, setShowPopUp] = useState(false) 

  const closePopUp = (bool) => {
    setShowPopUp(bool)
  }

  const [producstVenta, setProductVenta] = useState([])

  const onChangeNameProductHandler = (event) => {
    setInpNameProduct((prevInpNameProduct) => {
      return {...prevInpNameProduct, ...{nameProduct: event.target.value}}
    })
  }

  const onChangeValueQuantityHandler = (event) => {
    setInpNameProduct((prevInpNameProduct) => {
      return {
        ...prevInpNameProduct,
        ...{quantity: Number(event.target.value)}
      }
    })
  }

  const onClickSugest = (event) => {
    const target = event.target
    const name = target.getAttribute("nameproduct"),
          id = target.getAttribute("idproduct"),
          price = target.getAttribute("priceproduct")
    setInpNameProduct(() => {
      return {...inpNameProduct, ...{name: name, idProduct: id, price: price}}
    })
    setProductsSugest([])
  }

  const onClickGuardarProductHandler = () => {
    setProductVenta((prevProductVenta) => {
      return [...prevProductVenta, inpNameProduct]
    })
  }

  const savePurchaseHandler = async(method) => {
    try {
      const res = await fetch("http://localhost:4000/api/pedidos", {
        method: "POST",
        body: JSON.stringify({pedido: producstVenta, method}),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      if(res.status == 200){
        const resJson = await res.json()
        if(resJson.url) {
          window.location.href = resJson.url
          return
        }
        setShowPopUp(true)
        setInpNameProduct({
          nameProduct: "",
          idProduct: "",
          quantity: "",
          price: ""
        })
      }
      setProductVenta([])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(inpNameProduct.nameProduct.trim().length > 0){
      if(inpNameProduct.idProduct.trim().length > 0 ){
        return
      }
      const fetchData = async() => {
        try {
          const res = await fetch(`http://localhost:4000/api/inventario?name=${inpNameProduct.nameProduct}`, {
            credentials: "include"
          }
          )
          const resJson = await res.json()
          console.log(resJson)
          setProductsSugest(resJson.product_list)
          console.log(resJson.product_list)
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    } else {
      setProductsSugest([])
    }

  },[inpNameProduct])
  return (
    <>
    <Menu />
      <div className="contenedor">
        <h1>VENTAS DIARIAS</h1>

        <div className="formulario">
          <p>
            <strong>Registrar nueva venta</strong>
          </p>

          <div className="input-buscador">
            <input type="text" placeholder="Nombre del producto" value={inpNameProduct.nameProduct}
            onChange={onChangeNameProductHandler}/>

            {productsSugest.length == 0 ? "": <div className="sugerencias">
              {productsSugest.map(({name, id, price}, index) => {
                return <div className="item-sugerencia" key={index} 
                nameproduct={name} idproduct={id}
                priceproduct={price}
                onClick={onClickSugest}>{name}</div>
              })}
            </div>}
          </div>

          <input type="number" placeholder="Cantidad" 
          value={inpNameProduct.quantity} onChange={onChangeValueQuantityHandler}/>
          <br />

          <input type="number" placeholder="Precio" disabled value={inpNameProduct.price} />
          <br />

          <button onClick={onClickGuardarProductHandler}>Guardar producto</button>
        </div>

        <div className="lista">
          <h2>Lista de Productos</h2>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            {producstVenta.length == 0 ? "" : <tbody>
              {producstVenta.map(({name, price, quantity}, index) => {
                return <tr key={index}>
                  <td>{name}</td>
                  <td>{quantity}</td>
                  <td>{price}</td>
                </tr>
              })
              }
              </tbody>}
          </table>
        </div>
        <button onClick={() => {
          savePurchaseHandler("efectivo")
          }}>Pago en Efectivo
          </button>
          <button onClick={() => {
          savePurchaseHandler("tarjeta")
          }}>Pago en tarjeta
          </button>
      </div>
      {showPopUp && <PopUp closePopUp={closePopUp} text={"Se guardo la compra"} />}
    </>

  );
}