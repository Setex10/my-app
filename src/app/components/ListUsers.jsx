'use client'

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ListUsers = () => {
    const [listUsers, setListUsers] = useState({
        list_users: []
    })

    const deleteUser = async(id) => {
        try {
            const res = await fetch(`http://localhost:4000/api/user/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                    "Content-Type": "application/json",
                    },
                })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await fetch("http://localhost:4000/api/user", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                    "Content-Type": "application/json",
                    },
                })
                const resJson = await res.json()
                setListUsers(resJson)
            } catch (error) {
                console.log(resJson)
            }
        }
        fetchData()
    }, [])

    return <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
            {listUsers.list_users.map(({name, email, role, id}, index) => {
                return <tr key={index}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{role}</td>
                    <td><button onClick={() => {
                        deleteUser(id)
                    }}>Eliminar</button></td>
                </tr>
            })}
        </tbody>
    </table>
}

export default ListUsers