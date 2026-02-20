import Link from "next/link"
const Menu = () => {
    return <header className="w-full h-20 fixed top-0 left-0 z-10 bg-sky-700">
        <nav className="w-full h-full">
            <ul className="w-full h-full flex justify-center items-center text-sky-100 gap-8 text-2xl">
                <li>
                    <Link href ="/admin/inventario" >Inventario</Link>
                </li>
                <li>
                    <Link href ="#" >Pagina 2</Link>
                </li>
                <li>
                    <Link href ="#" >Pagina 3</Link>
                </li>
            </ul>
        </nav>
    </header>
}

export default Menu