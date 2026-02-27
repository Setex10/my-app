import "./menu.css"
import Link from "next/link"
import SearchProduct from "./SearchProduct"
const Menu = () => {
    return <header >
        <nav>
            <ul>
                <li>
                    <Link href ="/" >
                    <img src="/home.png" alt="" />
                    </Link>
                </li>

                <li>
                <Link href = "/RegistroV">
                <img src="/document.png" alt="" />
                </Link>
                </li>

                <li>
                <Link href = "/compras">
                <img src="/usd-circle.png" alt="" />
                </Link>
                </li>
                
                <li>
                    
                    <Link href = "/agregarproducto">
                    <img src="/plus-hexagon.png" alt="" />
                    </Link>
                </li>
            
                <li>
                    <Link href="/inventario">
                    <img src="/warehouse.png" alt="" />
                    </Link>
                </li>
            </ul>
            <SearchProduct />
        </nav>
    </header>
}

export default Menu