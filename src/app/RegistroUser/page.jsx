import "./usuarios.css"

export default function Usuarios() {
    return (
        <div>
            <h1>Usuarios</h1>

            <h2>Agregar Usuario</h2>

            <input type="text" placeholder="Nombre" />
            <br /><br />

            <input type="email" placeholder="Correo" />
            <br /><br />

            <input type="text" placeholder="Rol" />
            <br /><br />

            <button>Guardar</button>

            <hr />

            <h2>Lista de Usuarios</h2>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    )
}