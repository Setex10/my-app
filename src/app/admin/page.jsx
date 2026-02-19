import { Link } from "react-router-dom"

// Las etiquetas "a" son solo de referencia, se cambiaran para implementar el react router dom
const Admin = () => {
    return <main>
        <h2>Vista de admin</h2>
        <section>
            <div>
                <a href="/">Agregar un producto</a>
            </div>
            <div>
                <a href="/">Buscar un producto</a>
            </div>
            <div>
                <a href="/">Eliminar un Producto</a>
            </div>
            <div>
                <a href="/">Modificar un producto</a>
            </div>
        </section>
    </main>
}

export default Admin