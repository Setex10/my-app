'use client'

import { useState } from "react"

const FormUser = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        role: "",
        password: ""
    })

    const [message, setMessage] = useState("")

    const onChangeInp = (event) => {
        setMessage("")
        const nameInp = event.target.getAttribute("name")
        const value = event.target.value

        setUserData((prevValue) => {
            return {
                ...prevValue,
                [nameInp]: value
            }
        })
    }

    const submitHandler = async() => {
        try {
            const res = await fetch("http://localhost:4000/api/user", {
                method: "POST",
                credentials: "include",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })

            const resJson = await res.json()
            if(res.status == 400){
                return setMessage(resJson.detalles[0])
            }
            setMessage("Se creo el usuario")
        } catch (error) {
            console.log(error)
        }
    }

    return <>
    <input type="text" required placeholder="Nombre" name="name"
    value={userData.name} onChange={onChangeInp}/>
    <br /><br />

    <input type="email" required placeholder="Correo" name="email"
    value={userData.email} onChange={onChangeInp}/>
    <br /><br />

    <input type="password" required placeholder="Contraseña" name="password"
    value={userData.password} onChange={onChangeInp}/>
    <br /><br />

    <input type="text" required placeholder="Rol" name="role"
    value={userData.role} onChange={onChangeInp}/>
    <br /><br />

    <p>{message}</p>

    <button onClick={submitHandler}>Guardar</button>
    </>
}

export default FormUser