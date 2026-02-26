'use client'
import { useEffect, useState } from "react"
const SearchProduct = () => {
    const [productSugest, setProductsSugest] = useState([])
    const [inpNameProduct, setInpProductName] = useState("")
    
    useEffect(() => {
    if(inpNameProduct.trim().length > 0){
      if(inpNameProduct.trim().length >0 ){
        return
      }
      const fetchData = async() => {
        try {
          const res = await fetch(`http://localhost:4000/api/inventario?name=${inpNameProduct}`, {
            credentials: "include"
          }
          )
          const resJson = await res.json()
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
    
    const inptProductOnChangeHandler = (event) => {
        setInpProductName(event.target.value)
    }

    return <form className="barra-de-busqueda" >
                 <input
                    type="texto"
                    placeholder="Buscar"
                    value={inpNameProduct }
                    onChange={inptProductOnChangeHandler}
                />
            {productSugest.length > 0 && <ul className="sugerencias">
                <li>Taladro inalámbrico 20V</li>
                <li>Martillo Truper 16oz</li>
                <li>Juego de desarmadores</li>
                <li>Disco de corte 4 1/2"</li>
                <li>Cinta métrica 5m</li>
            </ul>}
    </form>
}

export default SearchProduct