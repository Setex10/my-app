'use client'

import { useEffect, useState } from "react"
import PopUp from "./PopUp"
import Link from "next/link"

const ListUsers = () => {
    const [listUsers, setListUsers] = useState({
        list_users: []
    })
    const [showPopUp, setShowPopUp] = useState(false)

    const deleteUser = async(id) => {
        try {
            const res = await fetch(`http://localhost:4000/api/user/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                    "Content-Type": "application/json",
                    },
                })
            if(res.status == 200){
                setShowPopUp(true)
            }
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
    }, [listUsers.list_users])

    const closePopUp = (bool) => {
        setShowPopUp(bool)
    }

    return <><table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
            {listUsers.list_users && listUsers.list_users.length > 0 ? listUsers.list_users.map(({name, email, role, id}, index) => {
                return <tr key={index}>
                    <td><Link href={`User/${id}`}>{name}</Link></td>
                    <td>{email}</td>
                    <td>{role}</td>
                    <td><button onClick={() => {
                        deleteUser(id)
                    }}>Eliminar</button></td>
                </tr>
            }) : <></>}
        </tbody>
    </table>
    {showPopUp && <PopUp closePopUp={closePopUp} text={"Se eliminó al usuario"}/>}
    </>
}

export default ListUsers