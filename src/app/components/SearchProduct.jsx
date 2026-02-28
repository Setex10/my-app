'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
const SearchProduct = () => {
    const [productSugest, setProductsSugest] = useState([])
    const [inpNameProduct, setInpProductName] = useState("")
    
    useEffect(() => {
      console.log(inpNameProduct)
    if(inpNameProduct.trim().length > 0){
      const fetchData = async() => {
        try {
          const res = await fetch(`http://localhost:4000/api/inventario?name=${inpNameProduct}`, {
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            }
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
                {productSugest.map((product, index) => {
                  return <li key={index}>
                    <Link href={`/product/${product.id}`}>{product.name}
                    </Link>
                    </li>
                })}
            </ul>}
    </form>
}

export default SearchProduct