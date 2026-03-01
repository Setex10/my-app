'use client'
import Menu from "@/app/components/Menu";
import "./usuarios.css";

import React, { useEffect, useState } from "react";
function Usuarios({params}) {
  const {id} = React.use(params)
  const [user, setUser] = useState({
    name: "", email: "", role: ""
  })

  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await fetch(`https://my-app-7usk.onrender.com/api/user?id=${id}`, {
          method: "GET",
                credentials: "include",
                headers: {
                "Content-Type": "application/json",
                }
        })

        const {user: userRes} = await res.json()
        if(!userRes){
          console.log("no existe")
          setMessage("No existe el usuario o se eliminó")
          return
        }
        console.log(userRes)
        setUser(userRes)
      } catch (error) {
        console.log(error)
        setMessage("Se produjo un error")
      }
    }

    fetchData()
  }, [])

  const onChangeInp = (event) => {
    const name = event.target.getAttribute("name")
    const value = event.target.value

    setUser((prevValue) => {
      return {...prevValue, 
      [name]: value
      }
    })
  }

  const editHandler = async() => {
      try {
        const res = await fetch(`https://my-app-7usk.onrender.com/api/user/${id}`, {
          method: "PUT",
          credentials: "include",
          headers: {
                "Content-Type": "application/json",
          }, 
          body: JSON.stringify(user)
        })

        const {message} = await res.json()
        setMessage(message)
      } catch (error) {
        console.log(error)
        setMessage("Se produjo un error")
      }
}

  const deleteUser = async() => {
 try {
        const res = await fetch(`https://my-app-7usk.onrender.com/api/user/${id}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
                "Content-Type": "application/json",
          }
        })
        const {message} = await res.json()
        setMessage(message)
      } catch (error) {
        console.log(error)
        setMessage("Se produjo un error")
      }
  }

  return (
<>
  <Menu />
  <div className="usuarios-container">
    <h2 className="usuarios-title">Editar Usuario</h2>

    <div className="usuarios-card">
      <label className="usuarios-label">
        Nombre
        <input
          className="usuarios-input"
          type="text"
          value={user.name}
          name="name"
          onChange={onChangeInp}
        />
      </label>

      <label className="usuarios-label">
        Email
        <input
          className="usuarios-input"
          type="email"
          value={user.email}
          name="email"
          onChange={onChangeInp}
        />
      </label>

      <label className="usuarios-label">
        Role
        <input
          className="usuarios-input"
          type="text"
          value={user.role}
          name="role"
          onChange={onChangeInp}
        />
      </label>

      <button className="usuarios-btn-primary" onClick={editHandler}>
        Editar
      </button>

      <button className="usuarios-btn-danger" onClick={deleteUser}>
        Eliminar
      </button>

      {message && <p className="usuarios-message">{message}</p>}
    </div>
  </div>
</>
  );
}

export default Usuarios;