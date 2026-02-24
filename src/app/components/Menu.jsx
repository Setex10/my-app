import "./menu.css"
import Link from "next/link"
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
                    <Link href="/inventario">
                    <img src="/warehouse.png" alt="" />
                    </Link>
                </li>
            </ul>
            <form className="barra-de-busqueda" >
                 <input
                    type="texto"
                    placeholder="Buscar"
                />
            </form>
        </nav>
    </header>
}

export default Menu