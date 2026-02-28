import FormUser from "../components/FormUser"
import ListUsers from "../components/ListUsers"
import Menu from "../components/Menu"
import "./usuarios.css"

export default function Usuarios() {
    return (
        <>
        <Menu />
        <div>
            <h1>Usuarios</h1>

            <h2>Agregar Usuario</h2>

            <FormUser />

            <hr />

            <h2>Lista de Usuarios</h2>

            <ListUsers/>
        </div>
        </>
    )
}