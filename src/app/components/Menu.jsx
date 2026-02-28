'use client'
import "./menu.css"
import Link from "next/link"
import SearchProduct from "./SearchProduct"

const Menu = () => {
    return (
        <header className="menu-header">
            <nav className="menu-nav">
                <ul className="menu-list">
                    <li className="menu-item">
                        <Link href="/">
                            <img src="/home.png" alt="Inicio" />
                        </Link>
                    </li>

                    <li className="menu-item">
                        <Link href="/RegistroV">
                            <img src="/document.png" alt="Ventas" />
                        </Link>
                    </li>

                    <li className="menu-item">
                        <Link href="/compras">
                            <img src="/usd-circle.png" alt="Compras" />
                        </Link>
                    </li>

                    <li className="menu-item">
                        <Link href="/agregarproducto">
                            <img src="/plus-hexagon.png" alt="Agregar producto" />
                        </Link>
                    </li>

                    <li className="menu-item">
                        <Link href="/RegistroUser">
                            <img src="/users-alt.png" alt="Usuarios" />
                        </Link>
                    </li>

                    <li className="menu-item">
                        <Link href="/inventario">
                            <img src="/warehouse.png" alt="Inventario" />
                        </Link>
                    </li>
                </ul>

                <div className="menu-search">
                    <SearchProduct />
                </div>
            </nav>
        </header>
    )
}

export default Menu